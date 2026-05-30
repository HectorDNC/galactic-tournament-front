import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BattleStatisticsService } from '../../services/battle-statistics.service';
import { BadgeComponent } from '../../../../shared/components/ui/badge/badge.component';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, BadgeComponent, MatTableModule, MatSortModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  rankingData: any[] = [];
  loading = true;

  displayedColumns: string[] = ['position', 'name', 'victories'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private statisticsService: BattleStatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.getRanking().subscribe({
      next: (data) => {
        this.rankingData = data;
        this.dataSource.data = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching ranking:', err);
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  getBadgeColor(position: number): 'success' | 'warning' | 'error' | 'info' | 'primary' | 'light' | 'dark' {
    if (position === 0) return 'warning'; // Gold
    if (position === 1) return 'primary'; // Silver or whatever
    if (position === 2) return 'info'; // Bronze
    return 'light';
  }
}
