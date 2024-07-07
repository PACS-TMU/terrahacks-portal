import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ApplicationForm from "@/components/dashboard/application/applicationForm";
import ApplicationError from "@/components/dashboard/application/applicationError";

export default async function Application({ searchParams }: { searchParams: {page: string, message: string } }) {

    // Check that the user is authenticated
    const supabase = createClient();

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

    
    if (!appliedData || appliedData.length === 0) {
        return redirect("/dashboard/application?page=1");
    }

    // If the user has already applied, redirect them to the application status page
    const applicationStatus = appliedData[0].applied;
    if (applicationStatus === "Applied") {
        return redirect("/dashboard/application/applied");
    }

    return (
        <>
            <ApplicationForm />
            {searchParams?.message && (
                <ApplicationError key={Date.now()} searchParams={searchParams} />
            )}
        </>
        
    );
}