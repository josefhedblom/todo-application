import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../stil/form.css'
import axios from 'axios';



function Register() {
  const history = useHistory();

  const [username, Setusername] = useState('')
  const [email, Setemail] = useState('')
  const [password, Setpassword] = useState('')

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

    axios.post('/signup', newUser)
      .then(response => {
        if (response.status === 201) {
          history.push('/verify', { link: response.data.emailVerfication })
        }
      }).catch(error => {
        console.log(error.response.data.errors)
      })
  }
  const logInLink = () => {
    history.push("/login")
  }
  return (

    <div id="reg">
      <div className="formPage">
        <h1> Registrera dig </h1>

        <form id='userForm' onSubmit={handleSubmit} >
          <input label="Username:" name="username" type="text" onChange={handleUsernameInput} placeholder="Username" />
          <input label="Email:" name="email" type="email" onChange={handleEmailInput} placeholder="Email" />
          <input label="Password:" name="password" type="password" onChange={handlePasswordInput} placeholder="Password" />
          <div>
            <button id="skickaKnapp" type="submit">Submit</button>
          </div>
        </form>
        <div>

        </div>
        <button onClick={logInLink} >redan medlem? logga in här</button>
      </div>
    </div>
  )
}

export default Register
