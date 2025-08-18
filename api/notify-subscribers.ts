import { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Simple auth check - you should use a proper auth mechanism
  const authToken = req.headers.authorization
  if (authToken !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { title, excerpt, url, type = 'blog' } = req.body

  if (!title || !url) {
    return res.status(400).json({ error: 'Title and URL are required' })
  }

  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID
    
    if (!audienceId) {
      return res.status(400).json({ error: 'RESEND_AUDIENCE_ID not configured' })
    }

    // Send broadcast to all subscribers
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New ${type === 'blog' ? 'Blog Post' : 'Story'} Published!</h2>
        
        <h3 style="color: #555; margin-top: 30px;">${title}</h3>
        ${excerpt ? `<p style="color: #666; line-height: 1.6;">${excerpt}</p>` : ''}
        
        <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">Read More →</a>
        
        <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #aaa; font-size: 12px; text-align: center;">
          You're receiving this because you subscribed to updates.<br>
          <a href="{{unsubscribe}}" style="color: #aaa;">Unsubscribe</a>
        </p>
      </div>
    `

    const response = await resend.broadcasts.create({
      audienceId: audienceId,
      from: 'Ethen Daniels <onboarding@resend.dev>',
      subject: `New ${type === 'blog' ? 'Post' : 'Story'}: ${title}`,
      html: emailHtml
    })

    return res.status(200).json({ 
      success: true,
      message: 'Newsletter sent successfully',
      broadcastId: response.data?.id
    })
  } catch (error) {
    console.error('Failed to send newsletter:', error)
    return res.status(500).json({ 
      error: 'Failed to send newsletter'
    })
  }
}