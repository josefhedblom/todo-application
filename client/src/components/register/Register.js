import React from 'react';
import { useHistory } from "react-router-dom";
import '../stil/form.css'
import { useState } from 'react';
import axios from 'axios';


function Register() {
  const history = useHistory();

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

    axios.post('http://localhost:3000/signup', newUser)
      .then(response => {
        if (response.status === 201) {
          SetEmailToken(response.data.emailVerfication)
          SetIsEmailToken(true)
          console.log('User is created', response.data.emailVerfication)
        }
      }).catch(error => {
        console.log(error)
      })
  }

  const verifyEmail = () => {
    axios.get(emailToken)
      .then(response => {
        console.log(response.data)
        history.push("/login");
      })
      .catch(error => {
        console.log(error);
      })
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
        <a href='../../login/LoginJs' >redan medlem? logga in här</a>
      </div>
      <button onClick={verifyEmail}>Verify Email</button>
    </div>
  )
}

export default Register
