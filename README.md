# How to run test site

```bash
npm install
npm run start
```

Open link http://localhost:8080/ in internet browser.

Open debug console by F12.

See result log in main page and some debug info in console log.

# How to rebuild callbackABI

Navigate to `interfaces` dir.

Then

    tondev sol compile IFlexAPI.sol

It produces `IFlexAPI.abi.json`. Copy all from this file to `callbackABI.js`