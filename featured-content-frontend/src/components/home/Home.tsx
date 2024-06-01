import DateSideBar from "../date-sidebar/DateSideBar";
import FeaturedContentContainer from "../featured-content/FeaturedContentContainer";

function Home() {
  return (
    <section className="grid grid-cols-3 m-2 rounded h border-2 border-shade-3 w-2/3 grid-flow-row mx-auto font-space-grotesk">
      <DateSideBar />
      <FeaturedContentContainer />
    </section>
  );
}

export default Home;
