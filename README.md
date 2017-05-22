DISCONTINUATION OF PROJECT.  This project will no longer be maintained by Intel.  Intel will not provide or guarantee development of or support for this project, including but not limited to, maintenance, bug fixes, new releases or updates.  Patches to this project are no longer accepted by Intel.  In an effort to support the developer community, Intel has made this project available under the terms of the Apache License, Version 2. If you have an ongoing need to use this project, are interested in independently developing it, or would like to maintain patches for the community, please create your own fork of the project.

intel.xdk.display
=======================

>   _This Intel XDK Cordova plugin and API has been deprecated. Please use the
>   [viewport meta](http://dev.w3.org/csswg/css-device-adapt/#viewport-meta)
>   element._

Description
-----------

The display object gives the application control over aspects of the device's
video display properties.

### Methods

-   [lockViewportWindow](#lockviewportwindow) — This method guarantees that the
    values you send in are always completely visible and the smaller dimension
    will be filled completely.
-   [startAR](#startar) — This method triggers the Intel XDK augmented reality
    mode.
-   [stopAR](#stopar) — This method turns off augmented reality mode.
-   [useViewport](#useviewport) — This method tells intel.xdk to size down an
    application for a smaller device.

### Properties

-   [window.landheight](#windowlandheight) — This property returns the visible
    screen height (in pixels) on the device for landscape
-   [window.landwidth](#windowlandwidth) — This property returns the visible
    screen width (in pixels) on the device for landscape
-   [window.portheight](#windowportheight) — This property returns the visible
    screen height (in pixels) on the device for portrait
-   [window.portwidth](#windowportwidth) — This property returns the visible
    screen width (in pixels) on the device for portrait

Methods
-------

### lockViewportWindow

This method guarantees that the values you send in are always completely visible
and the smaller dimension will be filled completely.

```javascript
intel.xdk.display.lockViewportWindow(widthPortrait,heightPortrait,
    widthLandscape,heightLandscape);
```

#### Description

>   **IMPORTANT NOTE:** This method calls [useViewport](#useviewport)
>   internally, so you should **NOT** use
>   [lockViewportWindow](#lockviewportwindow) and [useViewport](#useviewport)
>   together.

This method guarantees that the values you send in are always completely visible
and the smaller dimension will be filled completely. The placement will always
be to the top, left (0,0) which means that there will be extra visible space on
the right(landscape) and the bottom(portrait) on devices that have a higher
aspect ratio.

This will scale up or down accordingly, but is mainly intended to be used to
scale down as a best practice.

It is suggested that you design for iPad since it has the lowest aspect ratio
and then scale down to any other device. The iPad settings would be:

```javascript
intel.xdk.display.lockViewportWindow(768,1004,1024,748);
```

#### Available Platforms

-   Apple iOS
-   Google Android
-   Microsoft Windows 8 - BETA
-   Microsoft Windows Phone 8 - BETA

#### Parameters

-   **widthPortrait:** The width to set the Viewport window to display at in
    pixels when the device is in portrait orientation.
-   **heightPortrait:** The height to set the Viewport window to display at in
    pixels when the device is in portrait orientation.
-   **widthLandscape:** The width to set the Viewport window to display at in
    pixels when the device is in landscape orientation.
-   **heightLandscape:** The height to set the Viewport window to display at in
    pixels when the device is in landscape orientation.

#### Example

```javascript
//use lockViewportWindow to guarantee that the screen is completely visible with
//the smaller dimension completely filled.  Size for iPad.
var iPortraitWidth=768;
var iPortraitHeight=1004;
var iLandscapeWidth=1024;
var iLandscapeHeight=748;
intel.xdk.display.lockViewportWindow(iPortraitWidth,iPortraitHeight,
    iLandscapeWidth,iLandscapeHeight);
```

### startAR

Please note that augmented reality mode is not available on all platforms and
devices due to hardware requirements.

Augmented reality mode will lock to a particular orientation at startup.

#### Platforms

-   Apple iOS
-   Google Android

#### Example

```javascript
intel.xdk.display.startAR();
```

### stopAR

This method turns off augmented reality mode.

```javascript
intel.xdk.display.stopAR();
```

#### Platforms

-   Apple iOS
-   Google Android

#### Example

```javascript
intel.xdk.display.stopAR();
```

### useViewport

This method tells intel.xdk to size down an application for a smaller device.

```javascript
intel.xdk.display.useViewport(widthPortrait,widthLandscape);
```

#### Description

This method tells intel.xdk to size down an application for a smaller device.
Use this method in your application’s intel.xdk.device.ready event to size a
larger application down for use on a smaller device than it was originally
designed for.

This method expects two values, the first is the width the application is
designed for in portrait orientation, and the second is the width the
application is designed for in landscape orientation.

Unfortunately, several newer Android devices have changed their version of the
Android operating system to a point that this command does not work. At this
point, the list of devices that are known to ignore this functionality include:

*   HTC EVO 4G
*   HTC Legend
*   HTC Evolution 4G
*   HTC Thunderbolt
*   HTC Sensation

#### Available Platforms

-   Apple iOS
-   Google Android
-   Microsoft Windows 8 - BETA
-   Microsoft Windows Phone 8 - BETA

#### Parameters

-   **widthPortrait:** The width to set the device to display at in pixels when
    the device is in portrait orientation.
-   **widthLandscape:** The width to set the device to display at in pixels when
    the device is in landscape orientation.

#### Example

```javascript
//use intel.xdk viewport to allow this iPad-designed application to size down to
//an iPhone //or an Android handset device with a resolution lower than
//1024x768.
var iPortraitWidth=768;
var iLandscapeWidth=1024;
intel.xdk.display.useViewport(iPortraitWidth,iLandscapeWidth);
```

Properties
----------

### window.landheight

This property returns the visible screen height (in pixels) on the device for
landscape

```javascript
intel.xdk.display.window.landheight
```

#### Description

This property is only set by a call to
[intel.xdk.display.lockViewportWindow](#lockviewportwindow).
Otherwise the returned value is 0.

#### Example

```javascript
//detect the current visible screen height of the device for landscape
var landHeight = intel.xdk.display.window.landheight;
```

### window.landwidth

This property returns the visible screen width (in pixels) on the device for
landscape

```javascript
intel.xdk.display.window.landwidth
```

#### Description

This property is only set by a call to
[intel.xdk.display.lockViewportWindow](#lockviewportwindow).
Otherwise the returned value is 0.

#### Example

```javascript
//detect the current visible screen width of the device for landscape
var landWidth = intel.xdk.display.window.landwidth;
```

### window.portheight

This property returns the visible screen height (in pixels) on the device for
portrait

```javascript
intel.xdk.display.window.portheight
```

#### Description

This property is only set by a call to
[intel.xdk.display.lockViewportWindow](#lockviewportwindow).
Otherwise the returned value is 0.

#### Example

```javascript
//detect the current visible screen height of the device for portrait
var portHeight = intel.xdk.display.window.portheight;
```

### window.portwidth

This property returns the visible screen width (in pixels) on the device for
portrait

```javascript
intel.xdk.display.window.portwidth
```

#### Description

This property is only set by a call to
[intel.xdk.display.lockViewportWindow](#lockviewportwindow).
Otherwise the returned value is 0.

#### Example

```javascript
//detect the current visible screen width of the device for portrait
var portWidth = intel.xdk.display.window.portwidth;
```

