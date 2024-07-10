import { useState, useEffect } from "react";
import './styles.css'
import { TicketModal } from "./TicketModal";
import config from '../config';

export interface Ticket {
  id: string;
  name: string;
  email: string;
  description: string;
  status: string;
  comments: { comment: string }[];
}

export const ViewTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/ticket`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.log('Error fetching tickets', error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSaveTicket = async (updatedTicket: Ticket) => {
    setTickets(tickets.map(ticket => ticket.name === updatedTicket.name ? updatedTicket : ticket));
  };

  const handleOpenModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
    setShowTicketModal(false);
  };

  const renderTicketsByStatus = (status: string) => {
    return tickets
      .filter(ticket => ticket.status === status)
      .map((ticket, index) => (
        <tr key={index}>
          <td className="td" >{ticket.name}</td>
          <td className="td">{ticket.email}</td>
          <td className="td td-description">{ticket.description}</td>
          <td className="td">
            <button onClick={() => handleOpenModal(ticket)}>edit</button>
          </td>
        </tr>
      ));
  };

  return (
    <div className='tableContainer'>
      <h1>All Tickets</h1>
      <h2>New Tickets</h2>
      <table className='table'>
        <thead>
          <tr>
            <th className='th'>Name</th>
            <th className='th'>Email</th>
            <th className='th-description'>Description</th>
            <th className='th'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {renderTicketsByStatus('NEW')}
        </tbody>
      </table>
      <h2>In Progress</h2>
      <table className='table'>
        <thead>
          <tr>
            <th className='th'>Name</th>
            <th className='th'>Email</th>
            <th className='th-description'>Description</th>
            <th className='th'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {renderTicketsByStatus('IN_PROGRESS')}
        </tbody>
      </table>
      <h2>Resolved</h2>
      <table className='table'>
        <thead>
          <tr>
            <th className='th'>Name</th>
            <th className='th'>Email</th>
            <th className='th-description'>Description</th>
            <th className='th'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {renderTicketsByStatus('RESOLVED')}
        </tbody>
      </table>
      <TicketModal
        ticket={selectedTicket}
        show={showTicketModal}
        onClose={handleCloseModal}
        onSave={handleSaveTicket}
      />
    </div>
  );
};
