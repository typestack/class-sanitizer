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

export async function sanitizeAsync(object: any) {
  await sanitizer.sanitizeAsync(object);
}
