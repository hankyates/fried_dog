function logger(moduleName) {
  var self = this;
  this.logLevels = {info:0,warn:1,error:2,fatal:3};
  this.level = 0;

  function logMsgAtLevel(msg,msgLevel,levelText) {
    if( self.level <= msgLevel ) {
      console.log('[' + levelText + '] ' + moduleName + ' > ' + msg);
    }
  }

  this.info = function(msg) {
    logMsgAtLevel(msg,self.logLevels.info,'info');
  }

  this.warn = function(msg) {
    logMsgAtLevel(msg,self.logLevels.warn,'warn');
  }

  this.error = function(msg) {
    logMsgAtLevel(msg,self.logLevels.error,'error');
  }

  this.fatal = function(msg) {
    logMsgAtLevel(msg,self.logLevels.fatal,'fatal');
  }

  this.setLevel = function(lvl) {
    self.level = ( lvl < self.logLevels.info || lvl > self.logLevels.fatal )
      ? self.logLevels.info
      : lvl;
  }

  return this;
}


exports = module.exports = {
  Logger: logger
};

