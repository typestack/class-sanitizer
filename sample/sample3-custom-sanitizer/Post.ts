import {Sanitize} from "../../src/index";
import {LetterReplacer} from "./LetterReplacer";

export class Post {

    @Sanitize(LetterReplacer)
    title: string;

}