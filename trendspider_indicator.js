const core = sma(close, 20);
const deviation = stdev(close, 20);
const deviationMultiplied = mult(deviation, 2);

paint(core, 'Core', 'blue');
paint(add(core, deviationMultiplied), 'Upper line', 'blue');
paint(sub(core, deviationMultiplied), 'Lower line', 'blue');
