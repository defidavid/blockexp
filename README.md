![image](https://user-images.githubusercontent.com/2999380/42854212-5dd0bc50-8a00-11e8-8241-1b5506535321.png)


### Dependencies
Install:
* [https://nodejs.org/en/download/](node)
* [https://www.npmjs.com/get-npm](npm)

### Setup
1) Clone this repo
2) `cd` to `/blockexp` directory
3) Run:
```
npm install
```

### Run app in dev mode
Run:
```
npm run start
```
...and visit [http://localhost:3000/](http://localhost:3000/)

### (Optional) Apply Infura Token
According to Infura, intializing the `web3` object with a token can help prevent your requests from being throttled.
1) Go to [https://blog.infura.io/getting-started-with-infura-28e41844cc89](here) to obtain a token
2) Modify the `INFURA_TOKEN` variable in `index.js`
