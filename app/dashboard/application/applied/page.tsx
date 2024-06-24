import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Applied() {
    // Create a new Supabase server client
    const supabase = createClient();

    // Make sure the user is authenticated
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // Check if user has submitted an application
    const { data: application, error } = await supabase.from("applications").select().eq("account_id", user.id);

    if (error) {
        console.error("Error fetching application: ", error);
    }

    if (!application || application.length === 0) {
        return redirect("/dashboard/application?page=1");
    }

    return (
        <div className="flex flex-col justify-center items-center w-11/12 lg:w-1/2 min-h-[50vh] my-4 mx-auto">
            <div className="bg-highlight p-6 lg:p-12 rounded-md shadow-md">
                <h1 className="text-2xl lg:text-4xl text-center font-semibold text-primary text-background mb-8">Thank you for applying to TerraHacks 2024!</h1>
                <p className="lg:text-lg text-center text-background font-mono">
                    Your application has been recieved!
                    If you have any questions or concerns, please don't hesitate to contact us
                    at <a href="mailto:contact@terrahacks.ca" className="underline hover:text-gray-400 ease-in-out duration-300">contact@terrahacks.ca</a>.
                </p>
                <p className="lg:text-lg text-center text-background font-mono mt-4">
                    Your application details can be found on 
                    the <Link href={`/dashboard`} aria-label="Redirect to homepage" className="underline hover:text-gray-400 ease-in-out duration-300">homepage</Link> of 
                    your dashboard. We look forward to reviewing your application! Good luck!
                </p>
            </div>
        </div>
    )
}