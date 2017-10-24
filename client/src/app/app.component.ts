import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './services/socket.service';
//import {GithubService } from './services/github.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [/*GithubService, */SocketService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  counter = 0;
  ioConnection: any;
  messages: any[] = [];


  constructor(private socketService: SocketService) {
    this.socketService.initSocket();

    // setInterval(() => {console.log('data injection');
    //                     if(this.counter < 1){
    //                       this.counter++;
    //                       this.socketService.send({'data': '0.1', 'text' : 'I am here!'});
    //                     }}, 1000);

  }

  ngOnInit() {
    this.socketService.send({msg: 'Client Ready'});

    this.ioConnection = this.socketService.onMessage()
    .subscribe((message: any) => {
      console.log('RXED a message');
        this.messages.push(message);
    });

    // this.ioConnection = this.socketService.onDashboard()
    // .subscribe((message: any) => {
    //   console.log('RXED a Dash message ' + message.interfaces[0] + ', ' + message.interfaces[1]);
    //     this.messages.push(message);
    // });

  }

  ngOnDestroy() {
    this.ioConnection.unsubscribe();
  }
}
