
interface FeaturedContentCardInterface {
    title: string
    content: string
    img: string
}

function FeaturedContentCard({title, content, img}: FeaturedContentCardInterface) {
  return (
    <div className="row-span-1 flex gap-5">
    <div>
      <img
        className=""
        width="220"
        height="150"
        src={img}
      />
    </div>

    <div className="flex-col gap-5">
      <div>
        <h3 className="  uppercase font-bold text-sky-700">
          {title}
        </h3>
      </div>
      <div>
        <p className="">
          {content}
        </p>
      </div>
    </div>
  </div>
  )
}

export default FeaturedContentCard