import React from 'react'

import { useForm } from "react-hook-form";

import '../stil/form.css'

import { useState } from 'react';
import axios from 'axios';


function Login() {

  const [email, Setemail] = useState('')
  const [password, Setpassword] = useState('')

  const handlePasswordInput = (e) => {
    Setpassword(e.target.value)
  }
  const handleEmailInput = (e) => {
    Setemail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = { email: email, password: password }

    axios.post('http://localhost:3000/login', newUser)
      .then(response => {
        if (response.status === 200) {
          console.log('User is in')
        }
      }).catch(error => {
        console.log("fuck it")
      })
  }
  return (
    <div id="log">
      <div className="formPage">
      <h1> Logga in </h1>
    {/* <form onSubmit={handleSubmit} >
        <input ref={username} label="Username:" type="text" />
        <input ref={password} label="Password:" type="password" />
    <div>
      login
      <form onSubmit={handleSubmit} >
        <input label="Email:" type="email" name="email" onChange={handleEmailInput} />
        <input label="Password:" type="password" name="password" onChange={handlePasswordInput} />

        <div>
          <button type="submit">Submit</button>
        </div>
      </form> */}

      <form id='userForm'>
        <input label="Username:" type="text" placeholder='Username'/>
        <input label="Password:" type="password" placeholder='Password'/>
        <div id='knappDiv'>
          <button type="submit" id="skickaKnapp">Submit</button>
        </div>
      <a href='../../register/Register.js'>skapa konto här</a>

      </form>
    </div>
      </div>
  )
}

export default Login
