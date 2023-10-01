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
            <div className={styles.modalHeader}>
              <h2>{title}</h2>
            </div>
            <div className={styles.modalBody}>
              <p>{children}</p>
            </div>
            <div className={styles.modalFooter}>
              <div className={styles.buyMeCoffee}>
                <a
                  href="https://www.buymeacoffee.com/aghahuseynov"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    style={{
                      height: "40px",
                      width: "150px",
                    }}
                    src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png"
                    alt="Buy Me A Coffee"
                  />
                </a>
              </div>
              <button onClick={toggle} className={styles.closeButton}>
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
