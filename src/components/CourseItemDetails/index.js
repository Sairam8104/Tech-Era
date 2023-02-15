import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {itemDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getItemData()
  }

  getItemData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedDate = {
        id: fetchedData.course_details.id,
        name: fetchedData.course_details.name,
        imageUrl: fetchedData.course_details.image_url,
        description: fetchedData.course_details.description,
      }
      this.setState({
        itemDetails: updatedDate,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCoursesItem = () => {
    const {itemDetails} = this.state
    return (
      <div className="item-container">
        <div className="image-text-container">
          <img
            src={itemDetails.imageUrl}
            alt={itemDetails.name}
            className="item-size"
          />
          <div className="text-container">
            <h1 className="item-heading">{itemDetails.name}</h1>
            <p className="item-para">{itemDetails.description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.getItemData()
  }

  renderFailure = () => (
    <div className="item-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
        className="failure-image-size"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.onClickRetry} className="failure-btn">
        Retry
      </button>
    </div>
  )

  renderApiStatusItem = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCoursesItem()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="ItemDetailsMainContainer">
          {this.renderApiStatusItem()}
        </div>
      </div>
    )
  }
}
export default CourseItemDetails
