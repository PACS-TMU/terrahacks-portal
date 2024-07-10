import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Location() {
    // Check if user is logged in
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <>
            <div className="md:sticky top-0 z-10 shrink-0 px-6 md:py-8 py-2 border-b-2 border-b-gray-300 bg-[#f7fafc]">
                <h1 className="text-xl md:text-4xl text-gray-800 font-bold font-sans">TerraHacks Location</h1>
                <p className="md:text-xl text-gray-400 md:mt-4 font-sans whitespace-pre-line">Where is TerraHacks 2024 being held? Come find out!</p>
                <p className="text-gray-800 mt-2">If you have any questions or concerns, email us at {" "}
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
            <div className="location flex justify-center flex-col items-center">
                <div className="relative w-full h-[48vh] pb-[56.25%] md:border">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.559043218735!2d-79.38023022400728!3d43.65734187110187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb1f598a874b%3A0x77ca8c24305f659b!2sDaphne%20Cockwell%20Complex%20(DCC)!5e0!3m2!1sen!2sca!4v1720587186713!5m2!1sen!2sca"
                        className="absolute top-0 left-0 w-full h-full"
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                <button className="my-4 bg-highlight font-bold text-background p-3 rounded-md shadow-sm hover:scale-105 duration-300 ease-in-out">
                    <a
                        href="https://maps.app.goo.gl/rZeLMrHJStGbWhAq6"
                        aria-label='Open Location in Google Maps'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open in Google Maps
                    </a>
                </button>
            </div>
        </>
    );
}