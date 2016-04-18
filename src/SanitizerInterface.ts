/**
 * Custom sanitizers must implement this interface to provide custom sanitation logic.
 */
export interface SanitizerInterface {

    /**
     * Method to be called to perform given value sanitation.
     */
    sanitize(value: any): any;

}