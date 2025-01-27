import { IoClose } from "react-icons/io5";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modal-close-btn" onClick={onClose}>
          <IoClose className="modal-close-icon" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
