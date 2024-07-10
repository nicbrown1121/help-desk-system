import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h1>Welcome to the Ticketing System</h1>
      <ul>
          <Link to="/submit-ticket">Submit a Ticket</Link>
        </ul>
        <ul>
          <Link to="/view-tickets">View Tickets</Link>
      </ul>
    </div>
  );
};
