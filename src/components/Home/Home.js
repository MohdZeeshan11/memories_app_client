import React, { useEffect, useState } from 'react'
import { Container, Grid, Grow } from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../redux/actions/posts';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
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