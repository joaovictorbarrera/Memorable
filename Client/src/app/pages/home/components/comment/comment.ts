import { Component, Input } from '@angular/core';
import { CommentDto } from '../../../../shared/models/comment.dto';
import { ProfileIcon } from "../../../../shared/components/profile-icon/profile-icon";
import { formattedTime } from '../../../../shared/utilities/time';

@Component({
  selector: 'app-comment',
  imports: [ProfileIcon],
  templateUrl: './comment.html',
  styleUrl: './comment.scss',
})
export class Comment {
  @Input() comment!: CommentDto;

  formatTime(date: Date): string {
    return formattedTime(date);
  }
}
