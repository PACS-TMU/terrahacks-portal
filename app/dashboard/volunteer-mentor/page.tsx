import { redirect } from "next/navigation";
import FormSelector from "@/components/dashboard/volunteer-mentor/formSelector";
import { createClient } from "@/utils/supabase/server"; // client-side

export default async function Volunteer() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <>
            <div className="md:sticky top-0 z-10 shrink-0 px-6 md:py-8 py-2 border-b-2 border-b-gray-300 bg-[#f7fafc]">
                <h1 className="text -xl md:text-4xl text-gray-800 font-bold font-sans">Volunteer</h1>
                <p className="md:text-xl text-gray-400 md:mt-4 font-sans whitespace-pre-line">Create a team of minimum 1 member (yourself) and up to 4 members!</p>
                <p className="text-gray-800 mt-2">If you already submitted an ou would like to update your team, please contact us at {" "}
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
                    </a>.
                </p>
            </div>
            <div className="mt-6">
                <h4 className="text-base md:text-xl font-bold mb-4 px-5">Volunteer/Mentor Form</h4>

                <FormSelector />
            </div>
        </>
    );
}

