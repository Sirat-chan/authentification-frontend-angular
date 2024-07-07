import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private modalToggleSubject = new Subject<void>();

  modalToggle$ = this.modalToggleSubject.asObservable();

  triggerModal() {
    this.modalToggleSubject.next();
  }
}
