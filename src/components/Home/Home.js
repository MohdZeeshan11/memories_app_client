import React, { useEffect, useState } from 'react'
import { Container, Grid, Grow } from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { headersProvider } from '../../header';
import { GET_ALL_POSTS } from '../../redux/actionTypes';
import axios from 'axios';

const Home = () => {
    const [currentId,setCurrentId] = useState(null);
    const dispatch = useDispatch();

    
  useEffect(()=>{
    const getAllposts = async ()=>{
      try {
          const resp = await axios.get('https://memories-app-server-4apt.vercel.app/post',{
          // const resp = await axios.get('http://localhost:5000/post',{
            headers:headersProvider()
        });
          dispatch({
            type:GET_ALL_POSTS,
            payload: resp.data.posts
          })
      } catch (error) {
          console.log(error.message);
      }
    }
    getAllposts()
  },[dispatch]);
  return (
    <Grow in>
    <Container>
      <Grid   sx={{flexDirection:{xs:'column-reverse',sm:'row', md:'row'}}} mt={2} container justify="space-between"  alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={8}>
          <Posts currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form currentId={currentId} setCurrentId={setCurrentId}/>
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home;