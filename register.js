ReactionCore.registerPackage({
  label: 'Slack',
  name: 'slack',
  icon: 'fa fa-slack',
  autoEnable: true,
  registry: [{
    route: '/dashboard/slack',
    provides: 'dashboard',
    name: 'slack',
    label: 'Slack',
    description: 'Slack Post a Message to Channel',
    container: 'getoutfitted',
    icon: 'fa fa-slack',
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