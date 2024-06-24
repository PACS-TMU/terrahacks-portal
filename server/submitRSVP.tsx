"use server";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function submitRSVP() {
    // Create a supabase server client
    const supabase = createClient();

    // Get the user's id
    const user = await supabase.auth.getUser();
    if (!user) {
        return redirect('/login');
    }
    const userID = user.data.user!.id;

    // Get the user's application
    const { data: userApplication, error: userApplicationError } = await supabase.from('applications').select().eq('account_id', userID);

    if (userApplicationError) {
        console.error('Error fetching user application: ', userApplicationError);
    }

    if (!userApplication || userApplication.length === 0) {
        console.error('User has no application');
        return redirect('/dashboard?message=Error - Something went wrong. Please contact support if this issue persists.');
    }

    // Update the user's RSVP status
    const { error: updateError } = await supabase.from('applications').update({ rsvp: 'Yes' }).eq('account_id', userID);

    if (updateError) {
        console.error('Error updating RSVP status: ', updateError);
        return redirect('/dashboard?message=Error - Something went wrong. Please contact support if this issue persists.');
    }

    return redirect('/dashboard');
}