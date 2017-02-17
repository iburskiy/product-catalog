import $ from 'jquery';
import Backbone from 'backbone';


export  default Backbone.Model.extend({
    defaults:{
        manufacturer      :'',
        model             :'',
        date              :'',
        type              :'',
        transformer       :'',
        platform          :'',
        cpu               :'',
        modelCPU          :'',
        core              :'',
        clockFrequency    :'',
        turboFrequency    :'',
        tdt               :'',
        color             :'',
        width             :'',
        depth             :'',
        thickness         :'',
        weight            :'',
        diagonal          :'',
        screenResolution  :'',
        typeRAM           :'',
        ram               :'',
        typeHD            :'',
        sizeHD            :'',
        graphicsCard      :'',
        os                :'',
        img0              :''
    }
})