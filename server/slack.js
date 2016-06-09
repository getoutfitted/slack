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
      if (slackPackage.settings && slackPackage.settings.api && slackPackage.settings.api.token) {
        _.extend(options, {
          token: slackPackage.settings.api.token,
        });
        if (attachments) {
          _.extend(options, {attachments: JSON.stringify(attachments)});
        }
        try {
          HTTP.call('POST',
            'https://slack.com/api/chat.postMessage',
            {
              params: options,
            });
          ReactionCore.Log.info(`Slack message posted to ${options.channel}`);
        } catch (err) {
          Log.error('Error in making call to API' + err);
        }
      } else {
        ReactionCore.Log.error('Slack is missing it\'s API Token');
      }
    } else {
      ReactionCore.Log.error('Slack package is not enabled.');
    }
  } else {
    ReactionCore.Log.error('Channel or Text is missing, and preventing Slack Package.');
  }
}
