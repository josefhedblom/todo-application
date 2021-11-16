import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import '../stil/form.css'
import axios from 'axios';


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

    axios.post('/login', newUser)
      .then(response => {
        if (response.status === 200) {
          history.push("/todos");
        }
      }).catch(error => {
        console.log(error.response.data.errors)
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
          <input label="Password:" type="password" name="password" onChange={handlePasswordInput} placeholder="Password" />
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
