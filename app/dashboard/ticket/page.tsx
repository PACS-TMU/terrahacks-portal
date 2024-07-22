import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Ticket from "@/components/ticket";

export default async function Team() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
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
            <div>
                <Ticket user_id={user.id} />
            </div>
        </>
    );
}
