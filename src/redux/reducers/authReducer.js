
import { AUTH, LOGOUT } from "../actionTypes";

const authUser = (state = { authData: null }, action) => {
  // console.log('payload = ',action.payload);
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({...action?.payload}));
      return { ...state, authData: action.payload, loading: false, errors: null };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authUser;