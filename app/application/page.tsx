import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Application() {

    // Check that the user is authenticated
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    
    return redirect('/dashboard/application?page=1');
}
