import { combineReducers } from 'redux';
import postData from './postReducer';
import authUser from './authReducer';

const rootReducer = combineReducers({
  postData,
  authUser,
})

export default rootReducer;