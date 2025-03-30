import {
  LOGIN,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_FAILURE,
  RESET_SIGNUP_MESSAGE,
} from "../userActionTypes";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  registrationMessage: null,
  error: null, // Lưu thông báo lỗi
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        error: null, // Reset lỗi khi đăng nhập thành công
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload, // Lưu thông báo lỗi
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        error: null, // Xóa lỗi khi logout
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        registrationMessage: action.payload,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_SIGNUP_MESSAGE:
      return {
        ...state,
        registrationMessage: null,
      };
    default:
      return state;
  }
}
