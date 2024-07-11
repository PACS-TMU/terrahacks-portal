import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Intro from "@/components/dashboard/intro";
import createTeam from "@/server/createTeam";

const supabase = createClient();

export default async function Team() {

    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login')
    }
    const {data: teamID, error} = await supabase.from('users').select('team_id').eq('id', user.id).single()
    console.log(teamID?.team_id)

    return (
        <section>
            <Intro user={user} applicationStatus={'BlaBla'} formattedDeadline={'asdf'} rsvpStatus={true}/>
            <div className={'container mx-auto px-4'}>
                <div>
                    <h1 className={'text-xl font-bold'}>You currently are not in a team.</h1>
                    <p className={'text-lg font-light mb-4'}>You can join or create one.</p>
                    <form action={createTeam}>
                        <input name={'team-name'} placeholder={'Team Name'}/>
                        <button>Create Team</button>
                    </form>
                    <form>
                        <input placeholder={'Team ID'}/>
                        <button>Join Team</button>
                    </form>

                </div>

            </div>
        </section>
    )
}
