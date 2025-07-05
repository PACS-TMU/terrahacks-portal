"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import Loading from "@/components/Loading";

type Team = {
    team_id: number;
    team_name: string;
    created_by: string;
    created_at: string;
};

type TeamMember = {
    application_id: string;
    team_id: number;
    joined_at: string;
    first_name?: string;
    last_name?: string;
};

export default function TeamPage() {
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<"create" | "join">("create");
    const [team, setTeam] = useState<Team | null>(null);
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [teamName, setTeamName] = useState("");
    const [memberAppIds, setMemberAppIds] = useState(["", "", ""]);    const [search, setSearch] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [userApplicationId, setUserApplicationId] = useState<string | null>(null);

    const fetchUserAndTeam = useCallback(async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
            // Get application_id for this user
            const { data: appRow } = await supabase
                .from("applicant_details")
                .select("application_id")
                .eq("account_id", user.id)
                .maybeSingle();

            console.log("Application Row:", appRow);

            if (!appRow?.application_id) {
                setTeam(null);
                setMembers([]);
                setUserApplicationId(null);
                setLoading(false);
                return;
            }
            setUserApplicationId(appRow.application_id);

            console.log("Current user id:", user.id);

            // Find if user is in a team using application_id
            const { data: memberRows } = await supabase
                .from("team_members")
                .select("*")
                .eq("application_id", appRow.application_id);

            console.log("memberRows:", memberRows);

            const memberRow = memberRows && memberRows.length > 0 ? memberRows[0] : null;

            if (memberRow?.team_id) {
                // Fetch team info
                const { data: teamRow } = await supabase
                    .from("teams")
                    .select("*")
                    .eq("team_id", memberRow.team_id)
                    .single();
                setTeam(teamRow || null);

                /// Fetch team members
                const { data: memberRows } = await supabase
                    .from("team_members")
                    .select("application_id,joined_at,applicant_details(first_name,last_name)")
                    .eq("team_id", memberRow.team_id);

                let memberList: TeamMember[] = [];
                if (memberRows && memberRows.length > 0) {
                    memberList = memberRows.map(m => {
                        const details = Array.isArray(m.applicant_details)
                            ? m.applicant_details[0] || {}
                            : m.applicant_details || {};
                        return {
                            application_id: m.application_id,
                            team_id: memberRow.team_id,
                            joined_at: m.joined_at,
                            first_name: details.first_name ?? "",
                            last_name: details.last_name ?? "",
                        };
                    });
                }
                setMembers(memberList);
            } else {
                setTeam(null);
                setMembers([]);
            }
        }
        setLoading(false);
    }, [supabase]);

    // Initial fetch
    useEffect(() => {
        fetchUserAndTeam();
    }, []);

    // Fetch all teams for join tab
    useEffect(() => {
        if (tab === "join") {
            const fetchTeams = async () => {
                let query = supabase.from("teams").select("*");
                if (search) query = query.ilike("team_name", `%${search}%`);
                const { data } = await query;
                setTeams(data || []);
            };
            fetchTeams();
        }
    }, [tab, search]);

    // Create a team
    async function handleCreateTeam(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!teamName.trim()) {
            setError("Team name required.");
            return;
        }
        if (!user) return;

        // Before inserting, fetch the user's application_id
        const { data: appRow } = await supabase
            .from("applicant_details")
            .select("application_id")
            .eq("account_id", user.id)
            .maybeSingle();

        if (!appRow?.application_id) {
            setError("No application found for this user.");
            return;
        }

        // Create team with application_id as created_by
        const { data: newTeam, error: teamErr } = await supabase
            .from("teams")
            .insert({
                team_name: teamName,
                created_by: appRow.application_id,
            })
            .select()
            .single();

        if (teamErr) {
            setError("Failed to create team: " + teamErr.message);
            return;
        }

        // Add self as member (use application_id!) and check for errors
        const { error: memberErr } = await supabase.from("team_members").insert({
            application_id: appRow.application_id,
            team_id: newTeam.team_id,
        });
        if (memberErr) {
            setError("Failed to add yourself to the team: " + memberErr.message);
            // Optionally: clean up by deleting the team if member insert fails
            await supabase.from("teams").delete().eq("team_id", newTeam.team_id);
            return;
        }

        // Add invited members (by application ID, if provided)
        for (const appId of memberAppIds) {
            const trimmedId = appId.trim();
            if (trimmedId) {
                const { data: existing } = await supabase
                    .from("team_members")
                    .select("*")
                    .eq("application_id", trimmedId)
                    .maybeSingle();
                if (!existing) {
                    await supabase.from("team_members").insert({
                        application_id: trimmedId,
                        team_id: newTeam.team_id,
                    });
                }
            }
        }

        setTeam(newTeam);
        setError(null);
        setTeamName("");
        setMemberAppIds(["", "", ""]);
        await fetchUserAndTeam();
    }

    // Join a team
    async function handleJoinTeam(teamId: number) {
        setError(null);
        if (!user) return;
        // Get user's application_id
        const { data: appRow } = await supabase
            .from("applicant_details")
            .select("application_id")
            .eq("account_id", user.id)
            .maybeSingle();

        if (!appRow?.application_id) {
            setError("No application found for this user.");
            return;
        }

        const { data: existing } = await supabase
            .from("team_members")
            .select("*")
            .eq("application_id", appRow.application_id)
            .maybeSingle();
        if (existing) {
            setError("You are already in a team.");
            return;
        }
        await supabase.from("team_members").insert({
            application_id: appRow.application_id,
            team_id: teamId,
        });
        await fetchUserAndTeam();
    }

    // Leave team
    async function handleLeaveTeam() {
        setError(null);
        if (!user || !team) return;

        // Remove self from team_members
        await supabase
            .from("team_members")
            .delete()
            .eq("team_id", team.team_id)
            .eq("application_id", userApplicationId);

        // Check if team has any members left
        const { count } = await supabase
            .from("team_members")
            .select("application_id", { count: "exact", head: true })
            .eq("team_id", team.team_id);

        if (count === 0) {
            // Delete the team if no members left
            await supabase.from("teams").delete().eq("team_id", team.team_id);
        }

        setTeam(null);
        setMembers([]);
        setTab("create");
        await fetchUserAndTeam();
    }

    // Add member (owner only)
    async function handleAddMember(application_id: string) {
        setError(null);
        if (!user || !team) return;
        if (team.created_by !== userApplicationId) {
            setError("Only the team owner can add members.");
            return;
        }
        if (!application_id.trim()) {
            setError("Please enter an application ID.");
            return;
        }
        // Optionally: check if already in team
        const { data: existing } = await supabase
            .from("team_members")
            .select("*")
            .eq("application_id", application_id.trim())
            .eq("team_id", team.team_id)
            .maybeSingle();
        if (existing) {
            setError("This application ID is already in the team.");
            return;
        }
        await supabase.from("team_members").insert({
            application_id: application_id.trim(),
            team_id: team.team_id,
        });
        await fetchUserAndTeam();
    }

    // Remove member (owner only)
    async function handleRemoveMember(application_id: string) {
        setError(null);
        if (!user || !team) return;
        if (team.created_by !== userApplicationId) {
            setError("Only the team owner can remove members.");
            return;
        }
        const { error } = await supabase
            .from("team_members")
            .delete()
            .eq("team_id", team.team_id)
            .eq("application_id", application_id);
        if (error) {
            setError("Failed to remove member: " + error.message);
        }
        await fetchUserAndTeam();
    }

    // UI
    return (
        <div className="w-full max-w-4xl mx-auto pt-12 pb-12">
            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* Title & Description */}
                    <div className="mb-8 pt-4">
                        <h1 className="text-3xl font-bold text-green-700">My Team</h1>
                        <p className="mt-2 text-lg text-blue-900">
                            Create your dream team! Add, manage, and view your teammates.<br />
                            Having trouble? Get help in our <a href="#" className="underline text-green-700">Discord</a> support channel.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
                    )}

                    {/* Show create/join buttons if not in a team */}
                    {!team && (
                        <div className="flex justify-center gap-8 my-8">
                            <button
                                className={`text-2xl px-6 py-3 rounded-lg shadow transition font-mono font-semibold ${
                                    tab === "create"
                                        ? "bg-gradient-to-r from-green-500 to-blue-400 text-white scale-105"
                                        : "bg-blue-100 text-blue-900 hover:bg-green-100"
                                }`}
                                onClick={() => setTab("create")}
                            >
                                Create a Team
                            </button>
                            <button
                                className={`text-2xl px-6 py-3 rounded-lg shadow transition font-mono font-semibold ${
                                    tab === "join"
                                        ? "bg-gradient-to-r from-green-500 to-blue-400 text-white scale-105"
                                        : "bg-blue-100 text-blue-900 hover:bg-green-100"
                                }`}
                                onClick={() => setTab("join")}
                            >
                                Join an Existing Team
                            </button>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="mt-8">
                        {!team && tab === "create" && (
                            <form
                                className="space-y-6 bg-white rounded-xl shadow p-8 border border-green-200 max-w-lg mx-auto"
                                onSubmit={handleCreateTeam}
                            >
                                <div>
                                    <label className="block font-semibold mb-2 text-green-800">Team Name *</label>
                                    <input
                                        className="input input-bordered w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                                        required
                                        placeholder="Enter your team name"
                                        value={teamName}
                                        onChange={e => setTeamName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-2 text-green-800">Add Members by Application ID (optional)</label>
                                        {[0, 1, 2].map(i => (
                                            <input
                                                key={i}
                                                className="input input-bordered w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition mb-2"
                                                placeholder={`Member ${i + 1} application ID`}
                                                value={memberAppIds[i]}
                                                onChange={e => {
                                                    const arr = [...memberAppIds];
                                                    arr[i] = e.target.value;
                                                    setMemberAppIds(arr);
                                                }}
                                            />
                                        ))}
                                </div>
                                <button
                                    className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-400 text-white font-bold text-lg shadow hover:scale-105 transition"
                                    type="submit"
                                >
                                    Create Team
                                </button>
                            </form>
                        )}

                        {!team && tab === "join" && (
                            <div className="bg-white rounded-xl shadow p-8 border border-green-200 max-w-lg mx-auto">
                                <label className="block font-semibold mb-2 text-green-800">Search Team Name:</label>
                                <input
                                    className="input input-bordered w-full mb-4 px-4 py-2 rounded-lg border border-blue-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                                    placeholder="Search teams..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <h2 className="font-bold underline mb-4 text-green-800">Available Teams</h2>
                                <div className="flex flex-col gap-4">
                                    {teams.length === 0 && (
                                        <div className="text-blue-900">No teams found.</div>
                                    )}
                                    {teams.map(t => (
                                        <div key={t.team_id} className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-3">
                                            <div>
                                                <div className="font-semibold text-green-900">{t.team_name}</div>
                                            </div>
                                            <button
                                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-400 text-white font-semibold shadow hover:scale-105 transition"
                                                onClick={() => handleJoinTeam(t.team_id)}
                                            >
                                                Join
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {team && (
                            <div className="bg-gradient-to-br from-green-50 via-white to-blue-100 rounded-xl p-6 mb-8 border border-green-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <h2 className="text-2xl font-bold text-green-800">{team.team_name}</h2>
                                </div>
                                <div className="font-semibold text-green-700 mb-2">MEMBERS</div>
                                <div className="space-y-3">
                                    {members.map(m => (
                                        <div key={m.application_id} className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 rounded-lg px-4 py-3 gap-4 border border-green-200">
                                            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                                                {(m.first_name?.[0] ?? "") + (m.last_name?.[0] ?? "")}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-semibold text-green-900 flex items-center gap-1">
                                                    {m.first_name} {m.last_name}
                                                    {team.created_by === m.application_id && <span title="Owner">👑</span>}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                {team.created_by === userApplicationId && team.created_by !== m.application_id && (
                                                    <button
                                                        className="text-red-500 hover:text-red-700 text-xl"
                                                        title="Remove"
                                                        onClick={() => handleRemoveMember(m.application_id)}
                                                    >
                                                        ✖️
                                                    </button>
                                                )}
                                                {team.created_by === m.application_id && (
                                                    <button className="text-green-600 text-xl" title="Owner">
                                                        ✔️
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {team.created_by === userApplicationId && (
                                    <form
                                        className="flex gap-2 mt-6"
                                        onSubmit={e => {
                                            e.preventDefault();
                                            const form = e.target as HTMLFormElement;
                                            const email = (form.elements.namedItem("addemail") as HTMLInputElement).value;
                                            if (email) handleAddMember(email);
                                            form.reset();
                                        }}
                                    >
                                        <input
                                            name="addemail"
                                            className="input input-bordered px-4 py-2 rounded-lg border border-blue-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                                            placeholder="Add member by app ID"
                                        />
                                        <button
                                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-400 text-white font-semibold shadow hover:scale-105 transition"
                                            type="submit"
                                        >
                                            Add
                                        </button>
                                    </form>
                                )}
                                <div className="mt-8 border-t border-green-200 pt-4">
                                    <div className="font-semibold text-green-700 mb-2">DANGER ZONE</div>
                                    <p className="text-blue-900 mb-4 text-sm">
                                        Leaving the team is permanent and cannot be undone (you can join back later if you wish).
                                    </p>
                                    <button
                                        className="bg-gradient-to-r from-green-600 to-blue-500 text-white px-6 py-2 rounded-full font-bold hover:from-green-700 hover:to-blue-600 transition"
                                        onClick={handleLeaveTeam}
                                    >
                                        LEAVE TEAM
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Team Information */}
                    <div className="mt-12 rounded-xl p-6 bg-gradient-to-br from-green-50 via-white to-blue-100 border border-green-200 shadow">
                        <h2 className="text-xl font-bold mb-2 text-green-800">Team Information</h2>
                        <p className="text-blue-900">
                            Create or join a team to participate in TerraHacks. Teams can have up to 4 members total.<br />
                            Team names can be changed until registration closes, so feel free to experiment!
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}