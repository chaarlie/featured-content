import { ReactNode } from "react";
import Loader from "../loader/Loader";

interface FeaturedContentLoadingProps {
  processStatusEventData: string;
  loadingContentList: ReactNode[];
}

function FeaturedContentLoading({
  processStatusEventData,
  loadingContentList,
}: FeaturedContentLoadingProps) {
  return (
    <div className="row-start-2  row-end-6">
      <Loader status={processStatusEventData} />

      <div>
        <div className="flex mt-10 flex-col gap-3">
          <div className="overflow-auto grid grid-cols-3 grid-flow-row gap-10 bg-shade-2 p-4 rounded auto-rows-max w-full min-h-96 max-h-96 ">
            {loadingContentList}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedContentLoading;
