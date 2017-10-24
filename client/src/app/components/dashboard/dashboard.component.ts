import { Component, OnInit, OnDestroy } from '@angular/core';
import { NetIf, NetConfig } from '../../models/netIf';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

//  interfaces: NetIf[]= [ ];
  interface: NetIf;
  ifname = {'interfaces': []};
  ipconfig = {};
  ioConnection: any;
  ipconfigs: Array<NetIf>;
  dashService:SocketService;

  constructor(private idashService:SocketService) {
    // for ( let i = 0; i < 4; i++) {
    //   let intif: NetIf = {name: 'eth', selected: false};
      
    //   intif.name = 'eth' + i.toString();
    //   intif.selected = false;
    //   this.interfaces[i] = intif;//
    // }
    // this.interfaces[0].selected = true;
    this.dashService = idashService;
    this.ifname = {
      'interfaces': [{name: 'lo', selected: false}],
    };

  }

  ngOnInit() {
    this.ioConnection = this.dashService.onDashboard()
    .subscribe((message: any) => {
      console.log("Data is ready .... get it!!!");
      this.ipconfigs = this.dashService.getDataModel().getNetworkModel();
      for(let i=0; i<this.ipconfigs.length; i++)
      {
        console.log("====", this.ipconfigs[i].name);
      }

      console.log('++++++ ', this.ipconfigs);
//       if ( message.interfaces) {
//         console.log('RXED a Dash message ' + message.interfaces[0] + ', ' + message.interfaces[1]);
//         for ( let i = 0; i < message.interfaces.length; i++){

//           const intface: NetIf = {
//                                   name: message.interfaces[i],
//                                   config: [],
//                                   gateway: '',
//                                   hostname: '',
//                                   dns: [],
//                                   selected: false,
//                                 };

//           this.ifname.interfaces[i] = intface;

//         }
//         this.ifname.interfaces[0].selected = true;
//         } else {

//          for(let key in message){
//            if(key === 'ipconfig'){
//              console.log('==ipconfig message is received ' , message[key]);
//              this.parseIfConfig(message[key]);
//            }else if(key === 'hostname'){
//             console.log('==hostname message is received ');
//            }else if(key === 'dns'){
//             console.log('==dns message is received ');
//            }else if(key === 'iproute'){
//             console.log('==iproute ');
//            }
//           }
//           // console.log(Object.keys(message));``

//           // console.log('Message ', message);
//           // this.ipconfig = {status: 'dhcp'};
//         }
//       // this.interfaces.push(interfaces);
// //        this.ifname = message;
      });


      }

      getNetConfig(config: any){
        const netConfig: NetConfig = {
          address: '',    // ip address
          proto: '',      // protocol IPV4 or IPV6
          netmask: '',    //net mask
          mac: '',        // HW id associated with this if
          id: '',          //
        };
        netConfig.proto = config['family'];
        netConfig.address = config['address'];
        netConfig.netmask = config['netmask'];
        netConfig.mac = config['mac'];
        if(config['scopeid']){
          netConfig.id = config['scopeid'];
        }else{
          netConfig.id = '';
        }

        return netConfig;
      }


      parseIfConfig(config:any){
        let i = 0;

        for(const key in config) {
          const intface: NetIf = {
                                  name: '',
                                  config: [],
                                  gateway: '',
                                  hostname: '',
                                  dns: [],
                                  selected: false,
                                };

            // key is the protocol
          intface.name = key.toString();
          for(let j = 0; j < config[key].length; j++){
            intface.config[j] = this.getNetConfig(config[key][j]);
          }
          console.log('KKKKEEEYY: ', intface);
//          netIf.proto = 'OP';


//          this.ipconfigs[i++] = intface;
        }
      }
        
        
        

  


 ngOnDestroy() {
  this.ioConnection.unsubscribe();
 }

 getName(int:number){
  //  if(this.interfaces[int]){
  //    return  this.interfaces[int].name;
  //  }
  return 'name';
 }


 receiveChange($event){
   console.log(event);
 }
}

