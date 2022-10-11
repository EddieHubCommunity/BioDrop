import './Milestone.css'

import React from 'react'
import PropTypes from 'prop-types'
import GetIcons from './Icons/GetIcons'

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

function Milestones({ milestones }) {
  function getStyle(idx) {
    if (milestones[idx].icon === 'github') return 'black'
    else return milestones[idx].color
  }

  function getStyleColor(idx) {
    if (milestones[idx].icon === 'github') return 'white'
    else return 'white'
  }

  return (
    <div>
      <VerticalTimeline>
        {milestones.map((milestone, idx) => {
          return (
            <VerticalTimelineElement
              key={idx}
              date={milestone.date}
              icon={<GetIcons iconName={milestone.icon} />}
              iconStyle={{
                background: getStyle(idx),
                color: getStyleColor(idx),
              }}
            >
              <h3 className="vertical-timeline-element-title">
                {milestone.title}
              </h3>
              {milestone.image && (
                <img className="timeline-img" src={milestone.image} />
              )}
              {milestone.description && (
                <h5 id="description">{milestone.description}</h5>
              )}
              {milestone.url && (
                <button className="learn-more">
                  <a href={milestone.url}>Learn More</a>
                </button>
              )}
            </VerticalTimelineElement>
          )
        })}
      </VerticalTimeline>
    </div>
  )
}

Milestones.propTypes = {
  milestones: PropTypes.array.isRequired,
}

export default Milestones
