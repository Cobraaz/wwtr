import UserManagement from "components/UserManagement/UserManagement";
import { useDispatch, useSelector } from "react-redux";

const UserManagementPage = () => {
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  return <UserManagement auth={auth} users={users} dispatch={dispatch} />;
};

export default UserManagementPage;
