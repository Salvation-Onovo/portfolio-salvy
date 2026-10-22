import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FadeInSection from "./FadeInSection";

function TabPanel(props) {
  const { children, value, index, isMobile, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={
        isMobile ? `full-width-tabpanel-${index}` : `vertical-tabpanel-${index}`
      }
      aria-labelledby={
        isMobile ? `full-width-tab-${index}` : `vertical-tab-${index}`
      }
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  isMobile: PropTypes.bool,
};

function a11yProps(index, isMobile) {
  if (isMobile) {
    return {
      id: "full-width-tab-" + index,
      "aria-controls": "full-width-tabpanel-" + index,
    };
  } else {
    return {
      id: "vertical-tab-" + index,
      "aria-controls": "vertical-tabpanel-" + index,
    };
  }
}

const JobList = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const experienceItems = {
    "Arvys Technology": {
      jobTitle: "Software Engineer III @",
      duration: "SEPT 2025 - PRESENT",
      desc: [
        "Built and launched large-scale machine learning-driven conversion autobidding models at Google scale, influencing bidding decisions across millions of advertisers and users",
        "Integrated Google Gemini encoders into bidding models to enhance feature representation and improve prediction performance",
        "Led end-to-end model development (data, training, evaluation, and production launch) for Proxybidder ML systems, directly driving multi-million-dollar revenue impact through improved conversion efficiency",
      ],
    },
    "World Brain Technology": {
      jobTitle: "Software Engineer II @",
      duration: "NOV 2023 - JAN 2025",
      desc: [
        "Led the development of a generative AI solution using LLMs for advanced prompt engineering, improving SEO and ad relevance, and resulting in a 20% increase in click-through rates, ad revenue and business visibility",
        "Designed and developed an intuitive user interface for a prompt management system for 500K+ users, with key focus on accessibility, real-time collaboration features, and dynamic data visualization",
      ],
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "transparent",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "auto",
        minHeight: 300,
      }}
    >
      <Tabs
        orientation={!isMobile ? "vertical" : "horizontal"}
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: isMobile ? 0 : 1,
          borderBottom: isMobile ? 1 : 0,
          borderColor: "var(--lightest-navy)",
          "& .MuiTabs-indicator": {
            backgroundColor: "var(--green-bright)",
          },
          "& .MuiTabs-flexContainer": {
            borderBottom: isMobile ? "1px solid var(--lightest-navy)" : "none",
          },
        }}
      >
        {Object.keys(experienceItems).map((key, i) => (
          <Tab
            key={i}
            label={key}
            {...a11yProps(i, isMobile)}
            sx={{
              color: "var(--slate)",
              fontFamily: "NTR",
              fontSize: "14px",
              textAlign: isMobile ? "center" : "left",
              alignItems: isMobile ? "center" : "flex-start",
              textTransform: "none",
              padding: "10px 20px",
              minHeight: "48px",
              minWidth: isMobile ? "120px" : "auto",
              "&.Mui-selected": {
                color: "var(--green-bright)",
              },
              "&:hover": {
                color: "var(--green-bright)",
                backgroundColor: "var(--green-tint)",
              },
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 1 }}>
        {Object.keys(experienceItems).map((key, i) => (
          <TabPanel key={i} value={value} index={i} isMobile={isMobile}>
            <span className="font-['NTR'] text-[28px] font-bold text-(--lightest-slate) max-[800px]:text-[22px])">
              {experienceItems[key]["jobTitle"] + " "}
            </span>
            <span className="font-['NTR', sans-serif] text-[28px] font-bold text-(--green-bright)">
              {key}
            </span>
            <div className="font-['NTR', sans-serif] text-[18px] text-(--slate)">
              {experienceItems[key]["duration"]}
            </div>
            <ul className="list-none -ml-10 pt-6 max-w-162.5 font-['NTR',sans-serif] text-[20px]">
              {experienceItems[key].desc.map((descItem, i) => {
                return (
                  <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
                    <li className="relative pl-7.5 pb-4 text-[18px] text-(--slate) before:content-['▹'] before:absolute before:left-8 before:text-(--green-bright)">
                      <li className="pl-6">{descItem}</li>
                    </li>
                  </FadeInSection>
                );
              })}
            </ul>
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default JobList;
