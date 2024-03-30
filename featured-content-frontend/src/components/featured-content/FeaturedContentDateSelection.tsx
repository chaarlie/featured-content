import React from "react";

function FeaturedContentDateSelection({setCurrentDate}: {setCurrentDate: (value: any) => void}) {
  return (
    <div className="  flex gap-5 mx-auto">
      <input
        onChange={(e)=> {setCurrentDate(e.target.value)}}
        className="outline outline-offset-2 p-5 outline-sky-600 font-bold uppercase"
        type="date"
      />
      <div>
        <button className="bg-sky-500  font-bold p-5 hover:bg-sky-600 col-span-1 rounded-lg   text-white  hover:text-slate-50 text-lg">
          Go
        </button>
      </div>
    </div>
  );
}

export default FeaturedContentDateSelection;
