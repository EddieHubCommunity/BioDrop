import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Timeline } from 'primereact/timeline'

function Milestones({ milestones }) {
  const goToLinkHandle = (url) => {
    console.log(url)
    window.open(url, '__blank')
  }

  return (
    <section className="p-d-flex p-jc-center p-mb-5">
      <div className="p-d-flex p-flex-column" style={{ width: 70 + '%' }}>
        <Timeline
          value={milestones}
          align="alternate"
          className="customized-timeline"
          marker={(milestone) => (
            <span
              className="custom-marker p-shadow-2"
              style={{ backgroundColor: milestone.color }}
            >
              <i className={`pi pi-${milestone.icon} p-p-2`}></i>
            </span>
          )}
          content={(milestone) => (
            <Card title={milestone.title} subTitle={milestone.date}>
              {milestone.image && (
                <img
                  src={milestone.image}
                  onError={(e) =>
                    (e.target.src =
                      'https://user-images.githubusercontent.com/624760/114314273-eaae0100-9af1-11eb-955a-4039657fe85a.png')
                  }
                  alt={milestone.title}
                  width={100}
                  className="p-shadow-2"
                />
              )}
              <p>{milestone.description}</p>
              <Button
                label={milestone.url}
                className="p-button-outlined"
                onClick={() => goToLinkHandle(milestone.url)}
              ></Button>
            </Card>
          )}
        />
      </div>
    </section>
  )
}

Milestones.propTypes = {
  milestones: PropTypes.array.isRequired,
}

export default Milestones
