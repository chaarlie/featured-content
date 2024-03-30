import React from 'react'
import CurrentDate from './CurrentDate'

function CurrentDateContainer() {
  return (
    <ol className="justify-self-center pl-9 bg-slate-100 font-bold border rounded ">
       <CurrentDate date="23/03/2024" />
       <CurrentDate date="23/03/2024" />
       <CurrentDate date="23/03/2024" />
       <CurrentDate date="23/03/2024" />
       <CurrentDate date="23/03/2024" />
      </ol>
  )
}

export default CurrentDateContainer