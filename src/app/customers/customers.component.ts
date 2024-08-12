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
      const regionScores = this.statistics.customerSatisfaction.byRegion.map(region => region.regionScore);
      const regionNames = this.statistics.customerSatisfaction.byRegion.map(region => region.regionName);
      console.log(regionNames);
      console.log(regionScores);
      
      // data for chart usage
      
      this.basicData = {
        labels: regionNames,
        datasets: [
            {
                label: '', // disable label
                data: regionScores,
                borderWidth: 0,
                backgroundColor: [
                  documentStyle.getPropertyValue('--blue-500'),
                  documentStyle.getPropertyValue('--yellow-500'), 
                  documentStyle.getPropertyValue('--green-500'),
                  documentStyle.getPropertyValue('--pink-500'),
                  documentStyle.getPropertyValue('--cyan-500')
                ],
                hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--blue-400'), 
                  documentStyle.getPropertyValue('--yellow-400'), 
                  documentStyle.getPropertyValue('--green-400'),
                  documentStyle.getPropertyValue('--pink-400'),
                  documentStyle.getPropertyValue('--cyan-400')
                ]
            }
        ]
    };

    this.basicOptions = {
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
    })
  }
}
