import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import api from '../api'
import { Link } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import { Circles } from 'react-loader-spinner'

const Home = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getNotes()
  }, [])
  
  function getNotes() {
    setLoading(true)
    api.get('/api/notes/')
      .then(response => response.data)
      .then(data => setNotes(data))
      .catch(err => console.error(err))
    
    setLoading(false)
  }

  document.title = 'Home'

  return (
    <ProtectedRoute>
      <Navbar />

      {
        loading ? (
          <div className='flex justify-center mt-5'>
            <Circles color="black" height={100} width={100} />
          </div>
        ) : (
          <div>
            {
              notes.length > 0 ?
              notes.map(note => (
                <span key={note.id}>
                  <Link to={`/note/${note.id}`}>
                    <div className='bg-gray-300 w-3/4 mx-auto mb-3 py-3 px-5 rounded'>
                      <p className='text-xl font-bold text-center'>{note.title}</p>
                    </div>
                  </Link>
                </span>
              )) : (
                <h1 className='text-center bg-gray-300 w-3/4 mx-auto py-3 px-5 rounded font-bold text-2xl'>No Notes Found</h1>
              )
            }
          </div>
        )
      }

    </ProtectedRoute>
  )
}

export default Home