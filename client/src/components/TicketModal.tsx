import { ChangeEvent, useEffect, useState } from "react";
import { Ticket } from './ViewTickets';
import { TicketStatus } from "../utils/ticketStatusEnum";
import { addCommentToTicket, updateTicketStatus } from "./service/ticketService";

interface TicketModalProps {
  ticket: Ticket | null;
  show: boolean;
  onClose: () => void;
  onSave: (ticket: Ticket) => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ ticket, show, onClose, onSave }) => {
  const [status, setStatus] = useState<TicketStatus>(TicketStatus.NEW);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status as TicketStatus);
      setComment('');
    }
  }, [ticket]);


  const handleSave = async () => {
    if (ticket) {
      const updatedTicket = { ...ticket, status };
      try {
        await updateTicketStatus(ticket.id, status);
        if (comment) {
          const newComment = await addCommentToTicket(ticket.id, comment);
          const updatedTicketWithComments = { 
            ...updatedTicket, 
            comments: [...(ticket.comments || []), newComment] 
          };
          onSave(updatedTicketWithComments);
        } else {
          onSave(updatedTicket);
        }
        onClose();
      } catch (error) {
        console.error('Error saving ticket', error);
      }
    }
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as TicketStatus);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  if (!show || !ticket) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">Update Ticket Status</h2>
        <p className="text-black">Name: {ticket.name}</p>
        <p className="text-black">Email: {ticket.email}</p>
        <p className="text-black">Description:</p>
        <p className='border p-2 rounded-md mb-4 text-black'>{ticket.description}</p>
        <div className="mb-4">
          <label className="block font-bold mb-2 text-black">
            Status: 
            <select className="block w-full mt-1 p-2 border rounded-md text-center font-normal text-black dark:bg-gray-200" value={status} onChange={handleStatusChange}>
              <option value={TicketStatus.NEW}>New</option>
              <option value={TicketStatus.IN_PROGRESS}>In Progress</option>
              <option value={TicketStatus.RESOLVED}>Resolved</option>
            </select>
          </label>
          </div>
          <div className="mb-4">
            <p className="font-bold mb-2">Comments:</p>
            <div className="border p-2 rounded-md mb-4 max-h-32 overflow-y-auto text-black">
              {ticket.comments && ticket.comments.map((c, index) => (
                <p key={index}>{c.comment}</p>
              ))}
            </div>
          </div>
          <div className="mb-4">
          <label className="block font-bold mb-2 text-black">
            Add Comment:
            <textarea className="block w-full mt-1 p-2 border rounded-md font-normal text-black dark:bg-gray-200" value={comment} onChange={handleCommentChange} placeholder="Add Comment" />
          </label>
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="py-2 px-4 bg-gray-500 text-white rounded-md">Close</button>
          <button onClick={handleSave} className="py-2 px-4 bg-blue-500 text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
}