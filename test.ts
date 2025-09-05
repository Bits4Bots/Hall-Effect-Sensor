// Example usage of Hall Sensors extension

// Latching Hall: toggle detection
Hall.onLatchingToggled(DigitalPin.P0, () => {
    basic.showString("T");
});

// Analog linear Hall: display raw reading
basic.forever(() => {
    const val = Hall.analogReading(AnalogPin.P1);
    basic.showNumber(val);
    basic.pause(200);
});

// Analog polarity
basic.forever(() => {
    const pol = Hall.coarsePolarity(AnalogPin.P1, 50);
    basic.showString(pol.charAt(0)); // N, S or N (neutral)
    basic.pause(500);
});
