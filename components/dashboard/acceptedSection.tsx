import { SubmitButton } from "../forms/submit-button";
import submitRSVP from "@/server/submitRSVP";
import { createClient } from "@/utils/supabase/server";
import { useState } from "react";


export default async function AcceptedSection() {
    const maxRSVPs = 250;

    const supabase = createClient();
    const { count: yesCount, error } = await supabase.from("rsvp").select("status", { count: 'exact' })
        .eq("status", "yes");

    if (error) {
        console.error(error);
    }
    const [rsvpDisabled, setrsvpDisabled] = useState(yesCount !== null && yesCount >= maxRSVPs)
    // } else {
    //     console.log(`Total 'yes' in status column: ${rsvpData}`);
    // }

    return (
        <div className="bg-highlight text-background rounded-md my-2 md:mb-0 md:mt-4 font-sans p-2 flex flex-col justify-center items-center w-[90%] md:w-2/3 xl:w-1/2 mx-auto">
            <p className="md:text-xl whitespace-pre-line text-center my-2">Congratulations, you've been accepted!</p>
            <p className="md:text-xl whitespace-pre-line text-center my-2">RSVP below as soon as possible to guarantee yourself a spot. We look forward to seeing you in August!</p>
            <form>
                <SubmitButton
                    disabled={rsvpDisabled}
                    pendingText="RSVPing..."
                    aria-label="RSVP to TerraHacks 2024"
                    type="submit"
                    className="font-semibold bg-background p-3 rounded-md text-foreground text-lg md:text-xl duration-300 ease-in-out hover:bg-gray-200 my-4"
                    formAction={submitRSVP}
                >
                    {rsvpDisabled ? "RSVPs are full" : "RSVP Now!"}

                </SubmitButton>
            </form>
        </div>
    );
}