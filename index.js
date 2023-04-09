const Switchbot = require('switchbot-api');
let switchbot1 = null;
let switchbot2 = null;

module.exports = (api) => {
  api.registerAccessory('SwitchbotWindowCover', SwitchbotWindowCover);
};

class SwitchbotWindowCover {
  constructor(log, config) {
    this.log = log;
    this.name = config.name;
    this.switchbot1_address = config.switchbot1_address;
    this.switchbot2_address = config.switchbot2_address;

    // Connect to the SwitchBots
    switchbot1 = new Switchbot(this.switchbot1_address);
    switchbot2 = new Switchbot(this.switchbot2_address);
    
    // Set up the window cover
    this.currentPosition = 100;
    this.targetPosition = 100;
    this.positionState = 2;
  }

  getServices() {
    const windowCoverService = new hap.Service.WindowCovering(this.name);

    windowCoverService
      .getCharacteristic(hap.Characteristic.CurrentPosition)
      .on('get', this.getCurrentPosition.bind(this));

    windowCoverService
      .getCharacteristic(hap.Characteristic.TargetPosition)
      .on('get', this.getTargetPosition.bind(this))
      .on('set', this.setTargetPosition.bind(this));

    windowCoverService
      .getCharacteristic(hap.Characteristic.PositionState)
      .on('get', this.getPositionState.bind(this));

    return [windowCoverService];
  }

  getCurrentPosition(callback) {
    this.log.debug('Getting current position: ' + this.currentPosition);
    callback(null, this.currentPosition);
  }

  getTargetPosition(callback) {
    this.log.debug('Getting target position: ' + this.targetPosition);
    callback(null, this.targetPosition);
  }

  setTargetPosition(value, callback) {
    this.log.debug('Setting target position: ' + value);
    this.targetPosition = value;

    // Control the SwitchBots
    if (this.targetPosition === 0 && this.currentPosition !== 0) {
      switchbot1.turnOff();
      setTimeout(() => {
        switchbot2.turnOn();
      }, 1000);
    } else if (this.targetPosition === 100 && this.currentPosition !== 100) {
      switchbot2.turnOff();
      setTimeout(() => {
        switchbot1.turnOn();
      }, 1000);
    }

    callback(null);
  }

  getPositionState(callback) {
    this.log.debug('Getting position state: ' + this.positionState);
    callback(null, this.positionState);
  }
}
