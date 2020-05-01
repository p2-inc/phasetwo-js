import Keycloak from 'keycloak-js';

class Phasetwo extends Keycloak {
  constructor(config) {
    super(config);

    console.log('config', config);

    if (config.secretOption) {
      console.log('🔥 You provided a secret config option. Nice.');
    }

    this.augment = 'new field';

    console.log('👌 Built Phasetwo object.');
  }

  getAugment() {
    return 'Keycloak object was augmented with: ' + this.augment;
  }

  login(options) {
    console.log('➡️ Phase Two logging in!');
    return super.login(options);
  }

  logout(options) {
    console.log('⬅️ Phase Two logging out!');
    return super.logout(options);
  }

  getConfig() {
    // return the config object
  }
}

export default Phasetwo;
