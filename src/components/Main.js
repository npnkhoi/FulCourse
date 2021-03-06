import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Timetable from './Schedule';
import Courses from './Courses';
import OneCourse from './OneCourse';
import About from './About';
import Contribute from './Contribute';
import './Main.css'
import { useSelector } from 'react-redux';

const Main = () => {
  const match = useRouteMatch('/courses/:id')
  const courses = useSelector(state => state.course.value)
  
  // If viewing one course, get the info of current course
  const course = match
    ? courses.find(course => course.id === match.params.id)
    : null

  return (
  <div className='main p-4 h-100 flex-grow-1'>
    <Switch>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/contribute'>
       <Contribute />
      </Route>
      <Route path='/help'>
        <div>help</div>
      </Route>
      <Route path='/courses/:id'>
        <OneCourse course={course}/>
      </Route>
      <Route path='/courses'>
        <Courses courses={courses}/>
      </Route>
      <Route path='/'>
        <Timetable />
      </Route>
      
    </Switch>
  </div>
)}

export default Main