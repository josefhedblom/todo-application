import React from 'react'
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import '../stil/form.css'
import axios from 'axios';


function Login() {
  const history = useHistory();

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
          history.push("/todos");
        }
      }).catch(error => {
        console.log(error)
      })
  }

  const logOut = () => {
    axios.get('http://localhost:3000/logout')
      .then(response => {
        if (response.status === 200) {
          console.log('logged out')
        }
      }).catch(error => {
        console.log(error)
      })
  }
  return (
    <div id="log">
      <div className="formPage">
        <h1> Logga in </h1>

        <form id='userForm' onSubmit={handleSubmit}>
          <input label="Email:" type="email" name="email" onChange={handleEmailInput} placeholder="Email" />
          <input label="Password:" type="password" name="password" onChange={handlePasswordInput} placeholder="Password" />
          <div id='knappDiv'>
            <button type="submit" id="skickaKnapp">Submit</button>
          </div>
          <a href='../../register/Register.js'>skapa konto här</a>

        </form>
      </div>
      <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default Login
