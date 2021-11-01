import { useState } from 'react'
import './App.css';
import TravelList from './components/TravelList';

function App() {
  const [showTravels, setShowTravels] = useState(true)
  return (
    <div className="App">
      <button onClick={() => setShowTravels(false)}>Stop fetch</button>
      {showTravels && <TravelList />}
    </div>
  );
}

export default App;
