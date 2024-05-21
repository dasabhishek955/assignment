import './App.css';
import Homepage from './component/Homepage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateEvent from './component/CreateEvent';

function App() {
  return (
    <Router >
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;