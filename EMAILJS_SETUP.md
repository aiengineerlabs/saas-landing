# EmailJS Setup Guide

This guide will help you set up automatic email sending for your contact form.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Copy the **Service ID** (e.g., `service_xxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Configure the template fields:

**Email Settings (Right Side):**
- **To Email**: `hao.hoang.ai@gmail.com`
- **From Name**: `{{name}}` (this will use the sender's name)
- **From Email**: Check "Use Default Email Address" (your EmailJS connected email)
- **Reply To**: `{{email}}` (this will use the sender's email)

**Subject:**
```
AI Engineer Labs - {{service}} Inquiry from {{from_name}}
```

**Content:**
```
Hello Hao,

You have received a new inquiry from your website:

Name: {{from_name}}
Email: {{from_email}}
Service: {{service}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

**Important:** Make sure the variable names match exactly:
- `{{name}}` for From Name field
- `{{email}}` for Reply To field  
- `{{from_name}}`, `{{from_email}}`, `{{service}}`, `{{message}}`, `{{reply_to}}` for content

4. Click **Save** and copy the **Template ID** (e.g., `template_xxxxx`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `xxxxxxxxxxxxx`)

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in the root directory (if it doesn't exist)
2. Add these variables:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual IDs from EmailJS

## Step 6: Restart Development Server

After adding environment variables, restart your dev server:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Testing

1. Fill out the contact form on your website
2. Click "Send Message"
3. Check your email inbox - you should receive the message automatically!

## Troubleshooting

- **"Failed to send message"**: Check that all environment variables are set correctly
- **Email not received**: Check spam folder, verify EmailJS service is connected
- **Rate limit**: Free tier is 200 emails/month, upgrade if needed

## Alternative: Fallback Email

If EmailJS isn't configured, the form will show an error with a fallback email address. Users can still contact you directly at `hao.hoang.ai@gmail.com`.
