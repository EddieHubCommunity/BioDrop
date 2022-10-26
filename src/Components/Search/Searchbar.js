import React from 'react'
import PropTypes from 'prop-types'
import { InputText } from 'primereact/inputtext'
import GetIcons from '../Icons/GetIcons'
import './Search.css'
import { useTheme } from '../../ThemeContext'

document.addEventListener('keydown', (e) => {
  e = e || window.event
  const searchbox = document.getElementById('search-input')
  if (e.key === 'k' && e.ctrlKey) {
    searchbox.focus()
    e.preventDefault()
  }
})

const Searchbar = ({ searchHandler, searchTerm }) => {
  const darkTheme = useTheme()

  const theme = {
    backgroundColor: `${darkTheme ? '#333333' : 'white'}`,
    border: `${darkTheme ? 'none' : '1px solid #ced4da'}`,
    color: `${darkTheme ? 'white' : 'grey'}`,
  }

  return (
    <div className="search-section">
      <span className="p-input-icon-left">
        <GetIcons iconName="search" />
        <InputText
          type="search"
          value={searchTerm}
          onChange={({ target }) => searchHandler(target.value)}
          className="search-bar-resize"
          name="user"
          id="search-input"
          placeholder="Search user..."
          autoFocus
          style={theme}
        />
      </span>
    </div>
  )
}
Searchbar.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
}

export default Searchbar
