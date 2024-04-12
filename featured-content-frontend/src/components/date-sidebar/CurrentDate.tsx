

function CurrentDate({ date }: { date: string }) {
  return (
    <li className=" current-date-custom-list-item flex gap-3  ">
      <div className=" flex justify-center relative w-2/4   border-b-2  border-shade-3">
        <span className="block"> {date}</span>
      </div>
    </li>
  )
}

export default CurrentDate
