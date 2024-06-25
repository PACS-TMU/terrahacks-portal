import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Homepage from "@/components/dashboard/homepage";
import ApplicationError from "@/components/application/applicationError";

export default async function Dashboard({ searchParams }: { searchParams: { message: string } }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Get the application deadline and format it
  const deadline = new Date("2024-07-25T23:59:59");
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDeadline = new Intl.DateTimeFormat('en-US', options).format(deadline);

  // Get the user application information and status
  let applicationInformation = null;
  let applicationStatus = null;
  let applicationId = null;
  let dateApplied = null;
  let rsvpStatus = 'N/A';

  const { data: userApplication, error: userApplicationError } = await supabase.from("users").select("applied").eq("id", user.id);

  if (userApplicationError) {
    console.error("Error fetching user application: ", userApplicationError);
  }

  if (userApplication![0].applied === "Applied") {
    const { data: application, error } = await supabase.from("applications").select().eq("account_id", user.id);

    if (error) {
      console.error("Error fetching application: ", error);
    }

    if (application && application.length > 0) {
      applicationInformation = "Thank you for applying! You can view your application details below:";
      applicationStatus = application[0].status;
      applicationId = application[0].application_id;
      dateApplied = application[0].applied_date;
      rsvpStatus = application[0].rsvp;
    }
  }

  return (
    <>
      <Homepage
        user={user}
        applicationStatus={applicationStatus}
        formattedDeadline={formattedDeadline}
        applicationInformation={applicationInformation}
        applicationId={applicationId}
        dateApplied={dateApplied}
        rsvpStatus={rsvpStatus}
      />
      {searchParams?.message && (
        <ApplicationError key={Date.now()} searchParams={searchParams} />
      )}
    </>

  );
}
