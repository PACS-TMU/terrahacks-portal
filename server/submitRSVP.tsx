"use server";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function submitRSVP() {
    const supabase = await createClient();

    const user = await supabase.auth.getUser();
    if (!user) {
        return redirect('/login');
    }
    const userID = user.data.user!.id;
    
    console.log('submitRSVP called for user:', userID);

    const { data: userApplication, error: userApplicationError } = await supabase.from('applicant_details').select().eq('account_id', userID);

    if (userApplicationError) {
        console.error('Error fetching user application: ', userApplicationError);
    }

    if (!userApplication || userApplication.length === 0) {
        console.error('User has no application');
        return redirect('/dashboard?message=Error - Something went wrong. Please contact support if this issue persists.');
    }

    // Check if RSVP record exists
    const { data: existingRSVP, error: fetchError } = await supabase.from('rsvp').select('*').eq('account_id', userID);
    console.log('Existing RSVP record:', existingRSVP);
    console.log('About to update RSVP status to: Yes');
    
    const { error: updateError } = await supabase.from('rsvp').update({ status: 'Yes' }).eq('account_id', userID);

    if (updateError) {
        console.error('Error updating RSVP status: ', updateError);
        return redirect('/dashboard?message=Error - Something went wrong. Please contact support if this issue persists.');
    }

    console.log('RSVP update successful');
    return redirect('/dashboard');
}