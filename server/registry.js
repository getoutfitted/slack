ReactionCore.registerPackage({
  label: 'Slack',
  name: 'slack',
  icon: 'fa fa-email',
  autoEnable: true,
  registry: [{
    route: '/dashboard/slack',
    provides: 'dashboard',
    name: 'slack',
    label: 'Slack',
    description: 'Slack Post a Message to Channel',
    container: 'getoutfitted',
    icon: 'fa fa-email',
    template: 'slackDashboard',
    workflow: 'coreWorkflow',
    priority: 3
  }, {
    route: '/dashboard/slack/settings',
    provides: 'settings',
    label: 'Slack Settings',
    name: 'slackSettings',
    template: 'slackSettings'
  }]
});