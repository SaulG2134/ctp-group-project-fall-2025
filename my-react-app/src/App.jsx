import './App.css'
import Navbar from "./components/NavBar.jsx"
import HomePage from "./components/HomePage.jsx"
<<<<<<< HEAD
import CoursePickerPage from "./components/CoursePickerPage.jsx"
import Progress from "./components/Progress.jsx"
import { useState } from 'react'
=======
import SearchResults from './SearchResults/SearchResults.jsx'
>>>>>>> origin/main

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
<<<<<<< HEAD
      <Navbar onNavigate={handleNavigate} />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'coursepicker' && <CoursePickerPage />}
      {currentPage === 'progress' && <Progress />}
=======
      {/* <HomePage /> */}
      <SearchResults />
>>>>>>> origin/main
    </>
  )
}
 
export default App
