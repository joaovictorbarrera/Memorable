import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  user: WritableSignal<UserDto | null> = signal(null);
}
