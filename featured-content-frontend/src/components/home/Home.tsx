import { useState } from "react";
import DateSideBar from "../date-sidebar/DateSideBar"
import FeaturedContentContainer from "../featured-content/FeaturedContentContainer"


function Home() {
  const [itemQty, setItemQty] = useState<number>(1);
  const [currentDate, setCurrentDate] = useState<any>();
  
  return (
    <section className="grid grid-cols-3 m-2 rounded h border-2 border-shade-3 w-2/3 grid-flow-row mx-auto font-space-grotesk">
    <DateSideBar currentDate={currentDate} itemQty={itemQty} />
    <FeaturedContentContainer currentDate={currentDate} setCurrentDate={setCurrentDate} itemQty={itemQty} setItemQty={setItemQty} />
  </section>
  )
}

export default Home