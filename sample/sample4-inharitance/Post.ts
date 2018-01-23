import { Trim, Rtrim, Blacklist } from '../../src/decorators';
import { BasePost } from './BaseContent';

export class Post extends BasePost {
  @Trim() title: string;

  @Rtrim(['.'])
  @Blacklist(/(1-9)/)
  text: string;
}
