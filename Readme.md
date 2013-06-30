
# multi-view

  Multiple-state views controller.  Lets you define multiple reactive
  template/view pairs and easily transition between them from within your
  views.

## Installation

    $ component install ericgj/multi-view

## Motivation

  You have multiple views of a given model, which can't easily be captured
  by a single template and styling, and you want to swap them out in the
  same place on the page. Also, you want to be able to transition between
  them based on user events within any of the views.

  This library encapsulates that kind of behavior and provides and alternative
  to managing 'view mode' externally between two or more template/views.

  I put scare-quotes around _view mode_ because of course no one wants _modal
  interfaces_ if we can help it. My hope is that the baggage associated
  with the term 'modal'  will eventually fade away with the amazing UI
  possibilities we have now, where modes and mode transitions do not have
  to be invisible to the user nor force the user into a synchronous response.
  
## API

### MultiView( rootEl:String|Element )

  Constructor; specify root element which templates are appended under.

### MultiView#mode( name:String, template:String, view:Function )

  Define mode with given name, reactive template (String), and view class

### MultiView#render( model:Object, mode:String )

  Transition to given mode, building view with given model and swapping in
  the built template.

### MultiView#transitioned( className:String )

  Element class name which is added after templates are swapped in; used
  for CSS transitions.

## Events

Two events are emitted after mode transitions:

### 'change', lastMode, mode

### mode, lastMode


## Notes

### How to transition between views from within your views

  Your handler should emit the name of the mode you want to transition to.
  For instance with a template like:
  
  ```html
    <button on-click="special">Go to special mode</button>
  ```

  in your view:

  ```javascript
    MyView.prototype = new Emitter;
    MyView.prototype.special = function(){
      this.emit('special');
    }
  ```

  MultiView handles the rest of the mechanics of the transition.

  If you don't need to transition within your views, your views do not 
  have to inherit Emitter methods.
  

## License

  MIT
