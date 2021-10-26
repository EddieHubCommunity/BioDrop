import React from 'react'
import PropTypes from 'prop-types'
import { InputText } from 'primereact/inputtext'

const Searchbar = ({ searchHandler, searchTerm }) => {
  return (
    <div className="search-section">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={searchTerm}
          onChange={({ target }) => searchHandler(target.value)}
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
