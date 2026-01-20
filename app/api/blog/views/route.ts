import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId || typeof postId !== 'string') {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Use UPSERT to avoid race conditions
    // First try to insert, if conflict then increment
    const { data: insertData, error: insertError } = await supabase
      .from('blog_post_metrics')
      .insert({
        post_id: postId,
        view_count: 1,
      })
      .select('view_count')
      .single();

    if (insertError) {
      // If duplicate key (record exists), increment the count
      if (insertError.code === '23505') {
        const { data, error } = await supabase
          .from('blog_post_metrics')
          .select('view_count')
          .eq('post_id', postId)
          .single();

        if (error) {
          console.error('Fetch error:', error);
          return NextResponse.json(
            { error: 'Failed to fetch view count' },
            { status: 500 }
          );
        }

        const newCount = (data.view_count || 0) + 1;

        const { error: updateError } = await supabase
          .from('blog_post_metrics')
          .update({
            view_count: newCount,
            updated_at: new Date().toISOString(),
          })
          .eq('post_id', postId);

        if (updateError) {
          console.error('Update error:', updateError);
          return NextResponse.json(
            { error: 'Failed to update view count' },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { view_count: newCount },
          { status: 200 }
        );
      }

      // Other errors
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create view count' },
        { status: 500 }
      );
    }

    // Successfully inserted new record
    return NextResponse.json(
      { view_count: insertData.view_count },
      { status: 200 }
    );
  } catch (error) {
    console.error('View count error:', error);
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
      .select('view_count')
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
          { error: 'Failed to fetch view count' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { view_count: data?.view_count || 0 },
        { status: 200 }
      );
    } catch (error) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      console.error('View count fetch error:', error);
      // Return default value on timeout/error so page doesn't break
      return NextResponse.json(
        { view_count: 0 },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('View count fetch error:', error);
    // Return default value on timeout/error so page doesn't break
    return NextResponse.json(
      { view_count: 0 },
      { status: 200 }
    );
  }
}
