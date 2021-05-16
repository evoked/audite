module.exports = class CodeError extends Error {
    constructor(message, code) {
     super(message);
     this.code = code;
    }
  }
 
//   throw new CodeError(myMessage, 404);