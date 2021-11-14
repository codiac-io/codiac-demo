import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { chatHistory } from './message';
import { map } from 'rxjs/operators';

@Injectable()
export class QuickviewService {

  constructor(private http: HttpClient) { }

  // Get from the API
  getNotes() {
    return this.http.get<[]>('assets/data/notes.json')
      .pipe(map(res => res))
  }

  getUsers() {
    return this.http.get<[]>('assets/data/users.json')
      .pipe(map(res => res))
  }

  getChatMessages() {
    return this.http.get<chatHistory>('assets/data/messages.json')
      .pipe(map(res => res))
  }
}
