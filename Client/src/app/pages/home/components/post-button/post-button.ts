import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-button',
  imports: [],
  templateUrl: './post-button.html',
  styleUrl: './post-button.scss',
})
export class PostButton {
  @Input() disabled!: boolean;
}
