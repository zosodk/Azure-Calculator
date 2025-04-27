import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CalculationHistoryItem {
  id: number;
  expression: string;
  result: number;
  timestamp: string;
}
@Injectable({
  providedIn: 'root'
})
export class AdvancedCalculatorService {
  // replace with azurre after deployment ///private apiUrl = 'https://azure-url/AdvancedCalculator';
  private apiUrl = '/advancedCalculator/advancedCalculator';

  constructor(private http: HttpClient) { }

  calculate(expression: string): Observable<{ result: number }> {
    return this.http.post<{ result: number }>(this.apiUrl, { expression });
  }
  getHistory(): Observable<CalculationHistoryItem[]> {
    return this.http.get<CalculationHistoryItem[]>(`${this.apiUrl}/history`);
  }
}
