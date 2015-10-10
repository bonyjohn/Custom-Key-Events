/**
	@author: Bony John
	@doc: This class is used for creating custom key events
*/
var keyEvent = (function() {
    var instance
    var eventDict = new Object();
    var keyCode = {
        "backspace": 8,
        "tab": 9,
        "enter": 13,
        "shift": 16,
        "ctrl": 17,
        "alt": 18,
        "pause": 19,
        "caps lock": 20,
        "escape": 27,
        "page up": 33,
        "page down": 34,
        "end": 35,
        "home": 36,
        "left arrow": 37,
        "up arrow": 38,
        "right arrow": 39,
        "down arrow": 40,
        "insert": 45,
        "delete": 46,
        "0": 48,
        "1": 49,
        "2": 50,
        "3": 51,
        "4": 52,
        "5": 53,
        "6": 54,
        "7": 55,
        "8": 56,
        "9": 57,
        "a": 65,
        "b": 66,
        "c": 67,
        "d": 68,
        "e": 69,
        "f": 70,
        "g": 71,
        "h": 72,
        "i": 73,
        "j": 74,
        "k": 75,
        "l": 76,
        "m": 77,
        "n": 78,
        "o": 79,
        "p": 80,
        "q": 81,
        "r": 82,
        "s": 83,
        "t": 84,
        "u": 85,
        "v": 86,
        "w": 87,
        "x": 88,
        "y": 89,
        "z": 90
    };
    var __keyEvent_key_list__ = new Array();

    function keyEvent() {

    }

    function __keyEvent__keyboard_init__() {
        if (document.addEventListener) {
            document.addEventListener("keydown", __keyEvent__keydown__, false);
            document.addEventListener("keypress", __keyEvent__keypress__, false);
            document.addEventListener("keyup", __keyEvent__keyup__, false);
        } else if (document.attachEvent) {
            document.attachEvent("onkeydown", __keyEvent__keydown__);
            document.attachEvent("onkeypress", __keyEvent__keypress__);
            document.attachEvent("onkeyup", __keyEvent__keyup__);
        } else {
            document.onkeydown = __keyEvent__keydown__;
            document.onkeypress = __keyEvent__keypress__;
            document.onkeyup = __keyEvent__keyup__;
        }
    }


    function __keyEvent__keydown__(__keyEvent__event__) {
        if (__keyEvent_key_list__.indexOf(__keyEvent__event__.keyCode) == -1) {
            __keyEvent_key_list__.push(__keyEvent__event__.keyCode);
        }
        var joinDet = __keyEvent_key_list__.join('+');
        if (eventDict[joinDet] != undefined) {
            __keyEvent_key_list__ = [];
            eventDict[joinDet]();
        }
        return true;
    }

    function __keyEvent__keyup__(__keyEvent__event__) {
        var pos = __keyEvent_key_list__.indexOf(__keyEvent__event__.keyCode);
        __keyEvent_key_list__.splice(pos, 1);
        return true;
    }

    function __keyEvent__keypress__(__keyEvent__event__) {

    }

    keyEvent.prototype = {

        init: function() {
            __keyEvent__keyboard_init__();
        },
        onPress: function(command, callback) {
            if (command.indexOf('+') !== -1) {
                var codeCombo = new Array();
                var keys = command.split('+');
                for (var i = 0; i < keys.length; i++) {
                    code = keyCode[keys[i].toLowerCase()];
                    codeCombo.push(code);
                }
                eventDict[codeCombo.join('+')] = callback;
            }
        }

    }

    return {
        getInstance: function() {
            if (instance == null) {
                instance = new keyEvent();
                instance.init();
                delete keyEvent.prototype.init;
            }
            return instance;
        }
    };

})();
