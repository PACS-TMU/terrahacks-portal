import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Ticket from "@/components/ticket";
import Link from "next/link";

export default async function Team() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data: details, error } = await supabase.from("applications").select('rsvp').eq('account_id', user.id).single();

    if (error) {
        console.error(error);
        return redirect("/dashboard?error=An error occurred while fetching your application details.");
    }

    return (
        <>
            <div className="md:sticky top-0 z-10 shrink-0 px-6 md:py-8 py-2 border-b-2 border-b-gray-300 bg-[#f7fafc]">
                <h1 className="text-xl md:text-4xl text-gray-800 font-bold font-sans">TerraHacks Ticket</h1>
                <p className="md:text-xl text-gray-400 md:mt-4 font-sans whitespace-pre-line">You've been accepted, congratulations! Show this at check-in to get admitted.</p>
                <p className="text-gray-800 mt-2">If you already submitted and you would like to update your team, please contact us at {" "}
                    <a
                        aria-label="Send us an email"
                        href="mailto:contact@terrahacks.ca"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
                    >
                        contact@terrahacks.ca
                    </a>, or join our {" "}
                    <a
                        aria-label="Discord Server Link"
                        href="https://discord.gg/kTXWhTMs2f"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
                    >
                        Discord Server
                    </a> for the latest updates and information!
                </p>
            </div>
            {details.rsvp === 'N/A' ? (
                <div className="flex items-center justify-center w-11/12 md:w-3/4 lg:w-1/2 mx-auto my-[20vh] py-10 bg-highlight rounded-md shadow-sm">
                    <p className="text-xl text-background font-bold font-sans">
                        You have not RSVP'd yet. Please RSVP in the {" "}
                        <Link
                            href={'/dashboard'}
                            rel="noopener noreferrer"
                            className="text-gray-300 font-bold underline hover:text-gray-400 duration-300 ease-in-out">
                            dashboard
                        </Link> {" "}
                        to get your ticket.
                    </p>
                </div>
            ) : details.rsvp === 'Rescinded' ? (
                <div className="flex items-center justify-center w-11/12 md:w-3/4 lg:w-1/2 mx-auto my-[20vh] py-10 bg-highlight rounded-md shadow-sm">
                    <p className="text-xl text-background font-bold font-sans">
                        You RSVP has been rescinded. Please contact us if you think this is a mistake.
                    </p>
                </div>
            ) : (
                <div>
                    <Ticket user_id={user.id} />
                </div>
            )}
        </>
    );
}
