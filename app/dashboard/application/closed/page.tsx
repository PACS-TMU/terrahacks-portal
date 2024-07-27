import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Closed() {
    // Create a new Supabase server client
    const supabase = createClient();

    // Make sure the user is authenticated
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // Check if the user has already submitted an application
    const { data: appliedData, error } = await supabase.from("users").select("applied").eq("id", user.id);

    if (error) {
        console.error("Error fetching application: ", error);
    }

    // If the user has already applied, redirect them to the applied endpoint
    const applicationStatus = appliedData?.[0]?.applied;
    if (applicationStatus === "Applied") {
        return redirect("/dashboard/application/applied");
    }

    return (
        <div className="flex flex-col justify-center items-center w-11/12 lg:w-1/2 min-h-[50vh] my-4 mx-auto">
            <div className="bg-highlight p-6 lg:p-12 rounded-md shadow-md">
                <h1 className="text-2xl lg:text-4xl text-center font-semibold text-primary text-background mb-8">Applications for TerraHacks 2024 Are Now <span className="text-red-400">Closed!</span></h1>
                <p className="lg:text-lg text-center text-background font-mono">
                    Thank you to everyone who applied! <br /> We appreciate your interest and enthusiasm.
                    If you have any questions or concerns, please don't hesitate to contact us
                    at <a href="mailto:contact@terrahacks.ca" className="underline hover:text-gray-400 ease-in-out duration-300">contact@terrahacks.ca</a>.
                </p>
            </div>
        </div>
    )
}

