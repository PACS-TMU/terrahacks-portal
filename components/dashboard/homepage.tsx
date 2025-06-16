import Intro from "@/components/dashboard/intro";
import Content from "@/components/dashboard/content";
import type { User } from "@supabase/auth-js";

export default function Homepage({ user, applicationStatus, formattedDeadline, applicationInformation, applicationId, dateApplied, rsvpStatus }:
  {
    user: User;
    applicationStatus: string,
    formattedDeadline: string,
    applicationInformation: string | null,
    applicationId: string,
    dateApplied: string,
    rsvpStatus: string
  }
) {
  return (
    <>
      <Intro
        user={user}
        applicationStatus={applicationStatus}
        formattedDeadline={formattedDeadline}
        rsvpStatus={rsvpStatus}
      />
      <Content
        applicationStatus={applicationStatus}
        applicationInformation={applicationInformation}
        applicationId={applicationId}
        dateApplied={dateApplied}
        rsvpStatus={rsvpStatus}
      />
    </>
  );
}