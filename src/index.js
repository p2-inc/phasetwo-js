import Keycloak from 'keycloak-js';

class PhaseTwo extends Keycloak {
  constructor(config) {
    super(config);

    const { soma } = config;
    this.soma = soma;
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
}

export default PhaseTwo;
