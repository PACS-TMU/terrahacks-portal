import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import dataRequest from '@/server/dataRequest';
import { SubmitButton } from '@/components/forms/submit-button';
import ErrorMessage from '@/components/auth/error-message';

export default async function DataRequest({ searchParams }: { searchParams: { message: string } }) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    return (
        <>
            <div className="md:sticky top-0 z-10 shrink-0 px-6 md:py-8 py-2 border-b-2 border-b-gray-300 bg-[#f7fafc]">
                <h1 className="text-xl md:text-4xl text-gray-800 font-bold font-sans">Data Request Form</h1>
                <p className="md:text-xl text-gray-400 md:mt-4 font-sans whitespace-pre-line">
                    You can request to view/edit/delete your user data here.
                </p>
                <p className="text-gray-800 mt-2">If you have any questions or concers email us at {" "}

                    <a
                        aria-label="Send us an email"
                        href="mailto:contact@terrahacks.ca"
                        target="_blank"
                        rel="nooppener noreferrer"
                        className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
                    >
                        contact@terrahacks.ca
                    </a>! You can review our privacy policy {" "}
                    <a
                        aria-label="View our privacy policy"
                        href="/assets/privacy-policy.pdf"
                        target='_blank'
                        className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
                    >
                        here
                    </a>.
                </p>
            </div>
            <form className='flex flex-col mx-auto w-11/12 md:w-3/4 xl:w-1/2 gap-6 bg-highlight p-4 font-medium rounded-md shadow-sm m-4'>
                <h1 className='text-background font-semibold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl'>Data Request Form</h1>
                <div className='flex flex-col'>
                    <label
                        htmlFor="request-type"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        Request Type
                    </label>
                    <select
                        id="request-type"
                        name="request-type"
                        className="rounded-md px-4 py-2 bg-background mb-4 w-full"
                        defaultValue={""}
                    >
                        <option value="" disabled>-- Select --</option>
                        <option value="view">View my data</option>
                        <option value="edit">Edit my data</option>
                        <option value="delete">Delete my data</option>
                    </select>
                </div>

                <div className='flex flex-col'>
                    <label
                        htmlFor="description"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="rounded-md px-4 py-2 bg-background min-h-[20vh] mb-4 placeholder-gray-400"
                    />
                </div>

                <SubmitButton
                    formAction={dataRequest}
                    className="bg-btn py-4 px-12 w-11/12 md:w-3/4 xl:w-1/2 mx-auto rounded-md text-background font-bold cursor-pointer hover:bg-btnHover transition ease-in-out duration-300'"
                    pendingText="Requesting..."
                    type="submit"
                >
                    Submit
                </SubmitButton>
            </form>
            {searchParams.message && 
                <div className='flex flex-col mx-auto justify-center items-center'>
                    <ErrorMessage searchParams={searchParams} />
                </div>
            }
        </>
    );
}