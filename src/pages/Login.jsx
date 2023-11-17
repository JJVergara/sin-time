import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { supabase } from '../client';
import '../styles/Login.css';
import logo from '../assets/carvuk-logo.svg'; 

const Login = ({setToken}) => {
  let navigate = useNavigate()

  const [formData,setFormData] = useState({
        email:'',password:''
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
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })

      if (error) throw error
      setToken(data)
      navigate('/homepage')
      
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="login-container">

      <div>
      <img src={logo} alt="Carvuk Logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        
        <input 
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />

        <input 
          placeholder='Password'
          name='password'
          type="password"
          onChange={handleChange}
        />

        <button type='submit'>
          Ingresar
        </button>

      </form>
    <div className='login-link'>
      No tienes una cuenta? <Link to='/signup'> Regístrate </Link>
    </div>

    </div>
  )
}

export default Login