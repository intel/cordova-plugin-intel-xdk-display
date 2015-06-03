/*
Copyright 2015 Intel Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file 
except in compliance with the License. You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the 
License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
either express or implied. See the License for the specific language governing permissions 
and limitations under the License
*/

var exec = require('cordova/exec');
module.exports = {
        viewport: {},
        oldviewport: {},
        window: {
            landwidth: 0,
            portwidth: 0,
            landheight: 0,
            portheight: 0
        },

    /**
    //turns on appmobi managed viewport
     * @param {int} portraitWidthInPx
     * @param {int} landscapeWidthInPx
     */
    useViewport: function(portraitWidthInPx, landscapeWidthInPx) {
        intel.xdk.display.viewport.portraitWidth = parseInt(portraitWidthInPx);
        intel.xdk.display.viewport.landscapeWidth = parseInt(landscapeWidthInPx);
        if(isNaN(intel.xdk.display.viewport.portraitWidth)||isNaN(intel.xdk.display.viewport.landscapeWidth)) return;
        window.addEventListener('orientationchange', function(){
            intel.xdk.display.updateViewportOrientation(window.orientation);
        }, false);
        //use window.orientation to avoid depending on intel.xdk.device
        intel.xdk.display.updateViewportOrientation(window.orientation);
    },

    updateViewportContent: function(content) {
        //get reference to head
        var head, heads = document.getElementsByTagName('head');
        if(heads.length>0) head = heads[0];
        else return;
        //remove any viewport meta tags
        var metas = document.getElementsByTagName('meta');
        for(var i=0;i<metas.length;i++) {
            if(metas[i].name=='viewport') try {head.removeChild(metas[i]);} catch(e){}
        }
        //add the new viewport meta tag
        var viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        viewport.setAttribute('id', 'viewport');
        viewport.setAttribute('content', content);
        head.appendChild(viewport);
    },

    updateViewportOrientation: function(orientation) {
        var width, deviceWidth;
        if(orientation==0||orientation==180) {
            width=intel.xdk.display.viewport.portraitWidth;
            deviceWidth = screen.width;
        } else {
            width=intel.xdk.display.viewport.landscapeWidth;
            deviceWidth = screen.height;
        }
        //deviceWidth = intel.xdk.device.width;
        var scale = (deviceWidth)/width;
        
//        if(intel.xdk.hasOwnProperty('compatibilityModeDisabled')) {
//            //adjust scale based on density if compatibility mode is disabled
//            scale = scale/AppMobiDevice.getDisplayDensity();
//        }
            
        //round scale to nearest hundredth
        scale = (Math.round(scale*100))/100;
    
//        if(AppMobiDevice.hasHTCUndocumentedMethods() && AppMobiDevice.isActive()) {
//            AppMobi.display.updateViewportContent('minimum-scale='+scale+',maximum-scale='+scale);//if any-density=true, prepend with target-densitydpi=device-dpi,
//            AppMobiDisplay.forceScale(scale);
//            scrollTo(0,0);
//        } else {
        intel.xdk.display.updateViewportContent('minimum-scale='+scale+',maximum-scale='+scale);//if any-density=true, prepend with target-densitydpi=device-dpi,
//        }
        //var osver = parseFloat(AppMobi.device.osversion);
        //AppMobi.debug.log("AppMobi.device.orientation:"+AppMobi.device.orientation+",orientation:"+orientation+",width:"+width+",deviceWidth:"+deviceWidth+",screen.width:"+screen.width+",AppMobi.device.density:"+AppMobi.device.density+",osver:"+osver+",scale:"+scale);
        //AppMobi.debug.log("AppMobi.display.viewport.portraitWidth:"+AppMobi.display.viewport.portraitWidth+",AppMobi.display.viewport.landscapeWidth:"+AppMobi.display.viewport.landscapeWidth);
        //AppMobi.debug.log(location.href);
    },

    startAR: function() {
        //AppMobiDisplay.startAR();

        exec(function(loc) {
            //alert('in return');           
        }, null, "IntelXDKDisplay", "startAR", []);
    },

    stopAR: function() {
        //AppMobiDisplay.stopAR();
        exec(function(loc) {
            //alert('in return');           
        }, null, "IntelXDKDisplay", "stopAR", []);
    },

    switchViewport: function(currentDoc, portraitWidthInPx, landscapeWidthInPx) {
        this.oldviewport.portraitWidth = this.viewport.portraitWidth;
        this.oldviewport.landscapeWidth = this.viewport.landscapeWidth;
        this.useViewport(portraitWidthInPx, landscapeWidthInPx);
    },

    revertViewport: function() {
        this.useViewport(this.oldviewport.portraitWidth, this.oldviewport.landscapeWidth);
    },

    lockViewportWindow: function (portwidth, portheight, landwidth, landheight)
    {
//        var vplandwidth = parseInt( ( parseFloat(landheight) / parseFloat(AppMobi.device.landheight) ) * parseFloat(AppMobi.device.landwidth) );
//        var vpportwidth = parseInt( ( parseFloat(portheight) / parseFloat(AppMobi.device.portheight) ) * parseFloat(AppMobi.device.portwidth) );
//        var vplandheight = parseInt( ( parseFloat(landwidth) / parseFloat(AppMobi.device.landwidth) ) * parseFloat(AppMobi.device.landheight) );
//        var vpportheight = parseInt( ( parseFloat(portwidth) / parseFloat(AppMobi.device.portwidth) ) * parseFloat(AppMobi.device.portheight) );
//        
//        if( vpportwidth > portwidth )
//        {
//            AppMobi.display.window.portwidth = vpportwidth;
//            AppMobi.display.window.portheight = portheight 
//        }
//        else
//        {
//            AppMobi.display.window.portwidth = portwidth;
//            AppMobi.display.window.portheight = vpportheight;
//        }
//        
//        if( vplandwidth > landwidth )
//        {
//            AppMobi.display.window.landwidth = vplandwidth;
//            AppMobi.display.window.landheight = landheight
//        }
//        else
//        {
//            AppMobi.display.window.landwidth = landwidth;
//            AppMobi.display.window.landheight = vplandheight;
//        }
//        AppMobi.display.useViewport( AppMobi.display.window.portwidth, AppMobi.display.window.landwidth );
    },

    /**
     * Causes the device to stop showing a spinner in the notification area.
     */
    hideBusyIndicator: function() {
        exec(null, null, "IntelXDKNotification", "hideBusyIndicator", []);
    }
}