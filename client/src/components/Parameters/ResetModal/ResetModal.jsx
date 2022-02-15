import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useDispatch } from "react-redux";
import { resetParameters } from "store/slices/paramWeightagesSlice";

const ResetModal = ({ showResetModal, toggleResetModal, history }) => {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(resetParameters());
    history.push("/parameters");
  };

  return (
    <Modal isOpen={showResetModal} toggle={toggleResetModal}>
      <ModalHeader toggle={toggleResetModal}>
        <span className="text-secondary text-capitalize">Reset</span>
      </ModalHeader>
      <ModalBody>
        <span className="text-secondary">Are you sure you want to reset?</span>
      </ModalBody>
      <ModalFooter>
        <button
          className="buttonModal btn-danger"
          onClick={() => {
            toggleResetModal();
            handleSubmit();
          }}
        >
          Yes
        </button>
        <button className="buttonModal btn-primary" onClick={toggleResetModal}>
          Cancel
        </button>
      </ModalFooter>

      <style>{`
    .buttonModal {
      color: white;
      padding: 7px 20px;
      font-size: 1em;
      border-radius: 50px;
      border: none;
      cursor: pointer;
      font-weight: bold;
      margin-top: 20px;
      outline: none !important;
    }
  `}</style>
    </Modal>
  );
};

export default ResetModal;
