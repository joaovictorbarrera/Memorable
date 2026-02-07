import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  user: WritableSignal<UserDto | null> = signal(null);
  fallbackProfileImageUrl = 'https://www.dbackdrop.com/cdn/shop/products/S4.jpg?v=1745735366&width=850';
}
