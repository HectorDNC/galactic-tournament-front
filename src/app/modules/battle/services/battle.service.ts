import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BattleRequest, BattleResult } from '../models/battle';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private readonly url = `${environment.api_url}/api/battles`;

  constructor(private http: HttpClient) {}

  start(request: BattleRequest): Observable<BattleResult> {
    return this.http.post<BattleResult>(`${this.url}`, request);
  }
}
