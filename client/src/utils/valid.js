const valid = (name, company_name, email, password, cf_password) => {
  if (!name || !company_name || !email || !password)
    return "Please add all fields.";

  if (!validateEmail(email)) return "Invalid emails.";
  if (!validatePassword(password))
    return "Password must have at least one alphabet letter, one number, and one special character.";

  if (password.length < 6) return "Password must be at least 6 characters.";

  if (password !== cf_password) return "Confirm password did not match.";
};

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export function validatePassword(password) {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return re.test(String(password).toLowerCase());
}

export const isLength = (password) => {
  if (password.length < 6) return true;
  return false;
};

export const isMatch = (password, cf_password) => {
  if (password === cf_password) return true;
  return false;
};

export default valid;
