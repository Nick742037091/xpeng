module.exports = {
  apps: [
    {
      name: 'xpeng',
      script: 'npm',
      args: 'run prod',
      instances: 1,
      autorestart: true,
      output: './logs/out.log',
      error: './logs/err.log',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
