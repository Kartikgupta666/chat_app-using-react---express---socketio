import React from 'react'

const Ourmsg = (props) => {
  return (
    <div className='d-flex justify-content-end'>
      <h2><span className={`badge bg-success`}>{props.msg}</span></h2>
    </div>
  )
}

export default Ourmsg
