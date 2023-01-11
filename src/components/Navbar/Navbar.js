import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar,Box, Typography, Tooltip } from '@mui/material';
import Logo from '../../assets/memories.jpeg';
import { useLocation, useNavigate,Link } from 'react-router-dom';
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
        // eslint-disable-next-line 
    }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        {/* <Typography component={Link} to="/home" className={classes.heading} variant="h2" align="center" sx={{fontSize:{xs:'28px',md:'50px'},marginLeft:{xs:'-15px'}}}>Memories</Typography> */}
        <Typography className={classes.heading} variant="h2" align="center" sx={{fontSize:{xs:'28px',md:'50px'},marginLeft:{xs:'-15px'}}}>Memories</Typography>
        <Box ml={1}  sx={{ display: { xs: 'none', sm: 'block' } }}>
        <img className={classes.image} src={Logo} alt="icon" height="60"  />
        </Box>
      </div>
      <Toolbar className={classes.toolbar} sx={{marginRight:{xs:'-40px'}}}>
        {user?.result ? (
          <div className={classes.profile}>
           
            <Tooltip title="LogOut" arrow>
            <Avatar 
              className={classes.purple} 
              alt={user?.result.name} 
              src={user?.result.imageUrl}
              onClick={logout}
              style={{cursor:"pointer"}}
              
            >{user?.result.name.charAt(0)}</Avatar>
            </Tooltip>
           <Box ml={1}  sx={{ display: { xs: 'none', sm: 'block' } }}>
           <Typography className={classes.userName} variant="h6"  mt={-1} >{user?.result?.name}</Typography>
           <Typography className={classes.userName} variant="p" mt={-1}>{user?.result?.email}</Typography>
           </Box>
            {/* <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button> */}
          </div>
        ) : (
          <Button component={Link} to="/" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar