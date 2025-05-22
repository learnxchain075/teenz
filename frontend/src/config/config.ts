const prod = "production";
const uat = "uat";
const dev = "development";

// Get environment from process.env
const appStage = process.env.NEXT_PUBLIC_APP_STAGE || prod;

const developmentConfig = {
  BASE_URL: "http://localhost:3000",
  apiGateway: {
    BASE_URL: "http://localhost:5000/api/v1",
  },
};

const productionConfig = {
  BASE_URL: "https://your-production-frontend.com",
  apiGateway: {
    BASE_URL: "https://your-production-backend.com/api/v1",
  },
};

const uatConfig = {
  BASE_URL: "https://your-uat-frontend.com",
  apiGateway: {
    BASE_URL: "https://your-uat-backend.com/api/v1",
  },
};

const baseConfig =
  appStage === prod
    ? productionConfig
    : appStage === uat
    ? uatConfig
    : developmentConfig;

const AppConfig = {
  APP_NAME: "LXC",
  APP_STAGE: appStage,
  IS_DEV_ENV: appStage === dev,
  IS_UAT_ENV: appStage === uat,
  IS_PROD_ENV: appStage === prod,
  LOCAL_STORAGE_ACCESS_TOKEN_KEY: "proAccessToken",
  LOCAL_STORAGE_REFRESH_TOKEN_KEY: "proRefreshToken",
  LOCALSTORAGE_APP_CONFIG: "CASINO-APP-CONFIG",
  ...baseConfig,
};

export default AppConfig;
