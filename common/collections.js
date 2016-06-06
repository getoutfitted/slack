ReactionCore.Schemas.SlackPackageConfig = new SimpleSchema([
  ReactionCore.Schemas.PackageConfig, {
    'settings.api.token': {
      type: String,
      label: 'Slack App Token',
      optional: true
    }
  }
]);