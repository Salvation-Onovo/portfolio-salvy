import React from "react";
import "../styles/Intro.css";
import { TypeAnimation } from "react-type-animation";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FadeInSection from "./FadeInSection";
import AsciiPortrait from "./AsciiPortrait";

const Intro = () => {
  return (
    <section id="home" className="w-full">
      <div
        className="
          flex
          min-h-[80vh]
          w-full
          flex-col
          items-center
          justify-center
          gap-8
          px-[5vw]
          pt-5
          pb-12
          box-border

          lg:flex-row
          lg:gap-[4vw]
          lg:px-[5vw]
          lg:pt-20
        "
      >
        {/* ASCII PORTRAIT */}
        <div
          className="
            flex
            w-full
            items-center
            justify-center
            shrink-0

            lg:w-auto
            lg:-mt-14
          "
        >
          <AsciiPortrait />
        </div>

        {/* TEXT CONTENT */}
        <div
          className="
            flex
            w-full
            max-w-137.5
            flex-col
            items-center
            text-center

            lg:items-start
            lg:text-left
          "
        >
          {/* INTRO TITLE */}
          <div
            className="
              font-['NTR',sans-serif]
              text-5xl
              leading-tight
              text-(--lightest-slate)

              sm:text-6xl
              lg:text-[80px]
            "
          >
            {"hi, "}

            <span
              className="
                font-['NTR',sans-serif]
                font-bold
                text-(--green-bright)
                lg:text-[80px]
              "
            >
              <TypeAnimation
                sequence={["michael"]}
                wrapper="span"
                cursor={false}
                repeat={0}
              />
            </span>

            {" here."}

            <span
              className="
                ml-1
                inline-block
                font-light
                text-(--green-bright)
                animate-blink
              "
            >
              |
            </span>
          </div>

          {/* DESCRIPTION + BUTTON */}
          <FadeInSection>
            <div
              className="
                mt-4
                w-full
                max-w-full
                pt-2
                pb-8
                font-['NTR',sans-serif]
                text-(--slate)
                text-[18px]
                leading-normal
                text-center

                lg:text-left
                lg:text-[20px]
              "
            >
              Software engineer in Nigeria. I build modern web & mobile
              experiences and spend a probably unhealthy amount of time making
              things look and feel just right. I like working at the
              intersection of technology and creativity. Occasionally, both
              happen at the same time.
            </div>

            {/* BUTTON */}
            <div className="flex w-full justify-center lg:justify-start">
              <a
                href="mailto:salvmichael202@gmail.com"
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  cursor-pointer
                  rounded-sm
                  border
                  border-(--green-bright)
                  px-8
                  py-3
                  font-['NTR',sans-serif]
                  text-[16px]
                  font-extrabold
                  text-(--green-bright)
                  transition-all
                  duration-300
                  ease-[cubic-bezier(0.645,0.045,0.355,1)]

                  hover:-translate-y-0.75
                  hover:bg-(--green-tint)
                  hover:text-(--lightest-slate)
                  hover:outline-none
                "
              >
                <EmailRoundedIcon />
                {" Say hi!"}
              </a>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default Intro;