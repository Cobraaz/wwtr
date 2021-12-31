import ReactSearchBox from "react-search-box";
import { Button } from "reactstrap";
const UserTableHeader = ({
  filterUser,
  setTableUser,
  allUser,
  handleUpdateUser,
  tableUser,
  setOnSearchValue,
}) => {
  return (
    <div
      className="mt-3 ml-5 mr-5"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: "100",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <label className="mr-3">All Users - {allUser.length}</label>
        <ReactSearchBox
          placeholder="Search for name"
          data={filterUser}
          // onSelect={(record) => {
          //   console.log(record.item.data);
          // setTableUser([record.item.data]);
          //   console.log(tableUser);
          // }}
          // onFocus={() => {
          //   console.log("This function is called when is focussed");
          // }}
          onChange={(value) => {
            const resultUser = tableUser.filter((user) => {
              if (
                user.name
                  .replace(/\s+/g, "")
                  .toLowerCase()
                  .includes(value.replace(/\s+/g, "").toLowerCase())
              ) {
                return user;
              }
              // eslint-disable-next-line
              return;
            });

            setOnSearchValue(resultUser);

            setTableUser(resultUser);

            if (!value) {
              setOnSearchValue([]);
              setTableUser(allUser);
            }
          }}
          leftIcon={
            <>
              <i className="ri-search-line"></i>
            </>
          }
          iconBoxSize="48px"
        />
      </div>

      <Button
        style={{ marginLeft: "auto" }}
        onClick={() => handleUpdateUser()}
        className="btn-style theme-btn text-white btn-design"
      >
        Update Users
      </Button>
    </div>
  );
};

export default UserTableHeader;
