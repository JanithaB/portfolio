import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, reactionType } = body;

    if (!postId || typeof postId !== 'string') {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    if (!reactionType || !['like', 'dislike'].includes(reactionType)) {
      return NextResponse.json(
        { error: 'Invalid reaction type. Must be "like" or "dislike"' },
        { status: 400 }
      );
    }

    // Use UPSERT to avoid race conditions
    // First try to insert, if conflict then increment
    const insertData = {
      post_id: postId,
      like_count: reactionType === 'like' ? 1 : 0,
      dislike_count: reactionType === 'dislike' ? 1 : 0,
    };

    const { data: insertResult, error: insertError } = await supabase
      .from('blog_post_metrics')
      .insert(insertData)
      .select('like_count, dislike_count')
      .single();

    if (insertError) {
      // If duplicate key (record exists), increment the appropriate count
      if (insertError.code === '23505') {
        const { data, error } = await supabase
          .from('blog_post_metrics')
          .select('like_count, dislike_count')
          .eq('post_id', postId)
          .single();

        if (error) {
          console.error('Fetch error:', error);
          return NextResponse.json(
            { error: 'Failed to fetch reaction counts' },
            { status: 500 }
          );
        }

        const updateData: { like_count?: number; dislike_count?: number; updated_at: string } = {
          updated_at: new Date().toISOString(),
        };

        if (reactionType === 'like') {
          updateData.like_count = (data.like_count || 0) + 1;
        } else {
          updateData.dislike_count = (data.dislike_count || 0) + 1;
        }

        const { error: updateError } = await supabase
          .from('blog_post_metrics')
          .update(updateData)
          .eq('post_id', postId);

        if (updateError) {
          console.error('Update error:', updateError);
          return NextResponse.json(
            { error: 'Failed to update reaction count' },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { 
            likes: updateData.like_count || data.like_count || 0, 
            dislikes: updateData.dislike_count || data.dislike_count || 0 
          },
          { status: 200 }
        );
      }

      // Other errors
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create reaction count' },
        { status: 500 }
      );
    }

    // Successfully inserted new record
    return NextResponse.json(
      { likes: insertResult.like_count || 0, dislikes: insertResult.dislike_count || 0 },
      { status: 200 }
    );
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
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Add timeout to prevent hanging (5 seconds)
    const fetchPromise = supabase
      .from('blog_post_metrics')
      .select('like_count, dislike_count')
      .eq('post_id', postId)
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
