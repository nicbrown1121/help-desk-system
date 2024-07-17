import { z } from "zod";

export const ticketSchema = z.object({
  name: z.string().min(3, "Name is required"), // Minimum length of name is 3 characters
  email: z.string().email("Invalid email format"),
  description: z.string().min(10, "Please provide description of problem"), // Minimun length of description is 10 characters
  status: z.enum(["NEW", "IN_PROGRESS", "RESOLVED"]),
});

export type Ticket = z.infer<typeof ticketSchema>;

export const validateTicket = (ticket: unknown) => {
  return ticketSchema.safeParse(ticket);
};
