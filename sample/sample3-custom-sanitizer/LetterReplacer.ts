import {SanitizerInterface, SanitizerConstraint} from "../../src/index";

@SanitizerConstraint()
export class LetterReplacer implements SanitizerInterface {

    sanitize(text: string): string {
        return text.replace(/o/g, "w");
    }

}