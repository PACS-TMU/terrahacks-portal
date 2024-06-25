'use server'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function dataRequest(formData: FormData) {
    // Create a Supabase client
    const supabase = createClient();

    // Get the user from the session
    const { data: { user } } = await supabase.auth.getUser();

    // Get the form data
    const rawFormData = {
        account_id: user?.id,
        type: formData.get('request-type') as string,
        description: formData.get('description') as string,
    }

    // Insert into the data_request table
    const { error } = await supabase.from('data_request').insert([rawFormData]);

    if (error) {
        return redirect(`/dashboard/data-request?message=Error - ${error.message}`);
    }

    // Redirect to the data request page with a success message
    return redirect(`/dashboard/data-request?message=Request submitted successfully!`);
}