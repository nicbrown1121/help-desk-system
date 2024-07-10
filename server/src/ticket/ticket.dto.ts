import { IsEnum, IsNotEmpty } from 'class-validator';
import { TicketStatus } from '@prisma/client';

export class CreateTicketDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(TicketStatus)
  status: TicketStatus;
}

export class UpdateTicketStatusDTO {
  @IsNotEmpty()
  @IsEnum(TicketStatus)
  status: TicketStatus;
}
