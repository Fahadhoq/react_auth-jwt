import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/loginSlice";
import { useState } from "react";
import { useAuth } from "../../app/auth/contexts/AuthContext";
import { posts } from "../store/postSlice";

export default function Dashbord() {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    dispatch(posts())
    .then(res => {
      console.log('dashbord',res);
    });
  }
  return (
    <>
      <p>{user && user.name} Dashbord</p>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </>
  );
}
