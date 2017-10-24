
export interface NetConfig {
    address: string;    // ip address
    proto: string;      // protocol IPV4 or IPV6
    netmask: string;    //net mask
    mac: string;        // HW id associated with this if
    id: string;          //
};

export interface NetIf {
    name: string;
    config: Array<NetConfig>;
    gateway: string;
    hostname: string;
    dns: Array<string>;
    selected: boolean;
};



export class DataModel {
    private networkModel:Array<NetIf>;

    constructor(){
        this.networkModel = new Array();

    }

    //////////////////////////////////////////////////////////////////////////////////////////
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

    //////////////////////////////////////////////////////////////////////////////////////////
    parseNetConfig(config: any){
    
        let index = 0;

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
            console.log('KKKKEEEYY: ', index, intface);
            this.networkModel[index++] = intface;
            //          netIf.proto = 'OP';


//          this.ipconfigs[i++] = intface;
        }

    }

    //////////////////////////////////////////////////////////////////////////////////////////
    parseHostname(config: any){
//        console.log('==hostname message is received ', config);
        var index = 0;//this.networkModel.length;

        this.networkModel[index].hostname = config;
        
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    parseDNS(config: any){
//        console.log('==DNS message is received ', config);
        var index = 0;// this.networkModel.length;
        if(Array.isArray(config)){
            for ( let i = 0; i < config.length; i++ ){
                this.networkModel[index].dns[i] = config[i];
            }
        }else{
//             this.networkModel[index].dns[0] = config;
        }
        
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    parseRoute(config: any){
        var index = 0;//this.networkModel.length;
        
        console.log('==hostname message is received ', config);
        
    }




    //////////////////////////////////////////////////////////////////////////////////////////
    public getNetworkModel(){
        return this.networkModel;
        
    }
    
};