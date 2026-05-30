import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DashboardDTO } from '../models/dashboard.dto';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly url = `${environment.api_url}/api/dashboard`;

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<DashboardDTO> {
    return this.http.get<DashboardDTO>(this.url);
  }
}
