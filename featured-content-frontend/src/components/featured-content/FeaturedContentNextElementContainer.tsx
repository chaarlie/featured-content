import { useContext, useEffect } from "react";
import {
  ContentSelectionContextProps,
  ContentSelectionContext,
} from "../../context/ContentSelectionContext";

function FeaturedContentNextElementContainer({
  featuredContentList,
}: {
  featuredContentList: any[];
}) {
  const { currentContentIdx, setCurrentContentIdx } =
    useContext<ContentSelectionContextProps>(ContentSelectionContext);

  return (
    <div className="-mt-1 text-black">
      <div className="flex justify-end  ">
        <button
          onClick={() => {
            setCurrentContentIdx(currentContentIdx + 1);
          }}
          className={`bg-primary-1  font-bold text-white hover:bg-shade-6 active:text-slate-100 active:pt-[1px] active:pl-[2px] rounded w-20 h-8`}
        >
          Next &nbsp; ➥
        </button>
      </div>
    </div>
  );
}

export default FeaturedContentNextElementContainer;
