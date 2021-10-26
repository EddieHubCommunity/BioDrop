import './Home.css'

import React, { useState, useEffect, useRef } from 'react'
import { ProgressBar } from 'primereact/progressbar'
import { Toast } from 'primereact/toast'

import Placeholders from './Placeholders'
import Users from './Users'

function Home() {
  const [showProgress, setShowProgress] = useState(true)
  const [list, setList] = useState([])
  const [skeleton, setskeleton] = useState(true)
  const toast = useRef(null)

  useEffect(() => {
    fetch('/list.json')
      .then((response) => response.json())
      .then((data) => data.sort((a, b) => a.username.localeCompare(b.username)))
      .then((data) => setList(data))
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
        setShowProgress(false)
        setTimeout(() => {
          setskeleton(false)
        }, 500)
      })
  }, [])

  return (
    <main>
      <Toast ref={toast} />
      {showProgress && <ProgressBar mode="indeterminate" />}
      {skeleton ? <Placeholders list={list} /> : <Users list={list} />}
    </main>
  )
}

export default Home
