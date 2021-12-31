export const SortSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M8 10v4h4l-6 7-6-7h4v-4h-4l6-7 6 7h-4zm16 5h-10v2h10v-2zm0 6h-10v-2h10v2zm0-8h-10v-2h10v2zm0-4h-10v-2h10v2zm0-4h-10v-2h10v2z" />
  </svg>
);

export function sortName(users, setInitialUser, setRefreshValues) {
  let sortname = window.__isSortName || false;
  if (!window.__isSortName) window.__isSortName = false;
  let result;
  if (!sortname) {
    result = users.sort((a, b) => {
      let fa = a.fullname.toLowerCase(),
        fb = b.fullname.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    window.__isSortName = true;
  } else {
    result = users.sort((a, b) => {
      let fa = a.fullname.toLowerCase(),
        fb = b.fullname.toLowerCase();

      if (fb < fa) {
        return -1;
      }
      if (fb > fa) {
        return 1;
      }
      return 0;
    });
    window.__isSortName = false;
  }

  setInitialUser(result);
  setRefreshValues((preValue) => !preValue);
}

export function sortNumber(users, setInitialUser, setRefreshValues) {
  let sortNumber = window.__isSortNumber || false;
  if (!window.__isSortNumber) window.__isSortNumber = false;
  let result;
  if (!sortNumber) {
    result = users.sort((a, b) => {
      let fa = a._id.toLowerCase(),
        fb = b._id.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    window.__isSortNumber = true;
  } else {
    result = users.sort((a, b) => {
      let fa = a._id.toLowerCase(),
        fb = b._id.toLowerCase();

      if (fb < fa) {
        return -1;
      }
      if (fb > fa) {
        return 1;
      }
      return 0;
    });
    window.__isSortNumber = false;
  }

  setInitialUser(result);
  setRefreshValues((preValue) => !preValue);
}

export function sortEmail(users, setInitialUser, setRefreshValues) {
  let sortname = window.__isSortEmail || false;
  if (!window.__isSortEmail) window.__isSortEmail = false;
  let result;
  if (!sortname) {
    result = users.sort((a, b) => {
      let fa = a.email.toLowerCase(),
        fb = b.email.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    window.__isSortEmail = true;
  } else {
    result = users.sort((a, b) => {
      let fa = a.email.toLowerCase(),
        fb = b.email.toLowerCase();

      if (fb < fa) {
        return -1;
      }
      if (fb > fa) {
        return 1;
      }
      return 0;
    });
    window.__isSortEmail = false;
  }

  setInitialUser(result);
  setRefreshValues((preValue) => !preValue);
}

export function sortRegistrationDate(users, setInitialUser, setRefreshValues) {
  let sortname = window.__isRegistrationDate || false;
  if (!window.__isRegistrationDate) window.__isRegistrationDate = false;
  let result;
  if (!sortname) {
    result = users.sort((a, b) => {
      let da = new Date(a.joinedDate),
        db = new Date(b.joinedDate);
      return da - db;
    });
    window.__isRegistrationDate = true;
  } else {
    result = users.sort((a, b) => {
      let da = new Date(a.createdAt),
        db = new Date(b.createdAt);
      return db - da;
    });
    window.__isRegistrationDate = false;
  }

  setInitialUser(result);
  setRefreshValues((preValue) => !preValue);
}
