import { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const toggle = () => setShowModal(!showModal);
  return (
    <>
      <div className="row AB-row">
        <div className="landing-banner-wrap">
          <div className="col-12 px-0">
            <img src="/images/body-bg-landing.svg" alt="body-bg-landing" />
            <div className="landing-banner-content px-4 pl-lg-4 ">
              <div className="content pl-1">
                <div className="carousel-caption-inner pt-5  my-auto">
                  <h2 className="banner-titile py-3 mb-4 pt-4">
                    Waste Water <br />
                    Treatment Referee
                  </h2>
                  <p className="text-white mb-5">
                    Welcome to Wastewater Treatment Referee a tool for selecting
                    between options for wastewater plants. We have collected
                    over 30 parameters that might be important in selecting a
                    new wastewater plant. In this tool you will decide what
                    parameters are important to you and then rank how important
                    those parameters for your project. Does your plant have a
                    hard-to-reach limit? Do you need a new plant right now to
                    handle new loading? Once you have decided on parameters you
                    list wastewater plant options and score each option on how
                    well it preforms against a parameter.
                  </p>
                  <Button
                    className="btn text-white mt-5 px-5 btn-style btn-style-active-landing"
                    onClick={toggle}
                  >
                    Continue as Guest
                  </Button>
                  <Modal isOpen={showModal} toggle={toggle}>
                    <ModalHeader toggle={toggle}></ModalHeader>
                    <ModalBody>Work In Progress...</ModalBody>
                  </Modal>
                </div>
              </div>
              <div className="scroll-icon"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row AB-row">
        <div className="col-6 px-0">
          <img src="/images/sec-1.svg" alt="sec-1" />
        </div>
        <div className="col-6 right-content pl-0">
          <div className="section-content text-right pr-5 pl-4">
            <h2 className="xl-text">01</h2>
            <h2 className="main-title-layout mb-4">
              Parameter: Choosing Which Parameters to think about <br />
            </h2>
            <p>
              In this step you should select any parameter that you want to
              consider. Anything you want to consider should be added here.
              There will be a chance to weight each parameter later so select
              all the ones now you want to think about. Each parameter has in
              information box next to it so you can see more information about
              it.
            </p>
          </div>
        </div>
      </div>
      <div className="row AB-row">
        <div className="col-6 px-0 right-content">
          <div className="section-content text-left pr-4 pl-5">
            <h2 className="xl-text xl-text-left text-left">02</h2>
            <h2 className="main-title-layout mb-4">
              Weight: Which Parameters Matter Most
            </h2>
            <p className="text-left">
              In this step you weight the parameters by importance. 10 is the
              most important thing and one of those is allowed. 9 is the next
              most important with two spots. Each lower rank adds an additional
              spot to put a parameter down to 5. For 4 to 1 you can put any
              number of parameters. It is important to separate the parameters
              on the scale so you can see which wastewater plants give you the
              best fit to your needs.
            </p>
          </div>
        </div>
        <div className="col-6 px-0">
          <img src="/images/sec-2.svg" alt="sec-2" />
        </div>
      </div>
      <div className="row AB-row">
        <div className="col-6 px-0">
          <img src="/images/sec-3.svg" alt="sec-1" />
        </div>
        <div className="col-6 right-content px-0">
          <div className="section-content text-right pr-5 pl-4">
            <h2 className="xl-text">03</h2>
            <h2 className="main-title-layout">
              Options and Scoring: Time to compare options
            </h2>
            <p>
              Here you will list up to 4 wastewater plant options you want to
              compare and score them against each parameter you selected. First
              select the number of options you want to evaluate. Next name each
              option. Then score the option against the parameters you selected.
              As you do this text in each 1 to 4 rating will help you estimate
              which score is right for that option. You don’t have to be sure
              just use a best estimate without digging into the data too much.
              In general, a score of 4 means that wastewater plant option is
              good at giving you results on that parameter and a 1 means it is
              not good at it.
            </p>
          </div>
        </div>
      </div>
      <div className="row AB-row">
        <div className="col-6 px-0 right-content">
          <div className="section-content text-left pr-4 pl-5">
            <h2 className="xl-text xl-text-left text-left ">04</h2>
            <h2 className="main-title-layout mb-4">Results</h2>
            <p className="text-left">
              The results section starts with an overview chart so you can see
              the best overall option. There is also a set of breakdown chart
              that let you look at the subcategories of operations,
              construction, permitting and so on. It you have more than two
              options you can turn off some of them to look at specific pairs to
              see the differences easier. If you prefer numbers over graphs, we
              have a tabulated sheet of both the overview and the detailed
              charts.
            </p>
          </div>
        </div>
        <div className="col-6 px-0">
          <img src="/images/sec04.svg" alt="sec04" />
        </div>
      </div>
    </>
  );
};

export default Home;
