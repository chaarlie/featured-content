import "./App.css";
import Home from "./components/home/Home";
import { ContentSelectionContextProvider } from "./context/ContentSelectionContext";

function App() {
  return (
    <ContentSelectionContextProvider>
      <main className="bg-accent-2">
        <div className="h-screen overflow-y-hidden">
          <Home />
        </div>
      </main>
    </ContentSelectionContextProvider>
  );
}

export default App;
