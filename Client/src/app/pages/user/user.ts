import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileIcon } from "../../shared/components/profile-icon/profile-icon";

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit {
  username!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username')!;
    console.log('User ID:', this.username);
  }
}
