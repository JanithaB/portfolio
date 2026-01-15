import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, reactionType } = body;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    if (!reactionType || !['like', 'dislike'].includes(reactionType)) {
      return NextResponse.json(
        { error: 'Invalid reaction type. Must be "like" or "dislike"' },
        { status: 400 }
      );
    }

    // Check if metrics record exists
    const { data: existing } = await supabase
      .from('blog_post_metrics')
      .select('id, like_count, dislike_count')
      .eq('slug', slug)
      .single();

    if (existing) {
      // Update existing record
      const updateData: { like_count?: number; dislike_count?: number; updated_at: string } = {
        updated_at: new Date().toISOString(),
      };

      if (reactionType === 'like') {
        updateData.like_count = (existing.like_count || 0) + 1;
      } else {
        updateData.dislike_count = (existing.dislike_count || 0) + 1;
      }

      const { data, error } = await supabase
        .from('blog_post_metrics')
        .update(updateData)
        .eq('id', existing.id)
        .select('like_count, dislike_count')
        .single();

      if (error) {
        console.error('Update error:', error);
        return NextResponse.json(
          { error: 'Failed to update reaction count' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { likes: data.like_count || 0, dislikes: data.dislike_count || 0 },
        { status: 200 }
      );
    } else {
      // Create new metrics record
      const insertData = {
        slug,
        like_count: reactionType === 'like' ? 1 : 0,
        dislike_count: reactionType === 'dislike' ? 1 : 0,
      };

      const { data, error } = await supabase
        .from('blog_post_metrics')
        .insert(insertData)
        .select('like_count, dislike_count')
        .single();

      if (error) {
        console.error('Insert error:', error);
        return NextResponse.json(
          { error: 'Failed to create reaction count' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { likes: data.like_count || 0, dislikes: data.dislike_count || 0 },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Reaction error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Add timeout to prevent hanging (5 seconds)
    const fetchPromise = supabase
      .from('blog_post_metrics')
      .select('like_count, dislike_count')
      .eq('slug', slug)
      .single();

    let timeoutId: NodeJS.Timeout | null = null;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('Request timeout'));
      }, 5000);
    });

    try {
      const result = await Promise.race([fetchPromise, timeoutPromise]);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const { data, error } = result;

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "not found" which is okay
        console.error('Fetch error:', error);
        return NextResponse.json(
          { error: 'Failed to fetch reactions' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { likes: data?.like_count || 0, dislikes: data?.dislike_count || 0 },
        { status: 200 }
      );
    } catch (error) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      console.error('Reaction fetch error:', error);
      // Return default values on timeout/error so page doesn't break
      return NextResponse.json(
        { likes: 0, dislikes: 0 },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Reaction fetch error:', error);
    // Return default values on timeout/error so page doesn't break
    return NextResponse.json(
      { likes: 0, dislikes: 0 },
      { status: 200 }
    );
  }
}
