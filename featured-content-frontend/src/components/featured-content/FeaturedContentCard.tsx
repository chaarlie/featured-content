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
    <div className="row-span-1 grid grid-cols-5 gap-8">
      <div className="col-span-2 h-40 overflow-auto">
        <div className="  ">
          <img className="object-cover" src={img} />
        </div>
      </div>

      <div className="flex-col h-40   col-span-3  overflow-auto text-ellipsis  ">
        <div>
          <h3 className="  uppercase font-bold ">{title}</h3>
        </div>
        <div className="mt-3">
          <p className="text-justify ">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default FeaturedContentCard;
