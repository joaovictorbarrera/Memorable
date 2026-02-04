import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  userId: Signal<number> = signal(1);
}
