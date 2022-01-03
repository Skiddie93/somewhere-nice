import './style.css';
import Sidebar from './components/Sidebar';
import Place from './components/Place';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className='main'>
      
    <Router>
    <Sidebar />
      <Routes>
        <Route path="new" element={<Place />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
