import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type AlertType = 'success' | 'warning' | 'error' | 'info';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private readonly DEFAULT_DURATION = 4000;

  private alertsSubject = new BehaviorSubject<Alert[]>([]);
  alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();

  success(message: string, title: string = 'Éxito', duration = this.DEFAULT_DURATION): void {
    this.addAlert('success', title, message, duration);
  }

  warning(message: string, title: string = 'Advertencia', duration = this.DEFAULT_DURATION): void {
    this.addAlert('warning', title, message, duration);
  }

  error(message: string, title: string = 'Error', error: any = null, duration = this.DEFAULT_DURATION): void {
    let messageData = message;
    if (error && error.message) {
      messageData += `: ${error.message || error}`;
    }
    this.addAlert('error', title, messageData, duration);
  }

  info(message: string, title: string = 'Información', duration = this.DEFAULT_DURATION): void {
    this.addAlert('info', title, message, duration);
  }

  dismiss(id: string): void {
    const current = this.alertsSubject.value;
    this.alertsSubject.next(current.filter(a => a.id !== id));
  }

  private addAlert(type: AlertType, title: string, message: string, duration: number): void {
    const id = crypto.randomUUID();
    const alert: Alert = { id, type, title, message, duration };

    this.alertsSubject.next([...this.alertsSubject.value, alert]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }
}
