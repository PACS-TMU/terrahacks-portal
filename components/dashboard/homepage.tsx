import Intro from "@/components/dashboard/intro";
import Content from "@/components/dashboard/content";

export default function Homepage({ user, applicationStatus, formattedDeadline, applicationInformation, applicationId, dateApplied, rsvpStatus }:
  { user: any, applicationStatus: any, formattedDeadline: any, applicationInformation: any, applicationId: any, dateApplied: any, rsvpStatus: any}
) {
  return (
    <>
      <Intro user={user} applicationStatus={applicationStatus} formattedDeadline={formattedDeadline} rsvpStatus={rsvpStatus} />
      <Content applicationStatus={applicationStatus} applicationInformation={applicationInformation} applicationId={applicationId} dateApplied={dateApplied} rsvpStatus={rsvpStatus} />
    </>
  );
}