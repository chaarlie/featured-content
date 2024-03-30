import React from 'react'

function CurrentDate({date}: {date: string}) {
  return (
    <li className="block bg-sky-200  p-5">{date}</li>
  )
}

export default CurrentDate