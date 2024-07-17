import { TicketStatus } from "./ticketStatusEnum";

export type NewTicket = {
  name: string;
  email: string;
  description: string;
  status: TicketStatus;
}

export type Ticket = NewTicket & {
  id: string;
  comments: { comment: string }[];
}