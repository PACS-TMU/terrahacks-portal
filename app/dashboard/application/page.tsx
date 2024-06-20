import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ApplicationForm from "@/components/application/applicationForm";

export default async function Application({ searchParams }: { searchParams: { message: string } }) {

    // Check that the user is authenticated
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }


    return (
        <ApplicationForm />
    );
}