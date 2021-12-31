import Contact from "components/Shared/Footer/Contact";
import { useState } from "react";

const Footer = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const toggleContactForm = () => {
    if (!showContactForm) {
      document.getElementById("nb-form").style.bottom = "8rem";
    } else {
      document.getElementById("nb-form").style.bottom = "-40rem";
    }
    setShowContactForm(!showContactForm);
  };
  return (
    <>
      <footer
        className="row footer_wrapper mx-0 mt-auto"
        style={{ backgroundColor: "#4f9ee1" }}
      >
        <Contact toggleContactForm={toggleContactForm} />
        <div className="col-12 mt-1">
          <div onClick={toggleContactForm} className="chatIcon"></div>
          <p className="text-white mb-0 py-1">
            Ramboll Group A/S © 2020 - 2021 All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
