import Loader from 'react-loader-spinner'

const DotLoader = () => (
  <div data-testid="loader" className="loader-container">
    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  </div>
)

export default DotLoader
