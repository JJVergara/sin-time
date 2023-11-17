import React from 'react'
import { useNavigate } from 'react-router-dom'
import CrudServicios from './CrudServicios'
import '../styles/Homepage.css';
import logo from '../assets/carvuk-logo.svg'; 

const Homepage = ({token}) => {
  let navigate = useNavigate()

  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="homepage-container">
      <button className="button" onClick={handleLogout}>Logout</button>
      <div>
      <img src={logo} alt="Carvuk Logo" />
      </div>
      <h3 className="welcome-message">Bienvenido a Carvuk {token.user.user_metadata.full_name} !</h3>
      <CrudServicios/>
    </div>
  )
}

export default Homepage