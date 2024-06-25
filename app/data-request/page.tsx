import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function DataRequest() {
    // Create a new Supabase client
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    // If the user is not logged in, redirect them to the login page
    if (!user) {
        return redirect('/login');
    }

    // If the user is logged in, redirect to /dashboard/data-request
    return redirect('/dashboard/data-request');
}