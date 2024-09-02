import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NoteDetail from './pages/NoteDetail'
import CreateNote from './pages/CreateNote'
import UpdateNote from './pages/UpdateNote'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Logout from './components/Logout'

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>

        {/* <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } /> */}

        <Route path='/' element={ <Home /> } />
        <Route path='/create-note' element={ <CreateNote /> } />
        <Route path='/note/:id' element={ <NoteDetail /> } />
        <Route path='/note/update/:id' element={ <UpdateNote /> } />
        
        <Route path='/login' element={ <Login /> } />
        <Route path='/logout' element={ <Logout /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
