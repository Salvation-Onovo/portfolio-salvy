import React from "react";
import FadeInSection from "./FadeInSection";

const About = () => {
  const one = (
    <p className="p-2">
      I am currently a{" "}
      <b className="text-[21px] font-bold">Software Engineer</b> at{" "}
      <b className="text-[21px] font-bold text-(--green-bright)">
        <a
          href="https://arvystech.com/staffs/michael-onovo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Arvys Technology
        </a>
      </b>
      , where I work as a Technical Trainer who teach majorly University Interns
      who have interest in Web development.
    </p>
  );

  const two = (
    <p>
      In my free time, I contribute to open-source projects and write technical
      articles to share my knowledge with the community, I also play video
      games.
    </p>
  );

  const techStack = [
    "Javascript ES6+",
    "React Native",
    "React.js",
    "Typescript",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "TailwindCSS",
  ];

  return (
    <section id="about">
      <div className="mx-auto max-w-250 p-6">
        <FadeInSection>
          <div className="pb-3 lg:pb-8 flex items-center space-x-6">
            <span className="font-['NTR',sans-serif] text-(--lightest-slate) font-bold text-3xl lg:text-5xl">
              / about me
            </span>
            <span className="border-b border-(--lightest-navy) w-44 lg:w-72"></span>
          </div>

          <div className="flex felx-row ">
            <div className="font-['NTR',sans-serif] text-(--slate) max-w-150 text-[18px] lg:text-[22px] text-justify m-0">
              {one}
              {"Here are some technologies I have been working with:"}
              <ul className="pt-5 pb-2 list-none grid grid-cols-2">
                {techStack.map((techItem, i) => (
                  <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
                    <li className="relative pl-5 text-[16px] text-(--slate) before:content-['▹'] before:text-(--green-bright) before:absolute before:left-0">
                      {techItem}
                    </li>
                  </FadeInSection>
                ))}
              </ul>
              {two}
            </div>

            <div className="hidden lg:flex pl-10">
              <img
                className="max-w-75 h-auto rounded-[10px] ml-7.5 shadow-[6px_13px_23px_-5px_rgba(0,0,0,0.46)] border-0 hover:-translate-y-2 transition-transform"
                src={"/src/assets/profile.jpeg"}
                alt="Michael Onovo"
              />
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default About;
