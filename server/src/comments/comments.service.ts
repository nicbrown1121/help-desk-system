import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from '@prisma/client';
import { CreateCommentDTO } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(
    ticketId: string,
    commentData: CreateCommentDTO,
  ): Promise<Comment> {
    return this.prisma.comment.create({
      data: {
        ticketId: ticketId,
        comment: commentData.comment,
      },
    });
  }

  async getCommentsByTicketId(ticketId: string): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: { ticketId },
    });
  }
}
