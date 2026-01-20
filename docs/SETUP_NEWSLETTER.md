# Quick Setup Guide - Blog with Newsletter

## Step 1: Environment Variables

Add these to your `.env.local`:

```bash
# Admin Panel Access
ADMIN_PASSWORD=choose-a-strong-password

# Gmail for Newsletters
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Already have these
NEXT_PUBLIC_SITE_URL=your-site-url
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Step 2: Setup Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Security → 2-Step Verification (enable if not already)
3. Security → App passwords
4. Generate new app password for "Mail"
5. Copy the 16-character password
6. Add it to `GMAIL_APP_PASSWORD` in `.env.local`

## Step 3: Run Database Schema

Execute `supabase/schema.sql` in your Supabase SQL editor. This creates the `blog_posts` table.

## Step 4: Start Using

1. Navigate to `/admin/blog`
2. Enter your admin password
3. Create your first blog post
4. Publish the post
5. Click "📧 Send" to notify subscribers

## Quick Commands

- **Admin Panel**: `http://localhost:3000/admin/blog`
- **Create Post**: `/admin/blog/new`
- **Edit Post**: `/admin/blog/edit/[slug]`
- **Public Blog**: `/blog`

## Features at a Glance

✅ Create/Edit/Delete blog posts  
✅ Draft/Publish workflow  
✅ Markdown content support  
✅ Manually send any published post to subscribers
✅ Beautiful HTML email templates  
✅ Auto-generated SEO-friendly slugs  
✅ Preview markdown before publishing  

## Newsletter Flow

### Send Post to Subscribers:
1. Create and publish your post
2. Go to `/admin/blog`
3. Find the published post
4. Click "📧 Send" button
5. Confirm to send to all subscribers
6. All subscribers receive the email

## Email Template Includes:
- Your site branding
- Daily inspirational quote
- Post title and excerpt
- "Read article" CTA button
- Unsubscribe link
- Professional formatting

## Testing

1. Subscribe to your newsletter with your own email
2. Create a test blog post
3. Publish the post
4. Click the "📧 Send" button
5. Check your inbox!

---

Need help? Check `BLOG_ADMIN_GUIDE.md` for detailed documentation.
