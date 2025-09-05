//% weight=100 color=#ff4d4d icon="\uf076"
//% groups=['Latching', 'Linear', 'Servos']
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
     * Read the analog value of a linear Hall effect sensor.
     * @param pin the pin connected to the sensor output
     */
    //% block="read linear Hall sensor on pin %pin"
    //% group="Linear"
    export function readLinear(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
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

    // --------------------------------------------------------
    // Servo demo blocks (P0, P1, P2 only)
    // --------------------------------------------------------

    /**
     * Spin a continuous servo at a given speed (-100 to 100).
     * @param pin servo pin P0, P1, or P2
     * @param speed speed -100 to 100, eg: 50
     */
    //% block="spin continuous servo on %pin at speed %speed"
    //% speed.min=-100 speed.max=100
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3 pin.fieldOptions.tooltips=true
    //% pin.defl=AnalogPin.P0
    //% group="Servos"
    export function spinServo(pin: AnalogPin, speed: number): void {
        servos.P0.setServoPulse(1500 + speed * 5);
    }

    /**
     * Stop a continuous servo.
     * @param pin servo pin P0, P1, or P2
     */
    //% block="stop continuous servo on %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3 pin.fieldOptions.tooltips=true
    //% pin.defl=AnalogPin.P0
    //% group="Servos"
    export function stopServo(pin: AnalogPin): void {
        servos.P0.stop();
    }

    /**
     * Demo: spin servo when magnet detected.
     * @param sensorPin Hall sensor pin
     * @param servoPin Servo pin
     */
    //% block="demo: spin servo on %servoPin when magnet detected on %sensorPin"
    //% servoPin.fieldEditor="gridpicker"
    //% servoPin.fieldOptions.columns=3 servoPin.fieldOptions.tooltips=true
    //% servoPin.defl=AnalogPin.P0
    //% group="Servos"
    export function demoServoWithMagnet(sensorPin: DigitalPin, servoPin: AnalogPin): void {
        onMagnetDetected(sensorPin, () => {
            servos.P0.setServoPulse(1700);
        });
        onMagnetReleased(sensorPin, () => {
            servos.P0.stop();
        });
    }
}
