import React from "react";
import FadeInSection from "./FadeInSection";
import JobList from "./JobList";

const Experience = () => {
  return (
    <section id="experience">
      <div className="mx-auto max-w-250 px-6 py-12 lg:py-20">
        <FadeInSection>
          <div className="pb-4 lg:pb-8 flex items-center space-x-6">
            <span className="font-['NTR',sans-serif] text-(--lightest-slate) font-bold text-3xl lg:text-5xl">
              / experience
            </span>
            <span className="border-b border-(--lightest-navy) w-44 lg:w-72"></span>
          </div>
          <JobList />
        </FadeInSection>
      </div>
    </section>
  );
};

export default Experience;
