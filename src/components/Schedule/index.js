import React, { useState } from 'react'
import Calendar from './Calendar'
import SelectedCourses from './SelectedCourses'
import Searcher from './Searcher'
import './index.css'
import { useSelector } from 'react-redux'

const Timetable = () => {
  const [ scheduleOverlap, setScheduleOverlap ] = useState(false)
  const courses = useSelector(state => state.course.value)

  console.log(courses);

  return (
    <div className="d-flex flex-row flex-grow-1">
      <Calendar 
        selectedCourses={courses.filter(course => course.selected && course.visible)} 
        scheduleOverlap={scheduleOverlap}
        setScheduleOverlap={setScheduleOverlap}
      />
    
      <div className="right-bar">
        <p className="o-heading">Spring, 2021</p>

        <Searcher
          courses={courses}
        />

        <SelectedCourses 
          courses={courses} 
        />
      </div>
    </div>

  )
}

export default Timetable
