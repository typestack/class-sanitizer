/**
 * @deprecated
 * This file is deprecated. Import from ./index.ts instead.
 */

import { Sanitizer } from './Sanitizer';

export * from './decorators';
export * from './Sanitizer';
export * from './SanitizerInterface';

const sanitizer = new Sanitizer();

// tslint:disable-next-line:no-default-export
export default sanitizer;

export function sanitize(object: any) {
  sanitizer.sanitize(object);
}

export async function sanitizeAsync<T>(object: T): Promise<T> {
  return sanitizer.sanitizeAsync(object);
}
