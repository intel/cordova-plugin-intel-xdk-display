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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using Microsoft.Devices;
using System.ComponentModel;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace Cordova.Extension.Commands.UI
{
    public partial class AugmentedReality : UserControl
    {
        PhoneApplicationPage page = null;
        private bool capture = true;

        private VideoBrush _videoBrush;

        private PhotoCamera _photoCamera;
        private CompositeTransform _compositeTransform;
        private readonly WriteableBitmap _dummyBitmap = new WriteableBitmap(1, 1);

        public AugmentedReality()
        {
            InitializeComponent();

            PhoneApplicationFrame frame = System.Windows.Application.Current.RootVisual as PhoneApplicationFrame;

            if (frame != null)
            {
                page = frame.Content as PhoneApplicationPage;
                page.OrientationChanged += page_OrientationChanged;
            }

            if (page != null)
            {
                page.BackKeyPress += page_BackKeyPress;
            }
        }

        private void page_OrientationChanged(object sender, OrientationChangedEventArgs e)
        {
            int landscapeRotation = 0;

            if (e.Orientation == PageOrientation.LandscapeLeft)
            {
                LayoutRoot.Width = Application.Current.Host.Content.ActualHeight;
                LayoutRoot.Height = Application.Current.Host.Content.ActualWidth;
                viewFeed.Width = Application.Current.Host.Content.ActualHeight;
                viewFeed.Height = Application.Current.Host.Content.ActualWidth;

                // CompositeTransform.Rotation = _photoCamera.SensorRotationInDegrees - 90;
                landscapeRotation = 0;
            }
            else if (e.Orientation == PageOrientation.LandscapeRight)
            {
                LayoutRoot.Width = Application.Current.Host.Content.ActualHeight;
                LayoutRoot.Height = Application.Current.Host.Content.ActualWidth;
                viewFeed.Width = Application.Current.Host.Content.ActualHeight;
                viewFeed.Height = Application.Current.Host.Content.ActualWidth;

                //CompositeTransform.Rotation = PhotoCaptureDeviceProp.SensorRotationInDegrees + 90;
                landscapeRotation = 180;
            }
            else if (e.Orientation == PageOrientation.PortraitUp)
            {
                LayoutRoot.Height = Application.Current.Host.Content.ActualHeight;
                LayoutRoot.Width = Application.Current.Host.Content.ActualWidth;
                viewFeed.Height = Application.Current.Host.Content.ActualHeight;
                viewFeed.Width = Application.Current.Host.Content.ActualWidth;

                landscapeRotation = 90;
                //CompositeTransform.Rotation = PhotoCaptureDeviceProp.SensorRotationInDegrees;
            }
            else if (e.Orientation == PageOrientation.PortraitDown)
            {
                LayoutRoot.Height = Application.Current.Host.Content.ActualHeight;
                LayoutRoot.Width = Application.Current.Host.Content.ActualWidth;
                viewFeed.Height = Application.Current.Host.Content.ActualHeight;
                viewFeed.Width = Application.Current.Host.Content.ActualWidth;

                //CompositeTransform.Rotation = PhotoCaptureDeviceProp.SensorRotationInDegrees + 180;
                landscapeRotation = -90;
            }

            if (_photoCamera != null)
            {
                _videoBrush.RelativeTransform =
                    new CompositeTransform() { CenterX = 0.5, CenterY = 0.5, Rotation = landscapeRotation };

                _videoBrush.Stretch = Stretch.Fill;

            }
        }

        private void UserControl_Loaded(object sender, RoutedEventArgs e)
        {
            //this.Height = Application.Current.Host.Content.ActualHeight;
            //this.Width = Application.Current.Host.Content.ActualWidth;
            //LayoutRoot.Height = Application.Current.Host.Content.ActualHeight;
            //LayoutRoot.Width = Application.Current.Host.Content.ActualWidth;

            PageOrientation po = ((PhoneApplicationFrame)(Application.Current.RootVisual)).Orientation;

            var landscapeRotation = 90;

            if (po == PageOrientation.Landscape)
            {
                LayoutRoot.Width = Application.Current.Host.Content.ActualHeight;
                LayoutRoot.Height = Application.Current.Host.Content.ActualWidth;
                viewFeed.Width = Application.Current.Host.Content.ActualHeight;
                viewFeed.Height = Application.Current.Host.Content.ActualWidth;

                // CompositeTransform.Rotation = _photoCamera.SensorRotationInDegrees - 90;
                landscapeRotation = 0;
            }
            else if (po == PageOrientation.LandscapeRight)
            {
                LayoutRoot.Width = Application.Current.Host.Content.ActualHeight;
                LayoutRoot.Height = Application.Current.Host.Content.ActualWidth;
                viewFeed.Width = Application.Current.Host.Content.ActualHeight;
                viewFeed.Height = Application.Current.Host.Content.ActualWidth;

                //CompositeTransform.Rotation = PhotoCaptureDeviceProp.SensorRotationInDegrees + 90;
                landscapeRotation = 180;
            }
            else if (po == PageOrientation.PortraitUp)
            {
                LayoutRoot.Height = Application.Current.Host.Content.ActualHeight;
                LayoutRoot.Width = Application.Current.Host.Content.ActualWidth;
                viewFeed.Height = Application.Current.Host.Content.ActualHeight;
                viewFeed.Width = Application.Current.Host.Content.ActualWidth;

                landscapeRotation = 90;
                //CompositeTransform.Rotation = PhotoCaptureDeviceProp.SensorRotationInDegrees;
            }
            else if (po == PageOrientation.PortraitDown)
            {
                LayoutRoot.Height = Application.Current.Host.Content.ActualHeight;
                LayoutRoot.Width = Application.Current.Host.Content.ActualWidth;
                viewFeed.Height = Application.Current.Host.Content.ActualHeight;
                viewFeed.Width = Application.Current.Host.Content.ActualWidth;

                //CompositeTransform.Rotation = PhotoCaptureDeviceProp.SensorRotationInDegrees + 180;
                landscapeRotation = -90;
            }

            if (_photoCamera != null)
            {
                _videoBrush.RelativeTransform =
                    new CompositeTransform() { CenterX = 0.5, CenterY = 0.5, Rotation = landscapeRotation };

                _videoBrush.Stretch = Stretch.Fill;

            }

            // Check to see if the camera is available on the phone.
            if (PhotoCamera.IsCameraTypeSupported(CameraType.Primary) == true)
            {
                _photoCamera = new PhotoCamera(CameraType.Primary);

                // Event is fired when the PhotoCamera object has been initialized.
                //_photoCamera.Initialized += PhotoCameraOnInitialized;

                _videoBrush = new VideoBrush();
                _videoBrush.RelativeTransform = new CompositeTransform() { CenterX = 0.5, CenterY = 0.5, Rotation = landscapeRotation };
                _videoBrush.Stretch = Stretch.Fill;

                _videoBrush.SetSource(_photoCamera);
                viewFeed.Fill = _videoBrush;
            }
            else
            {
                // The camera is not supported on the phone.
                MessageBox.Show("A Camera is not available on this phone.");
            }
        }

        private void UserControl_Unloaded(object sender, RoutedEventArgs e)
        {
            if (_photoCamera != null)
            {
                // Dispose camera to minimize power consumption and to expedite shutdown.
                _photoCamera.Dispose();

                // Release memory, ensure garbage collection.
                //_photoCamera.Initialized -= PhotoCameraOnInitialized;
            }
        }

        void page_BackKeyPress(object sender, CancelEventArgs e)
        {
            page.BackKeyPress -= page_BackKeyPress;

            e.Cancel = true;
        }
    }
}
