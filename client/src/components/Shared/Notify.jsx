import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeNotify } from "store/slices/notifySlice";

const Notify = () => {
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notify);

  const handleShow = () => dispatch(removeNotify());
  const { toastMsg } = notify;
  const showToast = () => {
    if (toastMsg.error) {
      toast.error(toastMsg.error, {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        onClose: handleShow,
        theme: "colored",
      });
    } else if (toastMsg.success) {
    }
    toast.success(toastMsg.success, {
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      onClose: handleShow,
      theme: "colored",
    });
  };
  return <>{showToast()}</>;
};

export default Notify;
