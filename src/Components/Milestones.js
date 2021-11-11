import './Milestone.css'

import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Timeline } from 'primereact/timeline'

function Milestones({ milestones }) {
  const goToLinkHandle = (url) => {
    window.open(url, '__blank')
  }

  const marker = (milestone) => (
    <span
      className="custom-marker p-shadow-2"
      style={{ backgroundColor: milestone.color }}
    >
      <i className={`pi pi-${milestone.icon} p-p-2`}></i>
    </span>
  )

  const content = (milestone) => (
    <Card
      title={milestone.title}
      subTitle={milestone.date}
      className="p-my-5 p-mx-md-5 p-shadow-15"
    >
      {milestone.image && (
        <img
          src={milestone.image}
          onError={(e) =>
            (e.target.src = 'https://github.com/EddieHubCommunity.png')
          }
          alt={milestone.title}
          width={100}
          className="p-shadow-2"
        />
      )}
      <p>{milestone.description}</p>
      {milestone.url && (
        <div className="p-d-flex p-jc-end">
          <Button
            label="Learn more"
            icon="pi pi-check"
            role="link"
            rel="noopener noreferrer"
            className="p-button-raised p-button-rounded"
            onClick={() => goToLinkHandle(milestone.url)}
            style={{ backgroundColor: milestone.color }}
          />
        </div>
      )}
    </Card>
  )

  return (
    <section className="p-d-flex p-jc-center p-mb-5">
      <div className="p-md-8">
        <Timeline
          value={milestones}
          align="alternate"
          className="customized-timeline"
          marker={(milestone) => marker(milestone)}
          content={(milestone) => content(milestone)}
        />
      </div>
    </section>
  )
}

Milestones.propTypes = {
  milestones: PropTypes.array.isRequired,
}

export default Milestones
