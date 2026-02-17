import { useState } from "react";
import PageHeader from "../components/PageHeader";
import SubNavigation from "../components/SubNavigation";
import Trainings from "../components/profile/EnrolledPlans";
import PersonalInformation from "../components/profile/PersonalInformation";

export default function Profile() {
  const [subNav, setSubNav] = useState("profile");

  const profileNavItems = [
    { label: "Profile", path: "profile" },
    { label: "Enrolled plans", path: "trainings" },
  ];

  return (
    <section className="flex flex-col gap-2">
      <PageHeader
        title="Your Profile"
        subtitle="Manage your personal information and training preferences."
      />
      <SubNavigation
        items={profileNavItems}
        subNav={subNav}
        setSubNav={setSubNav}
      />
      {subNav === "profile" && <PersonalInformation />}
      {subNav === "trainings" && <Trainings />}
    </section>
  );
}
