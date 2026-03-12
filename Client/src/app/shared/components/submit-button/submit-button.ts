import { Component, Input, input } from '@angular/core';
import { SpinningWheel } from "../spinning-wheel/spinning-wheel";

@Component({
  selector: 'app-submit-button',
  imports: [SpinningWheel],
  templateUrl: './submit-button.html',
  styleUrl: './submit-button.scss',
})
export class SubmitButton {
  @Input() loading!: boolean
  @Input() text!: string
  @Input() disabled = false
}
