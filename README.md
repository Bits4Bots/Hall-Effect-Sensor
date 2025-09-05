# Hall Sensor MakeCode Extension

Blocks for using **Hall Effect Sensors** (latching & linear) with micro:bit.  
Includes **servo demo blocks** for interactive projects.

---

## Blocks

### 🔴 Latching Hall Sensor

```blocks
let magnet = hallSensor.readLatching(DigitalPin.P1)
hallSensor.onMagnetDetected(DigitalPin.P1, function () {
    basic.showIcon(IconNames.Heart)
})
hallSensor.onMagnetReleased(DigitalPin.P1, function () {
    basic.clearScreen()
})
```
## 🔵 Linear Hall Sensor
```blocks
let field = hallSensor.readLinear(AnalogPin.P0)
basic.showNumber(field)
```
## 🟢 Servo Blocks
```blocks
hallSensor.spinServo(AnalogPin.P0, 50)
basic.pause(1000)
hallSensor.stopServo(AnalogPin.P0)
```
## ⚡ Servo + Magnet Demo
```blocks
hallSensor.demoServoWithMagnet(DigitalPin.P1, AnalogPin.P0)
```

## Setup

- Connect a latching Hall sensor to a digital pin (e.g., P1).
- Connect a linear Hall sensor to an analog pin (e.g., P0).
