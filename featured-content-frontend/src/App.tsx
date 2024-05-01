
import "./App.css";
import DateSideBar from "./components/date-sidebar/DateSideBar";
import FeaturedContentContainer from "./components/featured-content/FeaturedContentContainer";

function App() {
  return (
    <main className="bg-accent-2">
      <div className="h-screen overflow-y-hidden">
      <section className="grid grid-cols-3 m-2 rounded h border-2 border-shade-3 w-2/3 grid-flow-row mx-auto font-space-grotesk">
        <DateSideBar />
        <FeaturedContentContainer />
      </section>
      </div>
    </main>
  );
}

export default App;
