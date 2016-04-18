import {Trim, Rtrim, ToInt, Blacklist} from "../../src/decorators";

export class Post {

    @Trim()
    title: string;

    @Rtrim(["."])
    @Blacklist(/(1-9)/)
    text: string;

    // todo: fix it: @ToInt()
    rating: number;

}