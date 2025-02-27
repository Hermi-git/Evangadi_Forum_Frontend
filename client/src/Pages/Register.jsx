import React from 'react'
import { useRef } from 'react'
import axiosBase from '../axiosConfig'
import { useNavigate } from 'react-router-dom'

function Register() {
  const usernameDom = useRef()
  const firstNameDom = useRef()
  const lastNameDom = useRef()
  const emailDom = useRef()
  const passwordDom = useRef()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const usernameValue= usernameDom.current.value
    const firstNameValue = firstNameDom.current.value
    const lastNameValue = lastNameDom.current.value
    const emailValue = emailDom.current.value
    const passwordValue = passwordDom.current.value

    if (!usernameValue || !firstNameValue || !lastNameValue || !emailValue || !passwordValue) {
      alert('Please fill all the fields')
      return
    }
    try {
      await axiosBase.post('users/register', {
        username: usernameValue,
        firstname: firstNameValue,
        lastname: lastNameValue,
        email: emailValue,  
        password: passwordValue
      
      })
      alert('User registered successfully')
      navigate('/login')
    } catch (error) {
      alert('Something went wrong')
      console.log(error)
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
      <div>
        <span>Username : ---</span>
        <input ref={usernameDom} type="text" placeholder="Enter Username" />
      </div>
      <br/>
      <div>
        <span>First Name : ---</span>
        <input ref={firstNameDom} type="text" placeholder="Enter First Name" />
      </div>
      <br />
      <div>
        <span>Last Name : ---</span>
        <input ref={lastNameDom} type="text" placeholder="Enter Last Name" />
      </div>
      <br />
      <div>
        <span>Email : ---</span>
        <input ref={emailDom} type="email" placeholder="Enter Email" />
      </div>
      <br />
      <div>
        <span>Password : ---</span>
        <input ref={passwordDom} type="password" placeholder="Enter Password" />
      </div>
      <br />
      <button type='submit'>Register</button>
      </form>
    </section>
    
  )
}

export default Register