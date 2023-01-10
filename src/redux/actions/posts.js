import { CREATE_POST, DELETE_POST, GET_ALL_POSTS, LIKE_POST, UPDATE_POST } from '../actionTypes.js';
import * as api from '../../api/index';
// import { useDispatch } from 'react-redux';

// const dispatch = useDispatch();

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    console.log('data = ',data);
    dispatch({ type: GET_ALL_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// export const fetchPosts = () => async dispatch => {
//     const response  = await jsonPlaceholder.get('/posts');
    
//     dispatch({type: 'FETCH_POSTS', payload: response })
// } 

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    console.log(error);
  }
};