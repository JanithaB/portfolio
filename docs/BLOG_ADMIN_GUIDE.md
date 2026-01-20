# Blog Admin Panel Guide

## Overview

Your portfolio now includes a secret admin panel for managing blog posts directly from your website. Posts are stored in Supabase and support draft/publish workflow.

## Setup

### 1. Update Environment Variables

Add the admin password to your environment variables (`.env.local`):

```bash
# Admin access
ADMIN_PASSWORD=your-secure-password-here

# Gmail SMTP (for newsletters)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password

# Site URL (for email links)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Important:** 
- Choose a strong password and never commit it to version control!
- For Gmail, you need to create an "App Password" in your Google Account settings
- Set up 2-factor authentication in Gmail first, then generate an app password

### 2. Run Database Schema

Execute the updated schema in your Supabase SQL editor:

```sql
-- Located in: supabase/schema.sql
-- This creates the blog_posts table
```

## Admin Routes

### Main Admin Dashboard
**URL:** `/admin/blog`

- View all blog posts (published and drafts)
- Create new posts
- Edit existing posts
- Delete posts
- Toggle publish/draft status

### Create New Post
**URL:** `/admin/blog/new`

- Write new blog posts
- Generate slug from title
- Preview markdown content
- Save as draft or publish immediately

### Edit Post
**URL:** `/admin/blog/edit/[slug]`

- Edit existing post content
- Update metadata
- Change publish status

## Features

### 📝 Markdown Support
Write your posts in Markdown format with full support for:
- Headings
- Lists
- Code blocks
- Links
- Blockquotes
- And more...

### 🎨 Draft/Publish Workflow
- Save posts as drafts (not visible to public)
- Publish when ready
- Toggle between draft and published status

### 📧 Newsletter Integration
- **Manual sending**: Send any published post from the admin dashboard with the "📧 Send" button
- **Beautiful HTML emails**: Professional email template with daily quotes
- **Unsubscribe links**: All emails include unsubscribe functionality
- **Gmail SMTP**: Uses your Gmail account to send newsletters
- **Full control**: Newsletters are never sent automatically - you decide when to notify subscribers

### 🔒 Password Protection
- All admin routes are password-protected
- Password is verified server-side
- No database access without authentication

### 📅 Metadata Management
- Title
- Slug (URL)
- Description
- Published date
- Content

### 🔗 SEO-Friendly URLs
Posts are accessible at: `/blog/[slug]`

## Usage Flow

1. **Access Admin Panel**
   - Navigate to `/admin/blog`
   - Enter your admin password

2. **Create New Post**
   - Click "New Post"
   - Fill in title, description, and content
   - Use "Generate" button to create slug from title
   - Preview your markdown
   - Save as draft or publish

3. **Edit Existing Post**
   - From the admin dashboard, click "Edit"
   - Make your changes
   - Update and publish

4. **Manage Posts**
   - Toggle publish status
   - Send published posts to subscribers using the "📧 Send" button
   - Delete posts you no longer need
   - View all posts (drafts and published)

5. **Send Newsletters**
   - From dashboard: Click "📧 Send" button on any published post
   - Confirm to send to all subscribers
   - Status message shows how many subscribers received the email

## Blog Post Structure

```typescript
{
  slug: string;          // URL-friendly identifier
  title: string;         // Post title
  description: string;   // Brief description (meta description)
  content: string;       // Markdown content
  published_date: date;  // Publication date
  is_published: boolean; // Draft or published status
}
```

## Security Notes

1. **Password Protection:** All admin routes require password authentication
2. **Environment Variables:** Keep `ADMIN_PASSWORD` secret and secure
3. **RLS Policies:** Supabase Row Level Security ensures public users can only read published posts
4. **Server-Side Validation:** All mutations are validated on the server

## Tips

- **Slug Generation:** Use the "Generate" button to create SEO-friendly slugs
- **Preview Mode:** Use preview to see how your markdown will render
- **Draft First:** Save as draft to review before publishing
- **Date Control:** Set custom publish dates for scheduling (frontend always shows)
- **Markdown Writing:** Write in your favorite markdown editor and paste into the admin panel
- **Newsletter Strategy:** 
  - Don't send newsletters for minor updates or typo fixes
  - Use the "📧 Send" button for major posts or new content
  - Test by subscribing with your own email first
  - You can send any published post at any time to notify new subscribers

## Accessing Your Blog

- **Public Blog:** `/blog`
- **Individual Post:** `/blog/[slug]`
- **Admin Panel:** `/admin/blog` (secret - don't share!)

## Future Enhancements

Consider adding:
- Image upload functionality
- Tags/categories
- Search functionality
- Analytics integration
- Scheduled publishing
- Rich markdown editor
- Multiple admin users
- Revision history

## Troubleshooting

**"Unauthorized" error:**
- Check your `.env.local` file
- Ensure `ADMIN_PASSWORD` is set correctly
- Restart your development server

**Posts not showing:**
- Verify the post is published (`is_published = true`)
- Check Supabase connection
- Clear blog cache by restarting the server

**Slug conflicts:**
- Each slug must be unique
- Use the generate button or manually create unique slugs

**Newsletter not sending:**
- Check Gmail credentials in `.env.local`
- Verify you're using an App Password (not your regular password)
- Ensure the post is published (drafts can't be sent)
- Check server logs for detailed error messages

**No subscribers receiving emails:**
- Verify subscribers exist in Supabase `subscribers` table
- Check spam folders
- Test with your own email first

---

## Newsletter System

Your blog posts can be automatically sent to subscribers via email:

- **Powered by Gmail SMTP**: Uses your Gmail account to send professional newsletters
- **Beautiful Templates**: Each email includes a daily inspirational quote and your post excerpt
- **Subscriber Management**: Automatic unsubscribe links in every email
- **Flexible Sending**: Send on publish or manually send any published post later

The newsletter email includes:
- Post title and description
- Link to read full article
- Daily quote (from ZenQuotes API)
- Unsubscribe link
- Professional formatting

---

Enjoy your new blog management system with integrated newsletter! 🚀
