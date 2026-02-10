import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  imports: [MatIcon],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss']
})
export class Modal {
  isOpen = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
