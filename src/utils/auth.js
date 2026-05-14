export const registerUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const loginUser = (username, password) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) return "NO_USER";

  if (
    storedUser.username === username &&
    storedUser.password === password
  ) {
    localStorage.setItem("isAuth", "true");
    return "SUCCESS";
  }

  return "INVALID";
};

export const logout = () => {
  localStorage.removeItem("isAuth");
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuth") === "true";
};