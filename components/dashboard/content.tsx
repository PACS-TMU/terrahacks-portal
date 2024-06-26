import moment from 'moment-timezone';

export default function Content({ applicationStatus, applicationInformation, applicationId, dateApplied, rsvpStatus }:
  { applicationStatus: any, applicationInformation: any, applicationId: any, dateApplied: any, rsvpStatus: any }
) {
  return (
    <div className="px-6 py-6">
      <div className="items-center gap-8 space-y-4 mb-4">
        <h3 className="text-base md:text-2xl font-bold">Application Status</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-highlight text-background shadow-md p-4 rounded-lg">
          <h4 className="text-base md:text-xl font-bold">Application Information</h4>
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
                        {applicationId.toUpperCase()}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">
                        Date Applied:
                      </span>
                      <br />
                      <span className="font-mono text-lg lg:text-xl">
                        {moment(dateApplied).tz('America/Toronto').format('YYYY-MM-DD hh:mm A')} EST
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
          <h4 className="text-base md:text-xl font-bold">Application Status</h4>
          <div className={`text-gray-200 ${applicationStatus ? 'text-lg lg:text-2xl' : 'text-sm lg:text-base'} mt-2`}>
            {applicationStatus ? (
              <p className="mt-4">
                <span className="font-semibold">
                  Status:
                </span>{" "}
                <span>
                  {rsvpStatus === 'Rescinded' ? `RSVP rescinded, sorry to see you go!` : (
                    rsvpStatus === "Yes" ? `RSVP submitted, see you at TerraHacks!` : applicationStatus
                  )}
                </span>
              </p>
            ) :
              <p>You have not submitted an application yet. Please submit your application before the deadline.</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
