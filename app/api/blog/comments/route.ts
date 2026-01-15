import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
      .from('blog_comments')
      .select('id, author_name, content, parent_id, created_at')
      .eq('slug', slug)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { comments: data || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Comments fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Generate a random name
function generateRandomName(): string {
  const adjectives = [
    'Anonymous', 'Mysterious', 'Curious', 'Thoughtful', 'Creative', 'Wise',
    'Bold', 'Quiet', 'Bright', 'Swift', 'Calm', 'Eager', 'Gentle', 'Happy',
    'Kind', 'Lively', 'Peaceful', 'Proud', 'Sincere', 'Witty', 'Clever',
    'Daring', 'Friendly', 'Honest', 'Jolly', 'Noble', 'Optimistic', 'Radiant'
  ];
  
  const nouns = [
    'Reader', 'Explorer', 'Thinker', 'Writer', 'Learner', 'Dreamer',
    'Traveler', 'Observer', 'Student', 'Enthusiast', 'Adventurer', 'Scholar',
    'Wanderer', 'Seeker', 'Visionary', 'Innovator', 'Creator', 'Builder',
    'Pioneer', 'Champion', 'Hero', 'Warrior', 'Guardian', 'Sage', 'Master'
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 9999) + 1;
  
  return `${adjective} ${noun} ${number}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, author_name, content, parent_id } = body;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Generate random name if author_name is not provided or empty
    const finalAuthorName = (author_name && typeof author_name === 'string' && author_name.trim().length > 0)
      ? author_name.trim()
      : generateRandomName();

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      );
    }

    // Basic content length validation
    if (content.trim().length > 5000) {
      return NextResponse.json(
        { error: 'Comment is too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    // If parent_id is provided, validate it exists and belongs to the same slug
    if (parent_id) {
      if (typeof parent_id !== 'string' || parent_id.trim().length === 0) {
        return NextResponse.json(
          { error: 'Invalid parent_id format' },
          { status: 400 }
        );
      }

      const { data: parentComment, error: parentError } = await supabase
        .from('blog_comments')
        .select('id, slug')
        .eq('id', parent_id.trim())
        .single();

      if (parentError || !parentComment) {
        return NextResponse.json(
          { error: 'Parent comment not found' },
          { status: 400 }
        );
      }

      if (parentComment.slug !== slug) {
        return NextResponse.json(
          { error: 'Parent comment does not belong to this post' },
          { status: 400 }
        );
      }
    }

    const insertData: {
      slug: string;
      author_name: string;
      content: string;
      parent_id?: string;
    } = {
      slug,
      author_name: finalAuthorName,
      content: content.trim(),
    };

    if (parent_id) {
      insertData.parent_id = parent_id.trim();
    }

    const { data, error } = await supabase
      .from('blog_comments')
      .insert(insertData)
      .select('id, author_name, content, parent_id, created_at')
      .single();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json(
        { error: 'Failed to create comment' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { comment: data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Comment creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
