import React from 'react'
import { InputSwitch } from 'primereact/inputswitch'

function Header() {
  const theme = document.body.style
  themeCheck()
  function themeCheck() {
    switch (localStorage.getItem('theme')) {
      case 'dark':
        theme.backgroundColor = 'black'
        theme.color = 'white'
        localStorage.setItem('checked', true)
        break
      default:
        theme.backgroundColor = 'white'
        theme.color = 'black'
        localStorage.setItem('checked', false)
    }
  }
  const ThemeChange = () => {
    switch (theme.backgroundColor === 'black') {
      case 'black':
        theme.backgroundColor = 'white'
        theme.color = 'black'
        localStorage.setItem('theme', 'light')
        localStorage.setItem('checked', false)
        location.reload()
        break
      default:
        theme.backgroundColor = 'black'
        theme.color = 'white'
        localStorage.setItem('theme', 'dark')
        localStorage.setItem('checked', true)
        location.reload()
    }
  }
  return (
        <div className="header">
            <InputSwitch checked={JSON.parse(localStorage.getItem('checked'))} onChange={ThemeChange}/>
        </div>
  )
}

export default Header
