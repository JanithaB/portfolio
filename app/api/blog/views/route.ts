import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Check if metrics record exists
    const { data: existing } = await supabase
      .from('blog_post_metrics')
      .select('id, view_count')
      .eq('slug', slug)
      .single();

    if (existing) {
      // Increment existing count
      const { data, error } = await supabase
        .from('blog_post_metrics')
        .update({
          view_count: (existing.view_count || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select('view_count')
        .single();

      if (error) {
        console.error('Update error:', error);
        return NextResponse.json(
          { error: 'Failed to update view count' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { view_count: data.view_count },
        { status: 200 }
      );
    } else {
      // Create new metrics record
      const { data, error } = await supabase
        .from('blog_post_metrics')
        .insert({
          slug,
          view_count: 1,
        })
        .select('view_count')
        .single();

      if (error) {
        console.error('Insert error:', error);
        return NextResponse.json(
          { error: 'Failed to create view count' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { view_count: data.view_count },
        { status: 200 }
      );
    }
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
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('blog_post_metrics')
      .select('view_count')
      .eq('slug', slug)
      .single();

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
    console.error('View count fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
