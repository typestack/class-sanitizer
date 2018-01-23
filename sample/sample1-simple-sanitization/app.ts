import { sanitize } from '../../src/index';
import { Post } from './Post';

// Sample1. simple sanitization

const post1 = new Post();
post1.title = ' Hello world ';
post1.text = '1. this is a great (2) post about hello 3 world.';
post1.rating = 12.2;

sanitize(post1);