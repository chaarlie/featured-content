
import "./App.css";
import DateSideBar from "./components/date-sidebar/DateSideBar";
import FeaturedContentContainer from "./components/featured-content/FeaturedContentContainer";

function App() {
  return (
    <main>
      <section className="grid grid-cols-3  w-2/3 mx-auto font-space-grotesk ">
        <DateSideBar />

        <FeaturedContentContainer />
      </section>
    </main>
  );
}

export default App;
