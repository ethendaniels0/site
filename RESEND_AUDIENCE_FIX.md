# Fix: Resend Audience ID Format

## The Problem
The error "The `id` must be a valid UUID" means your `RESEND_AUDIENCE_ID` is in the wrong format.

## Getting the Correct Audience ID (UUID Format)

### Method 1: Via Resend API (Easiest)

1. Go to https://resend.com/api-keys
2. Copy your API key
3. Run this command in your terminal:

```bash
curl -X GET https://api.resend.com/audiences \
  -H "Authorization: Bearer YOUR_API_KEY_HERE"
```

4. You'll get a response like:
```json
{
  "data": [
    {
      "id": "78261eea-8f8b-4381-83c6-79fa7120f1cf",  // ← THIS IS YOUR UUID!
      "name": "Blog Subscribers"
    }
  ]
}
```

5. Copy the `id` value (the UUID format, NOT starting with `aud_`)

### Method 2: Browser Developer Tools

1. Go to https://resend.com/audiences
2. Open browser Developer Tools (F12)
3. Go to Network tab
4. Click on your audience name
5. Look for a network request to `/api/audiences/YOUR_UUID_HERE`
6. The UUID in that URL is what you need

### Method 3: Resend Dashboard Inspection

1. Go to https://resend.com/audiences
2. Click on your audience
3. Check the URL - it might show: `https://resend.com/audiences/YOUR_UUID_HERE`
4. If not, inspect the page source or network requests

## Update Your Environment Variable

Once you have the UUID (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`):

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Update `RESEND_AUDIENCE_ID` with the UUID value
3. It should look like: `78261eea-8f8b-4381-83c6-79fa7120f1cf`
4. NOT like: `aud_xxxxx`
5. Redeploy your site

## Quick Test

After updating, you can test directly:

```javascript
// This should work:
resend.contacts.create({
  email: 'test@example.com',
  audienceId: '78261eea-8f8b-4381-83c6-79fa7120f1cf'  // UUID format
});

// This will NOT work:
resend.contacts.create({
  email: 'test@example.com',
  audienceId: 'aud_abc123'  // Wrong format!
});
```

## If You Can't Find the UUID

As a temporary workaround, you can:

1. Remove the `RESEND_AUDIENCE_ID` from Vercel
2. The subscription form will fall back to emailing you new subscribers
3. You can manually add them to your audience

## Alternative: Create New Audience via API

```bash
curl -X POST https://api.resend.com/audiences \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "Newsletter Subscribers"}'
```

This will return a new audience with the UUID in the correct format.