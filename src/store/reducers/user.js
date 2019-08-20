import { INIT_REGISTER, INIT_PROFILE_UPDATE, INIT_LOGIN } from 'store/actionMiddleware';

const initialState = {
  currentUser: {},
};

export const RECIEVE_CURRENT_USER = 'RECIEVE_CURRENT_USER';
export const CONFIRM_REGISTER = 'CONFIRM_REGISTER';
export const CONFIRM_PROFILE_UPDATED = 'CONFIRM_PROFILE_UPDATED';
export const ERROR_PROFILE_UPDATED = 'ERROR_PROFILE_UPDATED';
export const CONFIRM_LOGIN = 'CONFIRM_LOGIN';

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case RECIEVE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.data,
      };
    case INIT_REGISTER:
      return {
        ...state,
        isRegistered: false,
      };
    case CONFIRM_REGISTER:
      console.log('confirm register !');
      return {
        ...state,
        isRegistered: true,
      };
    case INIT_PROFILE_UPDATE:
      return {
        ...state,
        profileUpdated: null,
      };
    case CONFIRM_PROFILE_UPDATED:
      return {
        ...state,
        profileUpdated: true,
      };
    case ERROR_PROFILE_UPDATED:
      return {
        ...state,
        profileUpdated: false,
      };
    case INIT_LOGIN:
      return {
        ...state,
        isLogged: false,
      };
    case CONFIRM_LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    default:
      return state;
  }
};

export const recieveCurrentUser = data => ({
  type: RECIEVE_CURRENT_USER,
  data,
});

export const initRegister = () => ({
  type: INIT_REGISTER,
});
export const confirmRegister = () => ({
  type: CONFIRM_REGISTER,
});
export const errorProfileUpdated = () => ({
  type: ERROR_PROFILE_UPDATED,
});

export const initProfileUpdate = () => ({
  type: INIT_PROFILE_UPDATE,
});
export const confirmProfileUpdated = () => ({
  type: CONFIRM_PROFILE_UPDATED,
});

export const initLogin = () => ({
  type: INIT_LOGIN,
});
export const confirmLogin = () => ({
  type: CONFIRM_LOGIN,
});

export default user;
