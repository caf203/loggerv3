// This file exists to aggregate command, event, & other miscellaneous statistics to send to Zabbix.

const guildActivity = new Map()

const commandStatistics = {
  archive: 0,
  clearmydata: 0,
  stoplogging: 0,
  help: 0,
  ignorechannel: 0,
  info: 0,
  invite: 0,
  logbots: 0,
  ping: 0,
  reset: 0,
  serverinfo: 0,
  setchannel: 0,
  togglemodule: 0,
  userinfo: 0,
  setup: 0,
  settz: 0
}

const eventStatistics = {
  channelCreate: 0,
  channelDelete: 0,
  channelUpdate: 0,
  guildBanAdd: 0,
  guildBanRemove: 0,
  guildCreate: 0,
  guildDelete: 0,
  guildEmojisUpdate: 0,
  guildMemberAdd: 0,
  guildMemberKick: 0,
  guildMemberRemove: 0,
  guildMemberUpdate: 0,
  guildMemberNickUpdate: 0,
  guildMemberVerify: 0,
  guildRoleCreate: 0,
  guildRoleDelete: 0,
  guildRoleUpdate: 0,
  guildUpdate: 0,
  messageDelete: 0,
  messageDeleteBulk: 0,
  messageUpdate: 0,
  voiceChannelJoin: 0,
  voiceChannelLeave: 0,
  voiceChannelSwitch: 0,
  voiceStateUpdate: 0,
  'rest-timeout': 0,
  'rest-request': 0,
  webhookSends: 0,
  nonWebhookSends: 0,
  'rest-hit': 0,
  'global-ratelimit-hit': 0
}

const miscStatistics = {
  redisGet: 0,
  redisSet: 0,
  fetchWebhooks: 0,
  fetchAuditLogs: 0,
  ready: 0,
  disconnect: 0,
  createWebhook: 0
}

module.exports = {
  incrementCommand (command) {
    if (!commandStatistics.hasOwnProperty(command)) {
      console.error(`${command} is not a valid command to increment the statistics of!`)
      return
    }
    commandStatistics[command]++
  },
  incrementEvent (event) {
    if (!eventStatistics.hasOwnProperty(event)) {
      console.error(`${event} is not a valid event to increment the statistics of!`)
      return
    }
    eventStatistics[event]++
  },
  incrementMisc (miscItem) {
    if (!miscStatistics.hasOwnProperty(miscItem)) {
      console.error(`${miscItem} is not a valid item to increment the statistics of!`)
      return
    }
    miscStatistics[miscItem]++
  },
  incrementRedisGet () {
    miscStatistics.redisGet++
  },
  incrementRedisSet () {
    miscStatistics.redisSet++
  }
}
