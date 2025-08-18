# Vercel Environment Variables Setup

To fix the 500 error and enable the subscription feature, you need to add these environment variables in Vercel:

## Required Environment Variables

### 1. Go to Vercel Dashboard
- Visit https://vercel.com/dashboard
- Click on your project
- Go to **Settings** tab
- Click **Environment Variables** in the left sidebar

### 2. Add These Variables

#### RESEND_API_KEY (Required)
- **Variable Name:** `RESEND_API_KEY`
- **Value:** Your Resend API key (starts with `re_`)
- **Get it from:** https://resend.com/api-keys
- **Environment:** Production, Preview, Development

#### TO_EMAIL (Required)
- **Variable Name:** `TO_EMAIL`
- **Value:** Your email address (e.g., `ethen@ethend.net`)
- **Purpose:** Receives contact form messages and subscription notifications
- **Environment:** Production, Preview, Development

#### RESEND_AUDIENCE_ID (Optional but Recommended)
- **Variable Name:** `RESEND_AUDIENCE_ID`
- **Value:** Your Audience ID (starts with `aud_`)
- **Get it from:** https://resend.com/audiences
- **Purpose:** Automatically adds subscribers to your Resend audience
- **Environment:** Production, Preview, Development

#### SITE_URL (Optional)
- **Variable Name:** `SITE_URL`
- **Value:** `https://ethend.net`
- **Purpose:** Used in notification emails for generating links
- **Environment:** Production, Preview, Development

#### ADMIN_TOKEN (Optional)
- **Variable Name:** `ADMIN_TOKEN`
- **Value:** Any random secure string (e.g., generate one at https://randomkeygen.com/)
- **Purpose:** Protects the manual notification endpoint
- **Environment:** Production, Preview, Development

### 3. After Adding Variables
1. Click **Save** for each variable
2. **Redeploy** your site:
   - Go to Deployments tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"
   - Choose "Use existing Build Cache"

## Testing the Fix

After redeploying with the environment variables:

1. **Test Subscription Form:**
   - Go to your blog page
   - Enter an email in the subscription form
   - Should see "Thanks for subscribing!" message

2. **Check Resend Dashboard:**
   - Go to https://resend.com/emails
   - You should see the welcome email sent

3. **If Still Getting Errors:**
   - Check Vercel Functions logs:
     - Go to Functions tab in Vercel
     - Click on `subscribe` function
     - View logs to see specific error

## Common Issues

### "Email service not configured"
- RESEND_API_KEY is missing or incorrect

### Subscription succeeds but no email received
- TO_EMAIL is not set or still has default value
- Check spam folder

### "Failed to add contact"
- RESEND_AUDIENCE_ID is incorrect
- Audience doesn't exist in Resend

## Quick Checklist
- [ ] RESEND_API_KEY added to Vercel
- [ ] TO_EMAIL set to your actual email
- [ ] Site redeployed after adding variables
- [ ] Resend account has API key with proper permissions
- [ ] (Optional) RESEND_AUDIENCE_ID added for auto-subscription
- [ ] (Optional) Domain verified in Resend for custom FROM email