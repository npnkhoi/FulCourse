import { TwitterPicker } from "react-color"
import COLORS from '../../data/colors.json'
import { useState } from "react"
import { setColor } from "../../store/colorMapSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toggleSelection, toggleVisibility } from "../../store/courseSlice"

const ColorPicker = ({courseId}) => {
  const [changing, setChanging] = useState(false)
  const color = useSelector(state => state.colorMap.value[courseId])
  const dispatch = useDispatch()

  const changeColor = (color) => {
    // console.log('changing color', color);
    dispatch(setColor({courseId, color: color.hex}))   
    setChanging(false)
  }

  return (
    <div className='modifier me-2'>
      <div className='color-btn modifier rounded'
        onClick={() => {
          setChanging(!changing)
        }}
        style={({backgroundColor: color})}
      >
      </div>
      <div className='color-picker  position-relative'>
        {changing 
        ? 
          <TwitterPicker
            colors={COLORS}
            onChangeComplete={changeColor}
            width="204px"
          />
        : <div></div>
        }
      </div>
    </div>
  )
}

const SelectedCourses = ({courses}) => {
  const dispatch = useDispatch()

  return (
  <div className="mt-4 d-flex flex-column">
    {
      courses
      .filter((course) => course.selected)
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((course) => (
        <div className="selected-course d-flex flex-row justify-content-between align-items-start" key={course.id}> 
          <div className="selected-info flex-grow-1 d-flex flex-column">
            <Link className="heading-2 text-decoration-none"
              to={`/courses/${course.id}`}
            >
              {course.title}
            </Link>
            <div className='d-flex flex-row align-items-center mt-2'>
              <ColorPicker courseId={course.id}/>
              <div className='d-flex flex-column'>
                <div className="selected-instructor"> {course.id} | {course.instructor} </div>
              </div>
            </div>
          </div>
          <div className="toggle-btns d-flex flex-column">
            <div 
              className="modifier"
              onClick={() => dispatch(toggleVisibility({id: course.id}))}
            >
              {course.visible ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
            </div>
            <div 
              className="modifier"
              onClick={() => dispatch(toggleSelection({id: course.id}))}
            >
              <i className="fas fa-trash"></i>
            </div>
          </div>
        </div>
      ))
    }
  </div>
  )
}

export default SelectedCourses