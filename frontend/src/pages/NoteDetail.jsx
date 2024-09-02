import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams, Link } from 'react-router-dom'
import api from '../api'
import ProtectedRoute from '../components/ProtectedRoute'
import { useNavigate } from 'react-router-dom'

const NoteDetail = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [note, setNote] = useState({})

  useEffect(() => {
    api.get(`api/note/${id}/`)
      .then(res => setNote(res.data))
  }, [])

  const confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      api.delete(`api/note/${note.id}/`)
       .then(res => {
          if (res.status === 200) {
            navigate('/')
          }
        })
    }
  }

  document.title = note.title

  return (
    <ProtectedRoute>
      <Navbar />
      <div className='bg-gray-200 w-4/5 mx-auto text-center py-5 px-3 space-y-3 rounded-xl'>
        <h1 className='font-bold text-3xl'>{ note.title }</h1>
        <p>{ note.content }</p>

        <div className='space-x-5'>
          <Link to={`/note/update/${note.id}`}>
            <button className='bg-blue-600 text-white py-2 px-5 rounded-lg'>Update Note</button>
          </Link>

          <button className='bg-red-600 text-white py-2 px-5 mt-3 rounded-lg' onClick={confirmDelete}>Delete</button>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default NoteDetail