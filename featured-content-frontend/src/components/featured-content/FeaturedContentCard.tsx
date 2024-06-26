import { useContext, useEffect, useRef } from "react";
import {
  ContentSelectionContext,
  ContentSelectionContextProps,
} from "../../context/ContentSelectionContext";
import { motion } from "framer-motion";

interface FeaturedContentCardInterface {
  title: string;
  content: string;
  img: string;
  idx: number;
}

function FeaturedContentCard({
  title,
  content,
  img,
  idx,
}: FeaturedContentCardInterface) {
  const { currentContentIdx } = useContext<ContentSelectionContextProps>(
    ContentSelectionContext
  );
  const currentChild = useRef<HTMLDivElement>(null);

  const isActive = currentContentIdx === idx;

  useEffect(() => {
    setTimeout(() => {
      if (isActive && currentChild.current) {
        const parent = currentChild.current.parentNode as HTMLDivElement;
  
        if (parent) {
          parent.scrollTop = currentChild.current.scrollHeight * idx;
        }
      }
     }, 300)
  }, [isActive]);

  return (
    <motion.div
      ref={currentChild}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1}}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`grid grid-cols-3 grid-flow-row gap-10  hover:opacity-70 ${
        isActive ? "bg-shade-1 " : ""
      } [&:not(:first-child)]:mt-10`}
    >
      <div className="col-span-1">
        <div className="flex items-center h-full">
          <div className="bg-slate-300">
            <img className="object-cover h-36 w-96" src={img} />
          </div>
        </div>
      </div>
      <div
        className={`col-span-2  overflow-auto text-ellipsis ${
          isActive
            ? "bg-shade-4 border-shade-3 text-shade-1"
            : "bg-white border-shade-4"
        }  p-4 pr-6 border-l-8 rounded-md shadow-md`}
      >
        <div>
          <h3 className="uppercase font-bold ">{title}</h3>
        </div>
        <div className="mt-3">
          <p className="text-justify">{content}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default FeaturedContentCard;
