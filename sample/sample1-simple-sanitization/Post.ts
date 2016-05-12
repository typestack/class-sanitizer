import {Trim, Rtrim, Blacklist} from "../../src/index";

export class Post {

    @Trim()
    title: string;

    @Rtrim(["."])
    @Blacklist(/(1-9)/)
    text: string;

    // todo: fix it: @ToInt()
    rating: number;

}