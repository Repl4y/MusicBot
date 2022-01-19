const {GuildMember} = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'Skip a song!',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'Get in a channel fuckwit',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: 'Get in my channel fuckwit',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: 'Nothing is being shat out rn...'});
    const currentTrack = queue.current;
    const success = queue.skip();
    return void interaction.followUp({
      content: success ? `Instantly shat out **${currentTrack}**!` : 'Hmmmm... Something wrong with my shit!',
    });
  },
};
