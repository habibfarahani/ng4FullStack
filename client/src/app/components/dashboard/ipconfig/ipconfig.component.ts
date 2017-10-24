import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NetIf, NetConfig } from '../../../models/netIf';

@Component({
  selector: 'app-ipconfig',
  templateUrl: './ipconfig.component.html',
  styleUrls: ['./ipconfig.component.css']
})
export class IpconfigComponent implements OnInit {

  @Input() ipconfigData:Array<NetIf>;
  selected:number;
  public options: FormGroup;

  constructor(fb: FormBuilder) { 
    this.selected = 1;
    this.options = fb.group({
      hideRequired: false,
      floatPlaceholder: 'auto',
    });
  }

   ngOnInit() {
   }

   changeConfigStatus(){
     console.log('cjhanging configuration status');
   }
}

