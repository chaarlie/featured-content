function CurrentDate({ date }: { date: string }) {
  return (
    <li className="current-date-custom-list-item flex gap-3  ">
      <div className="flex bg-transparent justify-center relative w-full ">
        <div className="absolute  border-b-2 mt-5 border-shade-3 w-2/3"></div>
        <span className="block"> {date}</span>
      </div>
    </li>
  );
}

export default CurrentDate;
