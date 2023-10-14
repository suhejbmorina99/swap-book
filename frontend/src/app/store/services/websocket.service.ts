import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    // Connect to the WebSocket server (replace 'http://localhost:3000' with your server URL)
    this.socket = io('http://localhost:3000');

    // You can add additional setup or event handlers here
    // For example, to handle a book created event:
    this.socket.on('userBooksUpdated', (createdBook) => {
      // Handle the book created event here
      console.log('userBooksUpdated:', createdBook);
    });
  }

  // Emit a custom event to the server
  emitEvent(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Listen for custom events from the server
  onEvent(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });
    });
  }
}
