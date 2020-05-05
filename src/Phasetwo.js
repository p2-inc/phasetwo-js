import Keycloak from 'keycloak-js';

class Phasetwo extends Keycloak {
  super_ = {
    init: this.init,
    login: this.login,
    logout: this.logout,
  };

  constructor(config) {
    super(config);

    this.config = config;

    if (config && config.secretOption) {
      console.log('🔥 You provided a secret config option. Nice.');
    }

    if (config && config.augment) {
      this.augment = config.augment;
    }

    console.log('👌 Built Phasetwo object.');
  }

  login = (options) => {
    console.log('➡️ Phase Two logging in.');
    return this.super_.login(options);
  };

  logout = (options) => {
    console.log('⬅️ Phase Two logging out.');
    return this.super_.logout(options);
  };

  init = (options) => {
    console.log('🌱 Phase Two init.');
    return this.super_.init(options);
  };

  getAugment() {
    return this.augment;
  }

  getConfig() {
    return this.config;
  }

  getClientId() {
    return this.clientId;
  }
}

export default Phasetwo;
