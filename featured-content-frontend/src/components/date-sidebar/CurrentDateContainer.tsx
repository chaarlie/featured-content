import React from "react";
import CurrentDate from "./CurrentDate";

function CurrentDateContainer() {
  return (
    <ol className="current-date-custom-list h-48 p-5 shadow-lg shadow-primary-2 bg-primary-2 font-bold border rounded ">
      <CurrentDate date="23/03/2024" />
      <CurrentDate date="23/03/2024" />
      <CurrentDate date="23/03/2024" />
      <CurrentDate date="23/03/2024" />
      <CurrentDate date="23/03/2024" />
    </ol>
  );
}

export default CurrentDateContainer;
