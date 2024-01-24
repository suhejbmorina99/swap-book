import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  // Add a new observable for the deleteBook event
  private deleteBook = new Subject<any>();

  private swapRequest = new Subject<any>();

  constructor() {
    // Connect to the WebSocket server (replace 'http://localhost:3000' with your server URL)
    this.socket = io('http://localhost:3000');

    // You can add additional setup or event handlers here
    // For example, to handle a book created event:
    this.socket.on('userBooksUpdated', (createdBook) => {
      // Handle the book created event here
      console.log('userBooksUpdated:', createdBook);
    });

    // Listen for the swapRequest event
    this.socket.on('swapRequest', (swapData) => {
      // Notify subscribers about the swapRequest event
      this.swapRequest.next(swapData);
    });

    // Listen for the deleteBook event
    this.socket.on('deleteBook', (deletedBook) => {
      // Notify subscribers about the deletedBook event
      this.deleteBook.next(deletedBook);
    });
  }

  // Emit a custom event to the server
  emitEvent(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Listen for custom events from the server
  onEvent(eventName: string): Observable<any> {
    switch (eventName) {
      case 'swapRequest':
        return this.swapRequest.asObservable();
      case 'deleteBook':
        return this.deleteBook.asObservable();
      default:
        return new Observable((observer) => {
          this.socket.on(eventName, (data) => {
            observer.next(data);
          });
        });
    }
  }
}
