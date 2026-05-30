import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { DashboardDTO } from '../../../shared/models/dashboard.dto';

@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  dashboard: DashboardDTO | null = null;
  loading = true;
  error = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  getMedalClass(index: number): string {
    const medals = [
      'text-yellow-500',
      'text-gray-400',
      'text-amber-600',
    ];
    return medals[index] ?? 'text-gray-500';
  }

  getMedalLabel(index: number): string {
    return ['🥇', '🥈', '🥉'][index] ?? `#${index + 1}`;
  }
}
