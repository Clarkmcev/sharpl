import { useState } from "react";
import PageHeader from "../components/PageHeader";
import AvailablePlans from "../components/plans";
import SubNavigation from "../components/SubNavigation";

export default function Plans() {
  const [subNav, setSubNav] = useState("available");

  const subNavItems = [
    { label: "Available Plans", path: "available" },
    // Future: Add "My Plans" or "Enrolled Plans" here
  ];

  return (
    <section className="flex flex-col gap-2">
      {/* Header */}
      <PageHeader
        title="Available Training Plans"
        subtitle="Browse and enroll in training plans that suit your goals"
      />
      <SubNavigation
        items={subNavItems}
        subNav={subNav}
        setSubNav={setSubNav}
      />
      <AvailablePlans />
    </section>
  );
}
