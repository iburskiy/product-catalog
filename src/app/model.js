import $ from 'jquery';
import Backbone from 'backbone';


export  default Backbone.Model.extend({
    defaults:{
        "manufacturer"      :'1222',
        "model"             :'',
        "date"              :'',
        "type"              :'',
        "transformer"       :'',
        "platform"          :'',
        "CPU"               :'',
        "modelCPU"          :'',
        "core"              :'',
        "clockFrequency"    :'',
        "turboFrequency"    :'',
        "TDT"               :'',
        "color"             :'',
        "width"             :'',
        "depth"             :'',
        "thickness"         :'',
        "weight"            :'',
        "diagonal"          :'',
        "screenResolution"  :'',
        "typeRAM"           :'',
        "RAM"               :'',
        "typeHD"            :'',
        "sizeHD"            :'',
        "graphicsCard"      :'',
        "OS"                :''
    }
})