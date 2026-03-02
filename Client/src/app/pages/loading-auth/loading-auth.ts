import { Component } from '@angular/core';
import { SpinningWheel } from "../../shared/components/spinning-wheel/spinning-wheel";

@Component({
  selector: 'app-loading-auth',
  imports: [SpinningWheel],
  templateUrl: './loading-auth.html',
  styleUrl: './loading-auth.scss',
})
export class LoadingAuth {

}
