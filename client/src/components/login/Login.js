import React from 'react'
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import '../stil/form.css'
import axios from 'axios';
import Register from '../register/Register';


function Login() {
  const history = useHistory();

  const [username, Setusername] = useState('')
  const [password, Setpassword] = useState('')

  const handlePasswordInput = (e) => {
    Setpassword(e.target.value)
  }
  const handleEmailInput = (e) => {
    Setusername(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = { username: username, password: password }

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
          history.push("/");
        }
      }).catch(error => {
        console.log(error)
      })
  }
  const RegisterLink = () => {
    history.push("/");
  }
  return (
    <div id="log">
      <div className="formPage">
        <h1> Logga in </h1>

        <form id='userForm' onSubmit={handleSubmit}>
          <input label="Username:" type="text" name="username" onChange={handleEmailInput} placeholder="Username" />
          <input label="Password:" type="password" name="password" onChange={handlePasswordInput} placeholder="Password" minlength="8" />
          <div id='knappDiv'>
            <button type="submit" id="skickaKnapp">Submit</button>
          </div>
          <button onClick={RegisterLink} >skapa konto här</button>

        </form>
      </div>
    </div>
  )
}

export default Login
