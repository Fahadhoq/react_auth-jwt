
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {loginCall, logoutApiCall, refreshApiCall} from "../../../components/store/loginSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

  const AuthContext = React.createContext();
  
  export function useAuth() {
    return useContext(AuthContext);
  }
  
  export function AuthProvider({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const jwt_access_token = localStorage.getItem('jwt_access_token');


    useEffect(() => {
        if (jwt_access_token) {
            refresh();  
        }
        setLoading(false);
    }, [dispatch]);

  
    
  
    // login function
    function login(user) {
        dispatch(loginCall(user))
        .then(res => {
          if (res.payload.success) {
            setSession(res.payload?.data.token);
            navigate('/dashbord')
          } else {
            alert(res.payload.message)
          }
        },[]);
    }

    //refreshApi
    const refresh = () => {
        setSession(jwt_access_token);
        setLoading(true);
        
        dispatch(refreshApiCall())
        .then(res => {
          if (res.payload) {
            setSession(res.payload?.data.token);
            setLoading(false);
          }
        },[]);
      };

    
    
    //set session
    function setSession(access_token){
        if (access_token) {
          localStorage.setItem('jwt_access_token', access_token);
          axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
          axios.defaults.headers.common['Content-Type'] = 'application/json';
        } else {
          localStorage.removeItem('jwt_access_token');
          delete axios.defaults.headers.common.Authorization;
          delete axios.defaults.headers.common['Content-Type'];
        }
    };

    function logout () {
        dispatch(logoutApiCall())
        .then(res => {
            setSession(null);
            navigate('/',{replace:true})
        },[]);
      };
  
    
  
    const value = {
      login,
      logout
    };
  
    return (
      <AuthContext.Provider value={value}>
        {loading == false && children}
      </AuthContext.Provider>
    );
  }