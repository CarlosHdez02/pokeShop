import "./AdditionModal.css";

export interface AdditionModalInterface {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AdditionModal = ({ message, isOpen, onClose }: AdditionModalInterface) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="addition-modal-content">
        <button onClick={onClose} className="close-button">✖</button>
        <h2 className="modal-title">Congrats! 🎉</h2>
        <p className="modal-message">You just {message}</p>
      </div>
    </div>
  );
};

export default AdditionModal;
