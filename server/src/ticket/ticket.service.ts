import { Injectable } from '@nestjs/common';
import { CreateTicketDTO, UpdateTicketStatusDTO } from './ticket.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Ticket, TicketStatus } from '@prisma/client';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async createTicket(data: CreateTicketDTO): Promise<Ticket> {
    return this.prisma.ticket.create({
      data: {
        ...data,
        status: data.status as TicketStatus,
      },
    });
  }

  async updateTicket(id: string, statusData: UpdateTicketStatusDTO) {
    return this.prisma.ticket.update({
      where: { id },
      data: { status: statusData.status },
    });
  }

  async getTickets() {
    return this.prisma.ticket.findMany({
      include: { comments: true },
    });
  }
}
