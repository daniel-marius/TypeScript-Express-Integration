import "reflect-metadata";
import { RequestHandler } from "express";

import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";

interface RouteHandleDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

// export function get(path: string) {
//   return function(target: any, key: string, desc: PropertyDescriptor) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "get", target, key);
//   };
// }
//
// export function post(path: string) {
//   return function(target: any, key: string, desc: PropertyDescriptor) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "post", target, key);
//   };
// }

function routeBinder(method: string) {
  return function(path: string) {
    return function(target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  }
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
