import React from "react";

function FeaturedContentDateSelection({setCurrentDate}: {setCurrentDate: (value: any) => void}) {
  return (
    <div className="  flex gap-5 mx-auto">
      <input
        onChange={(e)=> {setCurrentDate(e.target.value)}}
        className="outline outline-offset-2 p-2 outline-shade-3 rounded font-bold uppercase"
        type="date"
      />
      <div>
        <button className="bg-primary-1 text-primary-2 font-bold p-5 hover:bg-primary-3 hover:scale-95 col-span-1 rounded-lg  hover:text-shade-1 text-lg">
          Go
        </button>
      </div>
    </div>
  );
}

export default FeaturedContentDateSelection;
