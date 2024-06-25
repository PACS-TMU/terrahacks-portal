import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import dataRequest from '@/server/request-data';

export default async function DataRequest(formData: FormData) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    return (
        <>
            <div className="md:sticky top-0 z-10 shrink-0 px-6 md:py-8 py-2 border-b-2 border-b-gray-300 bg-[#f7fafc]">
                <h1 className="text-xl md:text-4xl text-gray-800 font-bold font-sans">Got Questions?</h1>
                <p className="md:text-xl text-gray-400 md:mt-4 font-sans whitespace-pre-line">Our team is happy to help you in any way we can! </p>
                <p className="text-gray-800 mt-2">The best way to get a fast response to your inquiries is to email us at {" "}

                    <a
                        aria-label="Send us an email"
                        href="mailto:contact@terrahacks.ca"
                        target="_blank"
                        rel="nooppener noreferrer"
                        className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
                    >
                        contact@terrahacks.ca
                    </a>!
                </p>
            </div>
            <form action={dataRequest}>
                <label htmlFor="request-type">Request Type</label>
                <select name="request-type">
                    <option value="view">View</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                </select>
                <label htmlFor="description">Description</label>
                <textarea name="description"></textarea>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}