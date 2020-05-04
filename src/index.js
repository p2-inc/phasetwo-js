import Keycloak from 'keycloak-js';

class Phasetwo extends Keycloak {
  super_ = {
    login: this.login,
    logout: this.logout,
  };

  constructor(config) {
    super(config);

    console.log('config', config);
    this.config = config;

    if (config && config.secretOption) {
      console.log('🔥 You provided a secret config option. Nice.');
    }

    this.augment = 'new field';

    console.log('👌 Built Phasetwo object.');
  }

  getAugment() {
    return 'Keycloak object was augmented with: ' + this.augment;
  }

  login = (options) => {
    console.log('➡️ Phase Two logging in!');
    return this.super_.login(options);
  };

  logout = (options) => {
    console.log('⬅️ Phase Two logging out!');
    return this.super_.logout(options);
  };

  getConfig() {
    // return the config object
    return this.config;
  }

  getClientId() {
    return this.clientId;
  }
}

export default Phasetwo;
