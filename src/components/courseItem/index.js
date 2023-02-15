import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {eachCourse} = props
  return (
    <Link to={`/courses/${eachCourse.id}`} className="link-item">
      <li className="button-items">
        <img
          src={eachCourse.logoUrl}
          alt={eachCourse.name}
          className="course-logo"
        />
        <p className="course-name">{eachCourse.name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
