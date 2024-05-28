import LoaderAnimations from "./LoaderAnimations"

function Loader({status}: {status: string}) {
  return (
    <div className="flex mt-10 max-h-20 relative p-0 items-center justify-center ">
    <div className="bg-shade-6 p-3 rounded-lg text-shade-2 opacity-90  font-bold w-40">
      <div className="grid grid-flow-row grid-rows-2  justify-center ">
        <h3 className="text-xs uppercase font-ibm-plex-mono tracking-widest animate-pulse block text-center">{status}</h3>
        <LoaderAnimations />
      </div>
    
    </div>
  </div>  
  )
}

export default Loader