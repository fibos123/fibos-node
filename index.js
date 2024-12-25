const fibos = require('chain');
console.notice("start FIBOS producer node");
const env_list = process.env;
let p2paddress = env_list.P2P_PEER_ADDRESS ? env_list.P2P_PEER_ADDRESS.split(',') : [];

if(p2paddress.length <= 0){
	p2paddress = require('./resources/p2p.json');
}

const httpPort = env_list.HTTP_PORT || 8870;
const p2pPort = env_list.P2P_PORT || 9870;
let producername = env_list.PRODUCER_ACCOUNT;
let public_key = env_list.PRODUCER_PUBLIC_KEY;
let private_key = env_list.PRODUCER_PRIVATE_KEY;

fibos.pubkey_prefix = "FO";
fibos.config_dir = env_list.NODE_DIR;
fibos.data_dir = env_list.NODE_DIR;

let chain_config = {
	"contracts-console": true,
	'chain-state-db-size-mb': 8 * 1024,
	// "delete-all-blocks": true
};

const snapshotPath = env_list.SNAPSHOT_PATH;
if(snapshotPath){
	chain_config['snapshot'] = snapshotPath;
} else {
	chain_config['genesis-json'] = env_list.GENESIS_PATH;
}

console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);

fibos.load("http", {
	"http-server-address": `0.0.0.0:${httpPort}`,
	"access-control-allow-origin": "*",
	"http-validate-host": false,
	"verbose-http-errors": true
});

fibos.load("net", {
	"max-clients": 100,
	"p2p-peer-address": p2paddress,
	"p2p-listen-endpoint": `0.0.0.0:${p2pPort}`,
	"agent-name": "FIBOS Bp"
});

let producer_config = {
	'max-transaction-time': 3000,
	'snapshots-dir': 'snapshots'
}

if (producername && public_key && private_key) {
	producer_config['producer-name'] = producername;
	// producer_config['enable-stale-production'] = true;
	producer_config['signature-provider'] = `${public_key}=KEY:${private_key}`;
}

if(producer_config){
    fibos.load("producer", producer_config);
	fibos.load("producer_api");
}

fibos.load("chain", chain_config);
fibos.load("chain_api");

fibos.load("cross");

fibos.start();