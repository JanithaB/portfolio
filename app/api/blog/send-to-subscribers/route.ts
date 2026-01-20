import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { id, password } = await request.json();

    // Verify admin password
    const adminPassword = process.env.ADMIN_PASSWORD || 'your-secret-password';
    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    // Gmail SMTP Configuration
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { error: 'Gmail credentials not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD' },
        { status: 500 }
      );
    }

    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      return NextResponse.json(
        { error: 'Site URL not configured' },
        { status: 500 }
      );
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Get the blog post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .select('id, title, description, content, published_date')
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (postError || !post) {
      return NextResponse.json(
        { error: 'Blog post not found or not published' },
        { status: 404 }
      );
    }

    // Get all subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from('subscribers')
      .select('email, unsubscribe_token');

    if (subscribersError) {
      console.error('Supabase error:', subscribersError);
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { message: 'No subscribers to send to', successful: 0, failed: 0 },
        { status: 200 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const postUrl = `${siteUrl}/blog/${post.id}`;
    const excerpt = post.description || post.content.substring(0, 200) + '...';

    // Fetch daily quote from ZenQuotes
    let dailyQuote = { quote: '', author: '' };
    try {
      const quoteResponse = await fetch('https://zenquotes.io/api/today');
      if (quoteResponse.ok) {
        const quoteData = await quoteResponse.json();
        if (quoteData && quoteData[0]) {
          dailyQuote = {
            quote: quoteData[0].q || '',
            author: quoteData[0].a || '',
          };
        }
      }
    } catch (error) {
      console.error('Failed to fetch quote:', error);
    }

    // Email HTML template
    const emailHtml = (unsubscribeUrl: string) => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Developer Newsletter</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; background-color: #ffffff; color: #1f2937;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
              <tr>
                  <td style="padding: 0;">
                      <!-- Main container -->
                      <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
                          <!-- Header -->
                          <tr>
                              <td style="padding: 48px 24px 32px; border-bottom: 1px solid #e5e7eb;">
                                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                      <tr>
                                          <td style="padding-bottom: 8px;">
                                              <p style="margin: 0; font-size: 24px; font-weight: 600; color: #111827; letter-spacing: -0.5px;"><a href="${siteUrl}" target="_blank" style="color: #06b6d4; text-decoration: none;">Janitha.is-a.dev</a> Newsletter</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>
                                              ${dailyQuote.quote ? `
                                              <p style="margin: 0; font-size: 13px; color: #9ca3af; font-weight: 400; line-height: 1.6; font-style: italic; padding-top: 8px;">
                                                  "${dailyQuote.quote}"
                                              </p>
                                              ${dailyQuote.author ? `
                                              <p style="margin: 0; font-size: 11px; color: #9ca3af; font-weight: 400; padding-top: 4px; text-align: right;">
                                                  — ${dailyQuote.author}
                                              </p>
                                              ` : ''}
                                              ` : `
                                              <p style="margin: 0; font-size: 13px; color: #6b7280; font-weight: 500; letter-spacing: 0.5px;">Self-taught · Maker · Learner</p>
                                              `}
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>

                          <!-- Content -->
                          <tr>
                              <td style="padding: 40px 24px;">
                                  <!-- New Post Label -->
                                  <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                                      <tr>
                                          <td>
                                              <p style="margin: 0; font-size: 12px; font-weight: 600; color: #06b6d4; text-transform: uppercase; letter-spacing: 1px;">New Post</p>
                                          </td>
                                      </tr>
                                  </table>

                                  <!-- Post Title -->
                                  <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                                      <tr>
                                          <td>
                                              <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #111827; line-height: 1.3; letter-spacing: -0.5px;">${post.title}</h1>
                                          </td>
                                      </tr>
                                  </table>

                                  <!-- Excerpt -->
                                  <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                                      <tr>
                                          <td>
                                              <p style="margin: 0; font-size: 15px; color: #4b5563; line-height: 1.6;">${excerpt}</p>
                                          </td>
                                      </tr>
                                  </table>

                                  <!-- CTA Button -->
                                  <table role="presentation" style="border-collapse: collapse;">
                                      <tr>
                                          <td style="padding: 0;">
                                              <a href="${postUrl}" style="display: inline-block; padding: 12px 24px; background-color: #06b6d4; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 6px; letter-spacing: 0.3px;">Read the article →</a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>

                          <!-- Footer -->
                          <tr>
                              <td style="padding: 32px 24px; border-top: 1px solid #e5e7eb;">
                                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                      <!-- Subscription reason -->
                                      <tr>
                                          <td style="padding-bottom: 24px;">
                                              <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5;">You're receiving this because you subscribed to my newsletter. I share experiments, small coding projects, and learning adventures straight to your inbox.</p>
                                          </td>
                                      </tr>

                                      <!-- Unsubscribe & Footer note -->
                                      <tr>
                                          <td style="padding-top: 16px; border-top: 1px solid #e5e7eb;">
                                              <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
                                                  <a href="${unsubscribeUrl}" style="color: #6b7280; text-decoration: none; font-weight: 500;">Unsubscribe</a> · <span style="color: #9ca3af;">Shared from my coding journey</span>
                                              </p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `;

    // Send emails to all subscribers using Gmail SMTP
    const emailPromises = subscribers.map((subscriber) => {
      const unsubscribeUrl = `${siteUrl}/unsubscribe?token=${subscriber.unsubscribe_token || ''}`;
      
      return transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: subscriber.email,
        subject: `New Post: ${post.title}`,
        html: emailHtml(unsubscribeUrl),
      });
    });

    const results = await Promise.allSettled(emailPromises);
    const successful = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    return NextResponse.json(
      {
        message: `Newsletter sent to ${successful} subscribers`,
        successful,
        failed,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    );
  }
}
