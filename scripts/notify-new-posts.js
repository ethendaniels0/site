import { Resend } from 'resend'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const resend = new Resend(process.env.RESEND_API_KEY)

// File to track last notification time
const LAST_CHECK_FILE = '.last-notification-check'

async function checkAndNotify() {
  if (!process.env.RESEND_AUDIENCE_ID) {
    console.log('⚠️ RESEND_AUDIENCE_ID not set, skipping notifications')
    return
  }

  const lastCheck = fs.existsSync(LAST_CHECK_FILE) 
    ? new Date(fs.readFileSync(LAST_CHECK_FILE, 'utf8'))
    : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Default to 1 week ago

  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const storiesDir = path.join(process.cwd(), 'content', 'stories')
  
  const newPosts = []

  // Check blog posts
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir)
    for (const file of files) {
      if (!file.endsWith('.md')) continue
      
      const filePath = path.join(blogDir, file)
      const stats = fs.statSync(filePath)
      
      if (stats.mtime > lastCheck) {
        const content = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(content)
        
        newPosts.push({
          title: data.title,
          excerpt: data.excerpt,
          type: 'blog',
          slug: data.slug || file.replace('.md', ''),
          date: data.date
        })
      }
    }
  }

  // Check stories
  if (fs.existsSync(storiesDir)) {
    const files = fs.readdirSync(storiesDir)
    for (const file of files) {
      if (!file.endsWith('.md')) continue
      
      const filePath = path.join(storiesDir, file)
      const stats = fs.statSync(filePath)
      
      if (stats.mtime > lastCheck) {
        const content = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(content)
        
        newPosts.push({
          title: data.title,
          excerpt: data.excerpt,
          type: 'story',
          slug: data.slug || file.replace('.md', ''),
          date: data.date
        })
      }
    }
  }

  if (newPosts.length > 0) {
    console.log(`📬 Found ${newPosts.length} new posts to notify about`)
    
    // Sort by date (newest first)
    newPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    // Send notification for the most recent post
    const latestPost = newPosts[0]
    const postUrl = `${process.env.SITE_URL || 'https://yourdomain.com'}/${latestPost.type === 'blog' ? 'blog' : 'stories'}/${latestPost.slug}`
    
    try {
      // Get all contacts from audience
      const audienceResponse = await fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, {
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        }
      })
      
      if (!audienceResponse.ok) {
        throw new Error('Failed to fetch audience contacts')
      }
      
      const { data: contacts } = await audienceResponse.json()
      
      if (contacts && contacts.length > 0) {
        // Send broadcast to all subscribers
        const emailHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New ${latestPost.type === 'blog' ? 'Blog Post' : 'Story'} Published!</h2>
            
            <h3 style="color: #555; margin-top: 30px;">${latestPost.title}</h3>
            <p style="color: #666; line-height: 1.6;">${latestPost.excerpt}</p>
            
            <a href="${postUrl}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">Read More →</a>
            
            ${newPosts.length > 1 ? `
              <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
              <p style="color: #888; font-size: 14px;">
                Also published recently: ${newPosts.slice(1).map(p => p.title).join(', ')}
              </p>
            ` : ''}
            
            <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #aaa; font-size: 12px; text-align: center;">
              You're receiving this because you subscribed to updates.<br>
              <a href="{{unsubscribe}}" style="color: #aaa;">Unsubscribe</a>
            </p>
          </div>
        `
        
        const response = await resend.broadcasts.create({
          audience_id: process.env.RESEND_AUDIENCE_ID,
          from: 'Ethen Daniels <noreply@yourdomain.com>',
          subject: `New ${latestPost.type === 'blog' ? 'Post' : 'Story'}: ${latestPost.title}`,
          html: emailHtml
        })
        
        console.log('✅ Newsletter sent successfully!', response)
      } else {
        console.log('📭 No subscribers to notify')
      }
    } catch (error) {
      console.error('❌ Failed to send newsletter:', error)
    }
  } else {
    console.log('📭 No new posts since last check')
  }

  // Update last check time
  fs.writeFileSync(LAST_CHECK_FILE, new Date().toISOString())
}

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  checkAndNotify()
}