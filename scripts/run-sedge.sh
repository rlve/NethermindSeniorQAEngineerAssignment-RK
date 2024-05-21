#!/bin/bash
# ./sedge -p . down

echo 'Running sedge...'
./sedge deps install >>sedge.logs
./sedge generate --logging none -p $PWD full-node \
--map-all --no-mev-boost --no-validator \
--network chiado -c lighthouse:sigp/lighthouse:latest \
-e nethermind:nethermindeth/nethermind:master \
--el-extra-flag Sync.NonValidatorNode=true \
--el-extra-flag Sync.DownloadBodiesInFastSync=false \
--el-extra-flag Sync.DownloadReceiptsInFastSync=false \
--el-extra-flag JsonRpc.EnabledModules="[Eth,TxPool,Web3,Net,Health,Rpc,Debug]" \
--cl-extra-flag checkpoint-sync-url=http://139.144.26.89:4000/ >>sedge.logs

./sedge run -p $PWD >>sedge.logs

sleep 90