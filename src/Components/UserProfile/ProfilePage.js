import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Links from '../Links'
import Profile from '../Profile'
import Milestones from '../Milestones'

function User({ list }) {
  return (<main>
        {<>
            <Link to="/"><i className="pi pi-arrow-left"></i></Link>
            <Profile
                bio={list.bio}
                avatar={list.avatar}
                name={list.name}
                total={list.links.length}
                username={list.username}
            />
            <Links links={list.links} />
        </>}
      {list.milestones && <Milestones milestones={list.milestones} />}
    </main>)
}

User.propTypes = {
  list: PropTypes.array.isRequired,
}

export default User
