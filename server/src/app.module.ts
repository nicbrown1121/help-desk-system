import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommentsController } from './comments/comments.controller';
import { TicketController } from './ticket/ticket.controller';
import { AppService } from './app.service';
import { CommentsService } from './comments/comments.service';
import { TicketService } from './ticket/ticket.service';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, CommentsController, TicketController],
  providers: [AppService, CommentsService, TicketService, PrismaService],
})
export class AppModule {}
