import { sanitize } from '../../src/index';
import { Post } from './Post';
import { Tag } from './Tag';

const tag1 = new Tag();
tag1.name = 'ja';

const tag2 = new Tag();
tag2.name = 'node.js';

const post1 = new Post();
post1.title = 'Hello world';
post1.tags = [tag1, tag2];

console.log('should not pass:');

sanitize(post1);