import { ChangeEvent, useEffect, useState } from "react";
import { Ticket } from './ViewTickets';
import './styles.css'
import { TicketStatus } from "../util/TicketStatusEnum";
import config from '../config';

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
      await fetch(`${config.apiUrl}/ticket/${ticket.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({status}),
      });
      if (comment) {
        await fetch(`${config.apiUrl}/comments/${ticket.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment }),
        })
        .then(response => response.json())
        .then((newComment) => {
          console.log(`Would normally send email here with body: New comment added: ${comment}`);
          // Update local comments state
          const updatedTicketWithComments = { 
            ...updatedTicket, 
            comments: [...(ticket.comments || []), newComment] 
          };
          onSave(updatedTicketWithComments);
        })
        .catch(error => console.error('Error adding comment:', error));
    } else {
      onSave(updatedTicket);
    }
    onClose();
  }};

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as TicketStatus);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  if (!show || !ticket) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="ticket-header">Update Ticket Status</h2>
        <p>Name: {ticket.name}</p>
        <p>Email: {ticket.email}</p>
        <p>Description:</p>
        <p className='modal-description'> {ticket.description}</p>
        <div className="modal-status">
          <label style={{fontWeight: '600'}}>
            Status: 
            {/* <div> */}
            <select value={status} onChange={handleStatusChange}>
              <option value={TicketStatus.NEW}>New</option>
              <option value={TicketStatus.IN_PROGRESS}>In Progress</option>
              <option value={TicketStatus.RESOLVED}>Resolved</option>
            </select>
            {/* </div> */}
          </label>
          </div>
          <div>
            <p>Comments:</p>
            <div className="modal-comments">
              {ticket.comments && ticket.comments.map((c, index) => (
                <p key={index}>{c.comment}</p>
              ))}
            </div>
          </div>
          <div className="add-comment">
          <label>
            Add Comment:
            <textarea value={comment} onChange={handleCommentChange} placeholder="Add Comment" />
          </label>
        </div>
        <div className="buttons">
        <button onClick={onClose}>Close</button>
        <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}