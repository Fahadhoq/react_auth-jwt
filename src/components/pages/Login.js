import classes from "../../styles/Login.module.css";
import Button from "../Button";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../app/auth/contexts/AuthContext";

export default function Login() {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {email:email , password:password};
    login(user)
  }

  

  return (
    <>
      <h1>Login to your account</h1>

      <div className="column">
        <Illustration />
        <Form className={`${classes.login}`} >
          <TextInput
            type="text"
            placeholder="Enter email"
            icon="alternate_email"
            id='email' name="email"
            value={email} onChange={(e)=>setEmail(e.target.value)} required
          />

          <TextInput type="password" placeholder="Enter password" icon="lock" id='password' name="password"
            value={password} onChange={(e)=>setPassword(e.target.value)} required />

          <Button onClick={handleSubmit}>
            <span>Submit</span>
          </Button>

          <div className="info">
            Don't have an account? <Link to="/signup">Signup</Link> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
