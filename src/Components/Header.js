import React from 'react'

function Header() {
  const ThemeChange = () => {
    const theme = document.getElementsByTagName('BODY')[0].style
    if (theme.backgroundColor === 'black') {
      theme.backgroundColor = 'white'
      theme.color = 'black'
    } else {
      theme.backgroundColor = 'black'
      theme.color = 'white'
    }
  }
  return (
        <div className="header">
            <button className="btn-theme" onClick={ThemeChange}></button>
        </div>
  )
}

export default Header
