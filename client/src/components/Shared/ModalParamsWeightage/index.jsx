import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

const ModalParamsWeightage = ({ text, path }) => {
  const [showModal, setShowModal] = useState(true);
  const toggleModal = () => {
    setShowModal(!showModal);
    handleSubmit();
  };
  const history = useHistory();
  const handleSubmit = () => {
    history.replace(path);
  };
  return (
    <Modal fullscreen="lg" isOpen={showModal} toggle={toggleModal}>
      <ModalBody>
        <span className="text-secondary font-weight-bold">{text}</span>
      </ModalBody>
      <ModalFooter>
        <button
          className="buttonModal"
          onClick={() => {
            toggleModal();
            handleSubmit();
          }}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          OK
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
      outline: none !important;
      background-color: #03a9f4;
    }
  `}</style>
    </Modal>
  );
};

export default ModalParamsWeightage;
