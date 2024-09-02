import React, { useState, useEffect } from 'react'
import { ACCESS_TOKEN } from '../constants'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN)
      
      setIsAuthenticated(!!accessToken)
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <nav className='bg-black text-white py-5 px-2 mb-4'>
      <ul className='flex justify-center space-x-5'>
        <li><Link to="/">Home</Link></li>

        {
          isAuthenticated ? (
            <>
              <li><Link to="/create-note">Create Note</Link></li>
              <li><Link to='/logout'>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )
        }

      </ul>
    </nav>
  )
}

export default Navbar