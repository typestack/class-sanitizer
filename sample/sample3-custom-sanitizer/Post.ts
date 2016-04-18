import {Sanitize} from "../../src/decorators";
import {LetterReplacer} from "./LetterReplacer";

export class Post {

    @Sanitize(LetterReplacer)
    title: string;

}