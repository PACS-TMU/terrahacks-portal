import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Get the application deadline and format it
  const deadline = new Date(process.env.NEXT_PUBLIC_APPLICATION_DEADLINE!);
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

  const { data: application, error } = await supabase.from("applications").select().eq("account_id", user.id);

  if (error) {
    console.error("Error fetching application: ", error);
  }

  if (application && application.length > 0) {
    applicationInformation = "Thank you for applying! You can view your application details below:";
    applicationStatus = application[0].status;
    applicationId = application[0].application_id;
    dateApplied = application[0].applied_date;
  }


  return (
    <>
      <div className="md:sticky top-0 z-10 shrink-0 px-6 md:py-8 py-2 border-b-2 border-b-gray-300 bg-[#f7fafc]">
        <h1 className="text-xl md:text-4xl text-gray-800 font-bold font-sans">{user.user_metadata.full_name.split(' ')[0]}'s Home</h1>
        <p className="md:text-xl text-gray-500 md:mt-4 font-sans whitespace-pre-line">Welcome to your user dashboard!</p>
        <p className="text-gray-800 mt-2">Having trouble? Please contact us at through {" "}
          <a
            aria-label="Send us an email"
            href="mailto:contact@terrahacks.ca"
            target="_blank"
            rel="nooppener noreferrer"
            className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
          >
            Email
          </a>
          {" "} or get help in our support channels on {" "}
          <a
            aria-label="Join our Discord server"
            href="https://discord.gg/982AkBQea7"
            target="_blank"
            rel="nooppener noreferrer"
            className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
          >
            Discord
          </a>.
        </p>
        {!applicationStatus ? (
          <div className="bg-highlight text-background rounded-md my-2 md:mb-0 md:mt-4 font-sans p-2 flex flex-col justify-center items-center w-[90%] md:w-2/3 xl:w-1/2 mx-auto">
            <p className="md:text-xl whitespace-pre-line text-center my-2">No application submitted yet!</p>
            <p className="md:text-xl whitespace-pre-line text-center my-2">Deadline: <span className="font-semibold">{formattedDeadline}</span></p>
            <Link
              aria-label="Apply to TerraHacks"
              href="/dashboard/apply"
              target="_blank"
              className="underline font-semibold text-background text-lg md:text-xl duration-300 ease-in-out hover:text-sky-400 my-2"
            >
              Apply Now!
            </Link>
          </div>
        ) : (
          <p className="text-base md:text-lg text-gray-800 whitespace-pre-line my-2">We got your application! Review the details below.</p>
        )}

      </div>
      <div className="px-6 py-6">
        <div className="items-center gap-8 space-y-4 mb-4">
          <h3 className="text-md md:text-2xl font-bold">Application Status</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-highlight text-background shadow-md p-4 rounded-lg">
            <h4 className="text-md md:text-xl font-bold">Application Information</h4>
            <div className={`text-gray-200 ${applicationStatus ? 'text-base lg:text-lg' : 'text-sm lg:text-base'} mt-2`}>
              {applicationInformation ? (
                <div>
                  <p className="mb-4">
                    {applicationInformation}
                  </p>
                  <div className="w-full flex flex-col items-center lg:items-start lg:ml-4">
                    <div className="space-y-4">
                      <p>
                        <span className="font-semibold">
                          Application ID:
                        </span>
                        <br />
                        <span className="font-mono text-lg lg:text-xl">
                          {applicationId}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">
                          Date Applied:
                        </span>
                        <br />
                        <span className="font-mono text-lg lg:text-xl">
                          {new Date(dateApplied).toLocaleString()}
                        </span>
                      </p>
                    </div>

                  </div>
                  <p className="mt-4">
                    If you have any questions, please contact us through {" "}
                    <a
                      aria-label="Send us an email"
                      href="mailto:contact@terrahacks.ca"
                      target="_blank"
                      rel="nooppener noreferrer"
                      className="font-semibold underline duration-300 ease-in-out hover:text-gray-300"
                    >
                      email
                    </a> {" "}
                    and include your <span className="font-semibold">**Application ID**</span> in the subject line.
                  </p>
                </div>
              ) :
                <p>You have not submitted an application yet. Please submit your application before the deadline.</p>
              }
            </div>
          </div>
          <div className="bg-highlight text-background shadow-md p-4 rounded-lg">
            <h4 className="text-md md:text-xl font-bold">Application Status</h4>
            <div className={`text-gray-200 ${applicationStatus ? 'text-lg lg:text-2xl' : 'text-sm lg:text-base'} mt-2`}>
              {applicationStatus ? (
                <p className="mt-4">
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  <span>
                    {applicationStatus}
                  </span>
                </p>
              ) :
                <p>You have not submitted an application yet. Please submit your application before the deadline.</p>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
