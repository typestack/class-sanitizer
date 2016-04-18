import {SanitizerConstraint} from "../../src/decorators";
import {SanitizerInterface} from "../../src/SanitizerInterface";

@SanitizerConstraint()
export class LetterReplacer implements SanitizerInterface {

    sanitize(text: string): string {
        return text.replace(/o/g, "w");
    }

}