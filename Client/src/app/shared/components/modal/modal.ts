import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { Card } from "../card/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  imports: [Card, MatIcon],
})
export class Modal {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  onContentClick(event: MouseEvent) {
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.close.emit();
  }
}
