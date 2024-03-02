/**
 * Builds simple moving average over given series
 *
 * @name sma
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number|series} length - Window length. It also supports dynamic length (a series with different lengths for each candle)
 * @returns {series} Resulting series
 *
 * @example
 * // returns SMA of Close values, window size being 20
 * sma(close, 20);
 *
 * // returns SMA of High values, window size being 50
 * sma(high, 50);
 *
 * // returns average candle height, for last 20 candles
 * sma(
 * 	sub(high, low),
 *	20
 * );
 */
declare function sma(series: series, length: (number|series)): series;

/**
 * Builds exponential moving average over given series
 *
 * @name ema
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number} length - Window length
 * @returns {series} Resulting series
 *
 * @example
 * // returns EMA of Close values, window size being 20
 * ema(close, 20);
 *
 * // returns EMA of High values, window size being 50
 * ema(high, 50);
 *
 * // returns Double EMA of Close values, window size being 20
 * ema(ema(close, 20), 20);
 */
declare function ema(series: series, length: number): series;

/**
 * Returns "Max value of series for last X candles"
 *
 * @name highest
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number} length - Window length
 * @returns {series} Resulting series
 *
 * @example
 * // returns Highest High over last 10 candles (trailing)
 * highest(high, 10);
 */
declare function highest(series: series, length: number): series;

/**
 * Returns "Min value of series for last X candles"
 *
 * @name lowest
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number} length - Window length
 * @returns {series} Resulting series
 *
 * @example
 * // returns Lowest Low over last 20 candles (trailing)
 * lowest(low, 20);
 */
declare function lowest(series: series, length: number): series;

/**
 * Returns "Sum of values of a series for last X candles"
 * @name sum
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number} length - Window length
 * @returns {series} Resulting series
 *
 * @example
 * // returns total volume for last 20 candles (trailing)
 * sum(volume, 20);
 */
declare function sum(series: series, length: number): series;

/**
 * Returns Momentum on a given series, with a given window size
 * @name momentum
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number} length - Window length
 * @returns {series} Resulting series
 *
 * @example
 * momentum(high, 20);
 */
declare function momentum(series: series, length: number): series;

/**
 * Returns "Standard deviation of an input series for last X candles"
 *
 * @name stdev
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number} length - Window length
 * @returns {series} Resulting series
 *
 * @example
 * // returns standard deviation of Close for last 20 candles (trailing)
 * stdev(close, 20);
 */
declare function stdev(series: series, length: number): series;

/**
 * Returns Williams Fractals Highs for a given series. Generates sparse series as its output; this series contains
 * `null` for every candle which has no Fractal point, and contains the input series value for candles which do
 * have a Fractal point. By setting a peak window index, you can define which candle of the window should be the highest,
 * which is a way to find the high pivot points. Another way is using the pivot_high() function.
 * Do remember that some charts can contain zero of Fractal points, in which case you will receive a series full of `null`.
 *
 * @name fractal_high
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number} length - Window length, must be odd if the peakIndex is not defined.
 * @param {number} peakIndex - The window index of the peak candle. (optional, it defaults to (length - 1) / 2)
 * @returns {series} Resulting series, one value per input series value:
 * either `null` (if there's no Fractal point at a given index) or a value of the original series
 * (if there's a Fractal point here).
 *
 * @example
 * // paints Fractals High points
 * paint(fractal_high(high, 21), { style: 'dotted', thickness: 10 })
 */
declare function fractal_high(series: series, length: number, peakIndex: number): series;

/**
 * Returns Williams Fractals Lows for a given series. Generates sparse series as its output; this series contains
 * `null` for every candle which has no Fractal point, and contains the input series value for candles which do
 * have a Fractal point. By setting a peak window index, you can define which candle of the window should be the lowest,
 * which is a way to find the low pivot points. Another way is using the pivot_low() function.
 * Do remember that some charts can contain zero of Fractal points, in which case you will receive a series full of `null`.
 *
 * @name fractal_low
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number} length - Window length, it must be odd if the peakIndex is not defined.
 * @param {number} peakIndex - The window index of the peak candle. (optional, it defaults to (length - 1) / 2)
 * @returns {series} Resulting series, one value per input series value:
 * either `null` (if there's no Fractal point at a given index) or a value of the original series
 * (if there's a Fractal point here).
 *
 * @example
 * // paints Fractals Low points
 * paint(fractal_low(low, 5), { style: 'dotted', thickness: 10 })
 */
declare function fractal_low(series: series, length: number, peakIndex: number): series;

/**
 * Returns VWAP starting at a given candle index
 * The indicator is computed on the chart's ohlc4 and volume series.
 * If you want it to use custom series you can use the first 2 parameters
 * for the custom series and the last two for from_index and to_index.
 *
 * @name vwap
 * @function
 *
 * @param {number} from_index - Index of a candle to start from
 * @param {number} to_index - Index of a candle to stop the computation (optional)
 * @returns {series} Resulting series
 *
 * @example
 * // returns vwap starting from the very beginning of history
 * paint(vwap());
 *
 * // returns vwap from "10 candles ago"
 * paint(vwap(close.length - 10));
 *
 * // returns vwap from candle "50" to candle "100"
 * paint(vwap(50, 100));
 *
 * // returns vwap from "10 candles ago" using hlc3 instead of ohlc4
 * paint(vwap(hlc3, volume, close.length - 10));
 *
 */
declare function vwap(from_index: number, to_index: number): series;

/**
 * Returns average true range with a given window size.
 * It uses the current chart high, low and close series.
 * You can use custom series by setting the first three parameters
 * to your custom high, low and close series and the fourth to the window size.
 *
 * @name atr
 * @function
 *
 * @param {number} length - Window size
 * @returns {series} Resulting series
 *
 * @example
 * // paints a generic ATR with a window length of 14
 * describe_indicator('ATR', 'lower');
 * paint(atr(14));
 */
declare function atr(length: number): series;

/**
 * Calculates Stochastic over given data.
 *
 * @name stochastic
 * @function
 *
 * @param {series} close Close series
 * @param {series} high High series
 * @param {series} low Low series
 * @param {number} length - Window size
 * @returns {series} Resulting series
 *
 * @example
 * // paints a generic Stochastic indicator
 * const stoch = stochastic(close, high, low, 14);
 * paint(stoch);
 *
 * // paints Stochastic built off High series only
 * const stoch = stochastic(high, high, high, 25);
 * paint(stoch);
 */
declare function stochastic(close: series, high: series, low: series, length: number): series;

/**
 * Calculates Parabolic SAR.
 * It can also be computed on custom high and low series by using them as the first two parameters before the three parameters below
 *
 * @name psar
 * @function
 *
 * @param {number} maximum Maximum acceleration
 * @param {number} acceleration Acceleration factor
 * @param {number} start Start
 *
 * @returns {series} Resulting series
 *
 * @example
 * // paints a generic Parabolic SAR indicator
 * paint(psar(0.02, 0.02, 0.2));
 *
 */
declare function psar(maximum: number, acceleration: number, start: number): series;

/**
 * Calculates Wilders MA (Also known as RMA, MMA or SMMA).
 *
 * @name wildma
 * @function
 *
 * @param {series} priceSeries Series which you want being a source
 * @param {number} length Length
 *
 * @returns {series} Resulting series
 *
 * @example
 * // paints the Wilders MA
 * paint(wildma(close, 15));
 *
 */
declare function wildma(priceSeries: series, length: number): series;

/**
 * Calculates Volume Weighted MA.
 *
 * @name vwma
 * @function
 *
 * @param {series} priceSeries Series which you want being a source
 * @param {number} length Length
 *
 * @returns {series} Resulting series
 *
 * @example
 * // paints the Volume Weighted MA
 * paint(vwma(close, 15));
 *
 */
declare function vwma(priceSeries: series, length: number): series;

/**
 * Calculates Arnaud Legoux MA.
 *
 * @name alma
 * @function
 *
 * @param {series} priceSeries Series which you want being a source
 * @param {number} window Window size
 * @param {number} sigma	Sigma
 * @param {number} smooth Smooth length
 *
 * @returns {series} Resulting series
 *
 * @example
 * // paints the Arnaud Legoux MA
 * paint(alma(close, 15, 0.5, 5));
 *
 */
declare function alma(priceSeries: series, window: number, sigma: number, smooth: number): series;

/**
 * Calculates Vortex
 *
 * @name vortex
 * @function
 *
 * @param {number} length Length
 *
 * @returns {object} Object like { positive, negative }
 *
 * @example
 * // It is a lower indicator
 * describe_indicator('vortex', 'lower');
 *
 * // Calculate the indicator object
 * const vortexObject = vortex(15);
 *
 * // Paint the resulting lines
 * paint(vortexObject.positive);
 * paint(vortexObject.negative);
 *
 */
declare function vortex(length: number): Object;

/**
 * Calculates Kaufman MA.
 *
 * @name kama
 * @function
 *
 * @param {series} priceSeries Series which you want being a source
 * @param {number} ERLength Efficiency Ratio
 * @param {number} fast Fast Length
 * @param {number} slow	Slow Length
 *
 * @returns {series} Resulting series
 *
 * @example
 * // paints the Kaufman MA
 * paint(kama(close, 5, 5, 10));
 *
 */
declare function kama(priceSeries: series, ERLength: number, fast: number, slow: number): series;

/**
 * Calculates Relative Strength Index
 *
 * @name rsi
 * @function
 *
 * @param {series} input - Series which you want being a source
 * @param {number} length - RSI length
 *
 * @returns {series} Resulting series
 *
 * @example
 * // It is a lower indicator
 * describe_indicator('RSI', 'lower');
 * paint(rsi(close, 15));
 */
declare function rsi(input: series, length: number): series;

/**
 * Calculates Weighted Moving Average
 *
 * @name wma
 * @function
 *
 * @param {series} input Series which you want being a source
 * @param {number|series} length Length. It can also be a series for dynamic length.
 *
 * @returns {series} Resulting series
 *
 * @example
 * paint(wma(close, 15));
 *
 */
declare function wma(input: series, length: (number|series)): series;

/**
 * Calculates Hull Moving Average
 *
 * @name hullma
 * @function
 *
 * @param {series} input Series which you want being a source
 * @param {number} length Length
 *
 * @returns {series} Resulting series
 *
 * @example
 *
 * paint(hullma(close, 15));
 *
 */
declare function hullma(input: series, length: number): series;

/**
 * Calculates Sequential Count indicator. Elements of out series are strings, like "1", "2", "x9" e.t.c.
 * Returns object like `{ buySetup: series, sellSetup: series, countdownBuy: series, countdownSell: series }`
 * or `{ error }` in case if there's nothing to display.
 *
 * @name seqcount
 * @function
 *
 * @param {series} customHigh Series which you want to be used instead of chart's high. (Optional)
 * @param {series} customLow Series which you want to be used instead of chart's low. (Optional)
 * @param {series} customClose Series which you want to be used instead of chart's close. (Optional)
 *
 * @returns {object} like `{ buySetup: series, sellSetup: series, countdownBuy: series, countdownSell: series }``
 * or `{ error }` in case if there's nothing to display.
 *
 * @example
 * const seqcountObject = seqcount();
 *
 * paint(seqcountObject.buySetup, 'Buy Setup', 'black', 'labels_below');
 * paint(seqcountObject.sellSetup, 'Sell Setup', 'black', 'labels_above');
 *
 */
declare function seqcount(customHigh: series, customLow: series, customClose: series): Object;

/**
 * Calculates Chande Momentum Oscillator
 *
 * @name cmo
 * @function
 *
 * @param {series} input Series which you want being a source
 * @param {number} length Length
 *
 * @returns {series} Resulting series
 *
 * @example
 *
 * // It is a lower indicator
 * describe_indicator('CMO', 'lower');
 *
 * paint(cmo(close, 15));
 *
 */
declare function cmo(input: series, length: number): series;

/**
 * Declares an assertion check. This function will throw an error with a text of `text` in case if `condition` is false.
 * Fail fast.
 *
 * @name assert
 * @function
 *
 * @param {boolean} condition - Condition to be checked
 * @param {string} text - Error message to be raised
 * @returns {undefined} nothing
 *
 * @example
 * // checks whether requesting history had been successfull
 * const history = await request.history('AAPL', "W");
 * assert(!history.error, `Error requesting history: "${history.error}"`);
 */
declare function assert(condition: boolean, text: string): undefined;

/**
 * Subtracts one series (or constant number) from another series
 *
 * @name sub
 * @function
 *
 * @param {series} series1 - Series which you want being a source
 * @param {...series | number} counterpart - one or more series (or numbers) you want your source series being subtracted from
 * @returns {series} Returns a time series which is a result of subtracting your second argument from the first one
 *
 * @example
 * // returns a series which has its value being equal to `high - low` for each candle
 * sub(high, low);
 *
 *
 * // returns a series which is equal to
 * // "close - 2" for each candle
 * sub(close, 2);
 *
 *
 * // returns a series which is equal to
 * // "distance from close to sma(20)"
 * sub(close, sma(close, 20));
 *
 *
 * // returns a series which has its value being equal to `open - close - 5`
 * sub(open, close, 5);
 */
declare function sub(series1: series, counterpart: (series|number)): series;

/**
 * Adds one series to another series (or constant number)
 *
 * @name add
 * @function
 *
 * @param {series} series1 - Series which you want being a source
 * @param {...series | number} counterpart - One or more series (or numbers) you want your source series being added to
 * @returns {series} Returns a time series which is a result of adding your second argument to the first one
 *
 * @example
 * // returns a series which has its value being equal to "high + low" for each candle
 * add(high, low);
 *
 *
 * // returns a series which is equal to
 * // "close + 2" for each candle
 * add(close, 2);
 *
 *
 * // returns a series which is equal to
 * // "close + sma(20)"
 * add(close, sma(close, 20));
 *
 *
 * // returns a series which equals to
 * // "sma(20) + distance from low to high"
 * add(
 * 	sma(close, 20),
 * 	sub(high, low)
 * );
 */
declare function add(series1: series, counterpart: (series|number)): series;

/**
 * Divides one series by another series (or constant number)
 *
 * @name div
 * @function
 *
 * @param {series} series1 - Series which you want being a source
 * @param {series | number} counterpart - Series (or number) you want your source series being divided by
 * @returns {series} Returns a time series which is a result of dividing your second argument by the first one
 *
 * @example
 * // returns a "high to low" ratio
 * div(high, low);
 *
 * // returns volume divided by 10 (means "10% of volume")
 * div(volume, 10);
 *
 * // returns a series which is equal to "(high + low) / 2"
 * div(
 * 	add(high, low),
 * 	2
 * );
 */
declare function div(series1: series, counterpart: (series|number)): series;

/**
 * Multiplies one series by another series (or constant number)
 *
 * @name mult
 * @function
 *
 * @param {series} series1 - Series which you want being a source
 * @param {...series | number} counterpart - One or more series (or numbers) you want your source series being multiplied by
 * @returns {series} Returns a time series which is a result of multiplying your second argument by the first one
 *
 * @example
 * // returns a "close * volume" series
 * mult(close, volume);
 *
 * // returns volume multiplied by 2 and close
 * mult(volume, 2, close);
 */
declare function mult(series1: series, counterpart: (series|number)): series;

/**
 * Returns a series which has its value for every candle equal to max of 2 corresponding elements of both input series
 *
 * @name max_of
 * @function
 *
 * @param {series} series1 - First series
 * @param {...series | number} counterpart - One or more series (or numbers) you want to be included in the operation
 * @returns {series} Resulting series
 *
 * @example
 * // returns a series which equals to
 * // "upper element for a candle's body"
 * max_of(open, close);
 */
declare function max_of(series1: series, counterpart: (series|number)): series;

/**
 * Returns a series which has its value for every candle equal to min of 2 corresponding elements of both input series
 *
 * @name min_of
 * @function
 *
 * @param {series} series1 - First series
 * @param {series | number} counterpart - One or more series (or numbers) you want to be included in teh operation
 * @returns {series} Resulting series
 *
 * @example
 * // returns a series which equals to
 * // "lower element for a candle's body"
 * min_of(open, close);
 */
declare function min_of(series1: series, counterpart: (series|number)): series;

/**
 * Builds a horizonal level equal to a given constant. Useful primarily for visual reference in lower indicators.
 *
 * @name horizontal_line
 * @function
 *
 * @param {number} value - Value for your level
 * @param {number} fromIndex - Index of a candle you want the level starting from. Defaults to 0.
 * @param {number} toIndex - Index of a candle you want the level ending at. Defaults to Infinity.
 * @returns {series} Resulting series
 *
 * @example
 * // returns a series which equals to 80 for every candle
 * horizontal_line(80);
 *
 */
declare function horizontal_line(value: number, fromIndex: number, toIndex: number): series;

/**
 * Synonym for horizontal_line() but does not support "from" or "to".
 * Use it if you need to initialize series in your code.
 *
 * @name series_of
 * @function
 *
 * @param {number} value The value that the series will contain
 *
 * @returns {series} Series containing the specified value
 */
declare function series_of(value: number): series;

/**
 * Runs your function as a sliding-window operation on a time series.
 *
 * @name sliding_window_function
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number} windowSize - Size of a sliding window
 * @param {function} callback - Operation to run; callback defined as (allElementsInCurrentWindow) => { ... }
 * @returns {series} Result of running your sliding function on a base data set
 *
 * @example
 * // implements a Highest High indicator with a length of 20 (calculated off "high")
 * sliding_window_function(high, 20, values => Math.max(...values));
 *
 */
declare function sliding_window_function(series: series, windowSize: number, callback: (() => any)): series;

/**
 * Shifts series to the right, by a given number of candles
 *
 * @name shift
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number} offset - Number of candles you want your series shifted by
 * @returns {series} Resulting series
 *
 * @example
 * // returns High shifted forwards by 10 candles
 * shift(high, 10);
 *
 *
 * // returns High shifted backwards by 2 candles
 * shift(high, -2);
 *
 *
 * // returns SMA(20) shifted forwards by 5 candles
 * shift(sma(close, 20), 5);
 *
 *
 * // returns a series which equals
 * // "change in close since previous candle"
 * sub(
 * 	close,
 * 	shift(close, 1)
 * );
 *
 *
 * // returns a series which equals
 * // "change% since 3 candles ago"
 * div(
 * 	sub(
 *   	close,
 *   	shift(close, 3)
 * 	),
 * 	shift(close, 3)
 * );
 */
declare function shift(series: series, offset: number): series;

/**
 * Builds a new series by running a given operation over a given set of series. Use it
 * whenever you need to apply non-uniform operations to a number of series (means when action for
 * every candle depends on certain per-candle conditions). Last argument of this function is a callback
 * (yet another function) which will be calculated "once per candle".
 *
 * @name for_every
 * @function
 *
 * @param {series} series1 - series which you want being a source
 * @param {...series} series - more of series, as many as you need (optional)
 * @param {callback} operation - operation to run for every element of your input series; signature is `(series1Value, series2Value, ..., prevOperationValue, index)`
 * @returns {series} Resulting series
 *
 * @example
 * // calculates (O + C) / 2
 * // equivalent of "div(add(close, open), 2)"
 * for_every(close, open, (c, o) => (c + o) / 2);
 *
 *
 * // calculates "highest of candle's body points"
 * // equivalent of "max_of(close, open)"
 * for_every(close, open, (c, o) => Math.max(c, o));
 *
 *
 * // calculates (H + L + C) / 3
 * for_every(close, open, high, (c, o, h) => (c + o + h) / 3);
 *
 *
 * // builds "on balance volume" indicator
 * for_every(close, open, volume, (c, o, v, prevValue) => {
 *	if (c > o) {
 * 		return prevValue + v;
 * 	}
 * 	else {
 * 		return prevValue - v;
 * 	}
 * });
 *
 */
declare function for_every(series1: series, series: series, operation: callback): series;

/**
 * Declares various meta-information related to this indicator (like indicator name, amount of decimal points e.t.c.). You should start ny indicator from this call.
 *
 * @function describe_indicator
 *
 * @param {string} name - Human-friendly title of an indicator
 * @param {string} [type=price] - Defines where this indicator should be located. Supported values are: `lower` and `price`
 * @param {object} metainfo - Object which defines arbitrary other properties for an indicator.
 *
 * @param {number|string} [metainfo.decimals=by_symbol+1] - Defines precision of the indicator's lines in the chart key and on chart axis.
 * Does not impact precision of actual computations.
 * Supported values are: an integer (number of decimals) or a string, `by_symbol` (same precision with the current symbol) or `by_symbol_+1` (the precision of the current symbol plus one decimal)
 *
 * @param {string} metainfo.shortName - A shorter version of the indicator's name, used in various places in the platform (in the script editor for example)
 *
 * @param {string} metainfo.mainColorInheritFrom - Name of a line which color will define the indicator’s title color in the chart key and Manage indicators dialog. By default, it will use
 * color of the first line you've painted.
 *
 * @param {string} metainfo.isAnchored - Boolean, indicates whether this indicator is anchored. Setting that does not impact the math, but places your indicator into the on-chart context menu.
 *
 * @return {undefined}
 *
 * @example
 * describe_indicator('ATR Percent', 'lower', { decimals: 2 });
 */
declare function describe_indicator(name: string, type?: string, metainfo: { decimals?: (number|string), shortName: string, mainColorInheritFrom: string, isAnchored: string }): undefined;

/**
 * Declares an input parameter editable by a user via the user interface. There is one reserved input
 * name, `offset`: in case if you have that, all of your indicator's lines will be shifted forwards by the engine
 * under the hood.
 *
 * For those seeking boolean input, the following example demonstrates the use of the input function to create
 * a dropdown menu with 'Yes' and 'No' options. The default selection is 'Yes,' and the resulting variable (booleanValue) is assigned a
 * boolean value based on the user's selection: `const booleanValue = input('Do a barrel roll?', 'Yes', ['Yes', 'No']); == 'Yes'`
 *
 * @function input
 * @param {string} title - Human-friendly name of an input parameter
 * @param {number} [defaultValue=0] - Default value for this input parameter
 * @param {array|object} [inputOptions=null] - For numeric inputs, this one can be an object like `{max, min}`. For "select an option"
 * kind of inputs it should be array of options selectable.
 *
 * @returns {number|string} value of a given input parameter (either specified by customer or a default)
 *
 * @example
 * // gives user a way for editing your MA length via the user interface
 * const myMALength = input('Length', 20);
 * paint(sma(close, myMALength));
 *
 * // limiting max and min values
 * const myMALength = input('Length', 20, { min: 2, max: 100 });
 *
 * // "select an option" kind of an input
 * const maType = input('MA type', 'sma', ['sma', 'ema']);
 *
 * // illustrates using offsets
 * input('offset', 5);
 * input('line2__offset', 30);
 * paint(sma(close, 20));
 * paint(sma(close, 50), { name: 'line2' });
 */
declare function input(title: string, defaultValue?: number, inputOptions?: (array|Object)): (number|string);

/**
 * Calling this function does 3 things:
 *
 *
 * 1. declares your indicator as "good for anchoring", both manual and automated. also adds your indicator to the on-chart right click menu.
 * 2. creates all the relevant input parameters for you (in the UI, you're not supposed to deal with them in your code)
 * 3. returns either `null` (if no points found) or an object like `{ candleIndex }`
 *
 * @function input_anchor
 *
 * @param {string} [defaultValue='highest high'] - Default value for the anchoring type. Options supproted: `date`, `highest vol.`, `highest high`, `lowest low`,
 * `day to date`,`week to date`,`month to date`,`qtr to date`,`year to date`
 * @param {number} [defaultWindowSize=20] - Default value for the window size parameter.
 *
 * @returns {object|null} either `null` or an object like `{ candleIndex }`
 *
 * @example
 * // paints a horizontal line equal to "open" of the last day on the chart
 * const firstCandleOfDay = input_anchor('day to date');
 * const valueToPaint = firstCandleOfDay ? open[firstCandleOfDay.candleIndex] : null;
 * paint(series_of(valueToPaint));
 */
declare function input_anchor(defaultValue?: string, defaultWindowSize?: number): (Object|null);

/**
 * Gives you access to 3rd party NPM packages. You can use any package from our white list.
 * Whitelisted libraries are: `jstat` (https://jstat.github.io), `fft-js` (https://www.npmjs.com/package/fft-js), `tinycolor2` (https://www.npmjs.com/package/tinycolor2),
 * `binary-search-bounds` (https://www.npmjs.com/package/binary-search-bounds), `moment-timezone` (https://www.npmjs.com/package/moment-timezone)
 *
 * @function library
 *
 * @param {string} name - Name of a package. See our package white list for reference.
 * @returns {object} Reference to an NPM package. Read their docs and use at your own risk.
 *
 * @example
 * // calculate median High value (of last 5 values)
 * // using package "jstat" https://jstat.github.io
 * const jstat = library('jstat');
 * paint(sliding_window_function(high, 5, values => jstat.median(values)));
 */
declare function library(name: string): Object;

/**
 * Paints a given series on your chart, using color and style provided. Any execution of your indicator on any chart or asset
 * should always have the same amount of `paint()` calls executed, unless you throw an error.
 *
 * If you call `paint()` within any kind of conditional logic, then you should make sure that
 * `paint()` with the same "series name" is called in your `else` blocks as well. Consider using
 * `constants.empty_series` wherever necessary. Also, as a rule of a thumb, never call `paint()` in loops, unless
 * the amount of steps in your loop is a hard-coded constant.
 *
 * You can also pass all the attributes of a line (except of the data points) using an object. Like, `paint(close, { style: 'dotted' })`. You should prefer that way
 * since it's the way we'll be evolving the most.
 *
 * Refer to the dedicated page "Painting Indicators" in the docs to learn more about painting different types of series and custom properties
 * which are only applicable to certain series types.
 *
 * @function paint
 *
 * @param {series} series Series
 * @param {string} [name=autogenerated name] - Title for a line, optional. Default: autogenerated
 * @param {string | series} [color=random color] - Color for a line. If it's a string then it should be a valind HTML color, like `red` or `#ff0de1`
 * (defaults to 'random color'). If it's a series, then it should have every element obeying the same rule.
 * @param {string} [style=line] - Style for this series. Must be a string; supported values are: `line`, `histogram` (obsolete), `column`,
 * `stacked_histogram` (obsolete), `stacked_column`, `dotted`, `ladder`, `labels_above`, `labels_below`, `area`, `arearange`, `columnrange`, `candles`, `boxplot`, `bubble`.
 * @param {number} [thickness=1] - Width of a line, in pixels. This value is not practically limited.
 * @param {boolean} [hidden=false] - Ensures this line won't be visually painted. Default: false. Useful when you need a `line_ref` but want no line actually visible.
 * @param {boolean} [ignoreWhenScaling=false] - If set to true, then the line painted won't extend the chart's Y axis range in the auto-scaling mode.
 * @returns {line_ref} Reference to a line painted
 *
 * @example
 * // paints SMA(20) named "my line", of a red color
 * paint(sma(close, 20), "my line", "red");
 *
 *
 * // paints SMA(50) named "my line", of a blue color, as a thick line (5px wide)
 * paint(sma(close, 20), "my line", "red", 5);
 *
 *
 * // paints "distance from high to low" as a blue histogram
 * paint(sub(high, low), "my line", "blue", "histogram");
 *
 *
 * // paints "distance from close to open" as a histogram which is green
 * // for positive values and red otherwise
 * paint(
 *   sub(close, open),
 *   "my line",
 *   for_every(close, open, (h, l) => h > l ? "green" : "red"),
 *   "histogram"
 * );
 *
 *
 * // you also can pass an object with parameters if you want
 * // named arguments
 * paint(high, {
 *   name: 'My line 11',
 *   color: 'red',
 *   style: 'dotted',
 *   thickness: 2
 * });
 */
declare function paint(series: series, name?: string, color?: (string|series), style?: string, thickness?: number, hidden?: boolean, ignoreWhenScaling?: boolean): line_ref;

/**
 * Assigns custom colors to candles on the chart. Does not work for Line charts. Calling this function makes your indicator
 * not applicable to the secondary time frame in MTFA mode.
 *
 * @function color_candles
 *
 * @param {series} colors - Series containing color for every candle. Can contain `null` values.
 * @returns {undefined} nothing
 *
 * @example
 * // colors "raising" candles in blue and "falling" candles in orange
 * const colors = for_every(open, close, (o, c) => o > c ? 'orange' : 'blue');
 * color_candles(colors);
 */
declare function color_candles(colors: series): undefined;

/**
 * Fills the area between 2 lines provided. This function operates with 1 color only; if you want
 * dynamic colors, or if you don't want border lines painted then use `color_cloud()`.
 *
 * @function fill
 *
 * @param {line_ref} seriesId1 - First line (result of calling paint())
 * @param {line_ref} seriesId2 - Second line (result of calling paint())
 * @param {string} [color=red] - Color to use when filling.
 * @param {number} [opacity=0.33] - Opacity for your band; ranges from `0` to `1`.
 * @param {string} [title=fill] - Title
 * @returns {undefined} Nothing
 *
 * @example
 * // fills the area between 2 SMAs
 * fill(
 *   paint(sma(close, 20)),
 *   paint(sma(close, 50)),
 *   'blue'
 * );
 *
 * // does the same, but uses references
 * const short = paint(sma(close, 20));
 * const long = paint(sma(close, 50));
 * fill(short, long, 'red', 0.1);
 *
 */
declare function fill(seriesId1: line_ref, seriesId2: line_ref, color?: string, opacity?: number, title?: string): undefined;

/**
 * Fills missing points in your sparse time series using a select method of interpolation. Think of it
 * as of "generating a polyline from a set of points". Sparse series is a series which has a mix of `null` and
 * actual numbers.
 *
 * @function interpolate_sparse_series
 *
 * @param {series} series - sparse series you want filled.
 * @param {string} mode - the way you want your series interpolated. the values supported are `linear` and `constant`.
 * `linear` basically draws a line between each 2 non-null points. `constant` interpolates each left point as a horizontal line.
 * @returns {series} resulting series where internal blank points are filled
 *
 * @example
 * console.log(interpolate_sparse_series([1, null, null, 4, null, 10, null]));
 * // returns [1, 2, 3, 4, 7, 10, null]
 *
 * // paints polyline connecting Williams Fractals Highs
 * const fHighs = fractal_high(high, 5);
 * paint(interpolate_sparse_series(fHighs), { thickness: 3 });
 */
declare function interpolate_sparse_series(series: series, mode: string): series;

/**
 * Filters empty points out from a sparse series (like Williams Fractals).
 * Generates a list of non-empty points, formatted as `{ value, candleIndex }`.
 *
 * @function indexed_points_of
 *
 * @param {series} series - sparse series you want filled.
 * @returns {array} Array of points. Not a valid time series.
 *
 * @example
 * console.log(indexed_points_of([null, null, 1, null, 2, null]))
 * // returns [{ value: 1, candleIndex: 2 }, { value: 2, candleIndex: 4 }]
 *
 *
 * // builds anchored vwap from the last fractal high
 * const fHighs = indexed_points_of(fractal_high(high, 5))
 *
 * if (fHighs.length > 0) {
 *   // on some charts, you simply do not have even 1 Fractal point
 * 	lastFHigh = fHighs[fHighs.length - 1]
 * 	paint(vwap(lastFHigh.candleIndex))
 * }
 */
declare function indexed_points_of(series: series): array;

/**
 * Lands points of one time series onto another time series. Returns a sparse series as a result. Use this function whenever you need to
 * put values of one time series (i.e., News data) onto points of a time series of a different resolution (i.e., your current time frame candles).
 *
 * All the time arrays passed to this functions must be sorted.
 *
 * @function land_points_onto_series
 *
 * @param {series} sourceTimestamps - series of time stamps of the original data points.
 * @param {series} sourceValues - series of content of the original data points.
 * @param {series} targetTimestamps - series of time stamps of the target time stamps.
 * @param {string} [method=eq] - defines how time stamps would be matched. supports a few values.
 * `eq` demands a strict match of time stamps.
 * `gt` lands the source point to a first time stamp which greater than the original point's time stamp.
 * `ge` lands the source point to a first time stamp which greater or equal to the original point's time stamp.
 * `lt` lands the source point to a first time stamp which less than the original point's time stamp.
 * `le` lands the source point to a first time stamp which less or equal to the original point's time stamp.
 *
 * @param {function} [merge=nothing] - method which should be used whenever a point lands onto a position which already has
 * another point landed. format is `(existingPointValue, newPointValue) => resultingPointValue`. this argument is null by default,
 * which means that multiple points landing onto the same candle will overwrite each other.
 *
 * @returns {series} Sparse series which contains data points which has had a valid time stamp match.
 *
 * @example
 * const weeeklyData = await request.history(constants.ticker, 'W');
 * const weeklyLanded = land_points_onto_series(weeeklyData.time, weeeklyData.close, time);
 * paint(interpolate_sparse_series(weeklyLanded, 'constant'), { style: 'ladder' });
 */
declare function land_points_onto_series(sourceTimestamps: series, sourceValues: series, targetTimestamps: series, method?: string, merge?: (() => any)): series;

/**
 * Cuts a portion of elements away from a given series (by filling them with `null`).
 *
 * @function cut_series
 *
 * @param {series} series - Series which you want being a source
 * @param {number} fromIndex - index of an element you want to start from. Obligate. If it's negative, then it counts "from the end of array"
 * @param {number} toIndex - index of an element you want to end at. Optional, defaults to "last element"
 *
 * @returns {series} Series
 *
 * @example
 * // paints SMA which has last 10 points "trimmed out"
 * paint(
 *   cut_series(sma(close, 20), -10)
 * );
 */
declare function cut_series(series: series, fromIndex: number, toIndex: number): series;

/**
 * Builds a straight line originating at point A and going through point B.
 * Can extend it to the right if you want.
 *
 * @function line
 *
 * @param {number} fromIndex - Index of a candle where the line starts (point A)
 * @param {number} fromPrice - Y coordinate for point A
 * @param {number} toIndex - Index of a candle for point B
 * @param {number} toPrice - Y coordinate for point B
 * @param {boolean} [extendRight=true] - whether this line should be a ray (extended to the right) or a segment.
 *
 * @returns {series} Resulting series
 *
 * @example
 * // paints a line connecting 2 points
 * paint(line(
 *   0,    // index of a candle where this lien starts from
 *   100,  // price where this line starts from
 *   50,   // index of a candle which is a "second point" of this line
 *   120   // price where this line goes to (at a "second point")
 * ), { color: 'red' });
 *
 *
 * // paints a ray connecting last 2 of Fractal Highs
 * const fHighs = fractal_high(high, 15);
 * const lastFHighs = indexed_points_of(fHighs).slice(-2);
 *
 * if (lastFHighs.length == 2) {
 *   // on some charts, you simply do not have 2 fractals!
 *   paint(line(
 *     lastFHighs[0].candleIndex,
 *     lastFHighs[0].value,
 *     lastFHighs[1].candleIndex,
 *     lastFHighs[1].value
 *   ));
 * }
 */
declare function line(fromIndex: number, fromPrice: number, toIndex: number, toPrice: number, extendRight?: boolean): series;

/**
 * Returns human-friendly numbers (like minutes, hours, date e.t.c.) from a Unix time stamp.
 * Uses the time zone of an exchange for the current ticker.
 *
 * @name time_of
 * @function
 *
 * @param {number} timestamp - Unix timestamp
 * @returns {time} time - object with a set of properties (see below)
 *
 * @example
 * // parses a given time stamp (which stands for `Jan 20th 2022 14:10 NY`)
 * time_of(1642705800);
 *
 * // returns the following: {
 * //    minutes: 10,
 * //    hours: 14,            // hours, as of the exchange time zone
 * //    dayOfWeek: 4,         // ISO; this 1 for Monday, 2 for Tuesday, ..., 7 for Sunday
 * //    dayOfMonth: 20,
 * //    dayOfYear: 20,
 * //    weekOfYear: 3,        // ISO week of a year
 * //    quarter: 1,           // 1 to 4
 * //    month: 0,             // 0 for Jan, to 11 for Dec
 * //    year: 2022
 * // }
 *
 */
declare function time_of(timestamp: number): time;

/**
 * [DEPRECATED, use `bar_at` instead] Returns human-friendly numbers related to a period of a candle which contains a given Unix time stamp.
 *
 * @name session_of
 * @function
 * @deprecated
 *
 * @param {number} timestamp - Unix timestamp
 * @returns {object} object with the human-friendly session and the timestamp of the session start, `{session: string, sessionStartsAt: timestamp}`
 *
 * @example
 * session_of(1642705800);
 *
 * // returns the following: {
 * //    session: "20/01/2022" // day of the corresponding trading session
 * // }
 *
 */
declare function session_of(timestamp: number): Object;

/**
 * Returns the difference (in minutes, hours, days e.t.c.) of two Unix timestamps.
 *
 * @name time_difference
 * @function
 *
 * @param {number} fromTimestamp - The first timestamp in seconds
 * @param {number} toTimestamp - The second timestamp in seconds
 * @returns {time} time - object with a set of properties (see below)
 *
 * @example
 * // Computes the time difference between two time stamps,
 * // from Thursday, 20 January 2022 19:10:00, to Tuesday, 26 April 2022 12:31:40
 * time_difference(1642705800, 1650976300);
 *
 * // returns the following: {
 * //	seconds: 8270500.00,
 * //	minutes: 137841.67,
 * //	hours: 2297.36,
 * //	days: 95.72,
 * //	weeks: 13.67,
 * //	months: 3.14,
 * //	years: 0.26
 * // }
 *
 */
declare function time_difference(fromTimestamp: number, toTimestamp: number): time;

/**
 * Returns chart data for a given ticker, resolution and a set of options. Options are like `{ chart_type: string, ext_session: boolean, land_onto_current_candles: boolean }`,
 * supported `chart_type` values are `rainfall`, `candles` and `heikinashi`.
 *
 * Returns `{time, open, high, low, close, volume }`, each property is a series.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 * There's a limit for how many calls like that can be done in one script. Please refer to the "Limitations" section of the docs.
 *
 * In case if you want to paint this data or its derivatives, consider passing the 'land_onto_current_candles' parameter or using the `land_points_onto_series()` function.
 *
 * @name "request.history"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker to request
 * @param {string|number} resolution - Resolution to request. I.e., `30`, `D` or `W`
 * @param {object} options - request options, `{ chart_type: string, ext_session: boolean, land_onto_current_candles: boolean }`
 * @returns {promise} promise which resolves into an object containing historical data
 *
 * @example
 * // paints a line illustrating previous week close
 * const weeklyData = await request.history(constants.ticker, 'W');
 * const prevWeekClose = weeklyData.close[weeklyData.close.length - 2];
 *
 * paint(horizontal_line(prevWeekClose));
 *
 */
declare function "request.history"(ticker: string, resolution: (string|number), options: Object): promise;

/**
 * Namespace which includes a set of indicators.
 * Use it in combination with `input()` if you need to use a dynamically configurable indicator function.
 * It contains the moving average indicators, whose names can be found in constants.ma_types.
 * Additionaly it contains the following indicators: avg, highest, lowest, sum, momentum, stdev, fractal_high, fractal_low, vwap, atr, stochastic, psar, vortex, rsi, seqcount and cmo
 *
 * @name indicators
 * @kind namespace
 *
 * @example
 * // paints the user defined MA
 * const maType = input('MA type', 'sma', constants.ma_types);
 * const length = input('Length', 14, { min: 2, max: 50 });
 *
 * // get a reference to the MA math, according to user's choice in maType input
 * const computeMA = indicators[maType];
 * paint(computeMA(close, length))
 *
 */
declare module indicators {
}

/**
 * Current Unix time stamp.
 *
 * @const "constants.now"
 * @type {number}
 */
declare const "constants.now": number;

/**
 * Resolution of a chart this script is currently running on. Example: `15` for 15 min chart, `60` for 1 hour chart, `D` for daily e.t.c.
 *
 * @const "constants.resolution"
 * @type {string}
 */
declare const "constants.resolution": string;

/**
 * Type of a chart this script is currently running on. Supported values are
 * `line`, `bars`, `candles`, `hollowcandles`, `rainfall`, `heikinashi`
 *
 * @const "constants.chart_type"
 * @type {string}
 */
declare const "constants.chart_type": string;

/**
 * Decimals of the symbol this script is currently running on. I.e. `2`
 *
 * @const "constants.decimals"
 * @type {number}
 */
declare const "constants.decimals": number;

/**
 * The symbol this script is currently running on. I.e., `AAPL`
 *
 * @const "constants.ticker"
 * @type {string}
 */
declare const "constants.ticker": string;

/**
 * Definition of a trading session for the current asset, `{ timezone, start: { hours, minutes }, end: { hours, minutes }, lengthMinutes, marketDays: [] }`
 *
 * @const "constants.session"
 * @type {object}
 */
declare const "constants.session": Object;

/**
 * Definition of an extended hours trading session for the current asset. See `session` for explanation of a structure. Equals to a
 * non-extended session for the asset types which don't have an actual extended session.
 *
 * @const "constants.ext_session"
 * @type {object}
 */
declare const "constants.ext_session": Object;

/**
 * Definition of a pre-market trading session for the current asset. See `session` for explanation of a structure. Only exists for asset types which can have pre-market trading.
 *
 * @const "constants.ext_session_premarket"
 * @type {object}
 */
declare const "constants.ext_session_premarket": Object;

/**
 * Definition of a post-market trading session for the current asset. See `session` for explanation of a structure. Only exists for asset types which can have post-market trading.
 *
 * @const "constants.ext_session_postmarket"
 * @type {object}
 */
declare const "constants.ext_session_postmarket": Object;

/**
 * Series which has all its values being `null`. Useful for conditional painting.
 *
 * @const "constants.empty_series"
 * @type {series}
 */
declare const "constants.empty_series": series;

/**
 * Array of options used for "price source" in UI. Includes all the options
 * available for custom scripting. Use it in your `input()` calls.
 *
 * @const "constants.price_source_options"
 * @type {string[]}
 */
declare const "constants.price_source_options": string[];

/**
 * Array of time frames supported
 *
 * @const "constants.time_frames"
 * @type {string[]}
 */
declare const "constants.time_frames": string[];

/**
 * Array of options used for "MA type" in UI. Includes all types of MAs existing
 * available in custom scripting. Use it in your `input()` calls.
 *
 * @const "constants.ma_types"
 * @type {string[]}
 */
declare const "constants.ma_types": string[];

/**
 * Array of band types supported by the `compute_band` function.
 *
 * @const "constants.band_types"
 * @type {string[]}
 */
declare const "constants.band_types": string[];

/**
 * Set of UTF8 icons which you might want to use in yout scripts. Keys are:
 * `arrow_up`,`arrow_up_diagonal`,`arrow_down`,`arrow_down_diagonal`,`triangle_up`,`triangle_down`,`diamond`,`circle`,`square`,`star`,`sun`,`flag`
 *
 * @const "constants.icons"
 * @type {object}
 */
declare const "constants.icons": Object;

/**
 * Returns human-friendly numbers related to a period of a candle which contains a given Unix time stamp.
 * By default, this function assumes Daily time frame (see the `resolution` parameter) which effectively gives you
 * a way for identofying "which trading session does `timestamp` belong to".
 * Uses the time zone of an exchange for the current ticker, unless `session_definition` provided.
 *
 * @name bar_at
 * @function
 *
 * @param {number} timestamp - Unix timestamp
 * @param {string} [resolution = D] - Session resolution. You will get a time stamp of a corresponding candle starting point.
 * @param {object} [session_definition = constants.ext_session] - Session definition to use
 * @param {string} [format = DD/MM/YYYY] - Format of time to return
 * @returns {object} object with the human-friendly session and the timestamp of the session start, `{session: string, sessionStartsAt: timestamp}`
 *
 * @example
 * bar_at(1642705800);
 *
 * // returns the following: {
 * //    session: "20/01/2022" // day of the corresponding trading session
 * // }
 *
 */
declare function bar_at(timestamp: number, resolution?: string, session_definition?: Object, format?: string): Object;

/**
 * Returns Pivot highs for a given series.
 * A Pivot high is an element of the series whose value is higher than the values of the leftLength elements before it
 * and the rightLength elements after it. It generates sparse series as its output; this series contains
 * `null` for every candle which has no Pivot point, and contains the input series value for candles which do
 * have a Pivot point.
 * Do remember that some charts can contain zero Pivot points, in which case you will receive a series full of `null`.
 *
 * @name pivot_high
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number} leftLength - The left length.
 * @param {number} rightLength - The right length.
 * @returns {series} Resulting series, one value per input series value:
 * either `null` (if there's no Pivot at a given index) or a value of the original series
 * (if there's a Pivot here).
 *
 * @example
 * // paints Pivot High points
 * paint(pivot_high(high, 10, 15), { style: 'dotted', thickness: 10 })
 */
declare function pivot_high(series: series, leftLength: number, rightLength: number): series;

/**
 * Returns Pivot lows for a given series.
 * A Pivot low is an element of the series whose value is lower than the values of the leftLength elements before it
 * and the rightLength elements after it. It generates sparse series as its output; this series contains
 * `null` for every candle which has no Pivot point, and contains the input series value for candles which do
 * have a Pivot point.
 * Do remember that some charts can contain zero Pivot points, in which case you will receive a series full of `null`.
 *
 * @name pivot_low
 * @function
 *
 * @param {series} series - Series which you want being a source
 * @param {number} leftLength - The left length.
 * @param {number} rightLength - The right length.
 * @returns {series} Resulting series, one value per input series value:
 * either `null` (if there's no Pivot at a given index) or a value of the original series
 * (if there's a Pivot here).
 *
 * @example
 * // paints Pivot Low points
 * paint(pivot_low(low, 10, 15), { style: 'dotted', thickness: 10 })
 */
declare function pivot_low(series: series, leftLength: number, rightLength: number): series;

/**
 * Returns dividend records for a given ticker. Returns `{ error }` or `[{amount, type, timestamp, dividend_yield}]`.
 * Data can be delayed up to 1 day.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.dividends"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker to request
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * [
 * 	{amount: 2.055, type: 'declaration', timestamp: 1571664600, dividend_yield: 2.39},
 * 	{amount: 2.055, type: 'ex-date', timestamp: 1573137000, dividend_yield: 2.39}
 * ]
 */
declare function "request.dividends"(ticker: string): promise;

/**
 * Returns earnings records for a given ticker, including anticipated events.
 * Returns `{ error }` or `[{accounting_method, change, eps, eps_surprise_percent, false, isFuture, period, period_year, timestamp, when}]`.
 * Data can be delayed up to 1 day.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.earnings"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker to request
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * [
 *	{ "timestamp": 1674655200, "isFuture": false, "when": "premarket", "change": -77.24, "eps": -1.75, "eps_surprise_percent": -773.08, "period": "Q4", "period_year": 2022, "accounting_method": "adj" },
 * 	{ "timestamp": 1682514000, "isFuture": true, "when": "premarket", "eps": null, "period": "Q1", "period_year": 2023, "accounting_method": "adj_dil" }
 * ]
 */
declare function "request.earnings"(ticker: string): promise;

/**
 * Returns split records for a given ticker, including anticipated events.
 * Data can be delayed up to 1 day.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.splits"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker to request
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * [{
 * 	"toFactor": 1,
 * 	"forFactor": 5,
 * 	"direction": "split",	//	split | rev.split"
 * 	"type": "declaration",
 * 	"timestamp": 1597152600
 * }]
 */
declare function "request.splits"(ticker: string): promise;

/**
 * Returns news records for a given ticker. Returns `{ error }` or `[{author, daysAgo, teaser, timestamp, title, url}]`.
 * Data can be delayed up to 5 min. Returns last 100 records.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.news"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker to request
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * [{
 * 	"timestamp": 1678205172,
 * 	"daysAgo": 72,
 * 	"author": "Akanksha Bakshi",
 * 	"title": "NTSB & FAA Probe String Of Recent Runway Incidents: Report",
 * 	"teaser": "U.S. aviation authorities reportedly probe a fresh incident involving two airplanes cleared <...>.",
 * 	"url": "https://www.benzinga.com/government/23/03/31235579/ntsb-faa-probe-string-of-recent-runway-incidents-report"
 * }]
 */
declare function "request.news"(ticker: string): promise;

/**
 * Returns retail trading activity data for a given ticker. Returns `{ error }` or `[[date, value]]`. `value` is percentage of retail traders
 * activity in the overall daily trading activity on a given ticker.
 * This data contains one data point per day. Returns 3 years of data whenever applicable.
 * Data can be delayed up to 1 day.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.retail_trading"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker to request
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * [
 * 	//	format: [timestamp, value]
 * 	[1640235600, 0.49],
 * 	[1640581200, 0.52],
 * 	[1640667600, 0.66]
 * ]
 */
declare function "request.retail_trading"(ticker: string): promise;

/**
 * Returns Crypto Fear&Greed data. Returns `{ error }` or `[[date, value]]`. `value` is value of a Fear&Greed index at a given date.
 * This data contains one data point per day. Returns 3 years of data whenever applicable.
 * Data can be delayed up to 1 day.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.crypto_fear"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker to request
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * [
 * 	//	format: [timestamp, value]
 * 	[1648440000, 56],
 * 	[1648526400, 55],
 * 	[1648612800, 52]
 * ]
 */
declare function "request.crypto_fear"(ticker: string): promise;

/**
 * Returns Dark Pool volume data for a given ticker. Returns `{ error }` or `[[date, value]]`. `value` is the absolute value of volume traded over Dark Pool facilities.
 * This data contains one data point per week. Remember that our US stock data is Consolidated which does include Dark Pool as well.
 * Data can be delayed up to 2 weeks.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.dark_pool"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker to request
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * [
 * 	//	format: [timestamp, value]
 * 	[1627876800, 16373608],
 * 	[1628481600, 19319662],
 * 	[1629086400, 21240916]
 * ]
 */
declare function "request.dark_pool"(ticker: string): promise;

/**
 * Returns a list of analyst releases for given ticker. Returns `{ error }` or `{action analystCompany, analystPerson, ratingCurrent, ratingPrior, timestamp }`.
 * Data can be delayed up to 30 min.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.analyst_ratings"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker to request
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * [{
 *   "action": "downgrade",
 *   "analystCompany": "RBC Capital",
 *   "analystPerson": "Ken Herbert",
 *   "ratingCurrent": "hold",
 *   "ratingPrior": "buy",
 *   "timestamp": 1675418018
 * }]
 */
declare function "request.analyst_ratings"(ticker: string): promise;

/**
 * Returns a list of insider trades for given ticker, along with certain data on these insiders.
 * Returns `{ error }` or a complex object (see below).
 * Data can be delayed up to 1 day.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.insider_trading"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker to request
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * {
 * 	"insidersByCIK": {
 * 		"0001326109": {
 * 			"name": "Squeri Stephen J",
 * 			"role": {
 * 				"type": "director",
 * 				"title": "Director"
 * 			}
 * 		}
 * 	},
 *
 * 	//	format: { cik: amount_of_shares }
 * 	"ownershipByCIK": {
 * 		"0001326109": 82158
 * 	},
 * 	"transactions": [{
 * 		//	CIK of a corresponding insider
 * 		"insider": "0001477675",
 * 		"timestamp": 1677819600000,
 * 		"security": "stock",
 * 		"derivative": false,
 * 		"volume": 1500,
 * 		"netValue": null,
 * 		"action": "dispose",
 * 		"transaction": "gift"
 * 	}]
 * }
 */
declare function "request.insider_trading"(ticker: string): promise;

/**
 * Returns a given FRED series data. Returns `{ error }` or a complex record (see below).
 * Amount of data points per period depends on the series per se.
 * Data can be delayed up to 1 day.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.fred_series"
 * @function
 * @async
 *
 * @param {string} series_id - Full name of a FRED data series. I.e., `Unemployment Rate, UNRATE mo`. See a full list of options in our UI.
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 *
 * {
 * 	// array of all periods which are admitted to be
 * 	// recessions, as per https://www.nber.org/.
 *	// BEWARE: time stamps can be negative because there were recessions
 *	// prior to 1st Jan 1970, you nerd.
 *	"recessions": [{
 *		"start": 1580533200,
 *		"end": 1585713600
 *	}],
 *	"series": [
 * 		//	format: [timestamp, value]
 * 		[1656648000, 468000],
 * 		[1664596800, 467700]
 * 	]
 * }
 */
declare function "request.fred_series"(series_id: string): promise;

/**
 * Returns a given Breadth data series. Returns `{ error }` or a complex record (see below).
 * Contains 1 data point per day. Returns 3 years of data whenever applicable.
 * Data can be delayed up to 1 day.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.market_breadth"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker which you'll have "per-ticker behavior" for.
 * @param {string} data_type - upported: `ad_ratio`,`sma50`,`sma200`,`new_high_14`,`new_high_21`,`new_high_63`,`new_low_14`,`new_low_21`,`new_low_63`,`net_high_low_52w`.
 * @param {string} list_id - Id of a universe for this Breadth data. supported: `amexairlineindex`, `amexgoldbugsindex`, `amexoilindex`, `amexpharmaceuticalindex`, `djia30`, `dowjonescompositeindex`,
 * `dowjonestransportationave`, `kbwbanksector`, `nasd100`, `nasdaqbankindex`, `nasdaqfinancial100index`, `nasdaqinsuranceindex`, `nasdaqnmscompositeindex`,
 * `nasdaqtransportationindex`, `nysecompositeindex`, `philadelphiasegoldsilveri`, `phlxoilservicesector`, `russell2000index`, `sp100index`, `spx500`, `spmidcap400index`,
 * `spsmallcap600index`, `basicindustries`, `capitalgoods`, `consumerdurables`, `consumernondurables`, `energy`, `finance`, `healthcare`, `technology`, `transportation`,
 * `acquisitioncorp`, `agriculturalchemicals`, `aluminum`, `apparel`, `autopartsoem`, `automotiveaftermarket`, `biotechnologybiologicalpr`, `biotechnologycommercialph`,
 * `biotechnologyinvitroinviv`, `biotechnologylaboratoryan`, `biotechnologypharmaceutic`, `books`, `broadcasting`, `buildingmaterials`, `buildingoperators`,
 * `buildingproducts`, `businessservices`, `commercialbanks`, `computercommunicationsequ`, `computermanufacturing`, `computersoftwareprepackag`, `consumerelectronicsvideoc`,
 * `consumerspecialties`, `containerspackaging`, `departmentspecialtyretail`, `diversifiedcommercialserv`, `diversifiedfinancialservi`, `diversifiedmanufacture`,
 * `electricutilitiescentral`, `electricalproducts`, `electroniccomponents`, `electronicsdistribution`, `environmentalservices`, `farmingseedsmilling`, `financecompanies`,
 * `fluidcontrols`, `foodchains`, `fooddistributors`, `forestproducts`, `hospitalnursingmanagement`, `hotelsresorts`, `internetandinformationser`, `investmentmanagers`,
 * `lifeinsurance`, `majorbanks`, `majorchemicals`, `managedhealthcare`, `marinetransportation`, `meatpoultryfish`, `medicalspecialities`, `medicaldentalinstruments`,
 * `metalmining`, `militarygovernmenttechnic`, `miscellaneousmanufacturin`, `motorvehicles`, `moviesentertainment`, `multisectorcompanies`, `naturalgasdistribution`,
 * `officeequipmentsuppliesse`, `oilgasproduction`, `oilrefiningmarketing`, `oilfieldservicesequipment`, `ophthalmicgoods`, `ordnanceandaccessories`,
 * `othermetalsandminerals`, `packagegoodscosmetics`, `packagedfoods`, `paintscoatings`, `paper`, `plasticproducts`, `pollutioncontrolequipment`, `powergeneration`,
 * `preciousmetals`, `precisioninstruments`, `propertycasualtyinsurers`, `radioandtelevisionbroadca`, `railroads`, `realestate`, `recreationalproductstoys`, `restaurants`,
 * `retailbuildingmaterials`, `retailcomputersoftwareper`, `semiconductors`, `servicetothehealthindustr`, `servicesmiscamusementrecr`, `softdrinks`, `specialtychemicals`,
 * `steelironore`, `televisionservices`, `textiles`, `toolshardware`, `transportationservices`, `truckingfreightcourierser`, `watersewerpipelinecommpow`, `wholesaledistributors`
 *
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * const breadthData = await request.market_breadth(constants.ticker, 'ad_ratio', 'nasd100');
 *
 * {
 *	//	data explaining what a given ticker was doing
 * 	//	according to a given Breadth data type
 * 	tickerSeries: [{
 * 		timestamp: 1648647000,
 * 		//	1 in tickerSeries means "this date had been positive
 * 		//	for a given ticker and breadth data type". i.e., if
 * 		//	data_type=sma50 and value=1 then it means that this ticker
 * 		//	had been above SMA(50) at a given date.
 * 		value: 1
 * 	}],
 *
 * 	//	this is the market-wide ("market" defined by list_id)
 * 	//	Breadth series per se
 * 	mbSeries: [{
 * 		timestamp,
 * 		value
 * 	}]
 * }
 */
declare function "request.market_breadth"(ticker: string, data_type: string, list_id: string): promise;

/**
 * Returns short volume (FINRA Reg SHO) per ticker. Supports US equity only.
 * Data can be delayed up to 1 day. Returns 3 years of data whenever applicable.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.short_volume"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker which you'll have the data for.
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * [
 * 	//	format: [timestamp, value]
 * 	[1627876800, 16373608],
 * 	[1628481600, 19319662],
 * 	[1629086400, 21240916]
 * ]
 */
declare function "request.short_volume"(ticker: string): promise;

/**
 * Returns Unusual Options records for a given ticker.
 * Data can be delayed up to 5 min.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.unusual_options"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker which you'll have Unusual Options data for.
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * [{
 * 	"timestamp": 1679600940,
 * 	"costBasis": 42550,
 * 	"dealType": "SWEEP",
 * 	"assetPrice": 232.945,
 * 	"strike": 235,
 * 	"type": "PUT",
 * 	"oi": 231,
 * 	"moneyStatus": "ITM",
 * 	"expDate": 1686888000000,
 * 	"expDateFormatted": "16 Jun'23",
 * 	"daysToExp": 84,
 * 	"priceLocation": "not_implemented",
 * 	"size": 37,
 * 	"oiPercent": 16.02
 * }]
 */
declare function "request.unusual_options"(ticker: string): promise;

/**
 * Returns popularity (number of mentions per day) of a given ticker on Reddit (/r/wallstreetbets) over time.
 * Data can be delayed up to 1 day. Returns 3 years of data whenever applicable.
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.wallstreetbets"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker which you'll have the data for.
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 * [
 * 	//	format: [timestamp, value]
 * 	[1627876800, 10],
 * 	[1628481600, 15],
 * 	[1629086400, 98]
 * ]
 */
declare function "request.wallstreetbets"(ticker: string): promise;

/**
 * Returns Seasonality data for a given ticker. Returns raw data only (a collection of raw data points for each "season"), so if you only need a
 * summary like "in X% of cases this ticker was up in a month of Y" then you'd have to compute it.
 * You can have seasonality for different data points, change% (the conventional Seasonality) is only one of them.
 * `dataPoint=change` gives you seasonality of change%, which means that `.value` in data points will be equal to change% for a give period (last clsoe vs previous close).
 * `rvol` gives you seasonality of Relative Volume (time frame of this indicator depends on `granularity` you request).
 * `rsi` means seasonality for RSI. `mfi` is for Money Flow Index. `ma20` gives you Seasonality for "distance from close to SMA(20)".
 * `ma50` is the same but for SMA(50), `ma100` is for SMA(100).
 *
 * This is an asynchronous function, which means that it returns a Promise. You should use `await` to get the actual result.
 *
 * @name "request.seasonality"
 * @function
 * @async
 *
 * @param {string} ticker - Ticker which you'll have Unusual Options data for.
 * @param {string} granularity - Seasonality granularity. Supported values are: `monthly`, `day_of_week`, `week_of_year`, `time_of_day`.
 * @param {string} dataPoint - Data point to compute the seasonality for. Supported values are: `change`, `rvol`, `rsi`, `mfi`, `ma20`, `ma50`, `ma100`.
 *
 * @returns {promise} promise which resolves into the actual data
 *
 * @example
 *
 * {
 * 	"dataByCategory": {
 * 		//	for each seasonality period, you'll have all the raw data records listed here.
 * 		"Jan": [{
 * 			"timestamp": 1325455200,
 * 			//	value of the dataPoint you've requested. I.e, if your dataPoint is "rvol" then it will be
 * 			//	value of the relative volume indicator at the "timestamp".
 * 			"value": 0.7156241105484827
 * 		}]
 * 	},
 *
 * 	"type": "monthly",
 *
 * 	//	timestamp of the first data point used in this Seasonality data set
 * 	"sinceDate": 1079906400,
 * 	"dateFormat": "M",
 *
 * 	//	a list of seasonality periods
 * 	"categories": [
 * 		"Jan",
 * 		"Feb"
 * 	]
 * }
 */
declare function "request.seasonality"(ticker: string, granularity: string, dataPoint: string): promise;

/**
 * Time series (array of timestamps) containing "time" for every candle (as Unix time stamp)
 * @name time
 * @type {series}
 */
declare const time: series;

/**
 * Time series (array of values, with no timestamps) containing "open" for every candle. Open of the oldest
 * candle has index of 0, and Open of the most recent candle is the last element of this array.
 * @name open
 * @type {series}
 */
declare const open: series;

/**
 * Time series (array of values, with no timestamps) containing "high" for every candle
 * @name high
 * @type {series}
 */
declare const high: series;

/**
 * Time series (array of values, with no timestamps) containing "low" for every candle
 * @name low
 * @type {series}
 */
declare const low: series;

/**
 * Time series (array of values, with no timestamps) containing "close" for every candle
 * @name close
 * @type {series}
 */
declare const close: series;

/**
 * Time series (array of values, with no timestamps) containing "volume" for every candle
 * @name volume
 * @type {series}
 */
declare const volume: series;

/**
 * Time series (array of values, with no timestamps) containing `(High + Low) / 2` for every candle
 * @name hl2
 * @type {series}
 */
declare const hl2: series;

/**
 * Time series (array of values, with no timestamps) containing `(Open + Close) / 2` for every candle
 * @name oc2
 * @type {series}
 */
declare const oc2: series;

/**
 * Time series (array of values, with no timestamps) containing `(High + Low + Close) / 3` for every candle
 * @name hlc3
 * @type {series}
 */
declare const hlc3: series;

/**
 * Time series (array of values, with no timestamps) containing `(Open + High + Low + Close) / 4` for every candle
 * @name ohlc4
 * @type {series}
 */
declare const ohlc4: series;

/**
 * Time series (array of values, with no timestamps) containing weighted close prices, which equals to `(High + Low + Close * 2) / 4` for every candle
 * @name wclose
 * @type {series}
 */
declare const wclose: series;

/**
 * Time series (array of values, with no timestamps) containing the "body top", which equals to `max(Open, Close)` for every candle
 * @name body_top
 * @type {series}
 */
declare const body_top: series;

/**
 * Time series (array of values, with no timestamps) containing the "body bottom", which equals to `min(Open, Close)` for every candle
 * @name body_bottom
 * @type {series}
 */
declare const body_bottom: series;

/**
 * [DEPRECATED, use `market` instead] Namespace which includes all types of price action data. Contains `open`, `high`, `low`, `close`, `hl2`, `hlc3` e.t.c.
 * Use it in combination with `input()` if you need your price source configurable dynamically.
 *
 * @name prices
 * @kind namespace
 * @deprecated
 *
 * @example
 * // builds SMA(20) over a price action data points as defined by a user in UI
 * const myPriceSource = input('Price source', 'close', constants.price_source_options);
 * const price = prices[myPriceSource];
 * paint(sma(price, 20));
 */
declare module prices {
}

/**
 * Namespace which includes all types of price action data.
 * Use it in combination with `input()` if you need your price source configurable dynamically.
 * Includes the following: `open`, `high`, `low`, `close`, `hl2`, `oc2`, `hlc3`, `ohlc4`, `wclose`, `time`, `volume`.
 * Using `market.open` and `open` is equivalent.
 *
 * @name market
 * @kind namespace
 *
 * @example
 * // builds SMA(20) over a price action data points as defined by a user in UI
 * const myPriceSource = input('Price source', 'close', constants.price_source_options);
 * const price = market[myPriceSource];
 * paint(sma(price, 20));
 */
declare module market {
}

/**
 * Declares an number input parameter editable by a user via the user interface. There is one reserved input
 * name, `offset`: in case if you have that, all of your indicator's lines will be shifted forwards by the engine
 * under the hood.
 *
 * @name "input.number"
 * @param {string} title - Human-friendly name of an input parameter
 * @param {number} [defaultValue=0] - Default value for this input parameter
 * @param {object} [inputOptions=null] - This one can be an object like `{max, min}`.
 *
 * @returns {number} value of a given input parameter (either specified by customer or a default)
 *
 * @example
 * // number input with max and min values
 * const myMALength = input.number('Length', 20, { min: 2, max: 100 });
 *
 */
declare const "input.number": any;

/**
 * Declares a select input parameter editable by a user via the user interface.
 *
 * @name "input.select"
 * @param {string} title - Human-friendly name of an input parameter
 * @param {number|string} defaultValue - Default value for this input parameter
 * @param {array} inputOptions - The array of the options.
 *
 * @returns {number|string} value of a given input parameter (either specified by customer or a default)
 *
 * @example
 * // get the MA type from the list of the MA types from the user
 * const maType = input.select('Length', 'sma', ['sma', 'ema']);
 *
 */
declare const "input.select": any;

/**
 * Declares a symbol input parameter editable by a user via the user interface. In the Indicator Editor dialog
 * this looks like a full pledged Symbol Search box with autocompletion.
 *
 * @name "input.symbol"
 * @param {string} title - Human-friendly name of an input parameter
 * @param {string} [defaultValue=SPY] - Default value for this input parameter. Should be a valid symbol
 *
 * @returns {string} value of a given input parameter
 *
 * @example
 * // get a symbol name from the user
 * const symbolName = input.symbol('Symbol', 'AAPL');
 *
 */
declare const "input.symbol": any;

/**
 * Declares a color input parameter editable by a user via the user interface. Please remember that the vast majority
 * of entities painted by custom scripts will automatically have color selectors generated by the platform. I.e., if you
 * paint() an SMA then you'll have a color selector for this line even without using `input.color()`. Please only use
 * `input.color()` in cases when the platform does not give you a color selector automatically — in example, for coloring
 * lines dynamically.
 *
 * @name "input.color"
 * @param {string} title - Human-friendly name of an input parameter
 * @param {string} [defaultValue=black] - Default value for this input parameter. Can be a color name, HEX or rgba()
 *
 * @returns {string} value of a given input parameter
 *
 * @example
 * const above50 = input.color('Col1', 'red');
 * const below50 = input.color('Col2', 'blue');
 *
 * const rsiLine = rsi(close, 14);
 * const color = rsiLine.map(value => value > 50 ? above50 : below50);
 *
 * paint(rsiLine, { color });
 */
declare const "input.color": any;

/**
 * A synonym for `input_anchor()`. Refer to docs for `input_anchor()` to learn more.
 *
 * @name "input.anchor"
 */
declare const "input.anchor": any;

/**
 * Declares a boolean input parameter editable by a user via a checkbox in the user interface.
 *
 * @name "input.boolean"
 * @param {string} title - Human-friendly name of an input parameter
 * @param {boolean} [defaultValue=true] - Default value for this input parameter
 *
 * @returns {boolean} value of a given input parameter
 *
 * @example
 * // get a boolean value from the user
 * const doAnchorContinuously = input.boolean('Continuous?', true);
 *
 */
declare const "input.boolean": any;

/**
 * Fills the areas between two series.
 * Uses color1 when series1 is above series2 and color2 when series2 is above series1.
 * @function color_cloud
 *
 * @param {series} series1 - First series
 * @param {series} series2 - Second series
 * @param {string} color1 - Color to use when series1 is above series2
 * @param {string} color2 - Color to use when series2 is above series1
 * @param {string} name1 - The name of the area between series1 and series2 (optional)
 * @param {string} name2 - The name of the area between series2 and series1 (optional)
 * @param {number} opacity - Opacity of the areas; ranges from 0 to 1, defaults to 0.33 (optional)
 * @returns {undefined}
 *
 * @example
 * // fills the areas between 2 SMAs
 * color_cloud(
 *	sma(close, 10),
 *	sma(close, 20),
 *	'#2ca599',
 *	'#ee5451'
 * );
 *
 */
declare function color_cloud(series1: series, series2: series, color1: string, color2: string, name1: string, name2: string, opacity: number): undefined;

/**
 * Computes the upper and lower lines of a band around a given line.
 *
 * @name compute_band
 * @function
 *
 * @param {array} line - The line around which the band will be computed.
 * @param {string} [bandType=St.Dev.] - Type of the band. Supported values are `St.Dev.`, `Constant`, `ATR` and `Percentage`, which can also be found in `constants.band_types`.
 * @param {number} [multiplier=1] - A number by which the values of the chosen type are multiplied.
 * @param {number} [length=2] - Length of the indicators defined by the bandType.
 * @param {object} params - Parameters
 * @param {array} [params.percentageBasis=line] - The series of which the percentage will be used. The default value is the line (first argument).
 *
 * @returns {object} The lines of the band, in the form:  { upper: [], lower: [] }
 *
 * @example
 * // Bollinger Band using compute_band function
 * const core = sma(close, 20);
 * const bollingerBand = compute_band(core, 'St.Dev.', 2, 10);
 *
 * paint(core, 'core', 'black');
 *
 * fill(
 * 	paint(bollingerBand.upper, 'upper', 'blue'),
 * 	paint(bollingerBand.lower, 'lower', 'blue'),
 * 	'blue',
 * 	0.1
 * );
 *
 */
declare function compute_band(line: array, bandType?: string, multiplier?: number, length?: number, params: { percentageBasis?: array }): Object;

/**
 * Searches for broadening formations and returns the lines of the best one, if any, in the form: { top: [], bottom: [] }.
 *
 * @name find_broadening
 * @function
 *
 * @param {string} [timeSpan=short] - Broadening formation timespan. Supported values are 'long' and short'.
 * @param {string} [broadeningType=ascending] - Broadening formation type. Supported values are 'ascending', 'descending', 'symmetrical' and 'asymmetrical'.
 * @param {boolean} [rightAngled=false] - If true is selected, discards the patterns that do not have one horizontal line.
 *
 * @returns {object} The lines of the best broadening formation, if any, in the form: { top: [], bottom: [] }
 *
 * @example
 * const broadening = find_broadening('short', 'ascending');
 * paint(broadening.top);
 * paint(broadening.bottom);
 *
 */
declare function find_broadening(timeSpan?: string, broadeningType?: string, rightAngled?: boolean): Object;

/**
 * Searches for channel patterns and returns the lines of the best one, if any, in the form: { top: [], bottom: [] }.
 *
 * @name find_channel
 * @function
 *
 * @param {string} [timeSpan=short] - Channel timespan. Supported values are 'long' and 'short'.
 * @param {string} [channelType=ascending] - Channel type. Supported values are 'ascending', 'descending' and 'horizontal'.
 *
 * @returns {object} The lines of the best channel, if any, in the form: { top: [], bottom: [] }
 *
 * @example
 * const channel = find_channel('short', 'ascending');
 * paint(channel.top);
 * paint(channel.bottom);
 *
 */
declare function find_channel(timeSpan?: string, channelType?: string): Object;

/**
 * Searches for double top and double bottom patterns and returns the lines of the best one (if any),
 * the support line, the indexes of the patterns points, the peaks labels (Adam or Eve) and a boolean `inForce`, in the form:
 * `{ patternLine: [], supportLine: [], indexes: { patternStart, firstPeak, valleyFloor, secondPeak, patternLastIndex }, firstPeakLabel, secondPeakLabel, inForce}`.
 *
 * @name find_double_peak_formation
 * @function
 *
 * @param {string} [type=top] - Double peak type. Supported values are `'top'` and `'bottom'`, defaults to `'top'`
 * @param {string} [timeSpan=long term] - Double peak time span. Supported values are `'short term'` and `'long term'`, defaults to `'long term'`
 * @param {object} params - Parameters that overide the ones of the selected `timeSpan`
 * @param {number} params.maxDistance - The maximum allowable distance in candles between the tops/bottoms.
 * @param {number} params.minDistance - The minimum allowable distance in candles between the tops/bottoms.
 * @param {number} params.priceMaxDifferenceATR - The maximum allowable price difference between the tops/bottoms, expressed as a multiple of the ATR.
 * @param {number} params.priceMaxDifferencePercentage - The maximum allowable price difference between the tops/bottoms, expressed as a percentage.
 * @param {number} params.minStartValleyFloorDifference - The minimum allowable price difference between the start of the pattern and the valley floor, expressed as a multiple of the latest ATR.
 * @param {number} params.minValleyFloorPeakDifference - The minimum allowable price difference between the closest top and the valley floor, expressed as a multiple of the latest ATR.
 * @param {number} params.maxHalvesRatio - The maximum allowable (end - valley floor)/(valley floor - start)ratio.
 * @param {number} params.relevantAreaThreshold - The threshold outside 'valley floor - tops/bottoms' area, out of which the pattern is not considered relevant any more.
 * @param {number} params.zigzagDepth - The zigzag depth.
 * @param {number} params.zigzagDeviation - The zigzag deviation.
 * @param {number} params.zigzagBackstep - The zigzag back step.
 *
 * @returns {object} The lines of the latest pattern (if any), the support line, the indexes of the patterns points, the peaks labels (Adam or Eve) and a boolean `inForce`, in the form:
 * `{ patternLine: [], supportLine: [] , indexes: { patternStart, firstPeak, valleyFloor, secondPeak, patternLastIndex }, firstPeakLabel, secondPeakLabel, inForce }`.
 *
 * @example
 * // get the best double top pattern in the chart, whose tops price difference is lower than 2%
 * const doubleTopPattern = find_double_peak_formation('top', 'short term', { priceMaxDifferencePercentage: 2 });
 *
 * // paint the pattern line
 * paint(doubleTopPattern.patternLine);
 *
 * // paint the support line that starts at the valley floor
 * paint(doubleTopPattern.supportLine);
 *
 * // create a series which will be used for storing the top labels
 * const labels = series_of(null);
 *
 * // assign the top labels on the corresponding indexes in the labels array
 * labels[doubleTopPattern.indexes.firstPeak] = doubleTopPattern.firstPeakLabel;
 * labels[doubleTopPattern.indexes.secondPeak] = doubleTopPattern.secondPeakLabel;
 *
 * // paint the labels
 * paint(labels, 'top labels', 'black', 'labels_above');
 */
declare function find_double_peak_formation(type?: string, timeSpan?: string, params: { maxDistance: number, minDistance: number, priceMaxDifferenceATR: number, priceMaxDifferencePercentage: number, minStartValleyFloorDifference: number, minValleyFloorPeakDifference: number, maxHalvesRatio: number, relevantAreaThreshold: number, zigzagDepth: number, zigzagDeviation: number, zigzagBackstep: number }): Object;

/**
 * Searches for head and shoulders patterns and returns the lines of the best one (if any),
 * the neck line and the indexes of the patterns points, in the form:
 * `{ patternLine: [], neckLine: [], indexes: { start, leftShoulder, leftTrough, head, rightTrough, rightShoulder, end }}`.
 * The pattern is constructed using the zigzag points with the parameters given on this function.
 *
 * @name find_head_and_shoulders
 * @function
 *
 * @param {number} [depth=11] - Depth of the zigzag line
 * @param {number} [deviation=0.01] - Deviation of the zigzag line
 * @param {number} [backstep=2] - Back step of the zigzag line
 * @param {boolean} [inverse=false] - Set this parameter `true` if you want to find inverse head and shoulders
 * @param {number} [headHeight=0] - The multiple of the left leg range we want to be used as minimum for the head height.
 *
 * @returns {object} The lines of the latest pattern (if any), the neck line and the indexes of the pattern's points, in the form:
 * `{ patternLine: [], neckLine: [], indexes: { start, leftShoulder, leftTrough, head, rightTrough, rightShoulder, end }}`.
 *
 * @example
 * // get the best double head and shoulders in the chart
 * const headAndShouldersPattern = find_head_and_shoulders();
 *
 * // paint the pattern line
 * paint(headAndShouldersPattern.patternLine);
 *
 * // paint the neck line
 * paint(headAndShouldersPattern.neckLine);
 */
declare function find_head_and_shoulders(depth?: number, deviation?: number, backstep?: number, inverse?: boolean, headHeight?: number): Object;

/**
 * Identifies the best (strongest) trends as per your definition. Values acceptable in trend formula list are as follows (using 'hits.' followed by their abbreviations in the parentheses is also possible):
 * `hits.violations` (`v`), `hits.bounceDown` (`bd`), `hits.bounceUp` (`bu`), `hits.bounceDownCandles` (`bdc`), `hits.bounceUpCandles` (`buc`), `hits.bounceDownStrict` (`bds`), `hits.bounceUpStrict` (`bus`),
 * `hits.bounceDownStrictCandles` (`bdsc`), `hits.bounceUpStrictCandles` (`busc`), `hits.peaksDown` (`pd`), `hits.peaksUp` (`pu`), `hits.number` (`n`), `hits.percent` (`pc`), `hits.candlesAbove` (`ca`), `hits.candlesBelow` (`cb`),
 * `hits.maxConfirmatioinDistance` (`mcd`), `slopePecent`, `length` (`l`), `priceDeviation.p25th`, `priceDeviation.p50th`, `priceDeviation.p75th`, `linePointsBase`, `linePointsWeight`, `trendsAccumulated`
 *
 * @name find_trends
 * @function
 *
 * @param {array} trendBasePointsIndexes - defines candles which should serve as base points for your trends. Can be either array of indexes, or array of `{index, weight}`
 * @param {string} candleDataPointName - `high` or `low`, depending on your case
 * @param {string} formula - formula which defines "strength" for each of possible trend lines. See https://mathjs.org/docs/expressions/syntax.html for syntax rules
 * @param {number} [strongestTrendsPercentage=0.1] - percentage of strongest lines you'd want to have, 0..1. Optional.
 * @param {number} [atrLength=14] - trends engne uses ATR heavily, so it needs it in many places. Optional.
 * @param {string} [enableDebuggingForCategory=null] - name of category for which you want logs enabled. Optional.
 * @param {function} [discardTrendCallback] - a callback with first point and seccond point as parameters. It discards the lines if it returns true
 *
 * @returns {array} Array of trends [{ from, to, strength }]
 *
 * @example
 * // We will use williams fractal points as base points for our trends.
 * const fractalLows = fractal_low(low, 5);
 *
 * // Convert the resulting sparse series to a list of non-empty points.
 * // Since find_trends needs an index property for each basepoint, we add it here.
 * const basePoints = indexed_points_of(fractalLows).map(item => {
 * 	item.index = item.candleIndex;
 * 	return item;
 * });
 *
 * // Define a formula that maximizes the ratio of candles above by candles below the trendline.
 * // The resulting trends will be trends behaving as support lines.
 * const trendFormula = 'hits.candlesAbove / (hits.candlesBelow + 1)';
 *
 * // Compute a list of the best (according to the formula) 10% trendlines.
 * const trends = find_trends(
 * 	basePoints,
 * 	'low',
 * 	trendFormula,
 * 	0.1,
 * 	10
 * );
 *
 * // The resulting list is sorted from best to worst trendlines. Take the first/best trendline
 * const bestTrend = trends[0];
 *
 * // Compute the line from the indexes that define it
 * const trendLine = line(
 * 	bestTrend.from.index,
 * 	bestTrend.from.price,
 * 	bestTrend.to.index,
 * 	bestTrend.to.price
 * );
 *
 * paint(trendLine);
 *
 */
declare function find_trends(trendBasePointsIndexes: array, candleDataPointName: string, formula: string, strongestTrendsPercentage?: number, atrLength?: number, enableDebuggingForCategory?: string, discardTrendCallback?: (() => any)): array;

/**
 * Searches for triangle patterns and returns the lines of the best one, if any, in the form: { top: [], bottom: [] }.
 *
 * @name find_triangle
 * @function
 *
 * @param {string} [timeSpan=short] - Triangle timespan. Supported values are 'long' and short'.
 * @param {string} [triangleType=ascending] - Triangle type. Supported values are 'ascending', 'descending' and 'all'.
 *
 * @returns {object} The lines of the best triangle, if any, in the form: { top: [], bottom: [] }
 *
 * @example
 * const triangle = find_triangle('short', 'ascending');
 * paint(triangle.top);
 * paint(triangle.bottom);
 *
 */
declare function find_triangle(timeSpan?: string, triangleType?: string): Object;

/**
 * Searches for wedge patterns and returns the lines of the best one, if any, in the form: { top: [], bottom: [] }.
 *
 * @name find_wedge
 * @function
 *
 * @param {string} [timeSpan=short] - Wedge timespan. Supported values are 'long' and short'.
 * @param {string} [wedgeType=rising] - Wedge type. Supported values are 'rising' and 'falling'.
 * @param {boolean} [broadening=false] - If true is selected, it finds a broadening wedge.
 *
 * @returns {object} The lines of the best wedge, if any, in the form: { top: [], bottom: [] }
 *
 * @example
 * const wedge = find_wedge('short', 'rising');
 * paint(wedge.top);
 * paint(wedge.bottom);
 *
 */
declare function find_wedge(timeSpan?: string, wedgeType?: string, broadening?: boolean): Object;

/**
 * It computes the SuperTrend indicator.
 * @function supertrend
 *
 * @param {number} [length=14] - Length
 * @param {number} [multiplier=3] - Multiplier
 * @param {boolean} [useWicks=true]  - Use wicks
 * @returns {series}
 *
 * @example
 *
 * // Paint the SuperTrend
 * paint(supertrend(14, 3));
 *
 */
declare function supertrend(length?: number, multiplier?: number, useWicks?: boolean): series;

/**
 * It computes the Williams %R.
 * @function will_r
 *
 * @param {number} [period=14] - Period
 * @returns {series}
 *
 * @example
 * // It is a lower indicator
 * describe_indicator('Williams %R', 'lower');
 *
 * // Paint the Williams %R
 * paint(will_r(14));
 *
 */
declare function will_r(period?: number): series;

/**
 * Computes the Zig Zag points and returns their indexes, in the form: { highIndexes: [], lowIndexes: [] }.
 *
 * @name zigzag_points
 * @function
 *
 * @param {number} [depth=20] - Optional.
 * @param {number} [deviation=1] - Optional.
 * @param {number} [backstep=2] - Optional.
 * @param {series} [highValues='high'] - Optional.
 * @param {series} [lowValues='low'] - Optional.
 *
 * @returns {object} ZigZag points indexes, in the form: { highIndexes: [], lowIndexes: [] }
 *
 * @example
 *
 * // Get zig zag points with the default parameters
 * const zigZagPointsObject = zigzag_points();
 *
 * // Define the series in which we will merge the high and low zigzag points
 * const zigZagPoints = series_of(null);
 *
 * // Assign the high value in the indexes of high zig zag points
 * zigZagPointsObject.highIndexes.forEach(pointIndex => zigZagPoints[pointIndex] = high[pointIndex]);
 *
 * // Assign the low value in the indexes of low zig zag points
 * zigZagPointsObject.lowIndexes.forEach(pointIndex => zigZagPoints[pointIndex] = low[pointIndex]);
 *
 * // Connect the points with lines
 * const zigZagLine = interpolate_sparse_series(zigZagPoints);
 *
 * paint(zigZagLine);
 *
 */
declare function zigzag_points(depth?: number, deviation?: number, backstep?: number, highValues?: series, lowValues?: series): Object;

