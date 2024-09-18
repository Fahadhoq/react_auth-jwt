
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
    const [currentUser, setCurrentUser] = useState([]);
    const jwt_access_token = localStorage.getItem('jwt_access_token');


    useEffect(() => {
        if (jwt_access_token) {
            setSession(jwt_access_token);
            dispatch(refreshApiCall())
            .then(res => {
              if (res.payload) {
                setCurrentUser(res.payload.data.user);
                setSession(res.payload?.data.token);
                setLoading(false);
              }
            },[]);
        }else{
          setLoading(false);
        }
    }, [dispatch]);

  
    // login function
    function login(user) {
        dispatch(loginCall(user))
        .then(res => {
          if (res.payload.success) {
            setCurrentUser(res.payload.data.user);
            setSession(res.payload?.data.token);
            navigate('/dashbord')
          } else {
            alert(res.payload.message)
          }
        },[]);
    }

  
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


    // logout function
    function logout () {
        dispatch(logoutApiCall())
        .then(res => {
            setSession(null);
            navigate('/',{replace:true})
        },[]);
    };

  
    const value = {
      currentUser,
      login,
      logout
    };
  
    return (
      <AuthContext.Provider value={value}>
        {loading == false && children}
      </AuthContext.Provider>
    );
  }