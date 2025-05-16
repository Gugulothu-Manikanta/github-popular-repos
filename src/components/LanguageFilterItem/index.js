import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, isActiveNow, changeActiveTab} = props
  const {id, language} = eachLanguage
  const activeTabStyle = isActiveNow ? 'active-tab-button' : ''
  const onChangeActiveTab = () => {
    changeActiveTab(id)
  }
  return (
    <li>
      <button
        className={`list-item ${activeTabStyle}`}
        type="button"
        onClick={onChangeActiveTab}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
