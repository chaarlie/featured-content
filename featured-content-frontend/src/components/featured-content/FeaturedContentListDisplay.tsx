import FeaturedContentCard from "./FeaturedContentCard";
import { FeaturedContent } from "../../types";
import FeaturedContentNextElementContainer from "./FeaturedContentNextElementContainer";

const IMAGE_NOT_FOUND =
  "https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=1024x1024&w=is&k=20&c=jMNMEtHs4WCgUd9WCoR2gcKdD0UAOFoTROlutZRWNLE=";

interface featuredContentListProps {
  shouldDisplayContentList: boolean;
  featuredContentList: FeaturedContent[];
  processStatus: string;
}

function FeaturedContentListDisplay({
  shouldDisplayContentList,
  featuredContentList,
  processStatus,
}: featuredContentListProps) {
  if (!(shouldDisplayContentList && processStatus == "completed")) {
    throw new Promise((resolve) => {
      resolve({});
    });
  }

  return (
    <div className="row-start-2 mt-24 row-end-6">
      <div className="flex flex-col gap-3">
        <div className="overflow-auto grid grid-cols-3 grid-flow-row gap-10 bg-shade-2 p-4 rounded auto-rows-max w-full min-h-96 max-h-96 ">
          {featuredContentList.length > 0
            ? featuredContentList.map((content) => {
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
            : null}
        </div>

        <FeaturedContentNextElementContainer />
      </div>
    </div>
  );
}

export default FeaturedContentListDisplay;
