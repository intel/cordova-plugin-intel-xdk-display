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

/*global exports, describe, it, xit, expect, intel, console */

exports.defineAutoTests = function () {
    'use strict';
    
    describe('intel.xdk.display tests', function () {
        it('should be defined', function () {
            expect(intel.xdk.display).toBeDefined();
        });

        describe('startAR', function () {
            it('should be defined', function () {
                expect(intel.xdk.display.startAR).toBeDefined();
            });
        });
      
        describe('stopAR', function () {
            it('should be defined', function () {
                expect(intel.xdk.display.stopAR).toBeDefined();
            });
        });
    });
};

exports.defineManualTests = function (contentEl, createActionButton) {
    'use strict';
    
    function logMessage(message, color) {
        var log = document.getElementById('info'),
            logLine = document.createElement('div');
        
        if (color) {
            logLine.style.color = color;
        }
        
        logLine.innerHTML = message;
        log.appendChild(logLine);
    }

    function clearLog() {
        var log = document.getElementById('info');
        log.innerHTML = '';
    }
    
    function testNotImplemented(testName) {
        return function () {
            console.error(testName, 'test not implemented');
        };
    }
    
    function init() {}
    
    /** object to hold properties and configs */
    var TestSuite = {};
  
    TestSuite.$markup = '<h3>Start AR</h3>' +
        '<div id="buttonStartAR"></div>' +
        'Expected result: should start Augmented Reality' +
        
        '<h3>Stop AR</h3>' +
        '<div id="buttonStopAR"></div>' +
        'Expected result: should stop Augmented Reality';
        
    contentEl.innerHTML = '<div id="info"></div>' + TestSuite.$markup;
    
    createActionButton('Start AR', function () {
        console.log('executing', 'intel.xdk.display.startAR');
        intel.xdk.display.startAR();
    }, 'buttonStartAR');
    
    createActionButton('Stop AR', function () {
        console.log('executing', 'intel.xdk.display.stopAR');
        intel.xdk.display.stopAR();
    }, 'buttonStopAR');
    
    document.addEventListener('deviceready', init, false);
};