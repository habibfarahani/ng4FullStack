
// I
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { Message } from './message.model';

import * as socketIo from 'socket.io-client';

import { DataModel, NetIf, NetConfig } from './../models/netIf';


const SERVER_URL = 'http://172.22.216.102:8000';
//const SERVER_URL = 'http://192.168.0.5:8000';
//const SERVER_URL = 'http://10.64.57.24:8000';
//const SERVER_URL = 'http://10.67.92.107:8000';


@Injectable()
export class SocketService {
    private socket;
    ipconfigs: Array<NetIf>;
    dataModel: DataModel;
    
    public getDataModel(){
        return this.dataModel;
    }

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
        this.dataModel = new DataModel();
    }

     public send(message: any): void {
       console.log('sending' + message);
       this.socket.emit('message', message);
     }

    public onMessage(): Observable<any> {
        return new Observable(observer => {
            console.log('Firing onMessage in SocketService');
            this.socket.on('message', (data) => {
                console.log('inSocker on: '+ data);

                observer.next(data);
            });
        });
    }

    public onMonitor(): Observable<any> {
        console.log('Firing onMonitor in SocketService---');
        return new Observable(observer => {
            this.socket.on('monitor-packets', (data) => {

                observer.next(data);
             });
        });
    }

    public onDashboard(): Observable<any> {
        console.log('Firing onDashboard in SocketService---');
        return new Observable(observer => {
            this.socket.on('dash-data', (data) => {
               
                for(let key in data){
                    if(key == 'ipconfig'){
                      this.dataModel.parseNetConfig(data[key]);
                    
                    }else if(key == 'hostname'){
                        this.dataModel.parseHostname(data[key]);
                    }else if(key == 'dns'){
                        this.dataModel.parseDNS(data[key]);
                    }else if(key == 'iproute'){
                        this.dataModel.parseRoute(data[key]);
                    }

                }
         
                observer.next(data);
             });
        });
    }



    public onConnect(): Observable<any> {
        console.log('onConnect of socketserice');
        return new Observable(observer => {
            this.socket.on('connect', () => observer.next());
        });
    }

    public onDisconnect(): Observable<any> {
        console.log('onDisconnect of socketserice');
        return new Observable(observer => {
            this.socket.on('disconnect', () => observer.next());
        });
    }
}
