import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const pageStatus = {
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    dataStatus: pageStatus.inprogress,
    activeTabId: languageFiltersData[0].id,
    languageRepoData: [],
  }

  componentDidMount = () => {
    this.getSpecificLanguageRepos()
  }

  changeActiveTab = id => {
    this.setState({activeTabId: id}, this.getSpecificLanguageRepos)
  }

  getSpecificLanguageRepos = async () => {
    this.setState({dataStatus: pageStatus.inprogress})
    const {activeTabId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(githubReposApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        avatarUrl: eachData.avatar_url,
        forksCount: eachData.forks_count,
        issuesCount: eachData.issues_count,
        starsCount: eachData.stars_count,
      }))
      console.log(updatedData)
      this.setState({
        dataStatus: pageStatus.success,
        languageRepoData: updatedData,
      })
    } else {
      this.setState({dataStatus: pageStatus.failure})
    }
  }

  getLoadingPage = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getRepositoryItemData = () => {
    const {languageRepoData} = this.state
    return (
      <ul className="list-of-repos-item-container">
        {languageRepoData.map(eachLanguageRepoData => (
          <RepositoryItem
            key={eachLanguageRepoData.id}
            eachLanguageRepoData={eachLanguageRepoData}
          />
        ))}
      </ul>
    )
  }

  getFailurePage = () => (
    <div className="failure-page">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderStatusView = () => {
    const {dataStatus} = this.state
    switch (dataStatus) {
      case 'IN_PROGRESS':
        return this.getLoadingPage()
      case 'SUCCESS':
        return this.getRepositoryItemData()
      case 'FAILURE':
        return this.getFailurePage()
      default:
        return null
    }
  }

  render() {
    const {activeTabId} = this.state
    return (
      <div className="popular-gitrepo-container">
        <h1 className="main-heading">popular</h1>
        <ul className="list-items">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              isActiveNow={eachLanguage.id === activeTabId}
              eachLanguage={eachLanguage}
              changeActiveTab={this.changeActiveTab}
            />
          ))}
        </ul>
        {this.renderStatusView()}
      </div>
    )
  }
}

export default GithubPopularRepos
