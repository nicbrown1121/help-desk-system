import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-20 text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Ticketing System</h1>
      <ul className="space-y-4">
        <li>
          <Link to="/submit-ticket" className="text-blue-500 hover:underline text-lg font-bold dark:text-blue-300">
            Submit a Ticket
          </Link>
        </li>
        <li>
          <Link to="/view-tickets" className="text-blue-500 hover:underline text-lg font-bold dark:text-blue-300">
            View Tickets
          </Link>
        </li>
      </ul>
    </div>
  );
};