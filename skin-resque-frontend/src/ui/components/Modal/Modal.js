import React from "react";
import styles from "./Modal.scss";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen, onSave }) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modal-header">
            <h5 className="dialog-heading">Dialog</h5>
          </div>
          <button className="btn-close" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modal-content-container">
            Are you sure you want to save the item?
          </div>
          <div className="btn-container">
            <div className="button-container">
              <button className="btn-save" onClick={() => {onSave(); setIsOpen(false)}}>
                Save
              </button>
              <button
                className="btn-cancel"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;