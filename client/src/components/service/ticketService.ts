import config from '../../config';
import { NewTicket, Ticket } from '../../utils/ticketTypes';
import { TicketStatus } from '../../utils/ticketStatusEnum';

export const fetchTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await fetch(`${config.apiUrl}/ticket`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Error fetching tickets');
    }
  } catch (error) {
    console.error('Error fetching tickets', error);
    throw error;
  }
};

export const updateTicketStatus = async (ticketId: string, status: TicketStatus): Promise<void> => {
  try {
    const response = await fetch(`${config.apiUrl}/ticket/${ticketId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Error updating ticket status');
    }
  } catch (error) {
    console.error('Error updating ticket status', error);
    throw error;
  }
};

export const addCommentToTicket = async (ticketId: string, comment: string): Promise<{ comment: string }> => {
  try {
    const response = await fetch(`${config.apiUrl}/comments/${ticketId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Error adding comment');
    }
  } catch (error) {
    console.error('Error adding comment', error);
    throw error;
  }
};

export const createTicket = async (ticket: NewTicket): Promise<void> => {
  try {
    const response = await fetch(`${config.apiUrl}/ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket),
    });
    if (!response.ok) {
      throw new Error('Error creating ticket');
    }
  } catch (error) {
    console.error('Error creating ticket', error);
    throw error;
  }
};
