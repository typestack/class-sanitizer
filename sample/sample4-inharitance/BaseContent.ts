import { ToInt } from '../../src/decorators';

export class BasePost {
  @ToInt() rating: any;
}
