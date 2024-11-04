import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Search from './pages/Search'
import PropertyDetailPage from './pages/ViewProperty'
import AddHouse from './pages/AddHouse'

function App() {

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/add-house" element={<AddHouse />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
