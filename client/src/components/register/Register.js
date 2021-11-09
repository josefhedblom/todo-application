import React from 'react';
import '../stil/form.css'

function Register() {
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
        <form id='userForm'>
        <input label="Username:" type="text" placeholder='Username'/>
        <input label="Email:" type="email" placeholder='Email'/>
        <input label="Password:" type="password" placeholder='Password'/>
        <input label="repeat Password:" type="password" placeholder='Repeat password'/>
        <div id='knappDiv'>
            <button type="submit" id="skickaKnapp">Submit</button>
          </div>
          <a href='../../login/LoginJs' >redan medlem? logga in här</a>
        </form>
      </div>
    </div>
  )
}

export default Register
