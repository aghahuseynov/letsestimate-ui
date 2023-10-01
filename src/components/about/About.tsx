import React from "react";
import Modal from "../modal/Modal";
import useModal from "../modal/useModal";
import { BsQuestionCircle } from "react-icons/bs";
import AboutStyles from "./about.module.css";

const About = () => {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <button className="btn-blank" onClick={toggle}>
        <div className={AboutStyles.aboutIcon}>
          <BsQuestionCircle />
        </div>
      </button>
      <Modal title="About" isOpen={isOpen} toggle={toggle}>
        <p className={AboutStyles.subtitle}>
          Let`s Estimate is an open-source and free application that relies on
          financial support to remain accessible and ensure timely fixes for new
          features and bugs. The current monthly expense for maintaining the
          project is only 5 euros.
        </p>
        <p className={AboutStyles.subtitle}>
          By donating just 5 euros, you can help sustain the website and support
          its long-term development. Please feel free to click the `Buy me a
          coffee` button to make a donation. Your support is greatly
          appreciated!
        </p>
      </Modal>
    </>
  );
};

export default About;
