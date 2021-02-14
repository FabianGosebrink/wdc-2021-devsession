import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';
import { Todo } from './todo';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private connection: HubConnection;
  private itemUpdatedInternal = new Subject<Todo>();
  private itemAddedInternal = new Subject<Todo>();

  get itemUpdated() {
    return this.itemUpdatedInternal.asObservable();
  }

  get itemAdded() {
    return this.itemAddedInternal.asObservable();
  }

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.serverUrl}todohub`)
      .configureLogging(LogLevel.Information)
      .build();

    this.registerOnEvents();
    this.connection.start().catch((err) => console.log(err.toString()));
  }

  registerOnEvents() {
    this.connection.on('todo-added', (item) => {
      console.log('itemAdded');
      this.itemAddedInternal.next(item);
    });

    this.connection.on('todo-updated', (item) => {
      console.log('itemUpdated');
      this.itemUpdatedInternal.next(item);
    });
  }
}
