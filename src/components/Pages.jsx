import React from 'react'

export default function Pages(props) {
  return (
    <>
    <span className='h3'>{props.namepage}</span>
        {props.children}
    </>
  )
}
