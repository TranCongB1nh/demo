// Save token in sessionStorage
export const saveToken = (token) => {
  sessionStorage.setItem("userToken", token);
};

// Get token from sessionStorage
export const getToken = () => {
  return sessionStorage.getItem("userToken");
};

// Remove token from sessionStorage
export const removeToken = () => {
  sessionStorage.removeItem("userToken");
};

// Save user data in sessionStorage
export const saveUserData = (userData) => {
  sessionStorage.setItem("currentUser", JSON.stringify(userData));
};

// Get user data from sessionStorage
export const getUserData = () => {
  return JSON.parse(sessionStorage.getItem("currentUser") || "{}");
};

// Remove user data from sessionStorage
export const removeUserData = () => {
  sessionStorage.removeItem("currentUser");
};
