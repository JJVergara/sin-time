import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import '../styles/Login.css';

const SignUp = () => {

  const [formData,setFormData] = useState({
    fullName:'',email:'',password:''
  })
  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  async function handleSubmit(e){
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            }
          }
        }
      )
      if (error) throw error
      alert('Checkea tu mail para el link de verificación')
      
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input placeholder='Full name' name='fullName' onChange={handleChange}/>
        <input placeholder='Email' name='email' onChange={handleChange}/>
        <input placeholder='Password' name='password' type="password" onChange={handleChange}/>
        <button type='submit'> Registrarse </button>
      </form>
      <div className="login-link">
        Ya tienes una cuenta?<Link to='/'> Login</Link> 
      </div>
      <div>
        *Ten en cuenta que si no te llega el mail de confirmación, es porque ya posees una cuenta.
      </div>
    </div>
  )
}

export default SignUp
