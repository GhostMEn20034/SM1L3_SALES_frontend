import axios from 'axios'
import dayjs from 'dayjs'
import jwt_decode from "jwt-decode";
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const baseUrl = process.env.REACT_APP_BASE_URL;


const useAxios = () => {
    const {logoutUser, authTokens, setUser, setAuthTokens} = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL: baseUrl,
    });

    axiosInstance.interceptors.request.use(async req => {
    
        const user = authTokens ? jwt_decode(authTokens?.access) : null;

        if (!user) {
            return req;
        }

        let date = new Date()
        let current_date = new Date(date.toUTCString()).getTime()
        let isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if(!isExpired) {
            console.log(`user exp ` + `${user.exp}`)
            console.log(`current date ` + `${current_date / 1000}`)
            req.headers.Authorization = `Bearer ${authTokens?.access}`;
            return req
        } 
        console.log(new Date(user.exp * 1000) > current_date)
        console.log(user.exp)
        console.log(`Now ---- ${current_date}`);
        console.log(`User exp ---- ${new Date(user.exp * 1000)}`)
        console.log("Expired")

        try {
            let response = await axios.post(`${baseUrl}/api/auth/token/refresh/`, {
                refresh: authTokens.refresh,
            });
        
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            
            setAuthTokens(response.data)
            setUser(jwt_decode(response.data.access))
            
            req.headers.Authorization = `Bearer ${response.data.access}`;
            return req
        } catch (error) {
            if (error.response.status === 401) {
                
                logoutUser();
                window.location.assign("/");
                return Promise.reject("Session Expired")
            } else {
                logoutUser();
                return Promise.reject("Entered invalid token");
            }
        }

    })
    

    // response interceptor
    return axiosInstance
}

export default useAxios;