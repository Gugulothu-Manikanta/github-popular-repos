import './index.css'

const RepositoryItem = props => {
  const {eachLanguageRepoData} = props
  const {avatarUrl, forksCount, issuesCount, starsCount, name} =
    eachLanguageRepoData
  return (
    <li className="repo-container">
      <img src={avatarUrl} alt={name} height={90} width={90} />
      <h1 className="repo-title">{name}</h1>
      <div className="icon-and-text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons-size"
        />
        <p> {starsCount} stars</p>
      </div>
      <div className="icon-and-text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons-size"
        />
        <p> {forksCount} forks</p>
      </div>
      <div className="icon-and-text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons-size"
        />
        <p> {issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
