import React, { useEffect, useState } from "react";
import FeaturedContentCard from "./FeaturedContentCard";
import FeaturedContentNextElementContainer from "./FeaturedContentNextElementContainer";
import { FeaturedContent } from "../../types";
import axios from "axios";
import FeaturedContentDateSelection from "./FeaturedContentDateSelection";
import moment from "moment";

function FeaturedContentContainer() {
  const IMAGE_NOT_FOUND =
    "https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=1024x1024&w=is&k=20&c=jMNMEtHs4WCgUd9WCoR2gcKdD0UAOFoTROlutZRWNLE=";
  const [featuredContentList, setFeaturedContentList] = useState<
    FeaturedContent[]
  >([]);

  const [currentDate, setCurrentDate] = useState<any>();
  const [formattedDate, setFormattedDate] = useState<string>();

  useEffect(() => {
    const date: any = new Date(currentDate);

    if (date != "Invalid Date") {
      const newDateStr = moment(date).format("YYYY/MM/DD");

      setFormattedDate(newDateStr);
    }
  }, [currentDate]);

  useEffect(() => {
    if (formattedDate) {
      if (featuredContentList.length > 0) {
        setFeaturedContentList([]);
      }

      const REQ_URL = `${process.env.REACT_APP_API_URL}/feed/en/${formattedDate}?qty=5`;

      axios.get<any[]>(REQ_URL).then((response) => {
        if (Array.isArray(response.data)) {
          const parsedData = response.data.map((el) => {
            const parsed = JSON.parse(el);

            return parsed as FeaturedContent;
          });

          Promise.all(
            parsedData.map((content) => {
              return new Promise((resolve, reject) => {
                const image = new Image();

                image.src = content.featuredArticle?.thumbnail
                  ? content.featuredArticle?.thumbnail
                  : IMAGE_NOT_FOUND;

                image.onload = () => resolve(image);
              });
            })
          ).then((loadedImages) => {
            if (Array.isArray(loadedImages) && loadedImages.length > 0) {
              setFeaturedContentList(parsedData);
            }
          });
        }
      });
    }
  }, [formattedDate]);
  return (
    <section className="bg-primary-2 drop-shadow-lg  col-span-2 grid grid-rows-6 p-10 h-[calc(100%-3rem)] ">
      <div className="row-start-1 row-end-2 grid grid-cols-2   bg-shade-2 p-5 rounded ">
        <FeaturedContentDateSelection setCurrentDate={setCurrentDate} />

        <div className="rounded flex bg-shade-1 round">
          <div className="grid grid-cols-5 w-11/12">
            <div className="bg-black col-span-3 w-full">sdfsd</div>
            <div className="bg-primary-2 inset-0 p-0  flex justify-center items-center col-span-2">
              <div className="border-b-2 border-shade-2">
                <span className="text-4xl inline-block capitalize ">es</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center w-5 p-2">
            <div className="grid grid-rows-3  text-accent-1 ">
              <div className="cursor-pointer"> &#8593;</div>
              <div className="row-start-3 cursor-pointer"> &#8595; </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row-start-3 row-end-6">
        <div className="flex flex-col gap-3">
          <div className="overflow-auto grid grid-cols-3 grid-flow-row gap-10 bg-shade-2 p-4 rounded auto-rows-max w-full min-h-96 max-h-96 ">
            {featuredContentList.length > 0 ? (
              featuredContentList.map((content) => {
                if (!content.featuredArticle) return null;

                const { featuredArticle } = content;

                return (
                  <FeaturedContentCard
                    key={content.id}
                    title={featuredArticle.title}
                    img={featuredArticle.thumbnail || IMAGE_NOT_FOUND}
                    content={featuredArticle.description}
                  />
                );
              })
            ) : formattedDate ? (
              <p>Loading...</p>
            ) : null}
          </div>

          <FeaturedContentNextElementContainer />
        </div>
      </div>
    </section>
  );
}

export default FeaturedContentContainer;
