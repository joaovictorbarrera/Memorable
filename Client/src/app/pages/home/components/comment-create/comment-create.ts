import { Component, Input } from '@angular/core';
import { ProfileIcon } from '../../../../shared/components/profile-icon/profile-icon';
import { PostButton } from '../post-button/post-button';
import { PostDto } from '../../../../shared/models/post.dto';

@Component({
  selector: 'app-comment-create',
  imports: [PostButton, ProfileIcon],
  templateUrl: './comment-create.html',
  styleUrl: './comment-create.scss',
})
export class CommentCreate {
  @Input() post!: PostDto;
}
