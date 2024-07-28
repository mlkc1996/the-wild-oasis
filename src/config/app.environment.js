class AppConfig {
  /**
   * @protected
   */
  env;

  /**
   * @type {boolean}
   * @readonly
   */
  isProduction;

  /**
   * @readonly
   * @type {string}
   */
  baseUrl;

  /**
   * @readonly
   * @type {string}
   */
  serverUrl;

  constructor() {
    this.env = process.env;
    this.isProduction = this.env.PROD;
    this.serverUrl = this.isProduction
      ? window.location.origin
      : this.env.VITE_SERVER_URL;
    this.baseUrl = this.env.BASE_URL;
  }
}

let _appConfig;

/**
 * @returns {AppConfig}
 */
const getConfig = () => {
  if (!_appConfig) {
    _appConfig = new AppConfig();
    Object.freeze(_appConfig);
  }
  return _appConfig;
};

export default getConfig();
