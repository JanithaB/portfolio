import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { id, isPublished, password } = await request.json();

    // Verify admin password
    const adminPassword = process.env.ADMIN_PASSWORD || 'your-secret-password';
    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!id || typeof isPublished !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid parameters' },
        { status: 400 }
      );
    }

    // Update publish status
    const { error } = await supabase
      .from('blog_posts')
      .update({ is_published: isPublished })
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update publish status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Post ${isPublished ? 'published' : 'unpublished'} successfully`,
    });
  } catch (error) {
    console.error('Error toggling publish status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
