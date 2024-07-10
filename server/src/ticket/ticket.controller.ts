import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDTO, UpdateTicketStatusDTO } from './ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post()
  createTicket(@Body() ticketDetails: CreateTicketDTO) {
    return this.ticketService.createTicket(ticketDetails);
  }

  @Put(':id/status')
  updateTicket(
    @Param('id') id: string,
    @Body() ticketStatus: UpdateTicketStatusDTO,
  ) {
    return this.ticketService.updateTicket(id, ticketStatus);
  }

  @Get()
  getAllTickets() {
    return this.ticketService.getTickets();
  }
}
