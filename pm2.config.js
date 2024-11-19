module.exports = {
  apps: [
    {
      name: 'xpeng',
      script: 'npm',
      args: 'run start',
      instances: 1,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
