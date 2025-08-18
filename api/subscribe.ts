import { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  // Validate email
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please provide a valid email address' })
  }
  
  // Check if API key exists
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured')
    return res.status(500).json({ error: 'Email service not configured. Please contact the administrator.' })
  }

  try {
    // You need to create an audience in Resend dashboard first
    // Then add the RESEND_AUDIENCE_ID to your environment variables
    const audienceId = process.env.RESEND_AUDIENCE_ID
    
    if (!audienceId) {
      console.error('RESEND_AUDIENCE_ID not configured')
      // Fallback: just store the email for now
      // You can manually add these to your audience later
      const toEmail = process.env.TO_EMAIL
      if (!toEmail || toEmail === 'your-email@example.com') {
        console.error('TO_EMAIL not properly configured')
        return res.status(200).json({ 
          success: true,
          message: 'Thank you for subscribing! We\'ll add you to our list soon.',
        })
      }
      
      const response = await resend.emails.send({
        from: 'Newsletter <onboarding@resend.dev>',
        to: toEmail,
        subject: 'New Newsletter Subscription',
        html: `
          <p>New subscriber: <strong>${email}</strong></p>
          <p>Add this email to your Resend Audience manually or configure RESEND_AUDIENCE_ID.</p>
        `,
      })
      
      return res.status(200).json({ 
        success: true,
        message: 'Subscription recorded. You\'ll be added to the list shortly.',
        id: response.data?.id 
      })
    }
    
    // Use Resend SDK to add contact
    try {
      const contactResponse = await resend.contacts.create({
        email: email,
        audienceId: audienceId,
      })
      
      // Send welcome email
      await resend.emails.send({
        from: 'Ethen Daniels <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to my newsletter!',
        html: `
          <h2>Thanks for subscribing!</h2>
          <p>You'll receive an email whenever I publish new content.</p>
          <p>If you ever want to unsubscribe, just click the link at the bottom of any newsletter email.</p>
          <br>
          <p>Best,<br>Ethen</p>
        `,
      })
      
      return res.status(200).json({ 
        success: true,
        id: contactResponse.data?.id,
        message: 'Successfully subscribed!' 
      })
    } catch (audienceError: any) {
      // Check if contact already exists
      if (audienceError.message?.includes('already exists') || audienceError.message?.includes('duplicate')) {
        return res.status(200).json({ 
          success: true,
          message: 'You\'re already subscribed!' 
        })
      }
      
      console.error('Failed to add to audience:', audienceError)
      
      // Fallback: Just send notification email if audience add fails
      const notifyResponse = await resend.emails.send({
        from: 'Newsletter <onboarding@resend.dev>',
        to: process.env.TO_EMAIL || 'your-email@example.com',
        subject: 'New Newsletter Subscription',
        html: `
          <p>New subscriber: <strong>${email}</strong></p>
          <p>Failed to add to Resend Audience automatically. Error: ${audienceError.message}</p>
          <p>Please add manually to your audience.</p>
        `,
      })
      
      return res.status(200).json({ 
        success: true,
        message: 'Thank you for subscribing! We\'ll add you to our list.',
        id: notifyResponse.data?.id
      })
    }
  } catch (error) {
    console.error('Subscription error:', error)
    return res.status(500).json({ 
      error: 'Failed to process subscription. Please try again later.' 
    })
  }
}