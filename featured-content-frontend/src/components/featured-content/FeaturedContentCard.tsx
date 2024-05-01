interface FeaturedContentCardInterface {
  title: string;
  content: string;
  img: string;
}

function FeaturedContentCard({
  title,
  content,
  img,
}: FeaturedContentCardInterface) {
  return (
    <>
    <div className="col-span-1">
      <div className="flex items-center h-full">
        <div className="bg-slate-300">
          <img className="object-cover h-36 w-96" src={img} />
        </div>
      </div>
    </div>
    <div className="col-span-2  overflow-auto text-ellipsis  bg-white p-4 pr-6 border-l-8 border-shade-4 rounded-md shadow-md ">
      <div>
        <h3 className="uppercase font-bold ">{title}</h3>
      </div>
      <div className="mt-3">
        <p className="text-justify">{content}</p>
      </div>
    </div>
  </>
  );
}

export default FeaturedContentCard;
