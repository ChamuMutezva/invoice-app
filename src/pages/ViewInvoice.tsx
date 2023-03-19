import React from 'react'
import { useParams } from 'react-router-dom'

function ViewInvoice() {
  const { postId } = useParams()
  console.log(postId)
  return (
    <div className="main">
      <h1>ViewInvoice</h1>
      </div>
  )
}

export default ViewInvoice