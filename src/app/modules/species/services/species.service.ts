import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specie } from '../models/specie';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private readonly url = `${environment.api_url}/api/species`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Specie[]> {
    return this.http.get<Specie[]>(`${this.url}/all`);
  }
}
