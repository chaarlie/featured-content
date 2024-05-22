import CurrentDate from "./CurrentDate";
import moment from "moment";

interface CurrentDateContainerProps {
  itemQty: number;
  currentDate: any;
}
function CurrentDateContainer({itemQty, currentDate}: CurrentDateContainerProps) {
  const displayDates = Array.from({length: itemQty}).map((_date, i) => {
    return moment(currentDate).add(i, 'days').format("MM/DD/YYYY");
  })

  return (
    <ol className="current-date-custom-list min-h-48 p-5 shadow-lg shadow-primary-2 bg-primary-2 font-bold border rounded ">
      {displayDates.map((date, i) => (
         <CurrentDate key={i} date={date} />
      ))}
    </ol>
  );
}

export default CurrentDateContainer;
