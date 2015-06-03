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

using Cordova.Extension.Commands.UI;
using Microsoft.Phone.Controls;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using Windows.Devices.Geolocation;
using WPCordovaClassLib;
using WPCordovaClassLib.Cordova;
using WPCordovaClassLib.Cordova.Commands;
using WPCordovaClassLib.CordovaLib;

namespace Cordova.Extension.Commands
{
    public class Display : BaseCommand
    {
        //        mediaCapture: null,
        //livePreview: null,
        //captureInitSettings: null,
        //deviceList: [],

#region constructor
        public Display()
        { }
#endregion

        public async void startAR(string parameters)
        {
            // This is not possible with wp8.  The Browser control doesn't allow transparent backgrounds
            string js = "alert('This is not supported in Windows Phone 8.');";
            InvokeCustomScript(new ScriptCallback("eval", new string[] { js }), true);
            return;

            string[] args = WPCordovaClassLib.Cordova.JSON.JsonHelper.Deserialize<string[]>(parameters);

            try
            {
                System.Windows.Deployment.Current.Dispatcher.BeginInvoke(() =>
                    {
                        var frame = Application.Current.RootVisual as PhoneApplicationFrame;

                        if (frame != null)
                        {
                            PhoneApplicationPage page = frame.Content as PhoneApplicationPage;

                            AugmentedReality augmentedReality = new AugmentedReality();
                            PageOrientation po = ((PhoneApplicationFrame)(Application.Current.RootVisual)).Orientation;
                            if (po == PageOrientation.Landscape || po == PageOrientation.LandscapeLeft || po == PageOrientation.LandscapeRight)
                            {
                                augmentedReality.Height = Application.Current.Host.Content.ActualWidth;
                                augmentedReality.Width = Application.Current.Host.Content.ActualHeight;
                            }
                            else
                            {
                                augmentedReality.Height = Application.Current.Host.Content.ActualHeight;
                                augmentedReality.Width = Application.Current.Host.Content.ActualWidth;
                            }
                            //barCodecontrol.viewFeed.Height = Application.Current.Host.Content.ActualHeight;
                            //barCodecontrol.viewFeed.Width = Application.Current.Host.Content.ActualWidth;


                            //page.Children.Add(barCodecontrol);
                            Grid grid = (Grid)page.FindName("LayoutRoot");

                            CordovaView cordovaView = (CordovaView)grid.FindName("CordovaView");
                            cordovaView.Height = 200;
                            cordovaView.Width = 200;

                            WebBrowser browser = (WebBrowser)cordovaView.FindName("CordovaBrowser");
                            //browser.Background = new System.Windows.Media.Brush()
                            //browser.Background = new SolidColorBrush(Colors.Transparent);
                            browser.Background.Opacity = 0.0;
                            //browser..setBackgroundColor(0x00000000);

                            //grid.Children.Add(augmentedReality);
                            grid.Children.Insert(0,augmentedReality);
                            
                        }



                    });
            }
            catch (Exception ex)
            {
                
                throw;
            }
        }   

        public async void stopAR(string parameters)
        {
            // This is not possible with wp8.  The Browser control doesn't allow transparent backgrounds
            string js = "alert('This is not supported in Windows Phone 8.');";
            InvokeCustomScript(new ScriptCallback("eval", new string[] { js }), true);
            return;
        }
    }
}
