import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post(':ticketId')
  addComment(
    @Param('ticketId') ticketId: string,
    @Body() comment: CreateCommentDTO,
  ) {
    return this.commentsService.createComment(ticketId, comment);
  }
}
