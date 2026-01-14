import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token && !email) {
      return NextResponse.json(
        { error: 'Token or email is required' },
        { status: 400 }
      );
    }

    const { data: subscriber, error: findError } = token
      ? await supabase
          .from('subscribers')
          .select('id')
          .eq('unsubscribe_token', token)
          .maybeSingle()
      : await supabase
          .from('subscribers')
          .select('id')
          .eq('email', email!.trim().toLowerCase())
          .maybeSingle();

    if (findError) {
      console.error('Find error:', findError);
      return NextResponse.json(
        { error: `Database error: ${findError.message}` },
        { status: 500 }
      );
    }

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    const { error: deleteError } = await supabase
      .from('subscribers')
      .delete()
      .eq('id', subscriber.id);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully unsubscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
