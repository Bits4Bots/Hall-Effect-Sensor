//% weight=10 color=#AA0000 icon="H"
namespace Hall {

    /**
     * Handler for latching Hall sensor (US1881).
     * @param pin digital pin connected (with pull-up)
     * @param body code to run when state toggles
     */
    //% block="on latching Hall on pin %pin toggled"
    export function onLatchingToggled(pin: DigitalPin, body: () => void): void {
        let last = pins.digitalReadPin(pin);
        control.onEvent(0, EventBusValue.MICROBIT_ID_ANY, () => {});
        basic.forever(() => {
            let current = pins.digitalReadPin(pin);
            if (current != last) {
                last = current;
                body();
            }
            basic.pause(20);
        });
    }

    /**
     * Reads the current state of the latching Hall sensor.
     * @param pin digital pin
     */
    //% block="latching Hall equals high on pin %pin"
    export function latchingIsHigh(pin: DigitalPin): boolean {
        return pins.digitalReadPin(pin) === 1;
    }

    /**
     * Read raw analog value from linear Hall sensor.
     * @param pin analog pin
     */
    //% block="analog Hall reading on pin %pin"
    export function analogReading(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }

    /**
     * Returns coarse polarity: North, South, or Neutral.
     * @param pin analog pin
     * @param threshold delta threshold (e.g., 50)
     */
    //% block="analog Hall polarity on pin %pin threshold %threshold"
    export function coarsePolarity(pin: AnalogPin, threshold: number): string {
        const val = pins.analogReadPin(pin);
        const mid = 512;
        if (val > mid + threshold) return "South";
        else if (val < mid - threshold) return "North";
        else return "Neutral";
    }
}
