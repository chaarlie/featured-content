import { useContext } from "react";
import {
  ContentSelectionContextProps,
  ContentSelectionContext,
} from "../../context/ContentSelectionContext";
import CurrentDate from "./CurrentDate";
import moment from "moment";

function CurrentDateContainer() {
  const { itemQty, currentDate } = useContext<ContentSelectionContextProps>(
    ContentSelectionContext
  );

  const displayDates = Array.from({ length: itemQty }).map((_date, i) => {
    return moment(currentDate).add(i, 'days').utc().format("MM/DD/YYYY");
  });

  return (
    <ol className="current-date-custom-list min-h-48 p-5 shadow-lg shadow-primary-2 bg-primary-2 font-bold border rounded ">
      {displayDates.map((date, i) => (
        <CurrentDate key={i} date={date} />
      ))}
    </ol>
  );
}

export default CurrentDateContainer;
