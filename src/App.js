import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

function App() {
  const [user, setUser] = useState();


  let getGoogleAuthLink = async () => {
    try {
      let res = await axios.get(`http://localhost:8000/api/auth/social/o/google-oauth2/?redirect_uri=${document.URL}`, { withCredentials: true });
      let link = await res.data.authorization_url;
      console.log(res.headers);
      localStorage.setItem("afterOAuthLogin", true);
      window.location.assign(link);
    } catch (err) {
      console.log("Unable to login with login");
    }

  }

  let googleAuth = async () => {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let res = await axios.post(`http://localhost:8000/api/auth/social/o/google-oauth2/`, urlParams, { headers: headers, withCredentials: true });
      let data = await res.data;
      setUser(res.data.user)
      console.log(data);
      localStorage.removeItem("afterOAuthLogin");
      
      // window.location.assign("http://localhost:3000");
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
    console.log(afterOAuthLogin)
    if (code && auth_state && afterOAuthLogin) {
      googleAuth();
    }
  }, [])

  

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Button onClick={getGoogleAuthLink} variant='contained'>Continue with Google</Button>
      {user && (
      <Typography variant='overline'>You logged as {user}</Typography>
      )}
    </Box>
  );
}

export default App;
