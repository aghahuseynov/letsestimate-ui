import React, { ReactNode } from "react";
import styles from "./modal.module.css";

interface ModalType {
  isOpen: boolean;
  toggle: () => void;
  children: ReactNode;
  title: string;
}

const Modal = ({ children, isOpen, toggle, title }: ModalType) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={toggle}>
          <div onClick={(e) => e.stopPropagation()} className={styles.modalBox}>
            <div className={styles.modalHeader}><h1>{title}</h1></div>
            <div className={styles.modalBody}><p>{children}</p></div>
            <div className={styles.modalFooter}>
              <button onClick={toggle} id={styles.button} className="btn-blank ">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
