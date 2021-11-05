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

    <div>
      <form onSubmit={handleSubmit} >
        <input label="Username:" name="username" type="text" onChange={handleUsernameInput} />
        <input label="Email:" name="email" type="email" onChange={handleEmailInput} />
        <input label="Password:" name="password" type="password" onChange={handlePasswordInput} />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        {isemailToken ? <button onClick={verifyEmail}>Email</button> : null}
      </div>
    </div>
  )
}

export default Register
