Gibberish.Expressions = {
  add : function() {
    var args = Array.prototype.slice.call(arguments, 0),
        phase = 0;
  
    var me = {
      name : 'add',
      properties : {},
      callback : function(a,b) {
        return a + b;
      },
    };
    me.__proto__ = new Gibberish.ugen();
  
    for(var i = 0; i < args.length; i++) {
      me.properties[i] = args[i];
    }
    me.init();

    return me;
  },

  sub : function() {
    var args = Array.prototype.slice.call(arguments, 0),
        phase = 0;
  
    var me = {
      name : 'sub',
      properties : {},
      callback : function(a,b) {
        return a - b;
      },
    };
    me.__proto__ = new Gibberish.ugen();
  
    for(var i = 0; i < args.length; i++) {
      me.properties[i] = args[i];
    }
    me.init();

    return me;
  },

  mul : function() {
    var args = Array.prototype.slice.call(arguments, 0),
        phase = 0;
  
    var me = {
      name : 'mul',
      properties : {},
      callback : function(a,b) {
        return a * b; 
      },
    };
    me.__proto__ = new Gibberish.ugen();
  
    for(var i = 0; i < args.length; i++) {
      me.properties[i] = args[i];
    }
    me.init();

    return me;
  },

  div : function() {
    var args = Array.prototype.slice.call(arguments, 0),
        phase = 0;
  
    var me = {
      name : 'div',
      properties : {},
      callback : function(a,b) { return a / b; },
    };
    me.__proto__ = new Gibberish.ugen();
  
    for(var i = 0; i < args.length; i++) {
      me.properties[i] = args[i];
    }
    me.init();

    return me;
  },

  abs : function() {
    var args = Array.prototype.slice.call(arguments, 0),
        _abs = Math.abs;
  
    var me = {
      name : 'abs',
      properties : {},
      callback : Math.abs,
    };
    me.__proto__ = new Gibberish.ugen();
    me.properties[0] = arguments[0];
    me.init();

    return me;
  },
  
  mod : function() {
    var args = Array.prototype.slice.call(arguments, 0);
  
    var me = {
      name : 'mod',
      properties : {},
      callback : function(a,b) {
        return a % b;
      },
    };
    me.__proto__ = new Gibberish.ugen();
  
    for(var i = 0; i < args.length; i++) {
      me.properties[i] = args[i];
    }
    me.init();

    return me;
  },
  
  sqrt : function() {
    var args = Array.prototype.slice.call(arguments, 0)
        _sqrt = Math.sqrt;
  
    var me = {
      name : 'sqrt',
      properties : {},
      callback : Math.sqrt,
    };
    me.__proto__ = new Gibberish.ugen();    
    me.properties[i] = arguments[0];
    me.init();

    return me;
  },
  
  pow : function() {
    var args = Array.prototype.slice.call(arguments, 0);
      
    var me = {
      name : 'pow',
      properties : {},
      callback : Math.pow,
    };
    me.__proto__ = new Gibberish.ugen();
  
    for(var i = 0; i < args.length; i++) { me.properties[i] = args[i]; }
    me.init();

    return me;
  }
};