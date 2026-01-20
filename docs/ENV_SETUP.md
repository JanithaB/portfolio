# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Blog Admin Password (REQUIRED for admin panel)
ADMIN_PASSWORD=your-secure-admin-password

# Gmail SMTP (for newsletters)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password

# Site URL (for email links)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Newsletter API Key (for external newsletter trigger)
NEWSLETTER_API_KEY=your-newsletter-api-key
```

## Important Notes

### ADMIN_PASSWORD
- **REQUIRED** to access `/admin/blog` routes
- Choose a strong password (minimum 12 characters recommended)
- **Never commit this to git** - `.env.local` is already in `.gitignore`
- After setting/changing this, **restart your development server**

### Setting up Gmail for Newsletters

1. Enable 2-Factor Authentication in your Google Account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate an "App Password" for Mail
4. Copy the 16-character password (no spaces)
5. Set `GMAIL_APP_PASSWORD` to this value

### After Setting Environment Variables

**Important:** You must restart your Next.js development server for changes to take effect:

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
# or
pnpm dev
```

## Troubleshooting

### "Cannot log in to admin panel"
1. Make sure `ADMIN_PASSWORD` is set in `.env.local`
2. Restart your development server
3. Check for typos in the password
4. Make sure there are no extra spaces around the password value

### "Admin password not configured"
- The environment variable is not being read
- Restart your development server
- Check that the file is named `.env.local` (not `.env` or `.env.local.txt`)

### "Authentication failed"
- Server might not be running
- Check browser console for errors
- Try refreshing the page
