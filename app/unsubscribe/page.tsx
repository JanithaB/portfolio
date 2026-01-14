import { supabase } from '@/lib/supabase';

interface PageProps {
  searchParams: {
    token?: string;
    email?: string;
  };
}

async function UnsubscribeAction({ token, email }: { token?: string; email?: string }) {
  'use server';

  if (!token && !email) {
    return { success: false, message: 'Token or email is required' };
  }

  try {
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase configuration missing');
      return { success: false, message: 'Server configuration error' };
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
      return { success: false, message: `Database error: ${findError.message}` };
    }

    if (!subscriber) {
      return { success: false, message: 'Subscriber not found' };
    }

    const { error: deleteError } = await supabase
      .from('subscribers')
      .delete()
      .eq('id', subscriber.id);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return { success: false, message: `Failed to unsubscribe: ${deleteError.message}` };
    }

    return { success: true, message: 'Successfully unsubscribed' };
  } catch (error) {
    console.error('Unsubscribe catch error:', error);
    return { success: false, message: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}

export default async function UnsubscribePage({ searchParams }: PageProps) {
  const token = searchParams?.token;
  const email = searchParams?.email;

  if (!token && !email) {
    return (
      <div className="bg-slate-900 min-h-screen text-slate-200 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-slate-100 mb-4">Invalid Link</h1>
          <p className="text-slate-400">This unsubscribe link is invalid.</p>
        </div>
      </div>
    );
  }

  const result = await UnsubscribeAction({ token, email });

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {result.success ? (
          <>
            <div className="mb-6">
              <svg
                className="w-16 h-16 text-teal-300 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-100 mb-4">
              Successfully Unsubscribed
            </h1>
            <p className="text-slate-400 mb-6">
              You have been removed from our mailing list. You will no longer receive email updates.
            </p>
            <a
              href="/blog"
              className="text-teal-300 hover:text-teal-200 underline"
            >
              Back to Blog
            </a>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-slate-100 mb-4">
              Unsubscribe Failed
            </h1>
            <p className="text-slate-400 mb-6">{result.message}</p>
            <a
              href="/blog"
              className="text-teal-300 hover:text-teal-200 underline"
            >
              Back to Blog
            </a>
          </>
        )}
      </div>
    </div>
  );
}
