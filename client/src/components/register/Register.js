
import React from 'react';
import '../stil/form.css'

import React from 'react'
import { useState } from 'react';
import axios from 'axios';


function Register() {
  // const username = "";

  const [username, Setusername] = useState('')
  const [email, Setemail] = useState('')
  const [password, Setpassword] = useState('')
  const [emailToken, SetEmailToken] = useState('')
  const [isemailToken, SetIsEmailToken] = useState(false)
  const handleUsernameInput = (e) => {
    Setusername(e.target.value)
  }
  const handlePasswordInput = (e) => {
    Setpassword(e.target.value)
  }
  const handleEmailInput = (e) => {
    Setemail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = { username: username, email: email, password: password }
    console.log(newUser)

    axios.post('http://localhost:3000/users/signup', newUser)
      .then(response => {
        if (response.status === 201) {
          SetEmailToken(response.data.emailMessage)
          SetIsEmailToken(true)
          console.log('User is created', response.data.emailMessage)
        }
      }).catch(error => {
        console.log("fuck it")
      })
  }

  const verifyEmail = () => {
    axios.get(emailToken)
      .then(response => {
        console.log('Ja!')
      })
      .catch(error => {
        console.log('kuken!');
      })
  }
  return (

    <div id="reg">
      <div className="formPage">
      <h1> Registrera dig </h1>
        {/* <form onSubmit={handleSubmit} >
        <input ref={username} label="Username:" type="text" />
        <input ref={email}    label="Email:" type="email" />
        <input ref={password} label="Password:" type="password" />
        <input ref={password} label="repeat Password:" type="password" />
        <div>
          <button style={submitStyle} type="submit">Submit</button>
        </div>
      </form> */}
      
      <form id='userForm' onSubmit={handleSubmit} >
        <input label="Username:" name="username" type="text" onChange={handleUsernameInput} />
        <input label="Email:" name="email" type="email" onChange={handleEmailInput} />
        <input label="Password:" name="password" type="password" onChange={handlePasswordInput} />
        <div>
          <button id="skickaKnapp" type="submit">Submit</button>
        </div>
      </form>
      <div>

      </div>
          <a href='../../login/LoginJs' >redan medlem? logga in här</a>
    </div>
  )
}

export default Register
