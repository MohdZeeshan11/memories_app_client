import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Container, Toolbar, Typography } from '@mui/material';
import Logo from '../../assets/memories.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStyles } from './styles';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../redux/actionTypes';
import decode from 'jwt-decode';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // console.log('userLoginData = ',user);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {classes} = useStyles();

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        if (token) {
          const decodedToken = decode(token);
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]); 

  return (
    <Container>
        <AppBar className={classes.appBar} position="static" color="inherit">
            {/* <Typography variant='h2' className={classes.heading} align='center'  >MEMORIES</Typography> */}
            <div className={classes.brandContainer}>
                <Typography to="/home" className={classes.heading} variant="h2" align="center" sx={{fontSize:{xs:'30px',md:'50px'}}} >Memories</Typography>
                <img className={classes.image} src={Logo} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user?.user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.user?.name} src={user?.user?.imageUrl}>{user?.user?.name?.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.user?.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
                ) : (
                <Button to="/" variant="contained" color="primary" onClick={()=>navigate('/')}>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    </Container>
  )
}

export default Navbar