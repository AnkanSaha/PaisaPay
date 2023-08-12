module.exports = {
  apps: [
    {
      name: 'PaisaPay',
      script: './Build/settings/PaisaPay.js', // Path to the compiled JavaScript entry file
      // instances: 'max', // Number of instances you want to run
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
      "watch": true
    }
  ],
};
