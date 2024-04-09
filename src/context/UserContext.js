import { createContext, useState, useContext, useEffect } from "react";

import AuthContext from "./AuthContext";
import useAxios from "../utils/useAxios";

// Create a UserContext with an empty object as the default value
const UserContext = createContext({});

// Create a UserProvider component that wraps the children components and provides the user info and update function
export function UserProvider({ children }) {

    // Use a state to store the user info
    const [userInfo, setUserInfo] = useState(null);

    const { user } = useContext(AuthContext);
    // Define a function that updates the user info with new data

    const updateUserInfo = (newData) => {
      // Use the spread operator to merge the new data with the existing user info
      setUserInfo({ ...userInfo, ...newData });
    };

    const api = useAxios();

    const fetchUserInfo = async () => {
      let params = {};
      let apiRoute = `/api/user/full-info/`;
      let cartUuid = localStorage.getItem("cartUuid");
      if (!user && cartUuid) {
          params.cart_uuid = cartUuid;
      }

      try {
        // Await the response from the API
        let response = await api.get(apiRoute, {params});
        let data = await response.data;
        updateUserInfo(data);

        if (!user) {
          localStorage.setItem('cartUuid', data?.cart_uuid)
        }

        console.log(data);
      } catch {
        updateUserInfo({});
      }
    }

    const refreshCartData = async () => {
        let cartUuid = userInfo?.cart?.cart_uuid || localStorage.getItem("cartUuid");
        
        try {
            let response  = await api.get(`/api/carts/${cartUuid}/short-info/`);
            let data = await response.data;
            updateUserInfo({"cart": data});
        } catch {
            updateUserInfo({});
        }
    };

    const refreshUserInfo = () => {
      fetchUserInfo();
    };



    useEffect(() => {
      fetchUserInfo();
    }, []);

    // Return a UserContext.Provider component that passes the user info and update function as value
    return (
      <UserContext.Provider value={{ userInfo, updateUserInfo, fetchUserInfo, refreshUserInfo, refreshCartData }}>
        {children}
      </UserContext.Provider>
    );
}


export default UserContext;