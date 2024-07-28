import { SubmitButton } from "../forms/submit-button";
import submitRSVP from "@/server/submitRSVP";
import { createClient } from "@/utils/supabase/server";


export default async function AcceptedSection() {
    const maxRSVPs = 250;

    const supabase = createClient();
    const { count: yesCount, error } = await supabase.from("rsvp").select("status", { count: 'exact' })
        .eq("status", "yes");

    if (error) {
        console.error(error);
    }
    const rsvpDisabled = (yesCount !== null && yesCount >= maxRSVPs)

    return (
        <div className="bg-highlight text-background rounded-md my-2 md:mb-0 md:mt-4 font-sans p-2 flex flex-col justify-center items-center w-[90%] md:w-2/3 xl:w-1/2 mx-auto">

            <p className="md:text-xl whitespace-pre-line text-center my-2">
                Congratulations, you've been accepted!
                <br />
                {rsvpDisabled ?
                    "We are very sorry. Our RSVPs are now full." :
                    "RSVP below as soon as possible to guarantee yourself a spot. We look forward to seeing you in August!"
                }
            </p>


            <form>
                <SubmitButton
                    disabled={rsvpDisabled}
                    pendingText="RSVPing..."
                    aria-label="RSVP to TerraHacks 2024"
                    type="submit"
                    className={`font-semibold  p-3 rounded-md text-foreground text-lg md:text-xl duration-300 ease-in-out ${rsvpDisabled ? 'bg-gray-500' : 'bg-background hover:bg-gray-200'}  my-4`}
                    formAction={submitRSVP}
                >
                    {rsvpDisabled ? "RSVPs are full" : "RSVP Now!"}

                </SubmitButton>
            </form>
        </div>
    );
}