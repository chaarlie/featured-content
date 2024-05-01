import React from "react";

function FeaturedContentDateSelection({setCurrentDate}: {setCurrentDate: (value: any) => void}) {
  return (
    <div className="col-span-1 row-span-1 flex   items-center ">
      <div className="border-r-1">
      <input
        onChange={(e)=> {setCurrentDate(e.target.value)}}
        className="outline inline-block outline-offset-2 p-2 outline-shade-3 rounded text-lg font-bold uppercase"
        type="date"
      />   
      </div>
    </div>
  )
}

export default FeaturedContentDateSelection;
