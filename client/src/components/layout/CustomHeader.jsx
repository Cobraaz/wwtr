import { Helmet } from "react-helmet";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const defaultDescription =
  "Welcome to Wastewater Treatment Referee a tool for selecting between options for wastewater plants. We have collected over 30 parameters that might be important in selecting a new wastewater plant. In this tool you will decide what parameters are important to you and then rank how important those parameters for your project. Does your plant have a hard-to-reach limit? Do you need a new plant right now to handle new loading? Once you have decided on parameters you list wastewater plant options and score each option on how well it preforms against a parameter.";

const parameterDesciption =
  "In this step you should select any parameter that you want to consider. Anything you want to consider should be added here. There will be a chance to weight each parameter later so select all the ones now you want to think about. Each parameter has in information box next to it so you can see more information about it.";

const weightageDesciption =
  "In this step you weight the parameters by importance. 10 is the most important thing and one of those is allowed. 9 is the next most important with two spots. Each lower rank adds an additional spot to put a parameter down to 5. For 4 to 1 you can put any number of parameters. It is important to separate the parameters on the scale so you can see which wastewater plants give you the best fit to your needs.";

const scoreDesciption =
  "Here you will list up to 4 wastewater plant options you want to compare and score them against each parameter you selected. First select the number of options you want to evaluate. Next name each option. Then score the option against the parameters you selected. As you do this text in each 1 to 4 rating will help you estimate which score is right for that option. You don’t have to be sure just use a best estimate without digging into the data too much. In general, a score of 4 means that wastewater plant option is good at giving you results on that parameter and a 1 means it is not good at it.";

const resultDesciption =
  "The results section starts with an overview chart so you can see the best overall option. There is also a set of breakdown chart that let you look at the subcategories of operations, construction, permitting and so on. It you have more than two options you can turn off some of them to look at specific pairs to see the differences easier. If you prefer numbers over graphs, we have a tabulated sheet of both the overview and the detailed charts.";

const CustomHeader = () => {
  const { pathname } = useLocation();
  const [header, setHeader] = useState({
    title: "WWTR",
    description: defaultDescription,
  });

  useEffect(() => {
    if (pathname === "/parameters") {
      setHeader({
        title: "WWTR Parameters",
        description: parameterDesciption,
      });
    } else if (pathname === "/weightages") {
      setHeader({
        title: "WWTR Weightages",
        description: weightageDesciption,
      });
    } else if (pathname === "/scores") {
      setHeader({
        title: "WWTR Scores",
        description: scoreDesciption,
      });
    } else if (pathname === "/results") {
      setHeader({
        title: "WWTR Results",
        description: resultDesciption,
      });
    } else {
      setHeader({
        title: "WWTR",
        description: defaultDescription,
      });
    }
  }, [pathname]);

  return (
    <>
      <Helmet>
        <title>{header.title}</title>
        <meta
          name="description"
          key="description"
          content={header.description}
        />
        <meta name="title" key="title" content={header.title} />
        <meta property="og:title" key="og:title" content={header.title} />
        <meta property="og:locale" key="og:locale" content="en_IN" />
        <meta
          property="og:url"
          key="og:url"
          content={`${
            process.env.REACT_APP_BASE_URL ||
            "https://wwtr-react.azurewebsites.net"
          }${pathname}`}
        />
        <meta
          property="og:description"
          key="og:description"
          content={header.description}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Helmet>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet> */}
    </>
  );
};

export default CustomHeader;
