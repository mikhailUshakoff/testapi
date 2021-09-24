const abi = `{
	"ABI version": 2,
	"header": ["time"],
	"functions": [
		{
			"name": "onGetPairs",
			"inputs": [
				{"components":[{"name":"symbolMajor","type":"bytes"},{"name":"decimalsMajor","type":"uint8"},{"name":"symbolMinor","type":"bytes"},{"name":"decimalsMinor","type":"uint8"},{"name":"xchgTradingPair","type":"address"}],"name":"tip3tip3Pairs","type":"tuple[]"},
				{"components":[{"name":"symbol","type":"bytes"},{"name":"decimals","type":"uint8"},{"name":"tradingPair","type":"address"}],"name":"tip3tonPairs","type":"tuple[]"}
			],
			"outputs": [
			]
		},
		{
			"name": "onGetOrderBook",
			"inputs": [
				{"components":[{"name":"price","type":"bytes"},{"name":"buyVolume","type":"bytes"},{"name":"sellVolume","type":"bytes"}],"name":"orderBook","type":"tuple[]"}
			],
			"outputs": [
			]
		},
		{
			"name": "onGetXchgOrderBook",
			"inputs": [
				{"components":[{"name":"price","type":"bytes"},{"name":"buyVolume","type":"bytes"},{"name":"sellVolume","type":"bytes"}],"name":"orderBook","type":"tuple[]"}
			],
			"outputs": [
			]
		},
		{
			"name": "onGetPriceTickHistory",
			"inputs": [
				{"components":[{"name":"price","type":"bytes"},{"name":"volume","type":"bytes"}],"name":"history","type":"map(uint32,tuple[])"}
			],
			"outputs": [
			]
		},
		{
			"name": "onGetXchgPriceTickHistory",
			"inputs": [
				{"components":[{"name":"price","type":"bytes"},{"name":"volume","type":"bytes"}],"name":"history","type":"map(uint32,tuple[])"}
			],
			"outputs": [
			]
		},
		{
			"name": "onGetCandlestickChart",
			"inputs": [
				{"components":[{"name":"open","type":"bytes"},{"name":"close","type":"bytes"},{"name":"high","type":"bytes"},{"name":"low","type":"bytes"},{"name":"volume","type":"bytes"}],"name":"candles","type":"map(uint32,tuple)"}
			],
			"outputs": [
			]
		},
		{
			"name": "onGetXchgCandlestickChart",
			"inputs": [
				{"components":[{"name":"open","type":"bytes"},{"name":"close","type":"bytes"},{"name":"high","type":"bytes"},{"name":"low","type":"bytes"},{"name":"volume","type":"bytes"}],"name":"candles","type":"map(uint32,tuple)"}
			],
			"outputs": [
			]
		},
		{
			"name": "onGetLinearChart",
			"inputs": [
				{"components":[{"name":"price","type":"bytes"},{"name":"volume","type":"bytes"}],"name":"prices","type":"map(uint32,tuple)"}
			],
			"outputs": [
			]
		},
		{
			"name": "onGetXchgLinearChart",
			"inputs": [
				{"components":[{"name":"price","type":"bytes"},{"name":"volume","type":"bytes"}],"name":"prices","type":"map(uint32,tuple)"}
			],
			"outputs": [
			]
		},
		{
			"name": "onGetBuyOrderMsg",
			"inputs": [
				{"name":"message","type":"cell"}
			],
			"outputs": [
			]
		},
		{
			"name": "onGetSellOrderMsg",
			"inputs": [
				{"name":"message","type":"cell"}
			],
			"outputs": [
			]
		},
		{
			"name": "constructor",
			"inputs": [
			],
			"outputs": [
			]
		}
	],
	"data": [
	],
	"events": [
	]
}`;

export default {
    abi
}
