import React, { useState } from 'react';
import './SigninSignup.css';

export const SigninSignup = () => {
  const [state, setState] = useState("Sign In");
  const [userData, setUserData] = useState({
    username:"",
    password:"",
    email:"",
  });
  
  const signin = async () =>{
    console.log("Login succeeded!", userData);
    let responseData = {};
    await fetch("http://localhost:8888/signin", {
      method: 'post',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then ((res) => res.json())
    .then ((data) => responseData=data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.error)
    }
  };

  const signup = async () =>{
    console.log("User registration succeeded!", userData);
    let responseData = {};
    await fetch("http://localhost:8888/signup", {
      method: 'post',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then ((res) => res.json())
    .then ((data) => responseData=data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.error)
    }
  };

  const changeHandler = (e) =>{
    setUserData({...userData, [e.target.name]: e.target.value })
  };


  return (
    <div className='signinSignup'>
      <div className='signinSignupContainer'>
        <h1>{state}</h1>
        <div className="signinSignupFields">
          {state === 'Sign Up' ? <input name='username' value={userData.username} onChange={changeHandler} type='text' placeholder='Name' /> : <></>}
          <input name='email' value={userData.email} onChange={changeHandler} type='email' placeholder='Email address' />
          <input name='password' value={userData.password} onChange={changeHandler} type='password' placeholder='Password' />
        </div>
        <button onClick={()=>{state === 'Sign In' ? signin() : signup() }}>Continue</button>
        {state === 'Sign Up'  
        ? <p className='signinSignup_Signin'>Already have an account? <span onClick={()=> {setState('Sign In')}}>Login here</span></p>
        : <p className='signinSignup_Signin'>Create an account? <span onClick={()=> {setState('Sign Up')}}>Sign up here</span></p>
        }
        <div className='signinSignupAgree'>
          <input type='checkbox' name='' id='' />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
      </div>
    </div>
  )
} 
