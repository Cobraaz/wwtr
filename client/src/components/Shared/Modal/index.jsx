import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Parser from "html-react-parser";
import {
  deleteUser,
  deletingLoggedInUser,
  removeAllUsers,
} from "store/slices/authSlice";
import { removeModal } from "store/slices/modalSlice";
import { useHistory } from "react-router";
import Cookies from "js-cookie";

const Modale = ({ showModal, toggleModal }) => {
  const { modal } = useSelector((state) => state.allModal);
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (modal.length !== 0) {
      for (const item of modal) {
        if (item.type === "DELETE_USER") {
          dispatch(deleteUser({ id: item.id, data: item.data }));
          if (user.id === item.id) {
            // deleting the logged In user
            Cookies.remove("refreshtoken");
            localStorage.removeItem("firstLogin");
            dispatch(removeAllUsers());
            dispatch(deletingLoggedInUser());
            history.replace("/");
          }
        }

        dispatch(removeModal());
      }
    }
  };
  return (
    <Modal isOpen={showModal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
        <span className="text-secondary text-capitalize">
          {modal.length > 0 &&
            modal[0].title &&
            modal[0].title.split(" ").slice(0, 4).join(" ")}
        </span>
      </ModalHeader>
      <ModalBody>
        <span className="text-secondary">
          {Parser(modal.length > 0 ? modal[0].text : "")}
        </span>
      </ModalBody>
      <ModalFooter>
        <button
          className="buttonModal btn-danger"
          onClick={() => {
            toggleModal();
            handleSubmit();
          }}
        >
          Yes
        </button>
        <button className="buttonModal btn-primary" onClick={toggleModal}>
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

export default Modale;
