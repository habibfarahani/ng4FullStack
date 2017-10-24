import { Component, OnInit } from '@angular/core';
import { NetCharts } from '../../models/charts';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})


export class ChartsComponent implements OnInit {

  public netCharts:Array<NetCharts>;


  // public defaultData:Array<any> = [{ data: new Array(256), label: 'Series A' }];
  // public defaultLabel:Array<any> = new Array(256);


  private resolution = 256;

  public defaultNetCharts:Array<NetCharts> = [
    {
      name: 'My Name1',
      lineChartData: [{ data: new Array(this.resolution), label: 'Series A' }],
      lineChartLabels: new Array(this.resolution),
      responsive: true,
    },
    {
      name: 'My Name2',
      lineChartData: [{ data: new Array(this.resolution), label: 'Series A' }],
      lineChartLabels: new Array(this.resolution),
      responsive: true,
    },
    {
      name: 'My Name3',
      lineChartData: [{ data: new Array(this.resolution), label: 'Series A' }],
      lineChartLabels: new Array(this.resolution),
      responsive: true,
    },
    {
      name: 'My Name4',
      lineChartData: [{ data: new Array(this.resolution), label: 'Series A' }],
      lineChartLabels: new Array(this.resolution),
      responsive: true,
    },
    {
      name: 'My Name5',
      lineChartData: [{ data: new Array(this.resolution), label: 'Series A' }],
      lineChartLabels: new Array(this.resolution),
      responsive: true,
    },
  ];




  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40, 100], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'},
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series D'}
  ];

  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(200, 246, 246, 0.27)',//'rgba(148,159,177,0.2)',
      borderColor: 'blue',//'rgba(148,159,177,1)',
      pointBackgroundColor: 'yellow',//'rgba(148,159,177,1)',
      pointBorderColor: 'yellow',//'#fff',
      pointHoverBackgroundColor: 'green',//'#fff',
      pointHoverBorderColor: 'blue',//'rgba(148,159,177,0.8)'
    },
    // { // dark grey
    //   backgroundColor: 'rgba(77,83,96,0.2)',
    //   borderColor: 'rgba(77,83,96,1)',
    //   pointBackgroundColor: 'rgba(77,83,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public chartsService: SocketService;
  ioConnection: any;

  public randomize():void {
    console.log('CLICKED ' + this.lineChartData.length);
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.netCharts[0].lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  addChart(addChart:NetCharts){
    this.netCharts.push(addChart);
  }

  getChartData(index:number){
// Check to see if index is valid
    console.log('CHART TO GET' + index);
    console.log(this.netCharts[index].lineChartData);
    return this.netCharts[index].lineChartData;
  }

  constructor(private socketService:SocketService) {

    this.netCharts = this.defaultNetCharts;
//  this.netCharts = new Array(5);
//     for(let i =  0; i < 5; i++){
//       this.netCharts[i].lineChartData = [{ data: new Array(this.resolution), label: 'Series A' }];
//       this.netCharts[i].lineChartLabels = new Array(this.resolution);
//       this.netCharts[i].name = 'Chart ' + i;
//       this.netCharts[i].responsive = true;
//     }


    this.chartsService = socketService;
   }

  ngOnInit() {
    this.ioConnection = this.chartsService.onMonitor()
    .subscribe((message: any) => {

//      console.log(this.lineChartData.length);
//      console.log(message.data.length);

      const numCharts = Math.min(this.netCharts.length, message.data.length);

      if ( message.id && (message.id === 'chart-data') && (message.data)) {
//        let numCharts = Math.min();
          const numPoint = this.netCharts[0].lineChartData[0].data.length;

          let tempLineChartData = new Array(1);
          //          console.log('# charts: [' + numCharts + ',' + this.netCharts.length + '] -- ' + message.data.length + ' ** ' + numPoint);
          for ( let i = 0; i < numCharts; i++) {
            tempLineChartData[0] = {data: new Array(numPoint), label: 'Series A'};

            for(let j = 1; j < numPoint; j++) {
              tempLineChartData[0].data[j - 1] = this.netCharts[i].lineChartData[0].data[j];
            }
            tempLineChartData[0].data[numPoint - 1] = message.data[i].point;
  //          console.log('---> '+ tempLineChartData.data[5] + ' ' + tempLineChartData.data[6]);
            this.netCharts[i].lineChartData = tempLineChartData;
          }
      }
    });

  }

}
