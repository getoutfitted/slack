Slack = {};

Slack.PostMessage = function (options, attachments) {
  check(options, Object);
  check(attachments, Match.Optional([Object]))
  if (options.channel && options.text) {
    const slackPackage = ReactionCore.Collections.Packages.findOne({
      name: 'slack',
      shopId: ReactionCore.getShopId()
    });
    if (slackPackage && slackPackage.enabled) {
      _.extend(options, {
        token: slackPackage.settings.api.token,
      });
      if (attachments) {
        _.extend(options, {attachments: JSON.stringify(attachments)});
      }
      HTTP.call('POST',
        'https://slack.com/api/chat.postMessage',
        {
          params: options,
        });
      ReactionCore.Log.info(`Slack message posted to ${options.channel}`)
    }
  } else {
    ReactionCore.Log.error('No Channel or Text was sent to Slack');
  }
}
