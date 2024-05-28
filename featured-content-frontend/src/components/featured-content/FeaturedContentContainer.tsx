import {
  FormEvent,
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ContentLang, FeaturedContent } from "../../types";
import axios from "axios";
import FeaturedContentDateSelection from "./FeaturedContentDateSelection";
import moment from "moment";
import { useLoadedImages } from "../../hooks/useLoadedImages";
import { useEventSource } from "../../hooks/useEventSource";
import Loader from "../loader/Loader";

const FeaturedContentListDisplay = lazy(
  () => import("./FeaturedContentListDisplay")
);

const countryFlags = [
  { key: "en", url: "https://flagsapi.com/US/flat/64.png" },
  { key: "es", url: "https://flagsapi.com/ES/flat/64.png" },
  { key: "de", url: "https://flagsapi.com/DE/flat/64.png" },
];

interface FeaturedContentContainerProps {
  itemQty: number;
  setItemQty: (value: number) => void;
  currentDate: any;
  setCurrentDate: (value: any) => void;
}

function FeaturedContentContainer({
  itemQty,
  setItemQty,
  currentDate,
  setCurrentDate,
}: FeaturedContentContainerProps) {
  const [featuredContentList, setFeaturedContentList] = useState<
    FeaturedContent[]
  >([]);

  const [contentImages, setContentImages] = useState<string[]>([]);
  const [formattedDate, setFormattedDate] = useState<string>();

  const [currentFlag, setCurrentFlag] = useState<ContentLang>(countryFlags[0]);
  const [_flagIndex, setFlagIndex] = useState<number>(1);
  const { hasLoadedImages: hasLoadedContentImages } =
    useLoadedImages(contentImages);
  const { hasLoadedImages: hasLoadedFlagImages } = useLoadedImages(
    useMemo(() => countryFlags.map(({ url }) => url), [countryFlags])
  );

  const shouldSubmitForm = formattedDate && currentFlag && itemQty > 0;

  const { data: featuredContentEventData } =
    useEventSource<FeaturedContent>("featured-content");

  const { data: processStatusEventData } =
    useEventSource<string>("process-status");

  function pickNextFlag() {
    pickFlag(1);
  }

  function pickPreviousFlag() {
    pickFlag(-1);
  }

  function pickFlag(direction: number) {
    setFlagIndex((value) => {
      const index = 1 + (value % countryFlags.length);
      const flag =
        direction > 0
          ? countryFlags[index - 1]
          : countryFlags[countryFlags.length - index];

      setCurrentFlag(flag);

      return index;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (shouldSubmitForm) {
      if (featuredContentList.length > 0) {
        setFeaturedContentList([]);
      }

      const isLangEnglish = currentFlag?.key === "en";

      const REQ_URL = isLangEnglish
        ? `${process.env.REACT_APP_API_URL}/feed/en/${formattedDate}?qty=${itemQty}`
        : `${process.env.REACT_APP_API_URL}/feed/translate/en/${currentFlag.key}/${formattedDate}?qty=${itemQty}`;

      axios.get<any[]>(REQ_URL);
    }
  }

  useEffect(() => {
    const date: any = new Date(currentDate);

    if (date != "Invalid Date") {
      const newDateStr = moment(date).format("YYYY/MM/DD");
      setFormattedDate(newDateStr);
    }
  }, [currentDate]);

  useEffect(() => {
    if (featuredContentEventData && Array.isArray(featuredContentEventData)) {
      const thumbnails = featuredContentEventData.map(
        ({ featuredArticle }) => featuredArticle?.thumbnail!!
      );

      setContentImages(thumbnails);

      setFeaturedContentList(featuredContentEventData);
    }
  }, [featuredContentEventData]);

  const shouldDisplayContentList =
    hasLoadedContentImages && featuredContentList.length > 0;

  return (
    <section className="bg-primary-2 drop-shadow-lg  col-span-2 grid grid-rows-6 p-10 h-[calc(100%-3rem)]">
      {hasLoadedFlagImages ? (
        <div className="row-start-1 row-end-2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 grid-flow-row bg-shade-2 p-5 rounded ">
              <FeaturedContentDateSelection setCurrentDate={setCurrentDate} />

              <div className="rounded flex bg-shade-1 round">
                <div className="grid grid-cols-5 w-11/12">
                  <div className="col-span-3 w-full">
                    <img
                      className="object-cover h-24 w-28"
                      src={currentFlag?.url}
                    />
                  </div>
                  <div className="bg-primary-2 inset-0 p-0  flex justify-center items-center col-span-2">
                    <div className="border-b-2 border-shade-2">
                      <span className="text-4xl inline-block capitalize ">
                        {currentFlag?.key}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center w-5 p-2">
                  <div className="grid grid-rows-3  text-accent-1 ">
                    <div className="cursor-pointer" onClick={pickNextFlag}>
                      {" "}
                      &#8593;
                    </div>
                    <div
                      className="row-start-3 cursor-pointer"
                      onClick={pickPreviousFlag}
                    >
                      {" "}
                      &#8595;{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="justify-self-center flex-col gap-5 justify-center items-center col-span-3 mt-5">
                <div className="flex justify-center items-center ">
                  <span>Quantity</span>
                </div>
                <div>
                  <input
                    onChange={(event) => setItemQty(Number(event.target.value))}
                    value={itemQty}
                    className="p-1 w-36"
                    type="number"
                    min={1}
                    max={5}
                  />
                </div>
              </div>
            </div>

            <div className="justify-self-center flex-col  justify-center items-center col-span-3 mt-1 ">
              <div className="flex justify-center items-center ">
                <button
                  disabled={!shouldSubmitForm}
                  className={`bg-primary-1 ${
                    shouldSubmitForm ? "" : " opacity-60"
                  } font-bold text-white hover:bg-shade-6 active:text-slate-100 active:pt-[1px] active:pl-[2px] rounded w-20 h-8`}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : null}

      {processStatusEventData ? (
        <Suspense fallback={<Loader status={processStatusEventData} />}>
          <FeaturedContentListDisplay
            shouldDisplayContentList={shouldDisplayContentList}
            featuredContentList={featuredContentList}
            processStatus={processStatusEventData}
          />
        </Suspense>
      ) : null}
    </section>
  );
}

export default FeaturedContentContainer;
