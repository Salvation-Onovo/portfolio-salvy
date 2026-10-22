import FadeInSection from "./FadeInSection";

import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import FolderIcon from "@mui/icons-material/Folder";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/projects.css";

const projectSpotlight = {
  Blog: {
    title: "A blog",
    desc: "A clean, modern responsive blog page with a minimalist white layout and orange accents.\nFeatures category filters, a three-column blog grid, featured images, titles, dates, excerpts, and author details",
    techStack: "HTML5, CSS, Javascript",
    link: "https://github.com/Salvation-Onovo/responsive-blog",
    image: "/assets/blog.png",
  },

  "Amazon Clone": {
    title: "Amazon Clone",
    desc: "A responsive e-commerce website inspired by Amazon, built to demonstrate modern web development skills. The project features a clean product browsing experience, product listings, shopping cart functionality, and a user-friendly interface designed for both desktop and mobile devices.",
    techStack: "HTML, CSS, JavaScript, React",
    link: "https://github.com/Salvation-Onovo/amazon-clone",
    image: "/assets/amazon.png",
  },
};

const projects = {
  Portfolio: {
    desc: "My first personal portfolio, designed and built from the ground up with React and Vite. It serves as a space to showcase my projects, skills, and journey as a developer.",
    techStack: "React.js, Vite, Tailwind",
    link: "https://github.com/Salvation-Onovo",
    // open: "https://gazijarin.com/",
  },
  Iscofintecch: {
    desc: "An application created for users to contact the company (Iscofintech) for their service.",
    techStack: "React.js, Javascript, Tailwind,",
    link: "https://github.com/Salvation-Onovo/iscofintech",
    // open: "https://tdsb-app.herokuapp.com/",
  },

  "Amazon Clone.": {
    desc: "A responsive e-commerce website inspired by Amazon, built to demonstrate modern web development skills.",
    techStack: "React.js, Javascript, Tailwind",
    link: "https://github.com/gazijarin/adamai",
    // open: "https://gazijarin.github.io/AdamAI/",
  },
};

const Project = () => {
  return (
    <section id="projects" className="m-auto max-w-250 px-6 py-10">
      {/* Section Heading */}
      <div className="mx-auto max-w-250 py-4">
        <FadeInSection>
          <div className="flex items-center space-x-6">
            <span className="font-['NTR',sans-serif] text-3xl lg:text-5xl font-bold text-(--lightest-slate)">
              / Websites
            </span>

            <span className="h-px flex-1 border-b border-(--lightest-navy)" />

            <a
              href="https://github.com/Salvation-Onovo"
              target="_blank"
              rel="noopener noreferrer"
              className="
                ml-2
                flex
                items-center
                whitespace-nowrap
                font-['NTR']
                text-lg
                text-(--green-bright)
                transition-all
                duration-300
                hover:translate-x-1
                hover:text-(--lightest-slate)!
                after:ml-2
                after:text-xl
                after:content-['→']
              "
            >
              View all projects
            </a>
          </div>
        </FadeInSection>
      </div>

      {/* Project Slider */}
      <FadeInSection>
        <div className="w-full hidden lg:flex px-4 md:px-10 lg:px-8 rounded-full outline-none">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            speed={600}
            spaceBetween={30}
            className="project-swiper"
          >
            {Object.entries(projectSpotlight).map(([key, project]) => (
              <SwiperSlide key={key}>
                <div
                  className="
                      relative
                      h-125
                      w-full
                      overflow-hidden
                      rounded-lg
                      transition-transform
                      duration-300
                      hover:scale-[1.01]
                    "
                >
                  {/* Project Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                      "
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/85" />

                  {/* Project Content */}
                  <div
                    className="
                        relative
                        z-10
                        flex
                        h-full
                        flex-col
                        items-center
                        justify-center
                        px-6
                        text-center
                        top-30
                      "
                  >
                    <h3
                      className="
                          mb-2
                          font-['NTR',sans-serif]
                          text-4xl
                          font-bold
                          text-(--lightest-slate)
                        "
                    >
                      {project.title}
                    </h3>

                    <p
                      className="
                          max-w-162.5
                          font-['NTR',sans-serif]
                          text-lg
                          text-(--lightest-slate)
                        "
                    >
                      {project.desc}
                    </p>

                    <p
                      className="
                          font-['NTR',sans-serif]
                          text-sm
                          font-bold
                          text-(--green-bright)
                        "
                    >
                      {project.techStack}
                    </p>

                    {/* Links */}
                    <div className="flex gap-3">
                      {/* GitHub */}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                          className="
                            text-(--green-bright)
                            transition-colors
                            hover:text-(--lightest-slate)
                          "
                        >
                          <GitHubIcon style={{ fontSize: 24 }} />
                        </a>
                      )}

                      {/* Live Website */}
                      {project.open && (
                        <a
                          href={project.open}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.title}`}
                          className="
                           text-(--green-bright)
                           transition-colors
                           hover:text-(--lightest-slate)
                          "
                        >
                          <OpenInBrowserIcon style={{ fontSize: 24 }} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Projects */}
        <div className="mt-6">
          <div className="grid grid-cols-[repeat(3,minmax(300px,1fr))] gap-5 lg:gap-2.5 max-[1080px]:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
            {Object.keys(projects).map((key, i) => (
              <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
                <div className="relative flex h-full cursor-default flex-col p-8 rounded-2xl bg-(--light-navy) transition-all duration-250 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:-translate-y-1.75 hover:bg-(--lightest-navy)">
                  <div className="">
                    <div className="-mt-5 flex flex-row items-center justify-between border-b-0 py-5">
                      <div className="text-(--green-bright)">
                        <FolderIcon sx={{ fontSize: 35 }} />
                      </div>

                      {/* Links */}
                      <div className="flex gap-3">
                        {/* GitHub */}
                        {projects[key].link && (
                          <a
                            href={projects[key].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${projects.title} GitHub repository`}
                            className="
                            text-(--green-bright)
                            transition-colors
                            hover:text-(--lightest-slate)
                            "
                          >
                            <GitHubIcon style={{ fontSize: 24 }} />
                          </a>
                        )}

                        {/* Live Website */}
                        {projects[key].open && (
                          <a
                            href={projects[key].open}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${projects.title}`}
                            className="
                          text-(--green-bright)
                          transition-colors
                          hover:text-(--lightest-slate)
                          "
                          >
                            <OpenInBrowserIcon style={{ fontSize: 24 }} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="font-['NTR'] text-(--lightest-slate) text-2xl font-bold">
                      {key}
                    </div>
                    <div className="font-['NTR'] text-(--slate) text-lg pb-10">
                      {projects[key]["desc"]}
                    </div>
                    <div className="font-['NTR'] text-(--slate) text-base">
                      {projects[key]["techStack"]}
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
};

export default Project;
