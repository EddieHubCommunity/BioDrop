import './Home.css'

import React, { useState, useEffect, useContext } from 'react'
import { ProgressBar } from 'primereact/progressbar'

import Placeholders from './Placeholders'
import Users from './Users'
import {
  GlobalDispatchContext,
  GlobalStateContext,
  SET_USER_LIST,
} from '../../Store/Context'

function Home() {
  const [showProgress, setShowProgress] = useState(true)
  const [skeleton, setskeleton] = useState(true)
  const dispatch = useContext(GlobalDispatchContext)
  const list = useContext(GlobalStateContext)

  useEffect(() => {
    if (list.length === 0) {
      fetch('/list.json')
        .then((response) => response.json())
        .then((data) =>
          data.sort((a, b) => a.username.localeCompare(b.username)),
        )
        .then((data) => dispatch({ type: SET_USER_LIST, data }))
        .catch((error) => {
          console.log('Home useEffect', error)
          alert('An error occurred please try again later.')
        })
        .finally(() => {
          setShowProgress(false)
          setTimeout(() => {
            setskeleton(false)
          }, 500)
        })
    } else {
      setShowProgress(false)
      setTimeout(() => {
        setskeleton(false)
      }, 200)
    }
  }, [])

  return (
    <main>
      {showProgress && <ProgressBar mode="indeterminate" />}
      {skeleton ? <Placeholders list={list} /> : <Users list={list} />}
    </main>
  )
}

export default Home
