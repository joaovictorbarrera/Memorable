import { Component } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { ProfileIcon } from "../../shared/components/profile-icon/profile-icon";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-home',
  imports: [Card, ProfileIcon, MatIcon],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
