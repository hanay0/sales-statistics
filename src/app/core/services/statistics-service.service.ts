import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shared } from '../models/shared';
import { Observable } from 'rxjs';
import { Statistics } from '../models/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsServiceService {
  readonly baseUrl = 'https://api.mockfly.dev/mocks/683d5fd4-8cee-4501-89cb-698aac8b2f98/stats';

  constructor(private http: HttpClient) { }

  /**
   * method to get the statistics and it's numbers (products - users - scores)
   * @returns statistics
   */
  getStatistics(): Observable<Shared<Statistics>> {
    return this.http.get<Shared<Statistics>>(this.baseUrl)
  }
}
