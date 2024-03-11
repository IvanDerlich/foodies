import React from 'react'

function Meals({params:  {slug}}) {
    console.log('params: ', params)
    console.log('slug: ', slug)
  return (
    <div>Share {slug} </div>
  )
}

export default Meals