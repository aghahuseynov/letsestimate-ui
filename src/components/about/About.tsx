import React from "react";
import Modal from "../modal/Modal";
import useModal from "../modal/useModal";
import {BsQuestionCircle} from 'react-icons/bs'
import AboutStyles from "./about.module.css";


const About = () => {
  const { isOpen, toggle } = useModal();

  return (
    < >
      <button className='btn-blank' onClick={toggle}>
        <div className={AboutStyles.aboutIcon}>   <BsQuestionCircle/></div>
      
      </button>
      <Modal title="About" isOpen={isOpen} toggle={toggle}>
        <p>about</p>
      </Modal>
    </>
  );
};

export default About;
