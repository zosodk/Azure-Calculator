import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasicCalculatorService, CalculationHistoryItem } from '../../services/basic-calculator.service';
import { AdvancedCalculatorService } from '../../services/advanced-calculator.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  expression = '';
  result: number | null = null;
  isDark = true;
  history: CalculationHistoryItem[] = [];
  showHistory = false;
  mode: 'basic'|'advanced' = 'basic';
  constructor(
      private basicService: BasicCalculatorService,
      private advancedService: AdvancedCalculatorService
  ) {}

  append(value: string) {
    if (this.showHistory) {
      this.clearHistoryView();
    }
    
    if (['%', 'sqrt', '^', '()', '+/-'].includes(value)) {
      this.mode = 'advanced'; 
    }

    this.expression += value;
  }
  private prepareExpression(expression: string): string {
    let transformed = expression;
    
    transformed = transformed.replace(/%/g, '/100*');
    
    transformed = transformed.replace(/(\d+)\^(\d+)/g, 'Pow($1,$2)');

    transformed = transformed.replace(/\+\/\-/g, '*-1');

    return transformed;
  }
  
  
  toggleSign() {
    const match = this.expression.match(/(\d+\.?\d*)$/);
    if (match) {
      const number = match[0];
      if (number.startsWith('-')) {
        this.expression = this.expression.slice(0, -number.length) + number.substring(1);
      } else {
        this.expression = this.expression.slice(0, -number.length) + '-' + number;
      }
    }
  }

  clear() {
    this.expression = '';
    this.result = null;
    this.clearHistoryView(); 
  }
  backspace() {
    if (this.expression.length > 0) {
      this.expression = this.expression.slice(0, -1);
    }
  }

  calculate() {
    if (!this.expression.trim()) return;

    const expressionToEvaluate = this.prepareExpression(this.expression);

    const service = this.getActiveService();
    service.calculate(expressionToEvaluate).subscribe({
      next: (response: { result: number }) => {
      
        this.result = this.formatResult(response.result);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        alert('Invalid expression or server error!');
      }
    });
  }
  private formatResult(value: number): number {
    const formatted = value.toFixed(9); 
    return parseFloat(formatted); 
  }
  
  loadHistory() {
    const service = this.getActiveService();
    service.getHistory().subscribe({
      next: (data) => {
        this.history = data.slice(0, 8);
        this.showHistory = true;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        alert('Invalid expression or server error!');
      }
    });
  }


  clearHistoryView() {
    this.showHistory = false;
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  private getActiveService() {
    return this.mode === 'basic' ? this.basicService : this.advancedService;
  }

  switchMode() {
    this.mode = this.mode === 'basic' ? 'advanced' : 'basic';
    this.clear();
  }
}
