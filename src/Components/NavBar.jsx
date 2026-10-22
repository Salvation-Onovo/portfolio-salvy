import React, { useState } from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Instagram from "@mui/icons-material/Instagram";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-(--navy) p-3 lg:hidden border-b border-(--lightest-navy)">
        <a
          href="/#home"
          className="
           font-['NTR',sans-serif]
           text-xl
           font-bold
           text-(--lightest-slate)
          "
        >
          Michael Onovo
        </a>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setIsOpen(true)}
          className="
            border
            border-(--lightest-navy)
            px-5
            py-1
            text-xl
            text-(--lightest-slate)
            transition-colors
            hover:text-(--green-bright)
          "
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`
          fixed
          inset-0
          z-60
          lg:hidden
          transition-all
          duration-300
          ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        {/* Dark background */}
        <div onClick={() => setIsOpen(false)} />

        {/* Menu */}
        <div
          className={`
            absolute
            left-0
            top-0
            flex
            h-3/4
            w-full
            max-w-full
            flex-col
            bg-(--navy)
            px-8
            py-8
            transition-transform
            duration-500
            ease-[cubic-bezier(0.645,0.045,0.355,1)]
            border-b
            border-(--lightest-navy) 
      ${isOpen ? "translate-y-0" : "-translate-y-full"}
    `}
        >
          {/* Close button */}
          <div className="mb-10 flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="
                text-3xl
                text-(--lightest-slate)
                transition-colors
                hover:text-(--green-bright)
              "
            >
              ×
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className="flex flex-col gap-5 font-['NTR',sans-serif]
           text-xl
           font-bold
           text-(--lightest-slate)"
          >
            <a
              href="/#home"
              onClick={() => setIsOpen(false)}
              className="text-xl text-(--lightest-slate) hover:text-(--green-bright)"
            >
              Home
            </a>

            <a
              href="/#about"
              onClick={() => setIsOpen(false)}
              className="text-xl text-(--lightest-slate) hover:text-(--green-bright)"
            >
              About
            </a>

            <a
              href="/#experience"
              onClick={() => setIsOpen(false)}
              className="text-xl text-(--lightest-slate) hover:text-(--green-bright)"
            >
              Experience
            </a>

            <a
              href="/#web-projects"
              onClick={() => setIsOpen(false)}
              className="text-xl text-(--lightest-slate) hover:text-(--green-bright)"
            >
              Websites
            </a>

            <a
              href="/#mobile-projects"
              onClick={() => setIsOpen(false)}
              className="text-xl text-(--lightest-slate) hover:text-(--green-bright)"
            >
              Mobile Apps
            </a>
          </div>

          {/* Social Icons */}
          <div className="mt-auto flex gap-5">
            <a
              href="mailto:salvmichael202@gmail.com"
              className="text-(--lightest-slate) hover:text-(--green-bright)"
            >
              <EmailRoundedIcon fontSize="small" />
            </a>

            <a
              href="https://github.com/Salvation-Onovo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--lightest-slate) hover:text-(--green-bright)"
            >
              <GitHubIcon fontSize="small" />
            </a>

            <a
              href="https://www.linkedin.com/in/salvation-onovo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--lightest-slate) hover:text-(--green-bright)"
            >
              <LinkedInIcon fontSize="small" />
            </a>

            <a
              href="https://www.instagram.com/onovosalvation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--lightest-slate) hover:text-(--green-bright)"
            >
              <Instagram fontSize="small" />
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <nav className="bg-(--navy)! text-(--lightest-slate)! font-['NTR'] font-bold backdrop-blur-[10px] border-b border-(--lightest-navy) p-4 fixed hidden lg:flex w-full z-50">
        <div className="flex space-x-10">
          <a href="/" className="hover:text-(--green-bright)! ml-24">
            Michael Onovo
          </a>

          <div className="flex items-center justify-center space-x-127.5">
            <div className="space-x-4">
              <a href="/#home" className="hover:text-(--green-bright)!">
                Home
              </a>
              <a href="/#about" className="hover:text-(--green-bright)!">
                About
              </a>

              <a href="/#experience" className="hover:text-(--green-bright)!">
                Experience
              </a>

              <a href="/#web-projects" className="hover:text-(--green-bright)!">
                Websites
              </a>

              <a
                href="/#mobile-projects"
                className="hover:text-(--green-bright)!"
              >
                Mobile Apps
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <a href="mailto:salvmichael202@gmail.com">
                <EmailRoundedIcon
                  className="hover:text-(--green-bright)!"
                  style={{ fontSize: 20 }}
                />
              </a>
              <a href="https://github.com/Salvation-Onovo">
                <GitHubIcon
                  className="hover:text-(--green-bright)!"
                  style={{ fontSize: 19 }}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/salvation-onovo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon
                  className="hover:text-(--green-bright)!"
                  style={{ fontSize: 21 }}
                />
              </a>
              <a href="https://www.instagram.com/onovosalvation">
                <Instagram
                  className="hover:text-(--green-bright)!"
                  style={{ fontSize: 21 }}
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
