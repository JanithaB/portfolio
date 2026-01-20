import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      description,
      content,
      publishedDate,
      isPublished,
      password,
    } = body;

    // Verify admin password
    const adminPassword = process.env.ADMIN_PASSWORD || 'your-secret-password';
    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!id || !title || !description || !content || !publishedDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update the blog post
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        title,
        description,
        content,
        published_date: publishedDate,
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      post: data,
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
