var Emitter = require('emitter')
  , classes = require('classes')

module.exports = MultiView;

function MultiView(el){
  if (!(this instanceof MultiView)) return new MultiView(el);
  this.rootEl = (typeof el == 'string' ? document.querySelector(el) : el);
  this.views = {};
  this.transitionedClass = null;
  return this;
}

MultiView.prototype = new Emitter;

MultiView.prototype.mode = function(name,view){
  this.views[name] = view;
  return this;
}

MultiView.prototype.transitioned = function(className){
  this.transitionedClass = className;
  return this;
}

MultiView.prototype.render = function(model,mode){
  if (this.mode == mode && this.model === model) return this;
  var lastMode = this.mode
    , lastEl   = this.el
  this.model = model;
  this.mode = mode;
  this.view = this._constructView(model,mode);
  this.el = this.view.el;
  this.bindTransitions();
  if (lastEl) { this.rootEl.replaceChild(this.el, lastEl) }
  else        { this.rootEl.appendChild(this.el)  }
  domTransition(this.el, this.transitionedClass);
  this.emit('change', lastMode, mode);
  this.emit(mode, lastMode);
  return this;
}

/* Catch any view event signalling mode transition, and perform transition
   so it makes it easy for the views to trigger transitions
*/
MultiView.prototype.bindTransitions = function(){
  if (!this.view.on) return;
  var self = this;
  each(this.views, function(mode){
    if (mode == self.mode) return;
    self.view.on(mode, function(){
      self.render(self.model,mode);
    });
  });
}

MultiView.prototype._constructView = function(model,mode) {
  var viewClass = this.views[mode]
  return new viewClass(model);
}

// private

function domTransition(el,className){
  if (!className) return;
  el.clientHeight; // force reflow
  classes(el).add(className);
}

function each(obj,fn){
  var has = Object.prototype.hasOwnProperty;
  for (var key in obj){
    if (has.call(obj,key)) fn(key, obj[key]);
  }
}

