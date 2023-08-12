module.exports = {
  apps : [{
    name   : "PaisaPay",
    script : "./Build/PaisaPay.js",
    watch  : false,
    max_memory_restart: '1G',
    exec_mode: 'cluster',
    instances: 'max',
  }]
}
