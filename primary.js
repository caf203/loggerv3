const sa = require('superagent')
const addListeners = require('./src/miscellaneous/workerlistener')

require('dotenv').config()

async function init () {
  let totalShards
  sa.get('https://discordapp.com/api/gateway/bot').set('Authorization', 'MjgzNzQzNDYwNTQyOTA2MzY4.DnSC1g.3DnG1oB5xzwc0lo1byqIBD706l8').then(b => {
    totalShards = b.body.shards
    let shardsPerWorker
    const coreCount = require('os').cpus().length
    if (coreCount > totalShards) shardsPerWorker = 1
    else shardsPerWorker = Math.ceil(totalShards / coreCount)
    const workerCount = Math.ceil(totalShards, shardsPerWorker)
    global.webhook.generic(`Shard manager is booting up. Discord recommends ${totalShards} shards. With the core count being ${coreCount}, there will be ${shardsPerWorker} shards per worker, and ${workerCount} workers.`)
    console.log(`TOTAL SHARDS: ${totalShards}\nCore count: ${coreCount}\nshards per worker: ${shardsPerWorker}\nworker count: ${workerCount}`)
    for (let i = 0; i < workerCount; i++) {
      let shardStart = i * shardsPerWorker
      let shardEnd = ((i + 1) * shardsPerWorker) - 1
      if (shardEnd > totalShards - 1) shardEnd = totalShards - 1
      let rangeForShard
      if (shardStart === shardEnd) {
        rangeForShard = `shard ${shardStart}`
      } else {
        rangeForShard = `shards ${shardStart}-${shardEnd}`
      }
      const worker = cluster.fork()
      Object.assign(worker, { type: 'bot', shardStart, shardEnd, rangeForShard, totalShards })
      addListeners(worker)
      // Object.assign(worker, { shardStart, shardEnd, totalShards })
    }
  }).catch(console.error)
}

init()
