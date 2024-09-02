import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../api'
import ProtectedRoute from '../components/ProtectedRoute'
import { ThreeCircles } from 'react-loader-spinner'

const CreateNote = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setLoading(true)
      const res = await api.post('api/notes/', { title, content })
      console.log(res)

      if (res.status === 200) {
        setSuccess(true)
        setLoading(false)
      } else {
        setError(true)
        setLoading(false)
      }
    } catch (error) {
      setError(true)
      setLoading(false)
      console.error(error)
    }
  }

  document.title = 'Create Note'

  return (
    <ProtectedRoute>
      <Navbar />

      <div className='bg-gray-300 w-3/4 mx-auto py-5 px-10 rounded-lg'>
        <h1 className='text-center font-bold text-[35px]'>Create Note</h1>

        {error && (
          <p className='bg-red-600 text-white text-center mt-3 p-2 rounded'>Error Occured. Try Again.</p>
        )}

        {success && (
          <p className='bg-green-600 text-white text-center mt-3 p-2 rounded'>Note Created Sucessfully,</p>
        )}

        <form onSubmit={handleSubmit} className='my-5 space-y-5'>
          <input type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Note Title'
            className='w-full py-2 px-5 rounded'
            required
          />
          <textarea value={content}
            onChange={e => setContent(e.target.value)}
            placeholder='Note Content'
            className='w-full py-2 px-5 rounded'
            rows={5}
            required
          ></textarea>

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
    </ProtectedRoute>
  )
}

export default CreateNote