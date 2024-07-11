'use server';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const supabase = createClient();

export default async function createTeam(formData: FormData) {
    const {data: {user}} = await supabase.auth.getUser();
    if (!user) {
        return redirect('/login?error=You need to be logged in to create a team.')
    }
    const {data: {team_id}, error: retrieveTeamError} = await supabase.from('users').select('team_id').eq('id', user.id).single();
    if (retrieveTeamError) {
        return redirect(`/dashboard/team?error=${retrieveTeamError?.message}`)
    }
    if (team_id != null) {
        return redirect('/dashboard/team?error=You are already in a team.')
    }
    const {data: createdTeamID, error: createTeamError } = await supabase.from('teams')
        .insert({team_name: formData.get('team-name'), creator_id: user.id}).select('team_id')
    console.log(createdTeamID![0].team_id)
    if (createTeamError) {
        return redirect(`/dashboard/team?error=${createTeamError?.message}`)
    }

    const {error: updateTeamIDError} = await supabase.from('users').update({team_id: createdTeamID![0].team_id}).eq('id', user.id)
    if (updateTeamIDError) {
        return redirect(`/dashboard/team?error=${updateTeamIDError?.message}`)
    }

    const {data: createdTeamName, error: teamNameRetrieveError} = await supabase.from('teams').select('team_name').eq('team_id', createdTeamID![0].team_id).single()
    if (teamNameRetrieveError) {
        return redirect(`/dashboard/team?error=${teamNameRetrieveError?.message}`)
    }
    return redirect(`/dashboard/team/${createdTeamName.team_name}?message=Team created successfully.`)
}