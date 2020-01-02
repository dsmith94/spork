"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Game =
/*#__PURE__*/
function (_CoreGameClass) {
  _inherits(Game, _CoreGameClass);

  _createClass(Game, [{
    key: "buildFooterText",
    value: function buildFooterText() {
      return "Score: 0";
    }
  }]);

  function Game() {
    var _this;

    _classCallCheck(this, Game);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Game).call(this));
    _this.registry = new Map([['lovesBooks', false]]);
    _this.map = new Map([['inTheLibrary', new InTheLibrary()]]);
    _this.playerNoun = "you";
    _this.turns = 0;
    _this.currentRoom = _this.map.get('inTheLibrary');
    _this.prefaceText = applyEmphasis("This is a template game. Mostly I use it to do testing.");
    return _this;
  }

  return Game;
}(CoreGameClass);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Array.prototype.shuffle = function () {
  for (var i = this.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    var _ref = [this[rand], this[i]];
    this[i] = _ref[0];
    this[rand] = _ref[1];
  }
};

function randomText(array) {
  array.shuffle();
  return array[0];
}

function rng(i) {
  var v = Math.floor(Math.random() * (i + 1));
  return v;
}

var CoreGameClass =
/*#__PURE__*/
function () {
  function CoreGameClass() {
    _classCallCheck(this, CoreGameClass);

    this.map = new Map();
    this.currentNPCConversing = '';
    this.messages = [];
    this.currentExit = "";
    this.environmentalMessages = [];
    this.mode = "normal";
    this.inventory = [];
  }

  _createClass(CoreGameClass, [{
    key: "buildHeaderText",
    value: function buildHeaderText() {
      return "";
    }
  }, {
    key: "buildFooterText",
    value: function buildFooterText() {
      return "";
    }
  }, {
    key: "inInventory",
    value: function inInventory(id) {
      if (this.inventory.indexOf(id) > -1) {
        return true;
      }

      return false;
    }
  }, {
    key: "handleRoomTransfer",
    value: function handleRoomTransfer(id) {
      var r = this.map.get(id);
      var e = document.getElementById('Actions');

      if (r) {
        if (e) {
          e.innerHTML = "";
        }

        this.currentExit = "".concat(id);

        if (typeof this.currentRoom.exitText === "function") {
          var t = this.currentRoom.exitText();

          if (t) {
            this.mode = "cutscene";
            addDisplayMessage(t);
          }
        }

        this.currentRoom = r;

        if (typeof this.currentRoom.enterText === "function") {
          var t = this.currentRoom.enterText();

          if (t) {
            this.mode = "cutscene";
            addDisplayMessage(t);
          }
        }

        this.currentExit = "";
        showRoom();
      }
    }
  }]);

  return CoreGameClass;
}();

function addEnvironmentalMessage(m) {
  if (m) {
    game.environmentalMessages.unshift(m);
  }
}

function addDisplayMessage(m) {
  if (m) {
    game.messages.unshift(m);
  }
}

var Action =
/*#__PURE__*/
function () {
  _createClass(Action, [{
    key: "verb",
    value: function verb() {
      return this.verbText;
    }
  }]);

  function Action(verbText, executeFunction) {
    _classCallCheck(this, Action);

    _defineProperty(this, "verbText", "");

    _defineProperty(this, "executeFunction", "");

    this.verbText = verbText;
    this.executeFunction = executeFunction;
  }

  return Action;
}();

var Thing =
/*#__PURE__*/
function () {
  _createClass(Thing, [{
    key: "noun",
    value: function noun() {
      return "".concat(this.id);
    }
  }, {
    key: "open",
    value: function open() {
      this.isClosed = false;
      return "".concat(this.articleNoun(), " is now opened. ");
    }
  }, {
    key: "close",
    value: function close() {
      this.isClosed = true;
      return "".concat(this.articleNoun(), " is now closed. ");
    }
  }, {
    key: "read",
    value: function read() {
      return "".concat(game.playerNoun, " read ").concat(this.articleNoun(), ", and learn nothing interesting.");
    }
  }, {
    key: "turnOn",
    value: function turnOn() {
      this.isOn = true;
      return "".concat(game.playerNoun, " turn on ").concat(this.articleNoun(), ".");
    }
  }, {
    key: "turnOff",
    value: function turnOff() {
      this.isOn = false;
      return "".concat(game.playerNoun, " turn off ").concat(this.articleNoun(), ".");
    }
  }, {
    key: "buildDefaultActions",
    value: function buildDefaultActions() {
      var a = [];

      if (this.canBeOpened) {
        if (this.isClosed === true) {
          a.push(new Action("open", "open"));
        } else if (this.isClosed === false) {
          a.push(new Action("close", "close"));
        }
      }

      if (this.canBeTurnedOn) {
        if (this.isOn === true) {
          a.push(new Action("turn off", "turnOff"));
        } else if (this.isOn === false) {
          a.push(new Action("turn on", "turnOn"));
        }
      }

      if (this.canBeRead) {
        a.push(new Action("read", "read"));
      }

      return a;
    }
  }, {
    key: "customActions",
    value: function customActions() {
      return [];
    }
  }, {
    key: "focus",
    value: function focus() {
      return "";
    }
  }, {
    key: "articleNoun",
    value: function articleNoun() {
      return "the ".concat(this.noun());
    }
  }, {
    key: "insertIntoText",
    value: function insertIntoText(container, inserted) {
      return "".concat(game.playerNoun, " put ").concat(inserted.articleNoun(), " into ").concat(container.articleNoun(), ". ");
    }
  }, {
    key: "failedInsertText",
    value: function failedInsertText(container, inserted) {
      return "".concat(game.playerNoun, " can't put ").concat(inserted.articleNoun(), " into ").concat(container.articleNoun(), ". ");
    }
  }, {
    key: "insert",
    value: function insert(thing) {
      if (this.canInsertInto === true && this.contains.indexOf(thing) > -1) {
        this.contains.push(thing);
        return this.insertIntoText(this, thing);
      } else if (this.canInsertInto === false) {
        return this.failedInsertText(this, thing);
      }
    }
  }, {
    key: "getRoom",
    value: function getRoom() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = game.map.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = value.contains[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var thing = _step2.value;

              if (typeof thing.id !== "undefined" && typeof this.id !== "undefined") {
                if (thing.id === this.id) {
                  return key;
                }
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return "";
    }
  }, {
    key: "moveToRoom",
    value: function moveToRoom(room) {
      var current = game.map.get(this.getRoom());
      var nextRoom = game.map.get(room);

      if (nextRoom && current) {
        nextRoom.contains.push(this);
        current.removeThing(this.id);
      }
    }
  }, {
    key: "isIn",
    value: function isIn(room) {
      var r = game.map.get(room);

      if (r) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = r.contains[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var thing = _step3.value;

            if (typeof thing.id !== "undefined" && typeof this.id !== "undefined") {
              if (thing.id === this.id) {
                return true;
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      return false;
    }
  }]);

  function Thing() {
    _classCallCheck(this, Thing);

    this.contains = new Array();
    this.canInsertInto = false;
    this.canBeOpened = false;
    this.isClosed = true;
    this.canBeTurnedOn = false;
    this.isOn = false;
    this.canBeRead = false;
  }

  return Thing;
}();

function buildConversationSuggestions(parentState, parentNPC) {
  var d = "<p> [".concat(game.playerNoun, " can ");
  var i = 0;
  var len = parentState.topics.size - 1;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = parentState.topics.keys()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var t = _step4.value;

      if (i === 0) {
        d = d + "@".concat(t);
      } else if (i === len) {
        d = d + ". Or, ".concat(game.playerNoun, " can @").concat(t, ".] ");
      } else {
        d = d + ", or @".concat(t);
      }

      i++;
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return d;
}

var NPC =
/*#__PURE__*/
function (_Thing) {
  _inherits(NPC, _Thing);

  _createClass(NPC, [{
    key: "properNoun",
    value: function properNoun() {
      return "".concat(this.name);
    }
  }, {
    key: "learnName",
    value: function learnName(name) {
      this.name = name;

      this.properNoun = function () {
        return "".concat(this.name);
      };
    }
  }, {
    key: "noun",
    value: function noun() {
      var n = this.properNoun();

      if (n) {
        return n;
      }

      return "".concat(this.id);
    }
  }, {
    key: "focus",
    value: function focus() {
      var s = this.getState();

      if (s) {
        var focus = s.focus();

        if (focus) {
          return focus;
        }
      }

      return "".concat(this.pronoun(), " doesn't appear to be all the interested in ").concat(game.playerNoun, " right now.");
    }
  }, {
    key: "desc",
    value: function desc() {
      var s = this.states.get(this.currentState);

      if (s) {
        var _t = s.desc(s, this);

        if (_t) {
          return _t;
        }
      }

      return "";
    }
  }, {
    key: "pronoun",
    value: function pronoun() {
      if (this.gender === "him") {
        return "he";
      }

      if (this.gender === "her") {
        return "she";
      }

      return "it";
    }
  }, {
    key: "possesive",
    value: function possesive() {
      if (this.gender === "him") {
        return "his";
      }

      if (this.gender === "her") {
        return "her";
      }

      return "its";
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.states.get(this.currentState);
    }
  }]);

  function NPC() {
    var _this;

    _classCallCheck(this, NPC);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NPC).call(this));

    _defineProperty(_assertThisInitialized(_this), "name", "");

    _this.states = new Map();
    _this.gender = "her";
    _this.currentTopic = '';
    _this.currentState = '';
    _this.timesConversedWith = 0;
    return _this;
  }

  return NPC;
}(Thing);

var NPCState =
/*#__PURE__*/
function () {
  _createClass(NPCState, [{
    key: "hello",
    value: function hello(parentState, parentNPC) {
      return "\"Hello.\"";
    }
  }, {
    key: "bye",
    value: function bye(parentState, parentNPC) {
      return "\"Bye.\"";
    }
  }, {
    key: "getShuffledMessage",
    value: function getShuffledMessage(parentState, parentNPC) {
      var d = randomText(parentState.shuffledMessages);

      if (d) {
        if (typeof parentNPC.id !== "undefined") {
          var id = "$" + parentNPC.id;

          while (d.indexOf(id) > -1) {
            var x = d.indexOf(id);
            var len = parentNPC.id.length;
            d = d.slice(0, x) + "".concat(parentNPC.noun()) + d.slice(x + len + 1, d.length);
          }
        }

        return d;
      }

      return "";
    }
  }, {
    key: "addTopic",
    value: function addTopic(topic, obj) {
      var m = new Map();
      m.set(topic, obj);
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.topics.keys()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          t = _step5.value;
          m.set(t, this.topics.get(t));
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      this.topics = m;
    }
  }, {
    key: "removeTopic",
    value: function removeTopic(topic) {
      this.topics["delete"](topic);
    }
  }, {
    key: "desc",
    value: function desc(parentState, parentNPC) {
      return "";
    }
  }, {
    key: "focus",
    value: function focus() {
      beginConversation(this.id);
    }
  }, {
    key: "conversation",
    value: function conversation(parentState, parentNPC) {
      var t = parentNPC.desc();
      t += buildConversationSuggestions(parentState, parentNPC);
      return t;
    }
  }]);

  function NPCState() {
    _classCallCheck(this, NPCState);

    this.topics = new Map();
    this.hasDiscussed = new Map();
    this.shuffledMessages = [];
  }

  return NPCState;
}();

var Decoration =
/*#__PURE__*/
function (_Thing2) {
  _inherits(Decoration, _Thing2);

  function Decoration() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, Decoration);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Decoration)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this2), "decorationText", "");

    return _this2;
  }

  _createClass(Decoration, [{
    key: "focus",
    value: function focus() {
      return this.decorationText;
    }
  }]);

  return Decoration;
}(Thing);

function decorate(id, focus) {
  var d = new Decoration();
  d.id = id;
  d.decorationText = focus;
  return d;
}

var RoomExit =
/*#__PURE__*/
function (_Thing3) {
  _inherits(RoomExit, _Thing3);

  function RoomExit() {
    var _getPrototypeOf3;

    var _this3;

    _classCallCheck(this, RoomExit);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(RoomExit)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this3), "linkToRoom", "For some reason, you can't seem to go that way.");

    return _this3;
  }

  _createClass(RoomExit, [{
    key: "noun",
    value: function noun() {
      return "exit";
    }
  }, {
    key: "exit",
    value: function exit() {
      return this.linkToRoom;
    }
  }]);

  return RoomExit;
}(Thing);

function exitTo(id, room) {
  var r = new RoomExit();
  r.id = id;

  r.noun = function () {
    return id;
  };

  r.linkToRoom = room;
  return r;
}

var Room =
/*#__PURE__*/
function () {
  _createClass(Room, [{
    key: "getThingById",
    value: function getThingById(str) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.contains[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var t = _step6.value;

          if (t.id !== 'undefined') {
            if (t.id === str.trim()) {
              return t;
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return null;
    }
  }, {
    key: "removeThing",
    value: function removeThing(str) {
      for (var i = 0; i < this.contains.length; ++i) {
        if (this.contains[i].id === str) {
          this.contains.splice(i, 1);
          return;
        }
      }
    }
  }, {
    key: "display",
    value: function display() {
      var d = this.desc();
      this.visited = true;
      return d;
    }
  }, {
    key: "desc",
    value: function desc() {
      return "No room description yet.";
    }
  }]);

  function Room() {
    _classCallCheck(this, Room);

    _defineProperty(this, "environmentalEffects", []);

    this.turns = 0;
    this.visited = false;
    this.contains = [];
  }

  return Room;
}();
"use strict";

var game;
var nextButtonVisible = false;
var skipNextMenuClose = false;

function setStyleSheet(url, filename) {
  var e = document.getElementById(filename);
  skipNextMenuClose = true;

  if (e) {
    e.href = url;
  }
}

function setCrt(value) {
  var e = document.getElementById("PlayScreen");
  skipNextMenuClose = true;

  if (e) {
    if (value) {
      e.className = "crt";
    } else {
      e.className = "";
    }
  }
}

function lookForBreaks(text) {
  var s = "";
  var skip = false;
  var m = "&mdash;";
  var b = "<br>&nbsp;<br>";
  var text = text + " ";
  var length = text.length;
  var i = 0;

  while (i < length) {
    if (text[i] === '<') {
      skip = true;
    }

    if (text[i] === '>') {
      skip = false;
    }

    if (text[i] === '~' && text[i + 1] === '~' && skip === false) {
      s = s + b;
      i++;
    } else if (text[i] === '-' && text[i + 1] === '-' && skip === false) {
      s = s + m;
      i++;
    } else {
      s = s + text[i];
    }

    i++;
  }

  return s;
}

function fixQuotes(str) {
  var skipQuotes = false;
  var s = "";
  var text = lookForBreaks(str);
  var length = text.length;

  for (var i = 0; i < length; i++) {
    if (text[i] === '<') {
      skipQuotes = true;
    }

    if (text[i] === '>') {
      skipQuotes = false;
    }

    if (text[i] === '"' && skipQuotes === false) {
      var getNextChar = text[i + 1];

      if (getNextChar) {
        if (checkValidCharacter(getNextChar) === true) {
          s = s + "&ldquo;";
        } else {
          s = s + "&rdquo;";
        }
      }
    } else if (text[i] === "'" && skipQuotes === false) {
      var getNextChar = text[i - 1];

      if (checkValidCharacter(getNextChar) === true) {
        s = s + "&rsquo;";
      } else {
        s = s + "&lsquo;";
      }
    } else {
      s = s + text[i];
    }
  }

  return s;
}

function checkIfDigit(n) {
  var x = Number(n);

  if (x != NaN) {
    return Boolean([true, true, true, true, true, true, true, true, true, true][x]);
  }

  return false;
}

function checkIfLetter(_char) {
  return _char.toUpperCase() != _char.toLowerCase();
}

function checkValidCharacter(_char2) {
  if (_char2 === ">") {
    return false;
  }

  return _char2.trim() !== '';
}

function handleStringCaps(text) {
  var v = "";
  var text = text + " ";
  var length = text.length;
  var i = 0;
  var skip = false;
  var readyToCap = true;

  while (i < length) {
    if (text[i] === '<') {
      skip = true;
    }

    if (text[i] === '>') {
      skip = false;
    }

    if (skip === false) {
      var c = text[i];

      if (c === "." || c === "!" || c === "?") {
        if (text[i + 1] !== '"') {
          readyToCap = true;
        }

        v = v + c;
      } else if (readyToCap === true && checkIfLetter(c)) {
        v = v + c.toUpperCase();
        readyToCap = false;
      } else {
        v = v + c;
      }
    } else {
      v = v + text[i];
    }

    i++;
  }

  return v;
}

function applyEmphasis(text) {
  return "<div class=\"emphasis\">".concat(text, "</div>");
}

function getIndexOf(str, chr, occ) {
  var k = 0;

  for (var i = 0; i < str.length; ++i) {
    if (str.charAt(i) === chr) {
      k++;
    }

    if (k === occ) {
      return i;
    }
  }

  return 0;
}

function applyDropCaps(text) {
  var firstLetter;
  var remainingText;

  if (text.charAt(0) === "\"" || text.charAt(0) === "'") {
    firstLetter = "".concat(text.charAt(1));
    remainingText = text.slice(2);
  } else {
    firstLetter = text.charAt(0);
    remainingText = text.slice(1);
  }

  var i = getIndexOf(remainingText, " ", 3);

  if (i) {
    remainingText = "<span class=\"smallCaps\">" + remainingText.slice(0, i) + "</span>" + remainingText.slice(i);
  }

  text = "<span class=\"drop\">".concat(firstLetter, "</span>").concat(remainingText);
  return text;
}

function addNextButton() {
  var e = document.getElementById('Actions');

  if (e && nextButtonVisible === false) {
    game.mode = "normal";
    e.innerHTML += "<p><button type=\"submit\" id=\"Next-Button\" onclick=\"showRoom();\">\u279E</button></p>";
    nextButtonVisible = true;
  }
}

function finishSetText(text) {
  var e = document.getElementById("Readout");
  text = applyDropCaps(text);

  if (e) {
    e.style.animation = 'fadein 0.25s';
    e.innerHTML = fixQuotes(text);
  }

  var h = document.getElementById("Page-header");
  var r = document.getElementById("Readout").offsetHeight;
  var f = document.getElementById("Page-footer");
  var t = "";

  if (game.mode === "normal") {
    t = game.buildFooterText();
  }

  h.innerHTML = "<span style=\"text-decoration-line: underline;\">".concat(versionInfo.title, "</span><br /><hr class=\"blurMe\" />");

  if (r < window.innerHeight * 0.75) {
    f.innerHTML = "<hr id=\"Page-hr\" /><br />".concat(t);
  } else {
    f.innerHTML = "<br /><hr /><br />".concat(t);
  }
}

function finishActionAnimation(e) {
  e.style.opacity = 1;
}

function handleTopic(topic) {
  var d = "";
  var npcs = [];
  var things = game.currentRoom.contains;

  if (things) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = things[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        t = _step.value;

        if (typeof t.states !== "undefined") {
          npcs.push(t);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  npcs.sort(function (a, b) {
    return a.priority - b.priority;
  });

  for (var _i = 0, _npcs = npcs; _i < _npcs.length; _i++) {
    n = _npcs[_i];
    n.currentTopic = topic;
    var s = n.getState();

    if (s) {
      var t = s.topics.get(topic);

      if (typeof t === "string") {
        d = d + t;
      } else if (typeof t === "function") {
        var f = t(s, n);

        if (f) {
          d = d + f;
        }
      }
    }

    n.currentTopic = '';
  }

  addDisplayMessage(d);
  showRoom();
}

function beginConversation(npc) {
  var t = getThing(npc);

  if (t) {
    t.currentTopic = '';
    t.timesConversedWith++;
    var s = t.getState();

    if (s) {
      game.currentNPCConversing = npc;
      var c = s.hello(s, t);

      if (c) {
        addDisplayMessage(c);
      }
    }
  }
}

function endConversation() {
  var n = game.currentNPCConversing;
  var t = getThing(n);

  if (t) {
    var s = t.getState();

    if (s) {
      var c = s.bye(s, t);

      if (c) {
        addDisplayMessage(c);
      }
    }
  }

  game.currentNPCConversing = '';
}

function clearActionsPane() {
  var e = document.getElementById('Actions');

  if (e) {
    e.innerHTML = "";
  }

  nextButtonVisible = false;
}

function showRoom() {
  var d = "";
  game.turns += 1;
  game.currentRoom.turns += 1;

  if (game.messages.length > 0) {
    d = game.messages.pop();
    addNextButton();
  } else if (game.currentNPCConversing) {
    var n = game.currentNPCConversing;
    var t = getThing(n);

    if (t) {
      var s = t.getState();

      if (s) {
        var c = s.conversation(s, t);

        if (c) {
          d = d + c;
          clearActionsPane();
        }
      }
    }
  } else {
    d = game.currentRoom.display();
    clearActionsPane();
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = game.environmentalMessages[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var e = _step2.value;
      d = d + " <p> " + e + "</p>";
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  game.environmentalMessages = [];

  if (game.currentRoom.environmentalEffects.length) {
    if (!rng(5) && game.mode === "normal") {
      d = d + " <p> " + randomText(game.currentRoom.environmentalEffects) + "</p>";
    }
  }

  var things = game.currentRoom.contains;

  if (things) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = things[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var thing = _step3.value;

        if (typeof thing.id !== "undefined") {
          while (d.indexOf("$".concat(thing.id)) > -1) {
            var x = d.indexOf("$".concat(thing.id));
            var len = thing.id.length;

            if (game.currentNPCConversing !== thing.id) {
              d = d.slice(0, x) + "<a href=\"javascript:void(0);\" onclick=\"handleThingFocus('".concat(thing.id, "');\">").concat(thing.noun(), "</a>") + d.slice(x + len + 1, d.length);
            } else {
              d = d.slice(0, x) + "".concat(thing.noun()) + d.slice(x + len + 1, d.length);
            }
          }
        }

        if (typeof thing.states !== 'undefined') {
          var state = thing.getState();

          if (state) {
            if (!rng(5) && game.mode === "normal") {
              d = d + " <p> " + state.getShuffledMessage(state, thing) + "</p>";
            }

            var topics = state.topics.keys();

            if (topics) {
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = topics[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  var topic = _step4.value;

                  while (d.indexOf("@".concat(topic)) > -1) {
                    var _x = d.indexOf("@".concat(topic));

                    var _len = topic.length;
                    d = d.slice(0, _x) + "<a href=\"javascript:void(0);\" onclick=\"handleTopic('".concat(topic, "');\">").concat(topic, "</a>") + d.slice(_x + _len + 1, d.length);
                  }
                }
              } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                    _iterator4["return"]();
                  }
                } finally {
                  if (_didIteratorError4) {
                    throw _iteratorError4;
                  }
                }
              }
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  setText(d);
}

function getThing(id) {
  var things = game.currentRoom.contains;

  if (things) {
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = things[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        t = _step5.value;

        if (t.id === id) {
          return t;
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
          _iterator5["return"]();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  }

  return null;
}

function setText(text) {
  var e = document.getElementById("Readout");
  var a = document.getElementById("Actions");

  if (e) {
    var t = handleStringCaps(text);
    e.style.animation = 'fadeout 0.25s';
    window.setTimeout(function () {
      finishSetText(t);
    }, 250);
  }

  if (a) {
    a.style.opacity = 0;
    window.setTimeout(function () {
      finishActionAnimation(a);
    }, 505);
  }
}

function buildActionsHTML(id, actions) {
  var r = "";
  var openTag = "<a href=\"javascript:void(0);\" onclick=\"handleThingAction(";
  var closeTag = "</a>";
  var thing = game.currentRoom.getThingById(id);

  if (id && actions && thing) {
    if (actions.length === 0) {
      return "";
    }

    var len = actions.length - 1;
    r = "<p> [".concat(game.playerNoun, " can ");

    if (actions.constructor.name === "Array") {
      var i = 0;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = actions[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var a = _step6.value;

          var _t = "".concat(openTag, "'").concat(id, "', '").concat(a.executeFunction, "');\">").concat(a.verb()).concat(closeTag);

          if (i === 0) {
            r = r + "".concat(_t);

            if (i === len) {
              r = r + " ".concat(thing.articleNoun(), ".] ");
            }
          } else if (i === len) {
            r = r + " or ".concat(_t, " ").concat(thing.articleNoun(), ".] ");
          } else {
            r = r + ", ".concat(_t);
          }

          i++;
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  } else {
    "Error: failed to build actions list.";
  }

  return handleStringCaps(r);
}

function handleThingFocus(str) {
  var thing = game.currentRoom.getThingById(str);
  var e = document.getElementById('Actions');
  clearActionsPane();

  if (thing) {
    var t = "";

    if (typeof thing.exit === "function") {
      var r = thing.exit();

      if (typeof r === "string") {
        if (game.map.get(r)) {
          game.handleRoomTransfer(r);
          return;
        } else {
          t = t + r;
        }
      }
    } else if (typeof thing.focus === "function") {
      var actions = thing.buildDefaultActions();
      var a = thing.customActions();

      if (a.constructor.name === "Array") {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = a[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var i = _step7.value;

            if (i.constructor.name === "Action") {
              actions.push(i);
            } else if (typeof i === "string") {
              actions.push(new Action(i, i));
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }
      } else if (a.constructor.name === "Action") {
        actions.push(a);
      } else if (typeof a === "string") {
        actions.push(new Action(a, a));
      }

      var f = thing.focus();

      if (f) {
        t = t + f;
      }
    }

    if (e) {
      e.innerHTML = buildActionsHTML(thing.id, actions);
    }

    addDisplayMessage(t);
    showRoom();
  }
}

function handleThingAction(str, func) {
  var thing = game.currentRoom.getThingById(str);
  clearActionsPane();

  if (thing) {
    var t = "";

    if (typeof thing[func] === "function") {
      var r = thing[func]();

      if (typeof r === "string") {
        t += r;
      }
    }

    clearActionsPane();
    addDisplayMessage(t);
    showRoom();
  }
}

function closeTopMenu() {
  if (skipNextMenuClose === true) {
    skipNextMenuClose = false;
    return;
  }

  var e = document.getElementById("MenuScreen");
  var p = document.getElementById("PlayScreen");

  if (e) {
    e.style.animation = 'slideup 0.25s';
  }

  if (p) {
    p.style.animation = 'halfunfade 0.25s';
  }

  setTimeout(function () {
    finishCloseTopMenu();
  }, 0.25);
}

function finishCloseTopMenu() {
  var e = document.getElementById("MenuScreen");
  var p = document.getElementById("PlayScreen");

  if (e) {
    e.style.top = "-100%";
    e.style.height = "0";
  }

  if (p) {
    p.style.pointerEvents = "auto";
    p.style.opacity = 1;
  }

  document.removeEventListener("click", closeTopMenu);
}

function openTopMenu() {
  var e = document.getElementById("MenuScreen");
  var p = document.getElementById("PlayScreen");

  if (e) {
    e.style.animation = 'slidedown 0.25s';
  }

  if (p) {
    p.style.animation = 'halffade 0.25s';
  }

  setTimeout(function () {
    finishOpenTopMenu();
  }, 0.25);
}

function finishOpenTopMenu() {
  var e = document.getElementById("MenuScreen");
  var p = document.getElementById("PlayScreen");

  if (e) {
    e.style.pointerEvents = "auto";
    e.style.top = "0";
    e.style.height = "90%";
  }

  if (p) {
    p.style.opacity = .5;
    p.style.pointerEvents = "none";
  }

  document.addEventListener("click", closeTopMenu);
}

function startGame() {
  window.addEventListener("orientationchange", function () {//refreshScreen();
  });
  game = new Game();
  document.title = versionInfo.title;

  if (game.prefaceText) {
    game.mode = "cutscene";
    setText(game.prefaceText);
    setTimeout(function () {
      addNextButton();
    }, 1000);
  } else {
    showRoom();
  }
}

window.addEventListener('load', function (event) {
  startGame();
});
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StartRoom =
/*#__PURE__*/
function (_Room) {
  _inherits(StartRoom, _Room);

  function StartRoom() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StartRoom);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StartRoom)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "contains", []);

    _defineProperty(_assertThisInitialized(_this), "environmentalEffects", []);

    return _this;
  }

  _createClass(StartRoom, [{
    key: "desc",
    value: function desc() {
      return "This is an empty room.";
    }
  }]);

  return StartRoom;
}(Room);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StartRoom =
/*#__PURE__*/
function (_Room) {
  _inherits(StartRoom, _Room);

  function StartRoom() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StartRoom);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StartRoom)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "contains", []);

    _defineProperty(_assertThisInitialized(_this), "environmentalEffects", []);

    return _this;
  }

  _createClass(StartRoom, [{
    key: "desc",
    value: function desc() {
      return "This is an empty room.";
    }
  }]);

  return StartRoom;
}(Room);
"use strict";

var versionInfo = {
  IFID: '6F089461-A65E-4C94-BFBE-ECD58799096E',
  title: 'Game Name',
  byline: 'Author Name',
  tags: ['comic', 'comedy'],
  version: '0.1a',
  authorEmail: 'authorname <author@email.com>',
  desc: "Detailed game description goes here. "
};

//# sourceMappingURL=index.js.map