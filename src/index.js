import Keycloak from 'keycloak-js';

class Phasetwo extends Keycloak {
  constructor(config) {
    super(config);

    this.soma = 'Holiday';
  }

  getSoma() {
    return 'got ' + this.soma;
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
