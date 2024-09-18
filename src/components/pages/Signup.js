import { useDispatch, useSelector } from "react-redux";
import classes from "../../styles/Signup.module.css";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../app/auth/contexts/AuthContext";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {email:email , name:name, password:password, confirm_password:confirm_password, agree:agree};

    if (!name || !email || !password || !confirm_password || !agree) {
      alert('Please fill out all required fields');
      return;
    }else if(password != confirm_password){
     alert('Password And Confirm Password Must Be Same')
     return;
    }else{
      singup(user)
    }
  }

  const handleOnClick = (e) => {
    // e.preventDefault();

    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    if (e.target.name == 'confirm_password') {
      setConfirmPassword(e.target.value)
    }
    if (e.target.name == 'agree') {
      setAgree(e.target.checked)
    }
    
  }

  return (
    <>
      <h1>Create an account</h1>

      <div className="column">
        <Illustration />
        <Form className={`${classes.signup}`}>
          <TextInput type="text" placeholder="Enter name" icon="person" id='name' name="name" onChange={(e)=>handleOnClick(e)} />

          <TextInput
            type="text"
            placeholder="Enter email"
            icon="alternate_email"
            id='email' name="email"
            onChange={(e)=>handleOnClick(e)} 
            
          />

          <TextInput type="password" placeholder="Enter password" icon="lock"  id='password' name="password" onChange={(e)=>handleOnClick(e)} />

          <TextInput
            type="password"
            placeholder="Confirm password"
            icon="lock_clock"
            id='confirm_password' name="confirm_password"
            onChange={(e)=>handleOnClick(e)} 
          />

          <Checkbox text="I agree to the Terms &amp; Conditions"  name='agree' onChange={(e)=>handleOnClick(e)} />

          <Button onClick={handleSubmit}>
            <span>Submit Now</span>
          </Button>

          <div className="info">
            Already have an account? <Link to="/login">Login</Link> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
