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

#import "XDKDisplay.h"

@interface XDKDisplay ();

@property (nonatomic) BOOL inUse;

@end

@implementation XDKDisplay

- (void) startAR:(CDVInvokedUrlCommand*)command
{
    if (self.inUse) return;
    if (! [UIImagePickerController
           isSourceTypeAvailable: UIImagePickerControllerSourceTypeCamera]) return;
    self.inUse = YES;

	CGRect rr = self.webView.frame;
	rr.origin.y -= 20;
	rr.size.height += 20;
	self.webView.frame = rr;
	
	UIImagePickerController *picker = [UIImagePickerController new];
	picker.sourceType = UIImagePickerControllerSourceTypeCamera;
	picker.showsCameraControls = NO;
	picker.navigationBarHidden = YES;
	picker.toolbarHidden = YES;
	picker.wantsFullScreenLayout = YES;
	picker.cameraViewTransform = CGAffineTransformScale(picker.cameraViewTransform, 1.0, 1.24824);
	picker.cameraOverlayView = self.viewController.view;
    self.viewController.view.alpha = 0.5;
	
    [self.viewController presentViewController:picker animated:YES completion:nil];
}


- (void) stopAR:(CDVInvokedUrlCommand*)command
{
    if (! self.inUse) return;
    
	CGRect rr = self.webView.frame;
	rr.origin.y += 20;
	rr.size.height -= 20;
	self.webView.frame = rr;

    self.viewController.view.alpha = 1.0;
	[self.viewController dismissViewControllerAnimated:YES completion:nil];
    self.inUse = NO;
}

@end
