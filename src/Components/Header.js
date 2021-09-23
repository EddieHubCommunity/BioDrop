import React from 'react'
import { InputSwitch } from 'primereact/inputswitch'

function Header() {
  const theme = document.body.style
  themeCheck()
  function themeCheck() {
    if (localStorage.getItem('theme') === 'dark') {
      theme.backgroundColor = 'black'
      theme.color = 'white'
      localStorage.setItem('checked', true)
    } else {
      theme.backgroundColor = 'white'
      theme.color = 'black'
      localStorage.setItem('checked', false)
    }
  }
  const ThemeChange = () => {
    if (theme.backgroundColor === 'black') {
      theme.backgroundColor = 'white'
      theme.color = 'black'
      localStorage.setItem('theme', 'light')
      localStorage.setItem('checked', false)
    } else {
      theme.backgroundColor = 'black'
      theme.color = 'white'
      localStorage.setItem('theme', 'dark')
      localStorage.setItem('checked', true)
    }
    location.reload()
  }
  return (
        <div className="header">
            <InputSwitch checked={JSON.parse(localStorage.getItem('checked'))} onChange={ThemeChange}/>
        </div>
  )
}

export default Header
