import './Search.css'
import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../Navbar'
import GetIcons from '../Icons/GetIcons'
import Users from './Users'
import { Link } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { useTheme } from '../../ThemeContext'

function Search() {
  const [list, setList] = useState([])
  const toast = useRef(null)
  const darkTheme = useTheme()

  useEffect(() => {
    fetch('/list.json')
      .then((response) => response.json())
      .then((data) =>
        data.sort((a, b) =>
          a.name.normalize('NFD').localeCompare(b.name.normalize('NFD')),
        ),
      )
      .then((data) => setList(data))
      .catch((error) => {
        console.log('Search useEffect', error)
        toast.current.show({
          severity: 'error',
          summary: 'Error Message',
          detail: 'An error occurred please try again later.',
          life: 5000,
        })
      })
  }, [])

  return (
    <>
      <header>
        <Navbar
          start={
            <Link
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
              to="/"
              aria-label="Go back to Home"
            >
              <GetIcons
                iconName="arrowLeft"
                size={20}
                className={`${darkTheme ? 'text-white' : 'text-black'}`}
              />
            </Link>
          }
        />
      </header>
      <main>
        <Toast ref={toast} />
         <Users list={list} />
      </main>
    </>
  )
}

export default Search
