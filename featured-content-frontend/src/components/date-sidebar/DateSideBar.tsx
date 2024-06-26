import DateSideBarHeader from "./DateSideBarHeader";
import CurrentDateContainer from "./CurrentDateContainer";

function DateSideBar() {
  return (
    <section className="flex-col grid grid-rows-12 gap-3 justify-items-center col-span-1 p-10">
      <div className="w-full p-10 flex-col justify-items-center justify-center  row-span-6  ">
        <DateSideBarHeader />
        <CurrentDateContainer />
      </div>
    </section>
  );
}

export default DateSideBar;
