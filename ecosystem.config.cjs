module.exports = {
  apps: [
    {
      name: 'RECHIP',
      port: '3001', 
      exec_mode: 'cluster',
      instances: '2', 
      script: '.output/server/index.mjs',
      listen_timeout: '3000'
    }
  ]
}
