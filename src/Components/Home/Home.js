import './Home.css'

import React, { useState, useEffect, useRef } from 'react'
import { Toast } from 'primereact/toast'

import Placeholders from './Placeholders'
import Users from './Users'
import { useUsers, useUsersDispatch } from '../../Store/Context'

function Home() {
  const [skeleton, setskeleton] = useState(true)
  const toast = useRef(null)
  const dispatch = useUsersDispatch()
  const list = useUsers()

  useEffect(() => {
    if (list.length === 0) {
      fetch('/list.json')
        .then((response) => response.json())
        .then((data) =>
          data.sort((a, b) =>
            a.name.normalize('NFD').localeCompare(b.name.normalize('NFD')),
          ),
        )
        .then((data) => dispatch({ type: 'SET_USER_LIST', data }))
        .catch((error) => {
          console.log('Home useEffect', error)
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
    } else {
      setTimeout(() => {
        setskeleton(false)
      }, 500)
    }
  }, [])

  return (
    <main>
      <Toast ref={toast} />
      {skeleton ? <Placeholders /> : <Users />}
    </main>
  )
}

export default Home
