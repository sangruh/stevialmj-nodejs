module.exports = {
  apps: [
    {
      name: 'stevia-lmj',
      script: './server-mysql.cjs',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_URL: 'mysql://stevialmj:stevia1117!!@localhost/triwirat_stevia',
        DB_HOST: 'localhost',
        DB_USER: 'stevialmj',
        DB_PASSWORD: 'stevia1117!!',
        DB_NAME: 'triwirat_stevia',
        OPENROUTER_API_KEY: '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',
        OPENROUTER_MODEL: 'google/gemini-2.5-flash-lite'
      }
    }
  ]
};
