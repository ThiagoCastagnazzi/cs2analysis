import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Jogadores from './pages/Jogadores';
import PlayerProfile from './pages/PlayerProfile';
import Times from './pages/Times';
import TeamProfile from './pages/TeamProfile';
import VS from './pages/VS';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jogadores" element={<Jogadores />} />
            <Route path="/jogadores/:id" element={<PlayerProfile />} />
            <Route path="/times" element={<Times />} />
            <Route path="/times/:id" element={<TeamProfile />} />
            <Route path="/vs" element={<VS />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

