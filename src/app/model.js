"use strict";

import Backbone from "backbone";


export var Model = Backbone.Model.extend({
    defaults:{
        manufacturer      :"",
        model             :"",
        date              :"",
        type              :"",
        transformer       :"",
        platform          :"",
        cpu               :"",
        modelCPU          :"",
        core              :"",
        clockFrequency    :"",
        turboFrequency    :"",
        tdt               :"",
        color             :"",
        width             :"",
        depth             :"",
        thickness         :"",
        weight            :"",
        diagonal          :"",
        screenResolution  :"",
        typeRAM           :"",
        ram               :"",
        typeHD            :"",
        sizeHD            :"",
        graphicsCard      :"",
        os                :"",
        img0              :"",
        img1              :"",
        href              :""
    }
})
