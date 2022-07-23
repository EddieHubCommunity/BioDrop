import './Search.css'

import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Toast } from 'primereact/toast'

import Placeholders from './Placeholders'
import Users from './Users'
import Navbar from '../Navbar'
import GetIcons from '../Icons/GetIcons'

function Search() {
  const [list, setList] = useState([])
  const [skeleton, setskeleton] = useState(true)
  const toast = useRef(null)

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
      .finally(() => {
        setTimeout(() => {
          setskeleton(false)
        }, 500)
      })
  }, [])

  return (
    <>
      <header>
        <Navbar
          start={
            <Link to="/" aria-label="Go back to Home">
              <GetIcons iconName="arrowLeft" size={20} />
            </Link>
          }
        />
      </header>
      <main>
        <Toast ref={toast} />
        {skeleton ? <Placeholders list={list} /> : <Users list={list} />}
      </main>
    </>
  )
}

export default Search
