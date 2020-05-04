import Keycloak from 'keycloak-js';

function Phasetwo(config) {
  function KC() {}

  KC.prototype = new Keycloak(config);

  class Phasetwo extends KC {
    config;

    constructor(config) {
      super(config);
      this.config = config;

      if (config && config.secretOption) {
        console.log('🔥 You provided a secret config option. Nice.');
      }

      console.log('👌 Built Phasetwo object.');
    }

    login(options) {
      console.log('➡️ Phase Two logging in!');
      return super.login(options);
    }

    logout(options) {
      console.log('⬅️ Phase Two logging out!');
      return super.logout(options);
    }

    init(options) {
      console.log('🌱 Phase Two init');
      return super.init(options);
    }

    getConfig() {
      return this.config;
    }
  }

  return new Phasetwo(config);
}

export default Phasetwo;
