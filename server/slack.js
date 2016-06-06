Slack = {};

Slack.PostMessage = function (options) {
  check(options, Object);
  if (options.channel && options.text) {
    const slackPackage = ReactionCore.Collections.Packages.findOne({
      name: 'slack',
      shopId: ReactionCore.getShopId()
    });
    if (slackPackage && slackPackage.enabled) {
      _.extend(options, {token: slackPackage.settings.api.token});
      HTTP.call('POST',
        'https://slack.com/api/chat.postMessage',
        { params: options
      })
      ReactionCore.Log.info(`Slack message posted to ${options.channel}`)
    }
  } else {
    ReactionCore.Log.error('No Channel or Text was sent to Slack');
  }
}
