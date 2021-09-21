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


(async () => {
    let manifest = buildManifest("getPairs", "{}");
    logger.textContent += `Calling getPairs...\n`;
    const answer = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
    let obj = JSON.parse(answer);
    //logger.textContent += `success:\nDEBUG: ${JSON.stringify(obj, null, ' ')}\n`;
    for (let i in obj.tip3tonPairs) {
        logger.textContent += `Name: ${hexToUtf8(obj.tip3tonPairs[i].symbol)} PairAddr: ${obj.tip3tonPairs[i].tradingPair}\n`;
    }

    for (let i in obj.tip3tonPairs) {
        let pair = obj.tip3tonPairs[i];

        logger.textContent += `Calling getOrderBook for ${hexToUtf8(pair.symbol)}...\n`;
        manifest = buildManifest("getOrderBook", `{"tradingPair":"${pair.tradingPair}"}`);
        const book = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
        logger.textContent += book;

        logger.textContent += `Calling getPriceTickHistory for ${hexToUtf8(pair.symbol)}...\n`;
        manifest = buildManifest("getPriceTickHistory", `{"tradingPair":"${pair.tradingPair}","startTime":0}`);
        const chart = await browser.run_debot_browser("net.ton.dev", null, null, null, manifest);
        logger.textContent += chart;
    }
    
})();