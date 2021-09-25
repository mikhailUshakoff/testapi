import * as browser from "debot-browser";
import callback from "./callbackABI";

const convert = (from, to) => data => Buffer.from(data, from).toString(to)

const hexToUtf8 = convert('hex', 'utf8');
const utf8ToHex = convert('utf8', 'hex');
let debot = "0:e47e0efbd07d588e5bcf820221cd976527ddcc59b3a9760144a1ad72d5257ac9";

let buildManifest = (func, args) => {
    return `{
    "version": 0,
    "debotAddress": "${debot}",
    "initMethod": "${func}",
    "initArgs": ${args},
    "quiet": true,
    "chain": [],
    "abi": ${callback.abi}
}`;
};
let logger = document.getElementById("log");

function printOrderBook(orderBook) {
    logger.textContent += "\n\OrderBook\n";

    let ob = JSON.parse(orderBook);

    for (const deal of ob.orderBook){
        logger.textContent += `price: ${hexToUtf8(deal.price)} buyVolume: ${hexToUtf8(deal.buyVolume)} sellVolume: ${hexToUtf8(deal.sellVolume)}\n`;
    }
}

function printHistory(chart) {
    logger.textContent += "\n\nHistory\n";

    let hst = JSON.parse(chart);

    for(let timeKey in hst.history){
        logger.textContent += `${timeKey} = `;
        let date = new Date(0);
        date.setSeconds(parseInt(timeKey, 10));
        let timeString = date.toISOString();
        logger.textContent += `${timeString}\n`;;
        let dealArray = hst.history[timeKey];
        for (const deal of dealArray) {
            logger.textContent += `price: ${hexToUtf8(deal.price)} volume: ${hexToUtf8(deal.volume)} \n`;
        }
    }
}

function printLinearChart(linearChart) {
    logger.textContent += "\nLinearChart\n";

    let lchart = JSON.parse(linearChart);

    for(let timeKey in lchart.prices){
        logger.textContent += `${timeKey} = `;
        let date = new Date(0);
        date.setSeconds(parseInt(timeKey, 10));
        let timeString = date.toISOString();
        logger.textContent += `${timeString}\n`;;
        let deal = lchart.prices[timeKey];
        logger.textContent += `price: ${hexToUtf8(deal.price)} volume: ${hexToUtf8(deal.volume)} \n`;
    }
}

function printCandlestickChart(candlestickChart) {
    logger.textContent += "\nCandlestickChart\n";
    let csChart = JSON.parse(candlestickChart);
    for(let timeKey in csChart.candles){
        logger.textContent += `${timeKey} = `;
        let date = new Date(0);
        date.setSeconds(parseInt(timeKey, 10));
        let timeString = date.toISOString();
        logger.textContent += `${timeString}\n`;;
        let candle = csChart.candles[timeKey];
        logger.textContent += `open: ${hexToUtf8(candle.open)} close: ${hexToUtf8(candle.close)} high: ${hexToUtf8(candle.high)} low: ${hexToUtf8(candle.low)} volume: ${hexToUtf8(candle.volume)} \n`;
    }
}

(async () => {
    let manifest = buildManifest("getPairs", "{}");
    logger.textContent += `Calling getPairs...\n`;
    const answer = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
    let obj = JSON.parse(answer);
   // logger.textContent += `success:\nDEBUG: ${JSON.stringify(obj, null, ' ')}\n`;
    for (let i in obj.tip3tonPairs) {
        logger.textContent += `Name: ${hexToUtf8(obj.tip3tonPairs[i].symbol)} Decimals: ${obj.tip3tonPairs[i].decimals} PairAddr: ${obj.tip3tonPairs[i].tradingPair}\n`;
    }
    for (let i in obj.tip3tip3Pairs) {
        logger.textContent += `Name: ${hexToUtf8(obj.tip3tip3Pairs[i].symbolMajor)}/${hexToUtf8(obj.tip3tip3Pairs[i].symbolMinor)} DecimalsMajor: ${obj.tip3tip3Pairs[i].decimalsMajor} DecimalsMinor: ${obj.tip3tip3Pairs[i].decimalsMinor} PairAddr: ${obj.tip3tip3Pairs[i].xchgTradingPair}\n`;
    }

    for (let i in obj.tip3tip3Pairs) {
        let pair = obj.tip3tip3Pairs[i];
        logger.textContent += `\nCalling getXchgOrderBook for ${hexToUtf8(pair.symbolMajor)}/${hexToUtf8(pair.symbolMinor)}...\n`;
        manifest = buildManifest("getXchgOrderBook", `{"xchgTradingPair":"${pair.xchgTradingPair}"}`);
        const xchgBook = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
        logger.textContent += xchgBook;
        printOrderBook(xchgBook);

        logger.textContent += `\nCalling getXchgPriceTickHistory for ${hexToUtf8(pair.symbolMajor)}/${hexToUtf8(pair.symbolMinor)}...\n`;
        manifest = buildManifest("getXchgPriceTickHistory", `{"xchgTradingPair":"${pair.xchgTradingPair}","startTime":0}`);
        const chart = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
        logger.textContent += chart;
        printHistory(chart);

        logger.textContent += `\n\nCalling getXchgLinearChart...\n`;
        //1632398400 = September 23, 2021 12:00:00 PM
        //1632420000 = September 23, 2021 6:00:00 PM
        manifest = buildManifest("getXchgLinearChart", `{"xchgTradingPair":"${pair.xchgTradingPair}","startTime":1632398400,"endTime":1632420000,"stepTime":3600}`);
        const linearChart = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
        logger.textContent += linearChart;
        printLinearChart(linearChart);

        logger.textContent += `\n\nCalling getXchgCandlestickChart...\n`;
        //1632398400 = September 23, 2021 12:00:00 PM
        //1632420000 = September 23, 2021 6:00:00 PM
        manifest = buildManifest("getXchgCandlestickChart", `{"xchgTradingPair":"${pair.xchgTradingPair}","startTime":1632398400,"endTime":1632420000,"stepTime":3600}`);
        const candlestickChart = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
        logger.textContent += candlestickChart;
        printCandlestickChart(candlestickChart);

    }

    logger.textContent += '\n';
    for (let i in obj.tip3tonPairs) {
        let pair = obj.tip3tonPairs[i];
        logger.textContent += '\n';

        logger.textContent += `Calling getOrderBook for ${hexToUtf8(pair.symbol)}...\n`;
        manifest = buildManifest("getOrderBook", `{"tradingPair":"${pair.tradingPair}"}`);
        const book = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
        logger.textContent += book;
        printOrderBook(book)

        logger.textContent += `\nCalling getPriceTickHistory for ${hexToUtf8(pair.symbol)}...\n`;
        manifest = buildManifest("getPriceTickHistory", `{"tradingPair":"${pair.tradingPair}","startTime":0}`);
        const chart = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
        logger.textContent += chart;
        printHistory(chart);

        logger.textContent += `\n\nCalling getLinearChart...\n`;
        //1632398400 = September 23, 2021 12:00:00 PM
        //1632420000 = September 23, 2021 6:00:00 PM
        manifest = buildManifest("getLinearChart", `{"tradingPair":"${pair.tradingPair}","startTime":1632398400,"endTime":1632420000,"stepTime":3600}`);
        const linearChart = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
        logger.textContent += linearChart;
        printLinearChart(linearChart);

        logger.textContent += `\n\nCalling getCandlestickChart...\n`;
        //1632398400 = September 23, 2021 12:00:00 PM
        //1632420000 = September 23, 2021 6:00:00 PM
        manifest = buildManifest("getCandlestickChart", `{"tradingPair":"${pair.tradingPair}","startTime":1632398400,"endTime":1632420000,"stepTime":3600}`);
        const candlestickChart = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
        logger.textContent += candlestickChart;
        printCandlestickChart(candlestickChart);
    }

    logger.textContent += `\n\nCalling getBuyOrderMsg...\n`;
    let pairAddr = "0:b2b4a7d0af8c9a33ae4a2dd6675cb97d9cd25db2fcf6370402dc7931e9c2f473";//OTO pair
    manifest = buildManifest("getBuyOrderMsg", `{"tradingPair":"${pairAddr}","price":600000000,"volume":5}`);
    const msg = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
    logger.textContent += msg;

    logger.textContent += `\n\nCreating deep link...\n`;
    const flexDebot = "0:5dc50f38c2f04a1cf701af8638009a466fccca8d98698000d67038cae2c95394";
    let netName = "devnet";
    let json = JSON.parse(msg);
    let link = `https://uri.ton.surf/debot/${flexDebot}?message=${json['message']}&net=${netName}`;
    logger.textContent += link;
 })();