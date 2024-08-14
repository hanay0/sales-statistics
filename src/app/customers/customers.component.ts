import { Component, OnInit } from '@angular/core';
import { StatisticsServiceService } from '../core/services/statistics-service.service';
import { Statistics } from '../core/models/statistics';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  private statsService!: StatisticsServiceService;
  statistics!: Statistics;
  basicData: any;
  basicOptions: any;
  regionScores: number[] = [];
  regionNames: string[] = [];
  monthlyData: any;
  monthlyOptions: any;
  monthlyScores: number[] = [];
  monthlyDates: string[] = [];

constructor(statsService: StatisticsServiceService) {
  this.statsService = statsService;
}

  ngOnInit(): void {
    this.statsService.getStatistics().subscribe(stats => {
      console.log(stats)
      this.statistics = stats.data
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      // data for chart usage
      this.regionScores = this.statistics.customerSatisfaction.byRegion.map(region => region.regionScore);
      this.regionNames = this.statistics.customerSatisfaction.byRegion.map(region => region.regionName);
      // data for region chart usage

      // data for monthly chart
      this.monthlyScores = this.statistics.customerSatisfaction.monthlyScores.map(score => score.score);
      this.monthlyDates = this.statistics.customerSatisfaction.monthlyScores.map(score => score.month);
     // data for monthly chart
     

      this.basicData = {
        labels: this.regionNames,
        datasets: [
            {
                label: 'Regions', // disable label
                data: this.regionScores,
                borderWidth: 0,
                backgroundColor: "#eec137",
                hoverBackgroundColor: "#edd48b"
            }
        ]
    };

    this.basicOptions = {
        maintainAspectRatio: false,
          responsive: true,
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: true
                  }
              },
              x: {
                  ticks: {
                      color: "#000"
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: true
                  }
              }
          }
      };

      // data and settings for monthly chart
    this.monthlyData = {
      labels: this.monthlyDates,
      datasets: [
          {
              label: 'Monthly Satisfaction',
              backgroundColor: "#4cd07d",
              borderColor: "#eaeaea",
              hoverBackgroundColor: "#42b56c",
              data: this.monthlyScores
          }
      ]
    };

    this.monthlyOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          legend: {
              labels: {
                  color: "#000"
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#000',
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  color: "#bddfbd",
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: "#000"
              },
              grid: {
                  color: "#a23d6b",
                  drawBorder: false
              }
          }

      }
    };
    });
  }
}
