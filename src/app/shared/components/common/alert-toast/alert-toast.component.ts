import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-alert-toast',
  imports: [CommonModule],
  templateUrl: './alert-toast.component.html',
  styles: `
    .toast-enter {
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to   { transform: translateX(0);   opacity: 1; }
    }
  `
})
export class AlertToastComponent implements OnInit, OnDestroy {

  alerts: Alert[] = [];

  private sub!: Subscription;

  constructor(private _alertService: AlertService) {}

  ngOnInit(): void {
    this.sub = this._alertService.alerts$.subscribe(alerts => {
      this.alerts = alerts;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  dismiss(id: string): void {
    this._alertService.dismiss(id);
  }

  trackById(_index: number, item: Alert): string {
    return item.id;
  }

  getContainerClass(type: Alert['type']): string {
    const map: Record<Alert['type'], string> = {
      success: 'border-success-500 bg-success-50 dark:border-success-500/30 dark:bg-success-500/15',
      error:   'border-error-500 bg-error-50 dark:border-error-500/30 dark:bg-error-500/15',
      warning: 'border-warning-500 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/15',
      info:    'border-blue-light-500 bg-blue-light-50 dark:border-blue-light-500/30 dark:bg-blue-light-500/15',
    };
    return map[type];
  }

  getIconClass(type: Alert['type']): string {
    const map: Record<Alert['type'], string> = {
      success: 'text-success-500',
      error:   'text-error-500',
      warning: 'text-warning-500',
      info:    'text-blue-light-500',
    };
    return map[type];
  }

  getIcon(type: Alert['type']): string {
    const icons: Record<Alert['type'], string> = {
      success: `<svg class="fill-current" width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.70186 12.0001C3.70186 7.41711 7.41711 3.70186 12.0001 3.70186C16.5831 3.70186 20.2984 7.41711 20.2984 12.0001C20.2984 16.5831 16.5831 20.2984 12.0001 20.2984C7.41711 20.2984 3.70186 16.5831 3.70186 12.0001ZM12.0001 1.90186C6.423 1.90186 1.90186 6.423 1.90186 12.0001C1.90186 17.5772 6.423 22.0984 12.0001 22.0984C17.5772 22.0984 22.0984 17.5772 22.0984 12.0001C22.0984 6.423 17.5772 1.90186 12.0001 1.90186ZM15.6197 10.7395C15.9712 10.388 15.9712 9.81819 15.6197 9.46672C15.2683 9.11525 14.6984 9.11525 14.347 9.46672L11.1894 12.6243L9.6533 11.0883C9.30183 10.7368 8.73198 10.7368 8.38051 11.0883C8.02904 11.4397 8.02904 12.0096 8.38051 12.3611L10.553 14.5335C10.7217 14.7023 10.9507 14.7971 11.1894 14.7971C11.428 14.7971 11.657 14.7023 11.8257 14.5335L15.6197 10.7395Z"/>
      </svg>`,
      error: `<svg class="fill-current" width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12.9 7C12.9 6.50294 12.4971 6.1 12 6.1C11.5029 6.1 11.1 6.50294 11.1 7V13C11.1 13.4971 11.5029 13.9 12 13.9C12.4971 13.9 12.9 13.4971 12.9 13V7ZM12 15.1C11.4477 15.1 11 15.5477 11 16.1C11 16.6523 11.4477 17.1 12 17.1C12.5523 17.1 13 16.6523 13 16.1C13 15.5477 12.5523 15.1 12 15.1Z"/>
      </svg>`,
      warning: `<svg class="fill-current" width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5639 3.5C11.1132 2.5 12.4717 2.5 13.021 3.5L21.3923 18C21.9416 19 21.2624 20.25 20.1638 20.25H3.42113C2.32254 20.25 1.64328 19 2.19258 18L10.5639 3.5ZM11.75 9.25C11.75 8.83579 12.0858 8.5 12.5 8.5C12.9142 8.5 13.25 8.83579 13.25 9.25V13.75C13.25 14.1642 12.9142 14.5 12.5 14.5C12.0858 14.5 11.75 14.1642 11.75 13.75V9.25ZM12.5 15.5C12.0858 15.5 11.75 15.8358 11.75 16.25C11.75 16.6642 12.0858 17 12.5 17C12.9142 17 13.25 16.6642 13.25 16.25C13.25 15.8358 12.9142 15.5 12.5 15.5Z"/>
      </svg>`,
      info: `<svg class="fill-current" width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 10.1C12.4971 10.1 12.9 10.5029 12.9 11V17C12.9 17.4971 12.4971 17.9 12 17.9C11.5029 17.9 11.1 17.4971 11.1 17V11C11.1 10.5029 11.5029 10.1 12 10.1ZM12 6.9C11.4477 6.9 11 7.34772 11 7.9C11 8.45228 11.4477 8.9 12 8.9C12.5523 8.9 13 8.45228 13 7.9C13 7.34772 12.5523 6.9 12 6.9Z"/>
      </svg>`,
    };
    return icons[type];
  }
}
