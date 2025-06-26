module.exports = {
  apps: [
    {
      name: "expediate-api",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        FRONTEND_URL: "https://expediate.app",
      },
    },
  ],
};
