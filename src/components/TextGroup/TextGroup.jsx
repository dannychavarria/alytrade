import React from 'react'
import './TextGroup.scss'

const TextGroup = ({ label, value }) => {
  return (
    <div className="group">
      <span className="label white">{label}</span>
      <p className="value gray">{value}</p>
    </div>
  )
}

export default TextGroup
