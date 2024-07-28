import { SubmitButton } from "../forms/submit-button";
import submitRSVP from "@/server/submitRSVP";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AcceptedSection() {
    const maxRSVPs = 250;

    const supabase = createClient();
    const { count: yesCount, error } = await supabase.from("applications").select("rsvp", { count: 'exact' })
        .eq("rsvp", "Yes");

    if (error) {
        console.error(error);
        return redirect("/dashboard?message=Error - Error retrieving RSVP data, please contact support if issue persists.");
    }
    const rsvpDisabled = (yesCount !== null && yesCount >= maxRSVPs);

    return (
        <div className="bg-highlight text-background rounded-md my-2 md:mb-0 md:mt-4 font-sans p-2 flex flex-col justify-center items-center w-[90%] md:w-2/3 xl:w-1/2 mx-auto">

            <p className="md:text-xl whitespace-pre-line text-center my-2">
                Congratulations, you've been accepted!
            </p>
            <p className="md:text-xl whitespace-pre-line text-center my-2">
                {rsvpDisabled ?
                    "Unfortunately, the RSVP period has ended. Please contact us if you have any questions." :
                    "RSVP below as soon as possible to guarantee yourself a spot. \nWe look forward to seeing you in August!"
                }
            </p>

            <form>
                <SubmitButton
                    disabled={rsvpDisabled}
                    pendingText="RSVPing..."
                    aria-label="RSVP to TerraHacks 2024"
                    type="submit"
                    className={`font-semibold  p-3 rounded-md text-foreground text-lg md:text-xl duration-300 ease-in-out ${rsvpDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-background hover:bg-gray-200'}  my-4`}
                    formAction={submitRSVP}
                >
                    {rsvpDisabled ? "RSVP period has ended :(" : "RSVP Now!"}
                </SubmitButton>
            </form>
        </div>
    );
}