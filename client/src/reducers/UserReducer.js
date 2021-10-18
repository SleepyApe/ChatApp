export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("usr", JSON.stringify(action.user));
      return { ...state, isAuth: true, username: action.user };
    case "LOGOUT":
      localStorage.removeItem("usr");
      return { ...state, isAuth: false, username: "" };
    default:
      return state;
  }
};
