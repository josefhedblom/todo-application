import React from 'react'
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

    <div>
      login
      <form onSubmit={handleSubmit} >
        <input label="Email:" type="email" name="email" onChange={handleEmailInput} />
        <input label="Password:" type="password" name="password" onChange={handlePasswordInput} />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login
