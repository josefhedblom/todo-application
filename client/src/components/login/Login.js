import React from 'react'
import { useForm } from "react-hook-form";

import '../stil/form.css'

function Login() {
  // const username = "";
  return (
    <div id="log">
      <div className="formPage">
      <h1> Logga in </h1>
    {/* <form onSubmit={handleSubmit} >
        <input ref={username} label="Username:" type="text" />
        <input ref={password} label="Password:" type="password" />
        <div>
          <button style={submitStyle} type="submit">Submit</button>
        </div>
      </form> */}

      <form id='userForm'>
        <br/><input label="Username:" type="text" placeholder='Username'/>
        <br/><input label="Password:" type="password" placeholder='Password'/>
        <br/><div id='knappDiv'>
          <button type="submit" id="skickaKnapp">Submit</button>
        </div>
      <a href='../../register/Register.js'>skapa konto här</a>
      </form>
    </div>
      </div>
  )
}

export default Login
