import {sanitize} from "../../src/class-sanitizer";
import {Post} from "./Post";

let post1 = new Post();
post1.title = "Hello world";
sanitize(post1);
console.log(post1);