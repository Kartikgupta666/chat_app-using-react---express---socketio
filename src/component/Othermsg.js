import React from 'react'

const Othermsg = (props) => {
  return (
    <div className='d-flex justify-content-start'>
          <h2><span className="badge bg-secondary">{props.msg}</span></h2>
    </div>
  )
}

export default Othermsg
