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

```blocks
let field = hallSensor.readLinear(AnalogPin.P0)
basic.showNumber(field)
```

```blocks
hallSensor.spinServo(AnalogPin.P0, 50)
basic.pause(1000)
hallSensor.stopServo(AnalogPin.P0)
```

```blocks
hallSensor.demoServoWithMagnet(DigitalPin.P1, AnalogPin.P0)
```

