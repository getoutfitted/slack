import slack from "slack";

Meteor.methods({
  slack: function (methodGroup, methodName, options) {
    check(methodGroup, String);
    check(methodName, String);
    check(options, Object);
    const slackPackage = ReactionCore.Collections.Packages.findOne({
      name: 'slack',
      shopId: ReactionCore.getShopId()
    });
    const realMethodGroups = ['api',
                            'auth',
                            'bots',
                            'channels',
                            'chat',
                            'dnd',
                            'emoji',
                            'files',
                            'groups',
                            'im',
                            'mpim',
                            'oauth',
                            'pins',
                            'reactions',
                            'reminders',
                            'rtm',
                            'search',
                            'stars',
                            'team',
                            'usergroups',
                            'users'
                            ];
    let validMethodGroup = _.contains(realMethodGroups, methodGroup);
    if (slackPackage && slackPackage.enabled && validMethodGroup) {
      _.extend(options, {token: slackPackage.settings.api.token});
      slack[methodGroup][methodName](options, function (error, result) {
        if (error) {
          ReactionCore.Log.error('Slack Error' + error);
          throw new Error(error);
        }
        // Don't return any data in call back if user isn't authenticated
        if (Roles.userIsInRole(this.userId, 'slack', ReactionCore.getShopId())) {
          return result;
        }
        return '';
      });
    } else {
      ReactionCore.Log.error('Slack Package is not Enabled');
    }

  } 
});

