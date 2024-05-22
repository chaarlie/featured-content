
import "./App.css";
import DateSideBar from "./components/date-sidebar/DateSideBar";
import FeaturedContentContainer from "./components/featured-content/FeaturedContentContainer";
import Home from "./components/home/Home";

function App() {
  return (
    <main className="bg-accent-2">
      <div className="h-screen overflow-y-hidden">
     <Home />
      </div>
    </main>
  );
}

export default App;
