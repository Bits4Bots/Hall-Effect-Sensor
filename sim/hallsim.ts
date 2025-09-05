namespace hallSensor {
    let magnetDetected = false

    export function readLatching(pin: DigitalPin): boolean {
        // Simulate toggling on/off every 2s
        magnetDetected = !magnetDetected
        return magnetDetected
    }

    export function readLinear(pin: AnalogPin): number {
        // Simulate a varying analog value (like a sine wave)
        return Math.round(512 + 512 * Math.sin(control.millis() / 500))
    }

    export function onMagnetDetected(pin: DigitalPin, handler: () => void): void {
        control.inBackground(() => {
            while (true) {
                if (readLatching(pin)) {
                    handler()
                }
                basic.pause(1000)
            }
        })
    }

    export function onMagnetReleased(pin: DigitalPin, handler: () => void): void {
        control.inBackground(() => {
            while (true) {
                if (!readLatching(pin)) {
                    handler()
                }
                basic.pause(1000)
            }
        })
    }

    export function spinServo(pin: AnalogPin, speed: number): void {
        console.log(`Servo ${pin} spinning at speed ${speed}`)
    }

    export function stopServo(pin: AnalogPin): void {
        console.log(`Servo ${pin} stopped`)
    }

    export function demoServoWithMagnet(sensorPin: DigitalPin, servoPin: AnalogPin): void {
        onMagnetDetected(sensorPin, () => {
            console.log("Magnet detected → servo spins")
        })
        onMagnetReleased(sensorPin, () => {
            console.log("Magnet released → servo stops")
        })
    }
}
