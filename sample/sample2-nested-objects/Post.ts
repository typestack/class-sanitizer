import { Tag } from './Tag';

export class Post {
  title: string;

  // todo
  // @SanitizeNested()
  tags: Tag[];
}
