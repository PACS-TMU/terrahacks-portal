'use server'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function dataRequest(formData: FormData) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const rawFormData = {
        account_id: user?.id,
        type: formData.get('request-type') as string,
        description: formData.get('description') as string,
    }
    const { error } = await supabase.from('data_request').insert([rawFormData]);
    if (error) {
        return redirect(`/dashboard/data-request?message=Error - ${error.message}`);
    }
    return redirect(`/dashboard/data-request?message=Request submitted successfully!`);
}