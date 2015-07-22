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


    // This try/catch is temporary to maintain backwards compatibility. Will be removed and changed to just 
    // require('cordova/exec/proxy') at unknown date/time.
    var commandProxy;
    try {
        commandProxy = require('cordova/windows8/commandProxy');
    } catch (e) {
        commandProxy = require('cordova/exec/proxy');
    }

    module.exports = {
        mediaCapture: null,
        livePreview: null,
        captureInitSettings: null,
        deviceList: [],

        startAR: function () {
            var me = module.exports;

            if (me.livePreview == null) {
                me.enumerateCameras();

                me.livePreview = document.createElement('video');
                me.livePreview.style.height = this.innerHeight + "px";
                me.livePreview.style.width = this.innerWidth + "px";
                document.body.appendChild(me.livePreview);

                me.mediaCapture = new Windows.Media.Capture.MediaCapture();

                me.captureInitSettings = null;
                me.captureInitSettings = new Windows.Media.Capture.MediaCaptureInitializationSettings();
                //me.captureInitSettings.audioDeviceId = "";
                //me.captureInitSettings.videoDeviceId = "";
                me.captureInitSettings.streamingCaptureMode = Windows.Media.Capture.StreamingCaptureMode.video;
                if (me.deviceList.length > 0) {
                    var deviceId = me.deviceList[0].id;

                    for (var i = 0; i < me.deviceList.length; i++) {
                        if (me.deviceList[i].enclosureLocation.panel == Windows.Devices.Enumeration.Panel.back) {
                            deviceId = me.deviceList[i].id;
                        }
                    }
                    me.captureInitSettings.videoDeviceId = deviceId;
                }

                me.mediaCapture.initializeAsync(me.captureInitSettings).then(function () {
                    me.livePreview.src = URL.createObjectURL(me.mediaCapture);
                    me.livePreview.play();
                });
            } else {
                me.livePreview.style.display = "block";
                me.livePreview.play();
            }
        },

        stopAR: function() {
            var me = module.exports;

            me.mediaCapture.stopRecordAsync();
            //me.mediaCapture = null;
            me.livePreview.pause();
            me.livePreview.style.display = "none";
        },

        // ///////////////////////////////////////////////////////
        // private methods
        enumerateCameras: function() {
            var me = module.exports;

            var deviceInfo = Windows.Devices.Enumeration.DeviceInformation;
            deviceInfo.findAllAsync(Windows.Devices.Enumeration.DeviceClass.videoCapture).then(function (devices) {
                // Add the devices to deviceList
                if (devices.length > 0) {
                    for (var i = 0; i < devices.length; i++) {
                        me.deviceList.push(devices[i]);
                    }
                } else {
                }
            }, 
            function (err)
            { }
            );
        }
    };



    commandProxy.add('IntelXDKDisplay', module.exports);

