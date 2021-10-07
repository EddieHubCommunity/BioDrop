import './Home.css'

import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'primereact/progressbar'

import Placeholders from './Placeholders'
import Users from './Users'

function Home() {
  const [showProgress, setShowProgress] = useState(true)
  const [list, setList] = useState([])
  const [skeleton, setskeleton] = useState(true)

  // adding states for search query
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/list.json')
      .then((response) => response.json())
      .then((data) => setList(data))
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
  }, [])

  // the function filter posts is what filters through usernames/a
  // user's name to find a match to the query

  const filterPosts = (posts, query) => {
    if (!query) {
      return posts
    }

    return posts.filter((post) => {
      const postUserName = post.username.toLowerCase()
      const postName = post.name.toLowerCase()

      return postUserName.includes(query) || postName.includes(query)
      // return true
    })
  }

  // this stores the search results
  const filteredPosts = filterPosts(list, searchQuery)

  // link tree title
  const Title = function() {
    return (
      <div className="title">
        <h1>Link Free</h1>
      </div>
    )
  }

  // function called when a user is typing ...

  const inputReceived = function(e) {
    e.preventDefault()
    setSearchQuery(e.target.value.toLowerCase())
  }

  // the search bar component

  const SearchBar = function() {
    return (
      <div className="header">

        <Title/>

        <input
          type="text"
          value={searchQuery}
          onChange={inputReceived}
          id="header-search"
          placeholder="Search"
          name="search-box"
          autoFocus
        />
      </div>
    )
  }

  return (
    <main>
      {showProgress && <ProgressBar mode="indeterminate" />}
      {!showProgress && <SearchBar />}
      {skeleton ? <Placeholders list={list} /> : <Users list={filteredPosts} />}
    </main>
  )
}

export default Home
