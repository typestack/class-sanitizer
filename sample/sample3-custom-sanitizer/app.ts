import { sanitize } from '../../src/index';
import { Post } from './Post';

let post1 = new Post();
post1.title = 'Hello world';
sanitize(post1);
console.log(post1);
