pragma ton-solidity >=0.47.0;

//it is record at order book
//can contain multiple orders
struct OrderBookRow {
    string price;
    string buyVolume;
    string sellVolume;
}

struct TradeData {
    string price;
    string volume;
}

struct Candlestick {
    string open;
    string close;
    string hight;
    string low;
    string volume;
}

struct Tip3Tip3PairInfo {
    string symbolMajor;
    string symbolMinor;
    address xchgTradingPair;
}

struct Tip3TonPairInfo {
    string symbol;
    address tradingPair;
}

interface IFlexAPI {
    //listing
    function getPairs() external;// returns (Tip3Tip3PairInfo[] tip3tip3Pairs, Tip3TonPairInfo[] tip3tonPairs);
    //order books
    function getOrderBook(address tradingPair) external;// returns (OrderBookRow[] orderBook);
    function getXchgOrderBook(address xchgTradingPair) external;// returns (XchgOrderBookRow[] orderBook);
    //collect messages for
    //notify_addr_(Grams(tons_cfg_.send_notify.get()), IGNORE_ACTION_ERRORS).onDealCompleted(tip3root_, price_, deal_amount);
    //mapping(timestamp=>TradeData[])
    function getPriceTickHistory(address tradingPair, uint32 startTime) external;// returns (mapping(uint32=>TradeData[]) history);
    //collect messages for
    //notify_addr_(Grams(tons_cfg_.send_notify.get())).onXchgDealCompleted(tip3root_sell_, tip3root_buy_, price_.numerator(), price_.denominator(), deal_amount);
    //mapping(timestamp=>XchgTradeData[])
    function getXchgPriceTickHistory(address xchgTradingPair, uint32 startTime) external;// returns (mapping(uint32=>XchgTradeData[]) history);
    //Candlestick chart
    function getCandlestickChart(address tradingPair, uint32 startTime, uint32 endTime, uint32 stepTime) external;// returns (mapping(uint32=>Candlestick) candles);
    function getXchgCandlestickChart(address xchgTradingPair, uint32 startTime, uint32 endTime, uint32 stepTime) external;// returns (mapping(uint32=>Candlestick) candles);
    //linear chart
    function getLinearChart(address tradingPair, uint32 startTime, uint32 endTime, uint32 stepTime) external;// returns (mapping(uint32=>TradeData) prices);
    function getXchgLinearChart(address xchgTradingPair, uint32 startTime, uint32 endTime, uint32 stepTime) external;// returns (mapping(uint32=>XchgTradeData) prices);

}

interface IFlexAPIOnGetPairs {
    function onGetPairs(Tip3Tip3PairInfo[] tip3tip3Pairs, Tip3TonPairInfo[] tip3tonPairs) external;
}

interface IFlexAPIOnGetOrderBook {
    function onGetOrderBook(OrderBookRow[] orderBook) external;
    function onGetXchgOrderBook(OrderBookRow[] orderBook) external;
}

interface IFlexAPIOnGetPriceTickHistory {
    function onGetPriceTickHistory(mapping(uint32=>TradeData[]) history) external;
    function onGetXchgPriceTickHistory(mapping(uint32=>TradeData[]) history) external;
}

interface IFlexAPIOnGetCandlestickChart {
    function onGetCandlestickChart(mapping(uint32=>Candlestick) candles) external;
    function onGetXchgCandlestickChart(mapping(uint32=>Candlestick) candles) external;
}

interface IFlexAPIOnGetLinearChart {
    function onGetLinearChart(mapping(uint32=>TradeData) prices) external;
    function onGetXchgLinearChart(mapping(uint32=>TradeData) prices) external;
}