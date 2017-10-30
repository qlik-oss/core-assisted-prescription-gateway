/**
 * @qlik/picasso-hammer v0.33.0
 * Copyright (c) 2017 QlikTech International AB
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.picassoHammer = factory());
}(this, (function () { 'use strict';

var translateKnownTypes = {
  click: 'Tap',
  Click: 'Tap',
  tap: 'Tap',
  pan: 'Pan',
  swipe: 'Swipe',
  rotate: 'Rotate',
  press: 'Press',
  pinch: 'Pinch'
};

/**
 * Helper function for translating typical non-hammer gesture to a hammer gesture. Currently only supporting 'click'
 * @param {String} type Gesture type
 * @private
 */
function getGestureType(type) {
  return translateKnownTypes[type] || type;
}

/**
 * Manages event handlers for HammerJS. Assumes Hammer is loaded and added to the global namespace
 */
function hammer(chart, mediator, element) {
  var settings = void 0;
  var instance = void 0;
  var mc = void 0;
  var key = void 0;
  var hammerGestures = [];
  var isOn = true;
  /**
   * Set default settings
   * @private
   */
  function setDefaultSettings(newSettings) {
    key = newSettings.key;
    settings = newSettings;
    instance = { chart: chart, mediator: mediator, settings: settings };
    settings.gestures = settings.gestures || [];
    if (settings.enable === undefined) {
      settings.enable = true;
    }
  }

  /**
   * @private
   * add hammer recognizers based on settings
   */
  function addRecognizers() {
    if (typeof settings.enable === 'function') {
      settings.enable = settings.enable.bind(instance)();
    }
    if (!settings.enable) {
      return; // interaction is disabled
    }
    settings.gestures.forEach(function (gesture) {
      gesture.options = gesture.options || {};
      // handle action enable
      if (gesture.options.enable === undefined) {
        gesture.options.enable = true;
      }
      if (typeof gesture.options.enable === 'function') {
        gesture.options.enable = gesture.options.enable.bind(instance);
      }
      // setup hammer gestures
      var type = getGestureType(gesture.type);
      if (Hammer && Hammer[type]) {
        gesture.options.event = gesture.options.event || gesture.type.toLowerCase();
        mc = mc || new Hammer.Manager(element);
        mc.add(new Hammer[type](gesture.options));
        Object.keys(gesture.events).forEach(function (eventName) {
          gesture.events[eventName] = gesture.events[eventName].bind(instance);
          mc.on(eventName, gesture.events[eventName]);
        });
        hammerGestures.push(gesture);
      }
    });

    // setup mixing hammer gestures
    settings.gestures.forEach(function (gesture) {
      var type = getGestureType(gesture.type);
      if (Hammer && Hammer[type]) {
        if (gesture.recognizeWith) {
          mc.get(gesture.options.event).recognizeWith(gesture.recognizeWith.split(' ').filter(function (e) {
            return e !== '';
          }));
        }
        if (gesture.requireFailure) {
          mc.get(gesture.options.event).requireFailure(gesture.requireFailure.split(' ').filter(function (e) {
            return e !== '';
          }));
        }
      }
    });
  }
  /**
   * @private
   * removes all added hammer recognizers and native events
   */
  function removeAddedEvents() {
    // remove hammer recognizers and registered events
    hammerGestures.forEach(function (gesture) {
      Object.keys(gesture.events).forEach(function (eventName) {
        mc.off(eventName, gesture.events[eventName]);
      });
      mc.remove(gesture.options.event);
    });
    hammerGestures = [];
  }

  return {
    /**
     * Getter for the key.
     */
    get key() {
      return key;
    },
    /**
     * Updates this with new settings
     * @typedef settings
     * @type {object}
     * @property {string} [type] - The interaction type. Is 'hammer' for this component
     * @property {boolean|function} [enable] - Should the interaction be enabled or not.
     * This is only run when adding event handlers. In effect at startup, update or during on/off.
     * It does not run during every event loop.
     * @property {object} [events] - The keys in this object is the names of native events
     * that should be added to the chart element and they should all point to function which
     * will be the corresponding event handler.
     */
    set: function set(newSettings) {
      setDefaultSettings(newSettings);
      removeAddedEvents();
      if (isOn) {
        addRecognizers();
      }
    },

    /**
     * Turns off interactions
     */
    off: function off() {
      isOn = false;
      removeAddedEvents();
    },

    /**
     * Turns off interactions
     */
    on: function on() {
      isOn = true;
      if (hammerGestures.length === 0) {
        addRecognizers();
      }
    },

    /**
     * Destroys and unbinds all event handlers
     */
    destroy: function destroy() {
      removeAddedEvents();
      if (mc) {
        mc.destroy();
      }
      mc = null;
      instance = null;
      settings = null;
    }
  };
}

function initialize(picasso) {
  picasso.interaction('hammer', hammer);
}

return initialize;

})));
//# sourceMappingURL=picasso-hammer.js.map
