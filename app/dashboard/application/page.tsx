import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ApplicationForm from "@/components/application/applicationForm";
import ErrorMessage from "@/components/auth/error-message";

export default async function Application({ searchParams }: { searchParams: { message: string } }) {

    // Check that the user is authenticated
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // Check if the user has already submitted an application
    const { data: application, error } = await supabase.from("applications").select().eq("account_id", user.id);

    if (error) {
        console.error("Error fetching application: ", error);
    }

    if (application && application.length > 0) {
        return redirect("/dashboard/application/applied");
    }

    return (
        <>
            <ApplicationForm />
            {searchParams?.message && (
                <ErrorMessage key={Date.now()} searchParams={searchParams} />
            )}
        </>
        
    );
}