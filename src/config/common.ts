const config = {
  baseURL: "http://localhost:3000",
  apiBaseURL: "/api/v1/",
  db: {
    mongo: { url: "mongodb://127.0.0.1:27017/jobportal" },
  },
  jwt: {
    secret: "abiramjobportal",
  },
};

export default config;
