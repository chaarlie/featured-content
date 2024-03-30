import React from 'react'
import DateSideBarHeader from './DateSideBarHeader'
import CurrentDateContainer from './CurrentDateContainer'

function DateSideBar() {
  return (
    <section className="flex-col grid grid-rows-12 gap-3  justify-items-center col-span-1 bg-sky-400 p-10">
<DateSideBarHeader />

    <div className="w-full  p-10 flex-col  justify-items-center justify-center  row-span-6 from-slate-100">
     <CurrentDateContainer />
    </div>
  </section>
  )
}

export default DateSideBar
