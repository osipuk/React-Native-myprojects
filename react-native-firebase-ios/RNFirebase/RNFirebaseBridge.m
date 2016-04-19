//
//  RNFirebase.m
//  RNFirebase
//
//  Created by Alonso Holmes on 10/1/15.
//  Copyright (c) 2015 Alonso Holmes. All rights reserved.
//

#import "RCTBridgeModule.h"
#import "RCTLog.h"

@interface RCT_EXTERN_MODULE(RNFirebase, NSObject)

RCT_EXTERN_METHOD(on:(NSString *)path event:(NSString *)event);
RCT_EXTERN_METHOD(keepSynced:(NSString *)path shouldSync:(BOOL)shouldSync);
RCT_EXTERN_METHOD(off:(NSString *)path);
RCT_EXTERN_METHOD(set:(NSString *)path value:(id)value callback:(id)callback);
RCT_EXTERN_METHOD(update:(NSString *)path value:(id)value callback:(id)callback);
RCT_EXTERN_METHOD(getAuth:(NSString *)path callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(unauth:(NSString *)path);
RCT_EXTERN_METHOD(authWithFacebook:(NSString *)path callback:(RCTResponseSenderBlock)callback);

RCT_EXTERN_METHOD(onQuery:(NSString *)path event:(NSString *)event operations:(NSArray *)operations eventKey:(NSString *)eventKey);


@end