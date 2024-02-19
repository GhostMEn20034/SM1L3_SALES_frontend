import axios from 'axios';
import { useEffect, useContext } from 'react';
import GoogleLogo from '../../google.svg';
import { Button, Box } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';


export default function GoogleLogin() {

  let baseURL = process.env.REACT_APP_BASE_URL_USERS;

  const {setUser, setAuthTokens} = useContext(AuthContext);

  const navigate = useNavigate();

  let getGoogleAuthLink = async () => {
    try {
      let res = await axios.get(`${baseURL}/api/auth/social/o/google-oauth2/?redirect_uri=${window.location.origin}/signin`, { withCredentials: true });
      let link = await res.data.authorization_url;
      localStorage.setItem("afterOAuthLogin", true);
      window.location.assign(link);
    } catch (err) {
      console.log("Unable to login with google");
    }

  }

  let googleAuth = async () => {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let res = await axios.post(`${baseURL}/api/auth/social/o/google-oauth2/`, urlParams, { headers: headers, withCredentials: true });
      let data = await res.data;
      localStorage.removeItem("afterOAuthLogin");
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.log("Something went wrong");
    }
    
  }

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let code = urlParams.get("code");
    let auth_state = urlParams.get("state");
    let afterOAuthLogin = localStorage.getItem("afterOAuthLogin");
    if (code && auth_state && afterOAuthLogin) {
      googleAuth();
    }
  }, [])


  return (
    <>
    <Box sx={{display:'flex', alignItems: "center", justifyContent: "center"}}>
      <Button onClick={getGoogleAuthLink} variant='contained'
      startIcon={<img src={GoogleLogo} 
      alt="Google logo"/>}
      sx={{
        color: '#0d0d0d',
        borderColor: '#E8E8E8',
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: '#F8F9FA',
        },
        '& img': {
          width: '32px',
          height: '32px',
        },
        borderRadius: '20px',
      }}
      >
      Continue with Google
      </Button>
      </Box>
    </>
  )
}