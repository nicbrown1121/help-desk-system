import './App.css';
import { Home } from './components/Home';
import { TicketForm } from './components/TicketForm';
import { ViewTickets } from './components/ViewTickets';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <nav className='nav'>
          <ul>
            <Link to="/">Home</Link>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit-ticket" element={<TicketForm />} />
          <Route path="/view-tickets" element={<ViewTickets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
