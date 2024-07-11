import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";


export default async function Team({params}: {params: {team_name: string}}) {
    const supabase = createClient();
    const {data: {user}} = await supabase.auth.getUser();
    if (!user) {
        return redirect('/login')
    }
    const {data: {team_id}, error: retrieveTeamError} = await supabase.from('users').select('team_id').eq('id', user.id).single();
    if (retrieveTeamError) {
        return redirect(`/dashboard/team?error=You are not part of a team.`)
    }
    const {data: teamID, error: teamIDRetrieveError} = await supabase.from('teams').select('team_id').eq('team_name', params.team_name).single()
    if (teamIDRetrieveError) {
        console.log(teamIDRetrieveError?.message)
        return redirect(`/dashboard/team?error=Team not found.`)
    }
    if (team_id != teamID?.team_id) {
        return redirect('/dashboard/team?error=You are not part of this team.')
    }


    return (
        <section>
            <h1>{params.team_name}</h1>
            <p>{teamID.team_id}</p>
        </section>
    )
}