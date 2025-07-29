import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    const supabase = await createClient();

    // Get the user from the auth session
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
        return NextResponse.json({ success: false, error: userError.message }, { status: 401 });
    }

    const userId = userData.user.id;

    // Fetch the application status for the user
    const { data: rsvpData, error: applicationError } = await supabase
        .from('rsvp')
        .select('*')
        .eq('account_id', userId)
        .single();

    if (!rsvpData || rsvpData.length === 0) {
        return NextResponse.json({ applicationStatus: "Not Applied", success: true });
    }

    if (applicationError) {
        return NextResponse.json({ success: false, error: applicationError.message }, { status: 400 });
    }

    return NextResponse.json({ status: rsvpData.status, success: true });
}
