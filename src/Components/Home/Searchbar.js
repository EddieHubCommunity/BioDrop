import React from 'react'
import PropTypes from 'prop-types'
import { InputText } from 'primereact/inputtext'
import GetIcons from '../Icons/GetIcons'
import './Home.css'

const Searchbar = ({ searchHandler, searchTerm }) => {
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
