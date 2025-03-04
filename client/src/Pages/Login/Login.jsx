import React from 'react'
import { useRef } from 'react'
import axiosBase from '../../axiosConfig'
import { useNavigate } from 'react-router-dom'

function Login() {
  const emailDom = useRef()
  const passwordDom = useRef()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const emailValue = emailDom.current.value
    const passwordValue = passwordDom.current.value

    if (!emailValue || !passwordValue) {
      alert('Please fill all the fields')
      return
    }
   
    try {
      const {data} = await axiosBase.post('users/login', {
        email: emailValue,  
        password: passwordValue
      
      })
      alert('User logged in successfully')
      localStorage.setItem('token', data.token)
      navigate('/')
      console.log(data)
    } catch (error) {
      alert(error?.response?.data?.msg || 'Something went wrong')
      console.log(error?.response?.data)
    }
  }

  return (
     <section>
      <form onSubmit={handleSubmit}>
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
      <button type='submit'>Login</button>
      </form>
    </section>
  )
}


export default Login