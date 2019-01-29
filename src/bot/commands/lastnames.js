const getUser = require('../../db/interfaces/rethink/read').getUser

module.exports = {
  func: async (message, suffix) => {
    let memberPerms = message.member.permission.json
    if (!memberPerms['kickMembers']) {
      let userDoc = await getUser(message.author.id)
      let m = await message.channel.createMessage({ embed: {
        'description': `${userDoc.names.length} stored names for you. Type **${process.env.GLOBAL_BOT_PREFIX}clearmynames** to delete them.`,
        'url': 'https://whatezlife.com/lastnames',
        'color': 3553599,
        'timestamp': new Date(),
        'footer': {
          'icon_url': global.bot.user.avatarURL,
          'text': `${global.bot.user.username}#${global.bot.user.discriminator}`
        },
        'thumbnail': {
          'url': message.author.avatarURL
        },
        'author': {
          'name': `${message.author.username}#${message.author.discriminator}`,
          'icon_url': message.author.avatarURL
        },
        'fields': [{
          'name': 'Stored',
          'value': `\`\`\`${userDoc.names.length !== 0 ? userDoc.names.join(', ').substr(0, 1200) : 'None'}\`\`\``
        }]
      } })
      await setTimeout(() => {
        m.delete()
      }, 20000)
    } else {
      let userID
      if (message.mentions.length !== 0) {
        userID = message.mentions[0].id
      }
      let splitSuffix = suffix.split(' ').filter(id => !isNaN(id))
      if (splitSuffix.length !== 0) {
        userID = splitSuffix[0]
      }
      if (!userID) userID = message.author.id
      if (!global.bot.users.get(userID) || !message.channel.guild.members.get(userID)) {
        await message.channel.createMessage({ embed: {
          'title': `${userID} isn't a valid user id (or isn't in this server)`,
          'description': `Provide a user id as a mention or just the id after this command`,
          'url': 'https://whatezlife.com/lastnames',
          'color': 3553599,
          'timestamp': new Date(),
          'footer': {
            'icon_url': global.bot.user.avatarURL,
            'text': `${global.bot.user.username}#${global.bot.user.discriminator}`
          },
          'thumbnail': {
            'url': message.author.avatarURL
          },
          'author': {
            'name': `${message.author.username}#${message.author.discriminator}`,
            'icon_url': message.author.avatarURL
          }
        } })
      } else {
        let userDoc = await getUser(userID)
        let user = message.channel.guild.members.get(userID)
        let m = await message.channel.createMessage({ embed: {
          'description': `${userDoc.names.length} stored names. <@${userDoc.id}>, type **${process.env.GLOBAL_BOT_PREFIX}clearmynames** to delete them.`,
          'url': 'https://whatezlife.com/lastnames',
          'color': 3553599,
          'timestamp': new Date(),
          'footer': {
            'icon_url': global.bot.user.avatarURL,
            'text': `${global.bot.user.username}#${global.bot.user.discriminator}`
          },
          'thumbnail': {
            'url': user.avatarURL
          },
          'author': {
            'name': `${user.username}#${user.discriminator}`,
            'icon_url': user.avatarURL
          },
          'fields': [{
            'name': 'Stored',
            'value': `\`\`\`${userDoc.names.length !== 0 ? userDoc.names.join(', ').substr(0, 1200) : 'None'}\`\`\``
          }]
        } })
        await setTimeout(() => {
          m.delete()
        }, 20000)
      }
    }
  },
  name: 'lastnames',
  description: 'Get the last names of a user. This can only be used on a user who is a member of the guild. You need the *kick members* permission to view names of users other than yourself.',
  type: 'any',
  category: 'Utility'
}
