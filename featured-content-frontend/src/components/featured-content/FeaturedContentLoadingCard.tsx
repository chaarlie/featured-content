function FeaturedContentLoadingCard() {
  return (
    <>
      <div className="col-span-1 animate-pulse">
        <div className="flex items-center h-full">
          <div className="bg-slate-200 h-36 w-96"></div>
        </div>
      </div>
      <div className="col-span-2 animate-pulse overflow-auto grid grid-flow-row grid-rows-2 gap-5 h-36 text-ellipsis  bg-white p-4 pr-6  rounded-md shadow-md ">
        <div className="w-full grid-span-1 grid grid-rows-2  gap-3  rounded">
          <div className="w-3/4  bg-slate-200 "> </div>
          <div className="w-3/5  bg-slate-200 "> </div>
        </div>

        <div className="w-full  bg-slate-200 rounded"> </div>
      </div>
    </>
  );
}

export default FeaturedContentLoadingCard;
