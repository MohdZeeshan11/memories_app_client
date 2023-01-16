import * as api from '../../api/index';
import { AUTH } from '../actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log(data);
    dispatch({ type: AUTH, data });
    navigate('/home')
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate('/home');
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};