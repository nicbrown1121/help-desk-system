import { useState, useEffect } from "react";
import { TicketModal } from "./TicketModal";
import { fetchTickets } from "./service/ticketService";

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

  useEffect(() => {
    const getTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets', error);
      }
    };
    getTickets();
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
        <tr key={index} className="even:bg-gray-100 hover:bg-gray-200">
          <td className="border px-4 py-2 text-black w-custom-name" >{ticket.name}</td>
          <td className="border px-4 py-2 text-black w-custom-email">{ticket.email}</td>
          <td className="border px-4 py-2 text-black w-custom-description hidden md:table-cell">{ticket.description}</td>
          <td className="border px-4 py-2 text-white w-custom-view text-center">
            <button className="bg-black" onClick={() => handleOpenModal(ticket)}>View</button>
          </td>
        </tr>
      ));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">All Tickets</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">New Tickets</h2>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-collapse border-gray-200">
        <thead>
          <tr>
            <th className="bg-gray-100 border px-4 py-2 text-black w-custom-name">Name</th>
            <th className="bg-gray-100 border px-4 py-2 text-black w-custom-email">Email</th>
            <th className="bg-gray-100 border px-4 py-2 text-black w-custom-description hidden md:table-cell">Description</th>
            <th className="bg-gray-100 border px-4 py-2 text-black w-custom-view">View Ticket</th>
          </tr>
        </thead>
        <tbody>
          {renderTicketsByStatus('NEW')}
        </tbody>
      </table>
      </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">In Progress</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-collapse border-gray-200">
        <thead>
          <tr>
            <th className="bg-gray-100 border px-4 py-2 text-black w-custom-name">Name</th>
            <th className="bg-gray-100 border px-4 py-2 text-black w-custom-email">Email</th>
            <th className="bg-gray-100 border px-4 py-2 text-black w-custom-description hidden md:table-cell">Description</th>
            <th className="bg-gray-100 border px-4 py-2 text-black w-custom-view">View Ticket</th>
          </tr>
        </thead>
        <tbody>
          {renderTicketsByStatus('IN_PROGRESS')}
        </tbody>
      </table>
      </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Resolved</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-collapse border-gray-200">
        <thead>
          <tr>
            <th className="bg-gray-100 border px-4 py-2 text-black w-custom-name">Name</th>
            <th className="bg-gray-100 border px-4 py-2 text-black w-custom-email">Email</th>
            <th className="bg-gray-100 border px-4 py-2 text-black w-custom-description hidden md:table-cell">Description</th>
            <th className="bg-gray-100 border px-4 py-2 text-black w-custom-view">View Ticket</th>
          </tr>
        </thead>
        <tbody>
          {renderTicketsByStatus('RESOLVED')}
        </tbody>
      </table>
      </div>
      </div>
      <TicketModal
        ticket={selectedTicket}
        show={showTicketModal}
        onClose={handleCloseModal}
        onSave={handleSaveTicket}
      />
    </div>
  );
};
