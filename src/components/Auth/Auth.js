import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Input from './Input';
import { useStyles } from './styles';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useDispatch} from 'react-redux';
// import Icon from './icon';
import { gapi } from 'gapi-script';
import { AUTH } from '../../redux/actionTypes';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../redux/actions/auth';
// clientId = "548511602786-k0qm1cibhns8p0hd689q1uo10js0mfur.apps.googleusercontent.com"
// seceretKey="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"

const Auth = () => {
    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [isEqual,setIsEqual] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {classes} = useStyles();


    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (isSignup) {
          dispatch(signup(formData, navigate));
        } else {
          dispatch(signin(formData, navigate));
        }
      };
    
    const handleChange = (e)=> {
        setIsEqual(true);
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const googleSuccess = async (res)=>{
        // console.log('google res = ',res);
        const user = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: AUTH, payload: { user, token } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    useEffect(() => {
        function start() {
          gapi.client.init({
            // apiKey: API_KEY,
            // clientId: CLIENT_ID,
            clientId:'548511602786-k0qm1cibhns8p0hd689q1uo10js0mfur.apps.googleusercontent.com',
            scope: '',
          });
        }
        // console.log('start');
        gapi.load('client:auth2', start);
        // const accessToken = gapi?.auth?.getToken()?.access_token;
        // console.log('google token = ',accessToken);
      }, []);

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
                <Grid container spacing={2}>
                { isSignup && (
                <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
                )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    { isSignup && (
                           <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                    )}
                    {!isEqual === true && isSignup && (
                    <Typography 
                        style={{
                        color:'red',
                        fontSize:"12px",
                        flex:'display',
                        justifyContent:"flex-start"
                        }}
                        pl={2}
                        >password not match</Typography>)}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
               <div style={{display:"flex",justifyContent:'center'}}>
               <GoogleLogin className={classes.googleButton}
                    clientId='548511602786-k0qm1cibhns8p0hd689q1uo10js0mfur.apps.googleusercontent.com'
                    buttonText='Sign in with Google'
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                    isSigned={true}
                />
               </div>
                <Grid container justify="flex-end" mb={-1} >
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;