import { Component, OnInit } from '@angular/core';
import { StatisticsServiceService } from '../core/services/statistics-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  productInfo: any;
  stockLevel!: [{product: string, stock: number}];
  topSellingProducts!: [{product: string, sales: number}];
  stocksProducts: string[] = [];
  stockNumbers: number[] = [];

  // chart properties
  topSellingData: any;
  topSellingoption: any;
  // chart properties

  // table properties
  products!: [{product: string, sales: number, category: string, rating: number, unitsSold: number}];
  cols!: {field: string, header: string}[];
  // table properties

  constructor(private statsService: StatisticsServiceService) {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.statsService.getStatistics().subscribe(res => {
      this.productInfo = res.data;
      this.stockLevel = this.productInfo.productPerformance.stockLevels;
      this.topSellingProducts = this.productInfo.productPerformance.topSellingProducts;
      this.products = this.productInfo.productPerformance.topSellingProducts;
      
      this.topSellingProducts.forEach((singleStock: { product: string, sales: number }) => {
        this.stocksProducts.push(singleStock.product);
        this.stockNumbers.push(singleStock.sales);
      })

    // make the field and header dynamic due to the response 
    // to make the field is the key of each property in object: "topSellingProducts"
    this.cols = Object.keys(this.topSellingProducts[0]).map(key => ({ field: key, header: key.replace(/([A-Z])/g, ' $1').trim() }));

      this.topSellingData = {
        labels: this.stocksProducts,
        datasets: [
            {
                data: this.stockNumbers,
                backgroundColor: [
                  documentStyle.getPropertyValue('--blue-500'), 
                  documentStyle.getPropertyValue('--yellow-500'), 
                  documentStyle.getPropertyValue('--green-500'), 
                  documentStyle.getPropertyValue('--pink-500'), 
                  documentStyle.getPropertyValue('--teal-500')
                ],
                hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--blue-400'), 
                  documentStyle.getPropertyValue('--yellow-400'), 
                  documentStyle.getPropertyValue('--green-400'),
                  documentStyle.getPropertyValue('--pink-400'),
                  documentStyle.getPropertyValue('--teal-400')
                ]
            }
        ]
     };
  
     this.topSellingoption = {
      maintainAspectRatio: false,
      responsive: true,
      cutout: '65%',
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
        }
      };
    })
  }
}
