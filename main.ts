//% weight=100 color=#ff4d4d icon="\uf076"
//% groups=['Latching', 'Linear']
namespace hallSensor {

    let lastState: number = -1

    /**
     * Read the digital state of a latching Hall effect sensor.
     * @param pin the pin connected to the sensor output
     */
    //% block="read latching Hall sensor on pin %pin"
    //% group="Latching"
    export function readLatching(pin: DigitalPin): boolean {
        return pins.digitalReadPin(pin) == 1;
    }

    /**
     * Run code when a magnet is detected by the latching sensor.
     * @param pin the pin connected to the sensor output
     */
    //% block="on magnet detected on pin %pin"
    //% group="Latching"
    export function onMagnetDetected(pin: DigitalPin, handler: () => void): void {
        control.inBackground(() => {
            while (true) {
                let state = pins.digitalReadPin(pin);
                if (state == 1 && lastState != 1) {
                    handler();
                }
                lastState = state;
                basic.pause(50);
            }
        });
    }

    /**
     * Run code when a magnet is released from the latching sensor.
     * @param pin the pin connected to the sensor output
     */
    //% block="on magnet released on pin %pin"
    //% group="Latching"
    export function onMagnetReleased(pin: DigitalPin, handler: () => void): void {
        control.inBackground(() => {
            while (true) {
                let state = pins.digitalReadPin(pin);
                if (state == 0 && lastState != 0) {
                    handler();
                }
                lastState = state;
                basic.pause(50);
            }
        });
    }

    /**
     * Read the analog value of a linear Hall effect sensor.
     * @param pin the pin connected to the sensor output
     */
    //% block="read linear Hall sensor on pin %pin"
    //% group="Linear"
    export function readLinear(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }
}
