import './App.css'
import Navbar from "./components/NavBar.jsx"
import HomePage from "./components/HomePage.jsx"
import CoursePickerPage from "./components/CoursePickerPage.jsx"
import Progress from "./components/Progress.jsx"
import { useState } from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Navbar onNavigate={handleNavigate} />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'coursepicker' && <CoursePickerPage />}
      {currentPage === 'progress' && <Progress />}
    </>
  )
}
 
export default App
