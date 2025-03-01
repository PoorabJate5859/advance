import "./App.css";
import BlogEntries from "./components/BlogEntries";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryDetail from "./components/EntryDetail";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<BlogEntries />} />
            <Route path="/entries/:entryId" element={<EntryDetail />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;