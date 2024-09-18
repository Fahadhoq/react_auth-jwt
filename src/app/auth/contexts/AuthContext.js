
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginCall, logoutApiCall, refreshApiCall, registerApiCall} from "../../../components/store/loginSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

  const AuthContext = React.createContext();
  
  export function useAuth() {
    return useContext(AuthContext);
  }
  
  export function AuthProvider({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state)=> state.login.error)
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


    // singup function
    function singup(user) {
      dispatch(registerApiCall(user))
      .then(res => {        
        if (res.payload) {
          if (res.payload.success) {
            alert(res.payload.data.message)
            navigate('/login')
          } else {
            if (res.payload.data.type == 'validation') {
                const extractMessages = (obj) => {
                  let messages = [];
                  // Extract messages from the top-level keys
                  for (let key in obj) {
                      if (obj.hasOwnProperty(key) && key !== 'message') {
                          messages = messages.concat(obj[key]);
                      }
                  }
                  // Flattening messages in case they are arrays of arrays
                  return messages.flat();
                };
              
                const obj = res.payload.data.message;
                const combinedMessages = extractMessages(obj);
                if (combinedMessages.length > 0) {
                  alert(combinedMessages.join('\n'));
                  return;
                }
            }else{
              alert(res.payload.data.message)
              return;
            }
          }
        } else {
          alert(error)
          return;
        }
      },[]);
    }

  
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
      singup,
      login,
      logout
    };
  
    return (
      <AuthContext.Provider value={value}>
        {loading == false && children}
      </AuthContext.Provider>
    );
  }