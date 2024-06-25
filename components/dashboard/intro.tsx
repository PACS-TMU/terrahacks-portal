import Link from "next/link";
import Section from "./section";
import AcceptedSection from "./acceptedSection";

export default function Intro({ user, applicationStatus, formattedDeadline, rsvpStatus }:
    { user: any, applicationStatus: any, formattedDeadline: any, rsvpStatus: any }
) {
    return (
        <div className="md:sticky top-0 z-10 shrink-0 px-6 md:py-8 py-2 border-b-2 border-b-gray-300 bg-[#f7fafc]">
            <h1 className="text-xl md:text-4xl text-gray-800 font-bold font-sans">Your Home</h1>
            <p className="md:text-xl text-gray-400 md:mt-4 font-sans whitespace-pre-line">Welcome to your user dashboard!</p>
            <p className="text-gray-800 mt-2">Having trouble? Please contact us at through {" "}
                <a
                    aria-label="Send us an email"
                    href="mailto:contact@terrahacks.ca"
                    target="_blank"
                    rel="nooppener noreferrer"
                    className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
                >
                    Email
                </a>
                {" "} or get help in our support channels on {" "}
                <a
                    aria-label="Join our Discord server"
                    href="https://discord.gg/982AkBQea7"
                    target="_blank"
                    rel="nooppener noreferrer"
                    className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
                >
                    Discord
                </a>.
            </p>
            {!applicationStatus ? (
                <div className="bg-highlight text-background rounded-md my-2 md:mb-0 md:mt-4 font-sans p-2 flex flex-col justify-center items-center w-[90%] md:w-2/3 xl:w-1/2 mx-auto">
                    <p className="md:text-xl whitespace-pre-line text-center my-2">No application submitted yet!</p>
                    <p className="md:text-xl whitespace-pre-line text-center my-2">Deadline: <span className="font-semibold">{formattedDeadline}</span></p>
                    <Link
                        aria-label="Apply to TerraHacks"
                        href="/dashboard/application"
                        className="underline font-semibold text-background text-lg md:text-xl duration-300 ease-in-out hover:text-sky-400 my-2"
                    >
                        Apply Now!
                    </Link>
                </div>
            ) : (applicationStatus === "Under Review" ? (
                <p className="text-base md:text-lg text-gray-800 whitespace-pre-line my-2">We got your application! Review the details below.</p>
            ) : (applicationStatus === "Accepted" ? 
                (rsvpStatus === "Yes" ? (
                    <Section 
                        decision={"Congratulations, your RSVP has been recorded!"}
                        blurb={"We look forward to seeing you at TerraHacks in August! If you wish to rescind your RSVP, please contact us."}
                    />
                ) : ( rsvpStatus === "N/A" ? (
                        <AcceptedSection />
                    // If RSVP is rescinded, show the following message
                    ) : (
                        <Section
                            decision={"We're sorry to see you go! Your RSVP has been rescinded."}
                            blurb={"While we cannot guarantee you a spot, you can still attend as a walk-in. We hope to see you at TerraHacks next year, if not this one!"}
                        />
                    )
                )
            ) : (applicationStatus === "Rejected" ? (
                <Section
                    decision={"Thank you for applying to TerraHacks! Due to high demand, we had to reject your application."}
                    blurb={"Once again, we appreciate the time you took to apply. If you are still interested in participating, you can still attend as a walk-in, but we cannot guarantee you a spot. You can also apply to be a volunteer by emailing us!"}
                />
            ) : (applicationStatus === "Waitlisted" ? (
                <Section
                    decision={"Thank you for applying to TerraHacks! Due to high demand, we had to waitlist your application."}
                    blurb={"If spots free up, your application status will be updated accordingly. ALSO, while we cannot guarantee you a spot, you will have priority for walk-ins. We hope to see you at TerraHacks!"}
                />
            ) : (
                <p className="text-base md:text-lg text-gray-800 whitespace-pre-line my-2">Whoa, this shouldn't be here! Please contact support and help us fix this.</p>
            )))))}
        </div>
    );
}