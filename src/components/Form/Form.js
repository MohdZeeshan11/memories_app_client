import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useStyles } from "./styles";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/posts';


const Form = ({currentId,setCurrentId}) => {
    const [postData,setPostData] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    })
    const dispatch = useDispatch();
    const {classes} = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);
    
      const clear = () => {
        setCurrentId(0);
        setPostData({ creator:'', title: '', message: '', tags: '', selectedFile: '' });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId === 0) {
          dispatch(createPost({ ...postData, name: user?.result?.name }));
          clear();
        } else {
          dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
          clear();
        }
      };

      const changeHandler = (e)=> {
        setPostData({ ...postData, [e.target.name]: e.target.value })
    }


  return (
    <Paper className={classes.paper} >
        <form  className={`${classes.root} ${classes.form}`} autoComplete='off' noValidate  onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? `Editing "${postData?.title}"` : 'Creating a Memory'}</Typography>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData?.creator} 
                onChange={changeHandler} />
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData?.title}
                onChange={changeHandler}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData?.message}
                onChange={changeHandler}/>
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData?.tags}
                onChange={(e)=> setPostData({ ...postData, tags: e.target.value.split(',') })}/>
            <div className={classes.fileInput} >
                <FileBase style={{width:'100%'}} type="file" multiple={false} onDone={({ base64 })=>setPostData({ ...postData, selectedFile: base64 })}/>
            </div>
            <Button
                className={classes.buttonSubmit}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
            >
            Submit
            </Button>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                fullWidth
                onClick={clear}
            >
            Clear
            </Button>
      </form>
    </Paper>
  )
}

export default Form;