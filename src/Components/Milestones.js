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
    <Card title={milestone.title} subTitle={milestone.date} className="p-m-5">
      {milestone.image && (
        <img
          src={milestone.image}
          onError={(e) =>
            (e.target.src =
              'https://github.com/EddieHubCommunity.png')
          }
          alt={milestone.title}
          width={100}
          className="p-shadow-2"
        />
      )}
      <p>{milestone.description}</p>
      <div className="p-d-flex p-jc-end">
        <Button
          label="Learn more"
          icon="pi pi-check"
          className="p-button-raised p-button-rounded"
          onClick={() => goToLinkHandle(milestone.url)}
        />
      </div>
    </Card>
  )

  return (
    <section className="p-d-flex p-jc-center p-mb-5">
      <div style={{ width: 70 + '%' }}>
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
