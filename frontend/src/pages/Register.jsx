import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import Navbar from '../components/Navbar'
import { ThreeCircles } from 'react-loader-spinner'


const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await api.post('api/register/', { username, email, password })
      setLoading(false)

      if (res.status === 200) {
        navigate('/login')
      }

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  document.title = 'Register'

  return (
    <>
      <Navbar />

      <div className='bg-gray-300 w-3/4 mx-auto py-5 px-10 rounded-lg'>
        <h1 className='text-center font-bold text-[35px]'>Register</h1>

        <form onSubmit={handleSubmit} className='my-5 space-y-5'>
          <input type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder='Username'
            className='w-full py-2 px-5 rounded'
            required
          />
          <input type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
            className='w-full py-2 px-5 rounded'
            required
          />
          <input type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Password'
            className='w-full py-2 px-5 rounded'
            required
          />

          <button type='submit' className='w-full bg-blue-700 text-white py-2 rounded h-[40px]'>
            {
              loading ?
                <span className='flex justify-center items-center'>
                  <ThreeCircles color='white' width={20} height={20} />
                </span>
                :
                'Submit'
            }
          </button>
        </form>

      </div>
    </>
  )
}

export default Register