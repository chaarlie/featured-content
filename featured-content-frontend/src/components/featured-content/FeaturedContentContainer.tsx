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

                resolve(image);
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
    <section className="col-span-2 flex flex-col  bg-slate-400 p-10">
      <FeaturedContentDateSelection setCurrentDate={setCurrentDate} />

      <div className="  h-1/2 overflow-scroll gap-4 mt-10">
        <div className="grid grid-rows-5 grid-flow-col gap-3">
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
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <FeaturedContentNextElementContainer />
    </section>
  );
}

export default FeaturedContentContainer;
