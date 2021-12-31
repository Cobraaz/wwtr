import { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./ProgressBar.component.css";
import "react-step-progress-bar/styles.css";

const ParameterNavbar = ({
  dataScrollTo = [
    "permit consideration",
    "design",
    "implementation",
    "operation",
    "community",
  ],
}) => {
  const navbarEl = useRef(null);
  const [position, setPosition] = useState(0);
  function getScrollValue() {
    setPosition(Math.round(getVerticalScrollPercentage(document.body)));
  }

  function myFunction() {
    let navbar = navbarEl.current;

    if (
      navbar &&
      window.pageYOffset >= navbar.offsetTop &&
      window.pageYOffset > 250
    ) {
      if (!navbar.classList.contains("sticky")) navbar.classList.add("sticky");
    } else if (navbar.classList) {
      navbar.classList.remove("sticky");
    }
  }

  function getVerticalScrollPercentage(elm) {
    var p = elm.parentNode;
    return (
      ((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)) * 100
    );
  }

  useEffect(() => {
    window.addEventListener("scroll", myFunction);
    window.addEventListener("scroll", getScrollValue);
    return () => {
      window.removeEventListener("scroll", myFunction);
      window.removeEventListener("scroll", getScrollValue);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={navbarEl} id="AB-navbar">
      <ProgressBar percent={position} filledBackground="#03a9f4">
        <Step transition="scale">
          {({ accomplished }) => (
            <Link
              offset={-500}
              to={dataScrollTo[0]}
              spy={true}
              smooth={true}
              duration={500}
              className="AB-step"
              style={{
                backgroundColor: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
              }}
            >
              <i
                style={{
                  backgroundColor: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
                  maxWidth: "50px",
                }}
                className="ri-shield-user-fill AB-step-icon"
              ></i>
            </Link>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <Link
              offset={-350}
              to={dataScrollTo[1]}
              spy={true}
              smooth={true}
              duration={500}
              className="AB-step"
              style={{
                backgroundColor: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
              }}
            >
              <i
                style={{
                  maxWidth: "50px",
                  backgroundColor: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
                }}
                className="ri-pencil-ruler-2-line AB-step-icon"
              ></i>
            </Link>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <Link
              offset={-400}
              to={dataScrollTo[2]}
              spy={true}
              smooth={true}
              duration={500}
              className="AB-step"
              style={{
                backgroundColor: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
              }}
            >
              <i
                style={{
                  backgroundColor: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
                  maxWidth: "50px",
                }}
                className="ri-test-tube-fill AB-step-icon"
              ></i>
            </Link>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <Link
              offset={-400}
              to={dataScrollTo[3]}
              spy={true}
              smooth={true}
              duration={500}
              className="AB-step"
              style={{
                backgroundColor: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
              }}
            >
              <i
                style={{
                  backgroundColor: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
                  maxWidth: "50px",
                }}
                className="ri-service-fill AB-step-icon"
              ></i>
            </Link>
          )}
        </Step>
        <Step>
          {({ accomplished }) => (
            <Link
              to={dataScrollTo[4]}
              spy={true}
              smooth={true}
              duration={500}
              className="AB-step"
              style={{
                backgroundColor: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
              }}
            >
              <i
                style={{
                  maxWidth: "50px",
                  backgroundColor: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
                }}
                className="ri-community-fill AB-step-icon"
              ></i>
            </Link>
          )}
        </Step>
      </ProgressBar>
      <div className="mt-5">
        <ProgressBar
          percent={position}
          filledBackground="white"
          unfilledBackground="white"
        >
          <Step transition="scale">
            {({ accomplished }) => (
              <div
                style={{
                  color: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
                  fontWeight: "bold",
                }}
              >
                Permit Consideration
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div
                style={{
                  fontWeight: "bold",
                  color: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
                }}
              >
                Design
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div
                style={{
                  fontWeight: "bold",
                  color: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
                }}
              >
                Implementation
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div
                style={{
                  fontWeight: "bold",
                  color: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
                }}
              >
                Operation
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div
                style={{
                  fontWeight: "bold",
                  color: `${accomplished ? "#03a9f4" : "#d8dadf"}`,
                }}
              >
                Community
              </div>
            )}
          </Step>
        </ProgressBar>
      </div>
    </div>
  );
};

export default ParameterNavbar;
