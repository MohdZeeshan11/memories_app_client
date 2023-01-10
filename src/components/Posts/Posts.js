import React from 'react'
import { CircularProgress, Grid } from '@mui/material';
import { useStyles } from "./styles";
import Post from './Post/Post';
import { useSelector } from 'react-redux';

const Posts = ({setCurrentId}) => {
  const posts = useSelector((state) => state.posts);
  
  console.log("postList ",posts);
  const classes = useStyles();
  return (
    <>{posts?.length===0?<CircularProgress />:
    (<Grid className={classes.container} container alignItems="stretch" spacing={3} >
        {posts?.map((post)=>
          <Grid key={post?._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        )}
      </Grid>)}
      </>
  )
}

export default Posts;