import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CalculationRequest {
  expression: string;
}

export interface CalculationResponse {
  result: number;
}

export interface CalculationHistoryItem {
  id: number;
  expression: string;
  result: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class BasicCalculatorService {
  private apiUrl = '/basicCalculator/calculator';
  // private apiUrl = 'http://localhost:5000/calculator';

  constructor(private http: HttpClient) {}
  
  calculate(expression: string): Observable<CalculationResponse> {
    const body: CalculationRequest = { expression };
    return this.http.post<CalculationResponse>(this.apiUrl, body);
  }
  
  getHistory(): Observable<CalculationHistoryItem[]> {
    return this.http.get<CalculationHistoryItem[]>(`${this.apiUrl}/history`);
  }
}
