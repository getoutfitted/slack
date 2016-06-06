Template.slackSettings.helpers({
  packageData: function () {
    return ReactionCore.Collections.Packages.findOne({
      name: 'slack',
      shopId: ReactionCore.getShopId()
    });
  }
});

AutoForm.hooks({
  'slack-update-form': {
    onSuccess: function (operation, result, template) {
      Alerts.removeSeen();
      return Alerts.add('Slack settings saved.', 'success', {
        autoHide: true
      });
    },
    onError: function (operation, error, template) {
      Alerts.removeSeen();
      return Alerts.add('Slack settings update failed. ' + error, 'danger');
    }
  }
});