import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import Navbar from '../components/Navbar'
import { ThreeCircles } from 'react-loader-spinner'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const res = await api.post('api/token/', { username, password })

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                setLoading(false)

                navigate('/')
            } else {
                setError(true)
                setLoading(false)
            }
        } catch (error) {
            console.error(error)
            setError(true)
            setLoading(false)
        }
    }

    document.title = 'Login'

    return (
        <>
            <Navbar />
            <div className='bg-gray-300 w-3/4 mx-auto py-5 px-10 rounded-lg'>
                <h1 className='text-center font-bold text-[35px]'>Login</h1>

                {error && (
                    <p className='bg-red-600 text-white text-center mt-3 p-2 rounded'>Error Occured. Try Again.</p>
                )}

                <form onSubmit={handleSubmit} className='my-5 space-y-5'>
                    <input type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder='Username'
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

export default Login