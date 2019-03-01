window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AnimConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b05d4GBFmpJNKSKVZ3qfUlj", "AnimConfig");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Anim;
    (function(Anim) {
      var _a;
      Anim.animConfig = (_a = {}, _a["\u4e09\u5e26\u4e8c"] = {
        path: "game/pdk/animation/3dai2/3dai2-puke_2",
        animName: "Animation1"
      }, _a["\u987a\u5b50"] = {
        path: "game/pdk/animation/shunzi/shunzi-puke",
        animName: "Animation1"
      }, _a["\u8fde\u5bf9"] = {
        path: "game/pdk/animation/liandui/liandui-puke_1",
        animName: "Animation1"
      }, _a["\u98de\u673a"] = {
        path: "game/pdk/animation/feiji/feiji-puke",
        animName: "Animation1"
      }, _a["\u56db\u5e26\u4e09"] = {
        path: "game/pdk/animation/4dai3/4dai3-puke_1",
        animName: "Animation1"
      }, _a["\u70b8\u5f39"] = {
        path: "game/pdk/animation/zhadan/zhadan-puke",
        animName: "Animation1"
      }, _a);
    })(Anim = exports.Anim || (exports.Anim = {}));
    cc._RF.pop();
  }, {} ],
  Animation1: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b837jRvslME51OIyncYqij", "Animation1");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Game;
    (function(Game) {
      var Animation = function(_super) {
        __extends(Animation, _super);
        function Animation() {
          var _this = _super.call(this) || this;
          _this.callList = [];
          _this.isInited = false;
          return _this;
        }
        Animation.prototype.setConfig = function(animateParams) {
          this.animateParams = animateParams;
          this.loadAnimation();
        };
        Animation.prototype.loadAnimation = function() {
          var m = this;
          cc.loader.loadRes(this.animateParams.path, sp.SkeletonData, function(err, asset) {
            if (err) return;
            m.skeleton = m.addComponent(sp.Skeleton);
            m.skeleton.skeletonData = asset;
            m.isInited = true;
            m.loadComp();
          });
        };
        Animation.prototype.onLoaded = function(callfunc) {
          this.isInited ? callfunc() : this.callList.push(callfunc);
        };
        Animation.prototype.play = function(animateName, isLoop) {
          var _this = this;
          void 0 === isLoop && (isLoop = false);
          this.onLoaded(function() {
            _this._play(animateName, isLoop);
          });
        };
        Animation.prototype._play = function(animateName, isLoop) {
          this.skeleton.setAnimation(0, animateName, isLoop);
        };
        Animation.prototype.loadComp = function() {
          this.callList.forEach(function(v) {
            v();
          });
        };
        Animation.prototype.clear = function() {
          this.onLoaded(function() {});
        };
        return Animation;
      }(cc.Node);
      Game.Animation = Animation;
    })(Game = exports.Game || (exports.Game = {}));
    cc._RF.pop();
  }, {} ],
  Animation: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "81738TUex1C1aY8fycAjRLo", "Animation");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ResLoader_1 = require("./ResLoader");
    var Game;
    (function(Game) {
      var Animation = function(_super) {
        __extends(Animation, _super);
        function Animation() {
          var _this = _super.call(this) || this;
          _this.callList = [];
          _this.isInited = false;
          return _this;
        }
        Animation.prototype.setConfig = function(animateParams) {
          this.animateParams = animateParams;
          this.loadAnimation();
        };
        Animation.prototype.loadAnimation = function() {
          var _this = this;
          ResLoader_1.resLoader.loadResDir(this.animateParams.path).then(function(assets) {
            _this.armatureDisplay = _this.addComponent(dragonBones.ArmatureDisplay);
            for (var i = 0; i < assets.length; i++) {
              assets[i] instanceof dragonBones.DragonBonesAsset && (_this.armatureDisplay.dragonAsset = assets[i]);
              assets[i] instanceof dragonBones.DragonBonesAtlasAsset && (_this.armatureDisplay.dragonAtlasAsset = assets[i]);
            }
            _this.armatureDisplay.armatureName = _this.animateParams.armatureName;
            _this.animateParams.compCallFunc && _this.armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, _this.animateParams.compCallFunc);
            _this.isInited = true;
            _this.loadComp();
          });
        };
        Animation.prototype.onLoaded = function(callfunc) {
          this.isInited ? callfunc() : this.callList.push(callfunc);
        };
        Animation.prototype.play = function(animateName, playTimes) {
          var _this = this;
          void 0 === playTimes && (playTimes = -1);
          this.onLoaded(function() {
            _this._play(animateName, playTimes);
          });
        };
        Animation.prototype._play = function(animateName, playTimes) {
          void 0 === playTimes && (playTimes = -1);
          this.armatureDisplay.playAnimation(animateName, playTimes);
        };
        Animation.prototype.loadComp = function() {
          this.callList.forEach(function(v) {
            v();
          });
        };
        Animation.prototype.clear = function() {
          this.onLoaded(function() {});
        };
        return Animation;
      }(cc.Node);
      Game.Animation = Animation;
    })(Game = exports.Game || (exports.Game = {}));
    cc._RF.pop();
  }, {
    "./ResLoader": "ResLoader"
  } ],
  Async: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe5ceFxGG1HPKwM+QgL8L87", "Async");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Tools_1 = require("./Tools");
    var async;
    (function(async) {
      var runInNextFrame = Tools_1.Tools.runInNextFrame;
      function createPromise(bindNode, executor) {
        var promise = new Promise(function(resolve, _reject) {
          bindNode.isValid ? executor(resolve, _reject) : _reject("Node is removed");
        });
        promise.catch(function(reason) {
          reason && console.log("promise finished:" + reason.toString());
        });
        return promise;
      }
      async.createPromise = createPromise;
      function solve(bindNode) {
        return bindNode.isValid ? Promise.resolve() : Promise.reject("Node is removed");
      }
      async.solve = solve;
      function all(bindNode, values) {
        return bindNode.isValid ? Promise.all(values) : Promise.reject("Node is removed");
      }
      async.all = all;
      function wait(conditionFunc, bindNode) {
        Tools_1.Tools.isUndefined(bindNode) && (bindNode = cc.director.getScene());
        return new Promise(function(resolve, reject) {
          var check = function() {
            if (bindNode && !bindNode.isValid) {
              reject("Node is removed");
              return;
            }
            conditionFunc() ? resolve() : runInNextFrame(check);
          };
          check();
        });
      }
      async.wait = wait;
      function delay(time) {
        var node = cc.director.getScene();
        return createPromise(node, function(resolve, reject) {
          var func = function() {
            cc.director.getScheduler().unschedule(func, node);
            resolve();
          };
          cc.director.getScheduler().schedule(func, node, time);
        });
      }
      async.delay = delay;
      function series(arr, cb) {
        void 0 === cb && (cb = null);
        function trigger(i) {
          i === arr.length ? cb && cb() : arr[i](function() {
            trigger(i + 1);
          });
        }
        trigger(0);
      }
      async.series = series;
      function waterfall(arr, cb) {
        void 0 === cb && (cb = null);
        function trigger(i, data) {
          i === arr.length ? cb && cb(data) : arr[i](data, function(d) {
            trigger(i + 1, d);
          });
        }
        trigger(0);
      }
      async.waterfall = waterfall;
      function parallel(arr, cb) {
        void 0 === cb && (cb = null);
        var counter = arr.length;
        counter > 0 ? arr.forEach(function(v, i) {
          v(function() {
            counter--;
            0 === counter && cb && cb();
          });
        }) : cb && cb();
      }
      async.parallel = parallel;
    })(async = exports.async || (exports.async = {}));
    cc._RF.pop();
  }, {
    "./Tools": "Tools"
  } ],
  BaseAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7f9e5rf9rJGfKVax6ljEuyY", "BaseAction");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseAction = function(_super) {
      __extends(BaseAction, _super);
      function BaseAction() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.isInited = false;
        _this.callList = [];
        return _this;
      }
      BaseAction.prototype.onLoaded = function(callfunc) {
        this.isInited ? callfunc() : this.callList.push(callfunc);
      };
      BaseAction.prototype.onInitWrap = function() {
        this.isInited = true;
        for (var _i = 0, _a = this.callList; _i < _a.length; _i++) {
          var callback = _a[_i];
          callback();
        }
      };
      BaseAction.prototype.clearCallList = function() {
        this.callList.length = 0;
      };
      return BaseAction;
    }(cc.Node);
    exports.BaseAction = BaseAction;
    cc._RF.pop();
  }, {} ],
  BaseProto: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e114dtegjZCrpo6lRQP8akX", "BaseProto");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ProtoTools_1 = require("./ProtoTools");
    var NetMgr_1 = require("./NetMgr");
    var Tools_1 = require("../tools/Tools");
    var ViewMgr_1 = require("../../logic/common/views/ViewMgr");
    require("String");
    var BaseProto = function(_super) {
      __extends(BaseProto, _super);
      function BaseProto() {
        var _this = _super.call(this) || this;
        _this.msgIndex = 0;
        _this.handleProto();
        return _this;
      }
      BaseProto.prototype.handleProto = function() {
        var _this = this;
        if (this.__isbuilded) return;
        this.__isbuilded = true;
        var me = this;
        if (Tools_1.Tools.isNullOrUndefined(this.__protocolList)) return;
        this.__protocolList.forEach(function(protocolModel) {
          switch (protocolModel.type) {
           case ProtoTools_1.ProtocolModule.ProtoType.Rev:
            var callFunc = function(msg) {
              ViewMgr_1.viewMgr.closeMask();
              if (Tools_1.Tools.isDefined(msg.code) && 200 != msg.code) {
                ViewMgr_1.viewMgr.showTips(msg.msg || "\u5f02\u5e38\u9519\u8bef:{0}".format(msg.code), 2);
                return;
              }
              cc.log("[rev]: ", protocolModel.commandID, msg);
              me[protocolModel.functionKey](msg);
            };
            _this._protoFunc = _this._protoFunc || {};
            _this._protoFunc[protocolModel.commandID] = _this._protoFunc[protocolModel.commandID] || {};
            _this._protoFunc[protocolModel.commandID][_this.msgIndex++] = callFunc;
            NetMgr_1.netMgr.register(protocolModel.commandID, callFunc);
            break;

           case ProtoTools_1.ProtocolModule.ProtoType.Send:
            me[protocolModel.functionKey] = function(msg) {
              var netState = NetMgr_1.netMgr.getNetState();
              if (0 == netState) ViewMgr_1.viewMgr.showTips("\u7f51\u7edc\u5df2\u7ecf\u65ad\u5f00\uff01\uff01", 3); else {
                protocolModel.isShow && ViewMgr_1.viewMgr.showNetMask();
                var netCallFunc = void 0;
                netCallFunc = function(msg) {
                  protocolModel.isShow && ViewMgr_1.viewMgr.closeNetMask();
                };
                cc.log("[send]: ", protocolModel.commandID, msg);
                NetMgr_1.netMgr.send(protocolModel.commandID, msg, netCallFunc);
              }
            };
            break;

           case ProtoTools_1.ProtocolModule.ProtoType.Notify:
            me[protocolModel.functionKey] = function(msg) {
              var netState = NetMgr_1.netMgr.getNetState();
              0 == netState ? ViewMgr_1.viewMgr.showTips("\u7f51\u7edc\u5df2\u7ecf\u65ad\u5f00\uff01\uff01", 3) : NetMgr_1.netMgr.notify(protocolModel.commandID, msg);
            };
          }
        });
      };
      BaseProto.prototype.cleanup = function() {
        var _this = this;
        if (!this.__isbuilded) return;
        this.__isbuilded = void 0;
        var me = this;
        if (Tools_1.Tools.isNullOrUndefined(this.__protocolList)) return;
        me.__protocolList.forEach(function(protocolModel) {
          switch (protocolModel.type) {
           case ProtoTools_1.ProtocolModule.ProtoType.Rev:
            var routeList = _this._protoFunc[protocolModel.commandID];
            if (Tools_1.Tools.isNullOrUndefined(routeList)) break;
            for (var key in routeList) {
              var func = routeList[key];
              NetMgr_1.netMgr.unregister(protocolModel.commandID, func);
            }
          }
        });
        me.__protocolList = void 0;
        this.msgIndex = 0;
      };
      return BaseProto;
    }(cc.EventTarget);
    exports.BaseProto = BaseProto;
    cc._RF.pop();
  }, {
    "../../logic/common/views/ViewMgr": "ViewMgr",
    "../tools/Tools": "Tools",
    "./NetMgr": "NetMgr",
    "./ProtoTools": "ProtoTools",
    String: "String"
  } ],
  BaseUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1f7aeCDzz9I7r0dJmLeobHj", "BaseUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UITools_1 = require("./UITools");
    var UIUnit = function() {
      function UIUnit() {}
      UIUnit.prototype.show = function() {
        this.ui.active = true;
        return this;
      };
      UIUnit.prototype.hide = function() {
        this.ui.active = false;
        return this;
      };
      UIUnit.prototype.onInitWrap = function() {
        this.onInit();
      };
      UIUnit.prototype.onInit = function() {};
      UIUnit.prototype.addChild = function(child, zIndex, name) {
        child instanceof cc.Node ? this.ui.addChild(child, zIndex, name) : child.addTo(this.ui);
      };
      UIUnit.prototype.getUIComponent = function(comp) {
        return UITools_1.UITools.getUIComponent(this, comp);
      };
      UIUnit.prototype.setPosition = function(pos) {
        this.ui.setPosition(pos);
        return this;
      };
      UIUnit.prototype.setRotation = function(rotation) {
        this.ui.setRotation(rotation);
        return this;
      };
      UIUnit.prototype.setScale = function(scaleX, scaleY) {
        this.ui.setScale(scaleX, scaleY);
        return this;
      };
      UIUnit.prototype.setVisible = function(isVisible) {
        this.ui.active = isVisible;
        return this;
      };
      UIUnit.prototype.stopAllActions = function() {
        this.ui.stopAllActions();
        return this;
      };
      UIUnit.prototype.setAnchorPoint = function(x, y) {
        this.ui.setAnchorPoint(cc.v2(x, y));
      };
      UIUnit.prototype.runAction = function(action) {
        this.ui.runAction(action);
        return this;
      };
      UIUnit.prototype.startUpdate = function(interval) {
        if (this.updateHandler) return this;
        this.updateHandler = this.onUpdate.bind(this);
        cc.director.getScheduler().schedule(this.updateHandler, this.ui, interval);
        return this;
      };
      UIUnit.prototype.stopUpdate = function() {
        if (this.updateHandler) {
          cc.director.getScheduler().unschedule(this.updateHandler, this.ui);
          delete this.updateHandler;
        }
        return this;
      };
      UIUnit.prototype.onUpdate = function(dt) {};
      __decorate([ UITools_1.UITools.WhenUILoaded() ], UIUnit.prototype, "onInitWrap", null);
      return UIUnit;
    }();
    exports.UIUnit = UIUnit;
    var UIEntity = function(_super) {
      __extends(UIEntity, _super);
      function UIEntity() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._isDestoryed = false;
        return _this;
      }
      UIEntity.prototype.onEnter = function() {};
      UIEntity.prototype.onExit = function() {};
      UIEntity.prototype.onInitWrap = function() {
        var _this = this;
        if (!this.ui._isHanlderByOther) {
          this.ui._isHanlderByOther = true;
          var oldDestory_1 = this.ui.destroy;
          var me_1 = this;
          this.ui.destroy = function() {
            if (me_1.ui._isHanlderByOther) {
              me_1.ui.destroy = oldDestory_1;
              this.emit("removeSelf");
              delete me_1.ui._isHanlderByOther;
              return true;
            }
            me_1.ui.destroy = oldDestory_1;
            return oldDestory_1.call(me_1.ui);
          };
          this.ui.on("removeSelf", function() {
            _this.destory();
          });
          _super.prototype.onInitWrap.call(this);
        }
      };
      UIEntity.prototype.onEnterWrap = function() {
        this.onEnter();
        UITools_1.UITools.eachUIComponent(this, function(value) {
          value.onEnter();
        });
      };
      UIEntity.prototype.onExitWrap = function() {
        UITools_1.UITools.eachUIComponent(this, function(value) {
          value.onExit();
        });
        this.onExit();
      };
      UIEntity.prototype.addTo = function(parent, pos, zIndex, name) {
        if (this._isDestoryed) return this;
        parent = parent || cc.director.getScene();
        pos && this.ui.setPosition(pos);
        zIndex && (this.ui.zIndex = zIndex);
        name && (this.ui.name = name);
        parent.addChild(this.ui);
        this.onEnterWrap();
        return this;
      };
      UIEntity.prototype.destory = function() {
        if (!this._isDestoryed) {
          delete this.ui._isHanlderByOther;
          this._isDestoryed = true;
          this.ui.destroy();
          this.onExitWrap();
        }
      };
      return UIEntity;
    }(UIUnit);
    exports.UIEntity = UIEntity;
    var UIComponent = function(_super) {
      __extends(UIComponent, _super);
      function UIComponent() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UIComponent.prototype.onEnter = function() {};
      UIComponent.prototype.onExit = function() {};
      return UIComponent;
    }(UIUnit);
    exports.UIComponent = UIComponent;
    cc._RF.pop();
  }, {
    "./UITools": "UITools"
  } ],
  BindTools: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e7b52JiU1dOu6mh9wPiuVeD", "BindTools");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Tools_1 = require("../Tools/Tools");
    var BindEventType;
    (function(BindEventType) {
      BindEventType[BindEventType["add"] = 0] = "add";
      BindEventType[BindEventType["update"] = 1] = "update";
      BindEventType[BindEventType["delete"] = 2] = "delete";
      BindEventType[BindEventType["anyEvent"] = 3] = "anyEvent";
    })(BindEventType = exports.BindEventType || (exports.BindEventType = {}));
    function attrChanged(obj, propertyName, newValue, forceTrigger) {
      if (Tools_1.Tools.isUndefined(obj._bind_info)) return;
      obj._bind_info.__attr = obj._bind_info.__attr || {};
      if (!obj._bind_info._observeFunction) {
        obj._bind_info.__attr[propertyName] = newValue;
        return;
      }
      if (!forceTrigger && obj._bind_info.__attr[propertyName] === newValue) return;
      var type;
      type = Tools_1.Tools.isUndefined(newValue) ? BindEventType.delete : BindEventType.update;
      var event = {
        name: propertyName,
        object: obj,
        oldValue: obj._bind_info.__attr[propertyName],
        value: newValue,
        type: type,
        _bind_type: BindType.Attr
      };
      obj._bind_info.__attr[propertyName] = newValue;
      obj._bind_info._observeFunction([ event ]);
    }
    var BindType;
    (function(BindType) {
      BindType[BindType["Attr"] = 0] = "Attr";
      BindType[BindType["Array"] = 1] = "Array";
      BindType[BindType["Map"] = 2] = "Map";
    })(BindType = exports.BindType || (exports.BindType = {}));
    var BindTools = function() {
      function BindTools() {
        this._bind_id = 0;
        this._bind_index = 0;
        this.DefaultArrBindName = "arrListener";
        this.DefaultMapBindName = "mapListener";
      }
      BindTools.prototype.notifyAttrChanged = function(obj, propertyName, newValue, forceTrigger) {
        attrChanged(obj, propertyName, newValue, forceTrigger);
      };
      BindTools.prototype.createSimpleObserveFunction = function(func) {
        return function(event) {
          func(event.newValue, event.name);
        };
      };
      BindTools.prototype.createBindId = function(target) {
        if (Tools_1.Tools.isDefined(target.bindId)) return;
        var curBindId = this._bind_id++;
        Object.defineProperty(target, "bindId", {
          get: function() {
            return curBindId;
          },
          enumerable: false,
          configurable: false
        });
      };
      BindTools.prototype.createBindInfo = function(target) {
        if (Tools_1.Tools.isDefined(target._bind_info)) return;
        this.createBindId(target);
        var bindInfo = {
          _bind_list: {},
          _observeFunction: void 0
        };
        Object.defineProperty(target, "_bind_info", {
          get: function() {
            return bindInfo;
          },
          set: function(value) {
            bindInfo = value;
          },
          enumerable: false,
          configurable: false
        });
      };
      BindTools.prototype.createAttrNotProperty = function(target, propertyName, defaultValue) {
        console.assert(!Tools_1.Tools.isNullOrUndefined(target), "createAttrNotProperty null or undefined object");
        exports.BindTool.createBindInfo(target);
        var bindInfo = target._bind_info;
        bindInfo.__attr = bindInfo.__attr || {};
        if (Tools_1.Tools.isDefined(bindInfo.__attr[propertyName])) return;
        bindInfo.__attr[propertyName] = defaultValue;
      };
      BindTools.prototype.createProperty = function(target, propertyName) {
        console.assert(!Tools_1.Tools.isNullOrUndefined(target), "createProperty null or undefined object");
        this.createBindInfo(target);
        var bindInfo = target._bind_info;
        bindInfo.__attr = bindInfo.__attr || {};
        if (Tools_1.Tools.isDefined(bindInfo.__attr[propertyName])) return;
        var curValue;
        var isExistThisProperty;
        if (Tools_1.Tools.isDefined(target[propertyName])) {
          curValue = target[propertyName];
          delete target[propertyName];
          isExistThisProperty = true;
        }
        Object.defineProperty(target, propertyName, {
          get: function() {
            return this._bind_info && Tools_1.Tools.isDefined(this._bind_info.__attr) ? target._bind_info.__attr[propertyName] : void 0;
          },
          set: function(value) {
            attrChanged(target, propertyName, value);
          },
          enumerable: true,
          configurable: true
        });
        isExistThisProperty && (target[propertyName] = curValue);
      };
      BindTools.prototype.bindEx = function(target, name, func, triggleAtOnce) {
        console.assert(!Tools_1.Tools.isNullOrUndefined(target), "bindEx null or undefined object");
        var isExistValue = Tools_1.Tools.isDefined(target[name]);
        this.createProperty(target, name);
        var bindInfo = target._bind_info;
        bindInfo._bind_list[name] || (bindInfo._bind_list[name] = {});
        bindInfo._bind_list[name][this._bind_index] = func;
        var ret = this._bind_index++;
        this.startObserve(target);
        triggleAtOnce && isExistValue && func({
          target: target,
          name: name,
          oldValue: void 0,
          newValue: target[name],
          eventType: BindEventType.update,
          _bind_type: BindType.Attr
        });
        return ret;
      };
      BindTools.prototype.bindEvent = function(target, eventName, func) {
        console.assert(!Tools_1.Tools.isNullOrUndefined(target), "bindEvent null or undefined object");
        this.createBindInfo(target);
        var bindInfo = target._bind_info;
        bindInfo._bind_list[eventName] = bindInfo._bind_list[eventName] || {};
        bindInfo._bind_list[eventName][this._bind_index] = func;
        var ret = this._bind_index++;
        this.startObserve(target);
        return ret;
      };
      BindTools.prototype.bind = function(target, name, func, triggleAtOnce) {
        return this.bindEx(target, name, this.createSimpleObserveFunction(func), triggleAtOnce);
      };
      BindTools.prototype.bindCollection = function(target, name, func) {
        console.assert(!Tools_1.Tools.isNullOrUndefined(target), "bindCollection null or undefined object");
        this.createBindInfo(target);
        var bindInfo = target._bind_info;
        bindInfo._bind_list[name] = bindInfo._bind_list[name] || {};
        bindInfo._bind_list[name][this._bind_index] = func;
        var ret = this._bind_index++;
        this.startObserve(target);
        return ret;
      };
      BindTools.prototype.unbind = function(target, index) {
        console.assert(!Tools_1.Tools.isNullOrUndefined(target), "unbind null or undefined object");
        var bindInfo = target._bind_info;
        for (var listenName in bindInfo._bind_list) {
          var events = bindInfo._bind_list[listenName];
          if (events[index]) {
            delete events[index];
            return true;
          }
        }
        return false;
      };
      BindTools.prototype.unbindEx = function(target, name, index) {
        console.assert(!Tools_1.Tools.isNullOrUndefined(target), "unbindex null or undefined object");
        var events = target._bind_info._bind_list[name];
        if (events && events[index]) {
          delete events[index];
          return true;
        }
        return false;
      };
      BindTools.prototype.setAttrNoTrigger = function(target, name, value) {
        var bindInfo = target._bind_info;
        Tools_1.Tools.isDefined(bindInfo.__attr[name]) ? bindInfo.__attr[name] = value : target[name] = value;
      };
      BindTools.prototype.unbindAll = function(target) {
        console.assert(!Tools_1.Tools.isNullOrUndefined(target), "unbindAll null or undefined object");
        this.stopObserve(target);
        var bindInfo = target._bind_info;
        delete bindInfo._bind_list;
        bindInfo._bind_list = void 0;
      };
      BindTools.createEventData = function(data) {
        var eventData = void 0;
        data._bind_type == BindType.Array ? eventData = data : data._bind_type == BindType.Attr ? eventData = {
          target: data.object,
          name: data.name,
          oldValue: data.oldValue,
          newValue: data.value,
          eventType: BindEventType[data.type]
        } : data._bind_type == BindType.Map && (eventData = data);
        return eventData;
      };
      BindTools.prototype.startObserve = function(target) {
        var me = this;
        var bindInfo = target._bind_info;
        bindInfo._observeFunction || (bindInfo._observeFunction = function(changes) {
          changes.forEach(function(data) {
            var specEvents = void 0;
            var events = void 0;
            if (data._bind_type == BindType.Array) {
              specEvents = bindInfo._bind_list["__" + data.eventName];
              events = bindInfo._bind_list[me.DefaultArrBindName];
            } else if (data._bind_type == BindType.Attr) {
              specEvents = bindInfo._bind_list["__" + BindEventType[data.type]];
              events = bindInfo._bind_list[data.name];
            } else if (data._bind_type == BindType.Map) {
              specEvents = bindInfo._bind_list["__" + data.eventName];
              events = bindInfo._bind_list[me.DefaultMapBindName];
            }
            if (specEvents) for (var index in specEvents) {
              var event = specEvents[index];
              if (event) {
                var eventData = BindTools.createEventData(data);
                event(eventData);
              }
            }
            if (events) for (var index in events) {
              var event = events[index];
              if (event) {
                var eventData = BindTools.createEventData(data);
                event(eventData);
              }
            }
          });
        });
      };
      BindTools.prototype.updateNoTrigger = function(source, target) {
        for (var attr in source) {
          if (Tools_1.Tools.isFunction(source[attr])) continue;
          var getType = typeof source[attr];
          if ("object" === getType) {
            Tools_1.Tools.isUndefined(target[attr]) && (target[attr] = Tools_1.Tools.newConstructor(source[attr]));
            exports.BindTool.updateNoTrigger(source[attr], target[attr]);
          } else exports.BindTool.setAttrNoTrigger(target, attr, source[attr]);
        }
      };
      BindTools.prototype.stopObserve = function(target) {
        var bindInfo = target._bind_info;
        bindInfo._observeFunction && (bindInfo._observeFunction = void 0);
      };
      return BindTools;
    }();
    exports.BindTools = BindTools;
    exports.BindTool = new BindTools();
    cc._RF.pop();
  }, {
    "../Tools/Tools": "Tools"
  } ],
  CardShuffle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c47895GYz1I1JIpJeHTYhCd", "CardShuffle");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Item = function() {
      function Item() {}
      return Item;
    }();
    exports.Item = Item;
    var CardShuffle = function() {
      function CardShuffle() {
        this.cache = [];
        this.unUseItem = [];
        this.passTime = 0;
      }
      CardShuffle.prototype.awardItem = function() {
        return this.unUseItem.shift();
      };
      CardShuffle.prototype.push = function(msg, time, callFunc, args) {
        var item = this.awardItem();
        item || (item = new Item());
        item.args = args;
        item.callFunc = callFunc;
        item.time = time;
        item.msg = msg;
        this.cache.push(item);
      };
      CardShuffle.prototype.update = function(delta) {
        if (0 == this.passTime && this.cache.length > 0) {
          this.item = this.cache.shift();
          this.item.callFunc && this.item.callFunc(this.item.msg, this.item.args);
          this.passTime = this.item.time;
        }
        if (this.item) {
          this.passTime -= delta;
          if (this.passTime <= 0) {
            this.passTime = 0;
            this.unUseItem.push(this.item);
            this.item = null;
          }
        }
      };
      CardShuffle.prototype.clear = function() {};
      return CardShuffle;
    }();
    exports.CardShuffle = CardShuffle;
    cc._RF.pop();
  }, {} ],
  Card: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "177a2pS7qtGnIjgVk1A407P", "Card");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FileUI_1 = require("../../../../core/view/FileUI");
    var UITools_1 = require("../../../../core/view/UITools");
    var DELAY = .1;
    var CardState;
    (function(CardState) {
      CardState[CardState["None"] = 0] = "None";
      CardState[CardState["STATE_CARD_UP"] = 1] = "STATE_CARD_UP";
      CardState[CardState["STATE_CARD_DOWN"] = 2] = "STATE_CARD_DOWN";
      CardState[CardState["STATE_CARD_GRAY"] = 3] = "STATE_CARD_GRAY";
      CardState[CardState["STATE_CARD_GO"] = 4] = "STATE_CARD_GO";
    })(CardState = exports.CardState || (exports.CardState = {}));
    var Card = function(_super) {
      __extends(Card, _super);
      function Card() {
        var _this = _super.call(this, "game/pdk/ui/prefab/card") || this;
        _this.cardState = CardState.None;
        _this.upDownAct = null;
        return _this;
      }
      Card.prototype.createCard = function(data) {
        var _value = 15 & data;
        var _color = (240 & data) >> 4;
        var _numColor = _color % 2 == 0 ? 1 : 2;
        this.bg_card = "card_blank";
        this.bg_cover = "";
        this.numberValue = "card_value_{0}_{1}".format(_value, _numColor);
        this.color_small = "card_type_small_{0}".format(_color);
        this.color_big = "card_type_big_{0}".format(_color);
      };
      Card.prototype.createCoverCards = function() {
        this.cardState = CardState.None;
        this.bg_card = "card_blank";
        this.bg_cover = "card_cover";
      };
      Card.prototype.setCardState = function(state) {
        this.cardState = state;
      };
      Card.prototype.getCardState = function() {
        return this.cardState;
      };
      Card.prototype.initPosy = function(y) {
        this.y = y;
      };
      Card.prototype.initPosx = function(x) {
        this.x = x;
      };
      Card.prototype.getPosY = function() {
        return this.y;
      };
      Card.prototype.getPosX = function() {
        return this.x;
      };
      Card.prototype.setCardUpHeight = function(height) {
        this.cardHeight = height;
      };
      Card.prototype.getCardUpHeight = function() {
        return this.cardHeight;
      };
      Card.prototype.setCardGray = function() {
        this.ui.color = cc.color(180, 180, 180);
      };
      Card.prototype.setCardNormal = function() {
        this.ui.color = cc.color(255, 255, 255);
      };
      Card.prototype.setCardID = function(cardID) {
        this.cardID = cardID;
      };
      Card.prototype.getCardID = function() {
        return this.cardID;
      };
      Card.prototype.transCardState = function() {
        this.cardState == CardState.STATE_CARD_UP ? this.setCardDown() : this.cardState == CardState.STATE_CARD_DOWN && this.setCardUp();
      };
      Card.prototype.getBoundingBox = function() {
        return this.cardNode.getBoundingBox();
      };
      Card.prototype.setCardDown = function() {
        if (this.cardState == CardState.STATE_CARD_UP) {
          this.cardNode.stopAllActions();
          this.cardState = CardState.STATE_CARD_DOWN;
          this.cardNode.y = this.y + this.cardHeight;
          this.upDownAct = cc.moveTo(DELAY, cc.v2(this.cardNode.x, this.y));
          this.cardNode.runAction(this.upDownAct);
        }
      };
      Card.prototype.setCardUp = function() {
        if (this.cardState == CardState.STATE_CARD_DOWN) {
          this.cardNode.stopAllActions();
          this.cardState = CardState.STATE_CARD_UP;
          this.cardNode.y = this.y;
          this.upDownAct = cc.moveTo(DELAY, cc.v2(this.cardNode.x, this.y + this.cardHeight));
          this.cardNode.runAction(this.upDownAct);
        }
      };
      Card.atlasPath = "game/pdk/texture/card/card";
      __decorate([ UITools_1.UITools.ImageBind("image_value", Card.atlasPath) ], Card.prototype, "numberValue", void 0);
      __decorate([ UITools_1.UITools.ImageBind("image_small_color", Card.atlasPath) ], Card.prototype, "color_small", void 0);
      __decorate([ UITools_1.UITools.ImageBind("image_big_color", Card.atlasPath) ], Card.prototype, "color_big", void 0);
      __decorate([ UITools_1.UITools.ImageBind("click", Card.atlasPath) ], Card.prototype, "bg_card", void 0);
      __decorate([ UITools_1.UITools.ImageBind("cover", Card.atlasPath) ], Card.prototype, "bg_cover", void 0);
      __decorate([ UITools_1.UITools.UIItem("card") ], Card.prototype, "cardNode", void 0);
      return Card;
    }(FileUI_1.UIFileItem);
    exports.Card = Card;
    cc._RF.pop();
  }, {
    "../../../../core/view/FileUI": "FileUI",
    "../../../../core/view/UITools": "UITools"
  } ],
  CommonComp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c81fbzoaTFM74B1RbBDRrDl", "CommonComp");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseUI_1 = require("../../../core/view/BaseUI");
    var CommonUI_1 = require("../entity/CommonUI");
    var FullHoverComp = function(_super) {
      __extends(FullHoverComp, _super);
      function FullHoverComp(zIndex, isBlack) {
        void 0 === zIndex && (zIndex = 0);
        void 0 === isBlack && (isBlack = true);
        var _this = _super.call(this) || this;
        _this.zIndex = zIndex;
        _this.isBlack = isBlack;
        return _this;
      }
      FullHoverComp.prototype.onEnter = function() {
        this.initHover();
        this.hover.addTo(this.ui, cc.Vec2.ZERO, this.zIndex);
      };
      FullHoverComp.prototype.initHover = function() {
        this.isBlack ? this.hover = new CommonUI_1.BlackHover() : this.hover = new CommonUI_1.Hover();
      };
      FullHoverComp.prototype.onExit = function() {
        this.hover.destory();
      };
      return FullHoverComp;
    }(BaseUI_1.UIComponent);
    exports.FullHoverComp = FullHoverComp;
    var ClickToCloseHoverComp = function(_super) {
      __extends(ClickToCloseHoverComp, _super);
      function ClickToCloseHoverComp() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ClickToCloseHoverComp.prototype.initHover = function() {
        var _this = this;
        this.isBlack ? this.hover = new CommonUI_1.BlackHover(function() {
          _this.ui.destroy();
        }) : this.hover = new CommonUI_1.Hover(function() {
          _this.ui.destroy();
        });
      };
      return ClickToCloseHoverComp;
    }(FullHoverComp);
    exports.ClickToCloseHoverComp = ClickToCloseHoverComp;
    cc._RF.pop();
  }, {
    "../../../core/view/BaseUI": "BaseUI",
    "../entity/CommonUI": "CommonUI"
  } ],
  CommonUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0634cL2dchEfYeBDGj8Y8vS", "CommonUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FileUI_1 = require("../../../core/view/FileUI");
    var UITools_1 = require("../../../core/view/UITools");
    var Hover = function(_super) {
      __extends(Hover, _super);
      function Hover(callback) {
        var _this = _super.call(this) || this;
        _this.callback = callback;
        _this.initUI();
        return _this;
      }
      Hover.prototype.initUI = function() {
        this.setUIFile("common/ui/mask");
      };
      Hover.prototype.close = function() {
        this.callback && this.callback();
      };
      __decorate([ UITools_1.UITools.OnItemClick("") ], Hover.prototype, "close", null);
      return Hover;
    }(FileUI_1.UIFileItem);
    exports.Hover = Hover;
    var BlackHover = function(_super) {
      __extends(BlackHover, _super);
      function BlackHover() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BlackHover.prototype.initUI = function() {
        this.setUIFile("common/ui/blackmask");
      };
      return BlackHover;
    }(Hover);
    exports.BlackHover = BlackHover;
    var NetMask = function(_super) {
      __extends(NetMask, _super);
      function NetMask() {
        var _this = _super.call(this, "common/ui/netmask") || this;
        _this.time = .3;
        return _this;
      }
      NetMask.prototype.onEnter = function() {
        this.showMaskTips();
      };
      NetMask.prototype.showMaskTips = function() {
        var _this = this;
        this.rotate.runAction(cc.repeatForever(cc.rotateBy(1, 360)));
        this.imageActive = false;
        var delay = cc.delayTime(this.time);
        var endFunc = cc.callFunc(function() {
          _this.imageActive = true;
        });
        var delayEndTime = cc.delayTime(5);
        var endTimeFunc = cc.callFunc(function() {
          _this.destory();
        });
        this.runAction(cc.sequence(delay, endFunc, delayEndTime, endTimeFunc));
      };
      NetMask.prototype.clickMask = function() {};
      __decorate([ UITools_1.UITools.ActiveBind("hongxing") ], NetMask.prototype, "imageActive", void 0);
      __decorate([ UITools_1.UITools.UIItem("rotate") ], NetMask.prototype, "rotate", void 0);
      __decorate([ UITools_1.UITools.OnItemClick("netbg") ], NetMask.prototype, "clickMask", null);
      return NetMask;
    }(FileUI_1.UIFileItem);
    exports.NetMask = NetMask;
    var Tips = function(_super) {
      __extends(Tips, _super);
      function Tips() {
        return _super.call(this, "common/ui/Tips") || this;
      }
      __decorate([ UITools_1.UITools.TextBind("text") ], Tips.prototype, "text", void 0);
      return Tips;
    }(FileUI_1.UIFileItem);
    exports.Tips = Tips;
    cc._RF.pop();
  }, {
    "../../../core/view/FileUI": "FileUI",
    "../../../core/view/UITools": "UITools"
  } ],
  1: [ function(require, module, exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = "undefined" !== typeof Uint8Array ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len = b64.length;
      if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var validLen = b64.indexOf("=");
      -1 === validLen && (validLen = len);
      var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
      return [ validLen, placeHoldersLen ];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return 3 * (validLen + placeHoldersLen) / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return 3 * (validLen + placeHoldersLen) / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
      for (var i = 0; i < len; i += 4) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = 255 & tmp;
      }
      if (2 === placeHoldersLen) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = 255 & tmp;
      }
      if (1 === placeHoldersLen) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = 255 & tmp;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[63 & num];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (255 & uint8[i + 2]);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      if (1 === extraBytes) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (2 === extraBytes) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }, {} ],
  2: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      var base64 = require("base64-js");
      var ieee754 = require("ieee754");
      var isArray = require("isarray");
      exports.Buffer = Buffer;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.TYPED_ARRAY_SUPPORT = void 0 !== global.TYPED_ARRAY_SUPPORT ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
      exports.kMaxLength = kMaxLength();
      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          arr.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function() {
              return 42;
            }
          };
          return 42 === arr.foo() && "function" === typeof arr.subarray && 0 === arr.subarray(1, 1).byteLength;
        } catch (e) {
          return false;
        }
      }
      function kMaxLength() {
        return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function createBuffer(that, length) {
        if (kMaxLength() < length) throw new RangeError("Invalid typed array length");
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = new Uint8Array(length);
          that.__proto__ = Buffer.prototype;
        } else {
          null === that && (that = new Buffer(length));
          that.length = length;
        }
        return that;
      }
      function Buffer(arg, encodingOrOffset, length) {
        if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) return new Buffer(arg, encodingOrOffset, length);
        if ("number" === typeof arg) {
          if ("string" === typeof encodingOrOffset) throw new Error("If encoding is specified then the first argument must be a string");
          return allocUnsafe(this, arg);
        }
        return from(this, arg, encodingOrOffset, length);
      }
      Buffer.poolSize = 8192;
      Buffer._augment = function(arr) {
        arr.__proto__ = Buffer.prototype;
        return arr;
      };
      function from(that, value, encodingOrOffset, length) {
        if ("number" === typeof value) throw new TypeError('"value" argument must not be a number');
        if ("undefined" !== typeof ArrayBuffer && value instanceof ArrayBuffer) return fromArrayBuffer(that, value, encodingOrOffset, length);
        if ("string" === typeof value) return fromString(that, value, encodingOrOffset);
        return fromObject(that, value);
      }
      Buffer.from = function(value, encodingOrOffset, length) {
        return from(null, value, encodingOrOffset, length);
      };
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        Buffer.prototype.__proto__ = Uint8Array.prototype;
        Buffer.__proto__ = Uint8Array;
        "undefined" !== typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(Buffer, Symbol.species, {
          value: null,
          configurable: true
        });
      }
      function assertSize(size) {
        if ("number" !== typeof size) throw new TypeError('"size" argument must be a number');
        if (size < 0) throw new RangeError('"size" argument must not be negative');
      }
      function alloc(that, size, fill, encoding) {
        assertSize(size);
        if (size <= 0) return createBuffer(that, size);
        if (void 0 !== fill) return "string" === typeof encoding ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
        return createBuffer(that, size);
      }
      Buffer.alloc = function(size, fill, encoding) {
        return alloc(null, size, fill, encoding);
      };
      function allocUnsafe(that, size) {
        assertSize(size);
        that = createBuffer(that, size < 0 ? 0 : 0 | checked(size));
        if (!Buffer.TYPED_ARRAY_SUPPORT) for (var i = 0; i < size; ++i) that[i] = 0;
        return that;
      }
      Buffer.allocUnsafe = function(size) {
        return allocUnsafe(null, size);
      };
      Buffer.allocUnsafeSlow = function(size) {
        return allocUnsafe(null, size);
      };
      function fromString(that, string, encoding) {
        "string" === typeof encoding && "" !== encoding || (encoding = "utf8");
        if (!Buffer.isEncoding(encoding)) throw new TypeError('"encoding" must be a valid string encoding');
        var length = 0 | byteLength(string, encoding);
        that = createBuffer(that, length);
        var actual = that.write(string, encoding);
        actual !== length && (that = that.slice(0, actual));
        return that;
      }
      function fromArrayLike(that, array) {
        var length = array.length < 0 ? 0 : 0 | checked(array.length);
        that = createBuffer(that, length);
        for (var i = 0; i < length; i += 1) that[i] = 255 & array[i];
        return that;
      }
      function fromArrayBuffer(that, array, byteOffset, length) {
        array.byteLength;
        if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError("'offset' is out of bounds");
        if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("'length' is out of bounds");
        array = void 0 === byteOffset && void 0 === length ? new Uint8Array(array) : void 0 === length ? new Uint8Array(array, byteOffset) : new Uint8Array(array, byteOffset, length);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = array;
          that.__proto__ = Buffer.prototype;
        } else that = fromArrayLike(that, array);
        return that;
      }
      function fromObject(that, obj) {
        if (Buffer.isBuffer(obj)) {
          var len = 0 | checked(obj.length);
          that = createBuffer(that, len);
          if (0 === that.length) return that;
          obj.copy(that, 0, 0, len);
          return that;
        }
        if (obj) {
          if ("undefined" !== typeof ArrayBuffer && obj.buffer instanceof ArrayBuffer || "length" in obj) {
            if ("number" !== typeof obj.length || isnan(obj.length)) return createBuffer(that, 0);
            return fromArrayLike(that, obj);
          }
          if ("Buffer" === obj.type && isArray(obj.data)) return fromArrayLike(that, obj.data);
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      function checked(length) {
        if (length >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
        return 0 | length;
      }
      function SlowBuffer(length) {
        +length != length && (length = 0);
        return Buffer.alloc(+length);
      }
      Buffer.isBuffer = function isBuffer(b) {
        return !!(null != b && b._isBuffer);
      };
      Buffer.compare = function compare(a, b) {
        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError("Arguments must be Buffers");
        if (a === b) return 0;
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
         case "hex":
         case "utf8":
         case "utf-8":
         case "ascii":
         case "latin1":
         case "binary":
         case "base64":
         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return true;

         default:
          return false;
        }
      };
      Buffer.concat = function concat(list, length) {
        if (!isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === list.length) return Buffer.alloc(0);
        var i;
        if (void 0 === length) {
          length = 0;
          for (i = 0; i < list.length; ++i) length += list[i].length;
        }
        var buffer = Buffer.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer.isBuffer(string)) return string.length;
        if ("undefined" !== typeof ArrayBuffer && "function" === typeof ArrayBuffer.isView && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) return string.byteLength;
        "string" !== typeof string && (string = "" + string);
        var len = string.length;
        if (0 === len) return 0;
        var loweredCase = false;
        for (;;) switch (encoding) {
         case "ascii":
         case "latin1":
         case "binary":
          return len;

         case "utf8":
         case "utf-8":
         case void 0:
          return utf8ToBytes(string).length;

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return 2 * len;

         case "hex":
          return len >>> 1;

         case "base64":
          return base64ToBytes(string).length;

         default:
          if (loweredCase) return utf8ToBytes(string).length;
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
        }
      }
      Buffer.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        var loweredCase = false;
        (void 0 === start || start < 0) && (start = 0);
        if (start > this.length) return "";
        (void 0 === end || end > this.length) && (end = this.length);
        if (end <= 0) return "";
        end >>>= 0;
        start >>>= 0;
        if (end <= start) return "";
        encoding || (encoding = "utf8");
        while (true) switch (encoding) {
         case "hex":
          return hexSlice(this, start, end);

         case "utf8":
         case "utf-8":
          return utf8Slice(this, start, end);

         case "ascii":
          return asciiSlice(this, start, end);

         case "latin1":
         case "binary":
          return latin1Slice(this, start, end);

         case "base64":
          return base64Slice(this, start, end);

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return utf16leSlice(this, start, end);

         default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
        }
      }
      Buffer.prototype._isBuffer = true;
      function swap(b, n, m) {
        var i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var i = 0; i < len; i += 2) swap(this, i, i + 1);
        return this;
      };
      Buffer.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer.prototype.toString = function toString() {
        var length = 0 | this.length;
        if (0 === length) return "";
        if (0 === arguments.length) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer.prototype.equals = function equals(b) {
        if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return 0 === Buffer.compare(this, b);
      };
      Buffer.prototype.inspect = function inspect() {
        var str = "";
        var max = exports.INSPECT_MAX_BYTES;
        if (this.length > 0) {
          str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
          this.length > max && (str += " ... ");
        }
        return "<Buffer " + str + ">";
      };
      Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (!Buffer.isBuffer(target)) throw new TypeError("Argument must be a Buffer");
        void 0 === start && (start = 0);
        void 0 === end && (end = target ? target.length : 0);
        void 0 === thisStart && (thisStart = 0);
        void 0 === thisEnd && (thisEnd = this.length);
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
        if (thisStart >= thisEnd && start >= end) return 0;
        if (thisStart >= thisEnd) return -1;
        if (start >= end) return 1;
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (0 === buffer.length) return -1;
        if ("string" === typeof byteOffset) {
          encoding = byteOffset;
          byteOffset = 0;
        } else byteOffset > 2147483647 ? byteOffset = 2147483647 : byteOffset < -2147483648 && (byteOffset = -2147483648);
        byteOffset = +byteOffset;
        isNaN(byteOffset) && (byteOffset = dir ? 0 : buffer.length - 1);
        byteOffset < 0 && (byteOffset = buffer.length + byteOffset);
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (!dir) return -1;
          byteOffset = 0;
        }
        "string" === typeof val && (val = Buffer.from(val, encoding));
        if (Buffer.isBuffer(val)) {
          if (0 === val.length) return -1;
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        }
        if ("number" === typeof val) {
          val &= 255;
          if (Buffer.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf) return dir ? Uint8Array.prototype.indexOf.call(buffer, val, byteOffset) : Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (void 0 !== encoding) {
          encoding = String(encoding).toLowerCase();
          if ("ucs2" === encoding || "ucs-2" === encoding || "utf16le" === encoding || "utf-16le" === encoding) {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i) {
          return 1 === indexSize ? buf[i] : buf.readUInt16BE(i * indexSize);
        }
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) if (read(arr, i) === read(val, -1 === foundIndex ? 0 : i - foundIndex)) {
            -1 === foundIndex && (foundIndex = i);
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            -1 !== foundIndex && (i -= i - foundIndex);
            foundIndex = -1;
          }
        } else {
          byteOffset + valLength > arrLength && (byteOffset = arrLength - valLength);
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
        return -1 !== this.indexOf(val, byteOffset, encoding);
      };
      Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (length) {
          length = Number(length);
          length > remaining && (length = remaining);
        } else length = remaining;
        var strLen = string.length;
        if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
        length > strLen / 2 && (length = strLen / 2);
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(2 * i, 2), 16);
          if (isNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function latin1Write(buf, string, offset, length) {
        return asciiWrite(buf, string, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer.prototype.write = function write(string, offset, length, encoding) {
        if (void 0 === offset) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (void 0 === length && "string" === typeof offset) {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else {
          if (!isFinite(offset)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          offset |= 0;
          if (isFinite(length)) {
            length |= 0;
            void 0 === encoding && (encoding = "utf8");
          } else {
            encoding = length;
            length = void 0;
          }
        }
        var remaining = this.length - offset;
        (void 0 === length || length > remaining) && (length = remaining);
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        encoding || (encoding = "utf8");
        var loweredCase = false;
        for (;;) switch (encoding) {
         case "hex":
          return hexWrite(this, string, offset, length);

         case "utf8":
         case "utf-8":
          return utf8Write(this, string, offset, length);

         case "ascii":
          return asciiWrite(this, string, offset, length);

         case "latin1":
         case "binary":
          return latin1Write(this, string, offset, length);

         case "base64":
          return base64Write(this, string, offset, length);

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return ucs2Write(this, string, offset, length);

         default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
        }
      };
      Buffer.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        return 0 === start && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end));
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
             case 1:
              firstByte < 128 && (codePoint = firstByte);
              break;

             case 2:
              secondByte = buf[i + 1];
              if (128 === (192 & secondByte)) {
                tempCodePoint = (31 & firstByte) << 6 | 63 & secondByte;
                tempCodePoint > 127 && (codePoint = tempCodePoint);
              }
              break;

             case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if (128 === (192 & secondByte) && 128 === (192 & thirdByte)) {
                tempCodePoint = (15 & firstByte) << 12 | (63 & secondByte) << 6 | 63 & thirdByte;
                tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343) && (codePoint = tempCodePoint);
              }
              break;

             case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if (128 === (192 & secondByte) && 128 === (192 & thirdByte) && 128 === (192 & fourthByte)) {
                tempCodePoint = (15 & firstByte) << 18 | (63 & secondByte) << 12 | (63 & thirdByte) << 6 | 63 & fourthByte;
                tempCodePoint > 65535 && tempCodePoint < 1114112 && (codePoint = tempCodePoint);
              }
            }
          }
          if (null === codePoint) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | 1023 & codePoint;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
        var res = "";
        var i = 0;
        while (i < len) res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
        return res;
      }
      function asciiSlice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) ret += String.fromCharCode(127 & buf[i]);
        return ret;
      }
      function latin1Slice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) ret += String.fromCharCode(buf[i]);
        return ret;
      }
      function hexSlice(buf, start, end) {
        var len = buf.length;
        (!start || start < 0) && (start = 0);
        (!end || end < 0 || end > len) && (end = len);
        var out = "";
        for (var i = start; i < end; ++i) out += toHex(buf[i]);
        return out;
      }
      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length; i += 2) res += String.fromCharCode(bytes[i] + 256 * bytes[i + 1]);
        return res;
      }
      Buffer.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = void 0 === end ? len : ~~end;
        if (start < 0) {
          start += len;
          start < 0 && (start = 0);
        } else start > len && (start = len);
        if (end < 0) {
          end += len;
          end < 0 && (end = 0);
        } else end > len && (end = len);
        end < start && (end = start);
        var newBuf;
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) newBuf[i] = this[i + start];
        }
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 256)) val += this[offset + i] * mul;
        return val;
      };
      Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset + --byteLength];
        var mul = 1;
        while (byteLength > 0 && (mul *= 256)) val += this[offset + --byteLength] * mul;
        return val;
      };
      Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        noAssert || checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 16777216 * this[offset + 3];
      };
      Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return 16777216 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 256)) val += this[offset + i] * mul;
        mul *= 128;
        val >= mul && (val -= Math.pow(2, 8 * byteLength));
        return val;
      };
      Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var i = byteLength;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) val += this[offset + --i] * mul;
        mul *= 128;
        val >= mul && (val -= Math.pow(2, 8 * byteLength));
        return val;
      };
      Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
        noAssert || checkOffset(offset, 1, this.length);
        if (!(128 & this[offset])) return this[offset];
        return -1 * (255 - this[offset] + 1);
      };
      Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return 32768 & val ? 4294901760 | val : val;
      };
      Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return 32768 & val ? 4294901760 | val : val;
      };
      Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        noAssert || checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        noAssert || checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        byteLength |= 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = 255 & value;
        while (++i < byteLength && (mul *= 256)) this[offset + i] = value / mul & 255;
        return offset + byteLength;
      };
      Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        byteLength |= 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var i = byteLength - 1;
        var mul = 1;
        this[offset + i] = 255 & value;
        while (--i >= 0 && (mul *= 256)) this[offset + i] = value / mul & 255;
        return offset + byteLength;
      };
      Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 1, 255, 0);
        Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value));
        this[offset] = 255 & value;
        return offset + 1;
      };
      function objectWriteUInt16(buf, value, offset, littleEndian) {
        value < 0 && (value = 65535 + value + 1);
        for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i);
      }
      Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
        } else objectWriteUInt16(this, value, offset, true);
        return offset + 2;
      };
      Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = 255 & value;
        } else objectWriteUInt16(this, value, offset, false);
        return offset + 2;
      };
      function objectWriteUInt32(buf, value, offset, littleEndian) {
        value < 0 && (value = 4294967295 + value + 1);
        for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) buf[offset + i] = value >>> 8 * (littleEndian ? i : 3 - i) & 255;
      }
      Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = 255 & value;
        } else objectWriteUInt32(this, value, offset, true);
        return offset + 4;
      };
      Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = 255 & value;
        } else objectWriteUInt32(this, value, offset, false);
        return offset + 4;
      };
      Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = 255 & value;
        while (++i < byteLength && (mul *= 256)) {
          value < 0 && 0 === sub && 0 !== this[offset + i - 1] && (sub = 1);
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = byteLength - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = 255 & value;
        while (--i >= 0 && (mul *= 256)) {
          value < 0 && 0 === sub && 0 !== this[offset + i + 1] && (sub = 1);
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 1, 127, -128);
        Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value));
        value < 0 && (value = 255 + value + 1);
        this[offset] = 255 & value;
        return offset + 1;
      };
      Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
        } else objectWriteUInt16(this, value, offset, true);
        return offset + 2;
      };
      Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = 255 & value;
        } else objectWriteUInt16(this, value, offset, false);
        return offset + 2;
      };
      Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else objectWriteUInt32(this, value, offset, true);
        return offset + 4;
      };
      Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648);
        value < 0 && (value = 4294967295 + value + 1);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = 255 & value;
        } else objectWriteUInt32(this, value, offset, false);
        return offset + 4;
      };
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        noAssert || checkIEEE754(buf, value, offset, 4, 3.4028234663852886e38, -3.4028234663852886e38);
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        noAssert || checkIEEE754(buf, value, offset, 8, 1.7976931348623157e308, -1.7976931348623157e308);
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer.prototype.copy = function copy(target, targetStart, start, end) {
        start || (start = 0);
        end || 0 === end || (end = this.length);
        targetStart >= target.length && (targetStart = target.length);
        targetStart || (targetStart = 0);
        end > 0 && end < start && (end = start);
        if (end === start) return 0;
        if (0 === target.length || 0 === this.length) return 0;
        if (targetStart < 0) throw new RangeError("targetStart out of bounds");
        if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        end > this.length && (end = this.length);
        target.length - targetStart < end - start && (end = target.length - targetStart + start);
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) for (i = len - 1; i >= 0; --i) target[i + targetStart] = this[i + start]; else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) for (i = 0; i < len; ++i) target[i + targetStart] = this[i + start]; else Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
        return len;
      };
      Buffer.prototype.fill = function fill(val, start, end, encoding) {
        if ("string" === typeof val) {
          if ("string" === typeof start) {
            encoding = start;
            start = 0;
            end = this.length;
          } else if ("string" === typeof end) {
            encoding = end;
            end = this.length;
          }
          if (1 === val.length) {
            var code = val.charCodeAt(0);
            code < 256 && (val = code);
          }
          if (void 0 !== encoding && "string" !== typeof encoding) throw new TypeError("encoding must be a string");
          if ("string" === typeof encoding && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        } else "number" === typeof val && (val &= 255);
        if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
        if (end <= start) return this;
        start >>>= 0;
        end = void 0 === end ? this.length : end >>> 0;
        val || (val = 0);
        var i;
        if ("number" === typeof val) for (i = start; i < end; ++i) this[i] = val; else {
          var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len];
        }
        return this;
      };
      var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = stringtrim(str).replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) str += "=";
        return str;
      }
      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, "");
      }
      function toHex(n) {
        if (n < 16) return "0" + n.toString(16);
        return n.toString(16);
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              if (i + 1 === length) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              (units -= 3) > -1 && bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = 65536 + (leadSurrogate - 55296 << 10 | codePoint - 56320);
          } else leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 6 | 192, 63 & codePoint | 128);
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
          } else {
            if (!(codePoint < 1114112)) throw new Error("Invalid code point");
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) byteArray.push(255 & str.charCodeAt(i));
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isnan(val) {
        return val !== val;
      }
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    "base64-js": 1,
    ieee754: 4,
    isarray: 3
  } ],
  3: [ function(require, module, exports) {
    var toString = {}.toString;
    module.exports = Array.isArray || function(arr) {
      return "[object Array]" == toString.call(arr);
    };
  }, {} ],
  4: [ function(require, module, exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = 8 * nBytes - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (;nBits > 0; e = 256 * e + buffer[offset + i], i += d, nBits -= 8) ;
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (;nBits > 0; m = 256 * m + buffer[offset + i], i += d, nBits -= 8) ;
      if (0 === e) e = 1 - eBias; else {
        if (e === eMax) return m ? NaN : Infinity * (s ? -1 : 1);
        m += Math.pow(2, mLen);
        e -= eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = 8 * nBytes - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || Infinity === value) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e += eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (;mLen >= 8; buffer[offset + i] = 255 & m, i += d, m /= 256, mLen -= 8) ;
      e = e << mLen | m;
      eLen += mLen;
      for (;eLen > 0; buffer[offset + i] = 255 & e, i += d, e /= 256, eLen -= 8) ;
      buffer[offset + i - d] |= 128 * s;
    };
  }, {} ],
  DealCardsAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "294e777jpJEdIWEagsSzavu", "DealCardsAction");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PosInfo_1 = require("../config/PosInfo");
    var PdkEvent_1 = require("../config/PdkEvent");
    var Card_1 = require("../entity/Card");
    var BaseAction_1 = require("./BaseAction");
    var DealCardsAction = function(_super) {
      __extends(DealCardsAction, _super);
      function DealCardsAction() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.spIDTable = [];
        _this.sprite_list = [];
        return _this;
      }
      DealCardsAction.prototype.onInit = function() {
        this.size = cc.winSize;
      };
      DealCardsAction.prototype.ceateCardsArry = function(cardArry) {
        this.spIDTable = cardArry;
        this.createCoverCards();
      };
      DealCardsAction.prototype.doAction = function() {
        var _this = this;
        var playCards = 16;
        var width = PosInfo_1.PosInfo.CARD_WIDTH * PosInfo_1.PosInfo.CARD_SCALE_ME;
        var x = (this.size.width - ((this.spIDTable.length - 1) * PosInfo_1.PosInfo.CARD_INT_WIDTH + width)) / 2;
        for (var index = 0; index < this.spIDTable.length; index++) {
          var delayTime = cc.delayTime((index + 1) / 10);
          var moveTo = cc.moveTo(.3, cc.v2(x + index * PosInfo_1.PosInfo.CARD_WIDTH / 2 + PosInfo_1.PosInfo.CARD_DISX, PosInfo_1.PosInfo.CARD_HEIGHT_ME));
          var sequence = cc.sequence(delayTime, moveTo);
          this.sprite_list[index].runAction(sequence);
        }
        var count = this.spIDTable.length - 1;
        var _loop_1 = function(index) {
          var delayTime = cc.delayTime(3 + (playCards - index + 1) / 40);
          var callFunc = cc.callFunc(function() {
            _this.sprite_list[index].setScale(0);
            _this.sprite_list[index + count + 1].setScale(PosInfo_1.PosInfo.CARD_SCALE_ME);
            if (0 == index) {
              _this.emit(PdkEvent_1.PdkEvent.GAME_EVENT_ACTION_COMPLETE, 1);
              _this.clearAction();
            }
          });
          var sequence = cc.sequence(delayTime, callFunc);
          this_1.sprite_list[index + count + 1].runAction(sequence);
        };
        var this_1 = this;
        for (var index = count; index >= 0; index--) _loop_1(index);
        this.emit(PdkEvent_1.PdkEvent.GAME_EVENT_ACTION_COMPLETE, 0);
      };
      DealCardsAction.prototype.createCoverCards = function() {
        var _this = this;
        this.spIDTable.forEach(function(value) {
          var card = new Card_1.Card();
          card.createCoverCards();
          card.setScale(PosInfo_1.PosInfo.CARD_SCALE_ME);
          _this.sprite_list.push(card);
          var pos = cc.v2(_this.size.width + PosInfo_1.PosInfo.CARD_WIDTH, PosInfo_1.PosInfo.CARD_HEIGHT_ME);
          card.addTo(_this, pos, 100);
        });
        for (var index = 0; index < this.spIDTable.length; index++) {
          var card = new Card_1.Card();
          card.createCard(this.spIDTable[index]);
          card.setScale(0);
          this.sprite_list.push(card);
          var width = PosInfo_1.PosInfo.CARD_WIDTH * PosInfo_1.PosInfo.CARD_SCALE_ME;
          var x = (this.size.width - ((this.spIDTable.length - 1) * PosInfo_1.PosInfo.CARD_INT_WIDTH + width)) / 2;
          var pos = cc.v2(x + index * PosInfo_1.PosInfo.CARD_WIDTH / 2 + PosInfo_1.PosInfo.CARD_DISX, PosInfo_1.PosInfo.CARD_HEIGHT_ME);
          card.addTo(this, pos, 100);
        }
      };
      DealCardsAction.prototype.clearAction = function() {
        if (0 == this.sprite_list.length) return;
        this.stopAllActions();
        this.sprite_list.forEach(function(card) {
          card.destory();
        });
        this.sprite_list.length = 0;
      };
      return DealCardsAction;
    }(BaseAction_1.BaseAction);
    exports.DealCardsAction = DealCardsAction;
    cc._RF.pop();
  }, {
    "../config/PdkEvent": "PdkEvent",
    "../config/PosInfo": "PosInfo",
    "../entity/Card": "Card",
    "./BaseAction": "BaseAction"
  } ],
  DissolveUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "081dc1v1tVKSJXYxybLD3l6", "DissolveUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseUI_1 = require("../../../../core/view/BaseUI");
    var Dissolve_1 = require("../entity/Dissolve");
    var ViewMgr_1 = require("../../../common/views/ViewMgr");
    var DissolveUI = function(_super) {
      __extends(DissolveUI, _super);
      function DissolveUI() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DissolveUI.prototype.showDissolve = function(tablProto, data) {
        if (!this.dissolve) {
          this.dissolve = new Dissolve_1.Dissolve(tablProto);
          this.dissolve.addTo(this.ui, ViewMgr_1.viewMgr.center);
        }
        this.dissolve.show();
        this.dissolve.updateShow(data);
      };
      return DissolveUI;
    }(BaseUI_1.UIComponent);
    exports.DissolveUI = DissolveUI;
    cc._RF.pop();
  }, {
    "../../../../core/view/BaseUI": "BaseUI",
    "../../../common/views/ViewMgr": "ViewMgr",
    "../entity/Dissolve": "Dissolve"
  } ],
  Dissolve: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "978085CHtNO7rCplK9WvzIL", "Dissolve");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FileUI_1 = require("../../../../core/view/FileUI");
    var UITools_1 = require("../../../../core/view/UITools");
    var GameData_1 = require("../data/GameData");
    var Tools_1 = require("../../../../core/tools/Tools");
    var CommonComp_1 = require("../../../common/component/CommonComp");
    var HallMain_1 = require("../../../hall/view/HallMain");
    var Dissolve = function(_super) {
      __extends(Dissolve, _super);
      function Dissolve(tableProto) {
        var _this = _super.call(this, "game/pdk/ui/prefab/dissolve") || this;
        _this.isOver = false;
        _this.tableProto = tableProto;
        return _this;
      }
      Dissolve.prototype.onEnter = function() {
        this.initUIInfo();
      };
      Dissolve.prototype.agreeCallFunc = function() {
        this.dissolveBtn.active = false;
        var roomInfo = this.tableProto.roomInfo;
        this.tableProto.sendDissolve({
          uid: GameData_1.gameData.uid,
          roomid: roomInfo.roomid,
          dissolveState: 2
        });
      };
      Dissolve.prototype.calcleCallFunc = function() {
        this.dissolveBtn.active = false;
        var roomInfo = this.tableProto.roomInfo;
        this.tableProto.sendDissolve({
          uid: GameData_1.gameData.uid,
          roomid: roomInfo.roomid,
          dissolveState: 0
        });
      };
      Dissolve.prototype.initUIInfo = function() {
        UITools_1.UITools.setNodeString(this.recomend, "\u82e5\u672a\u8fdb\u884c\u9009\u62e9\uff0c60\u79d2\u540e\u81ea\u52a8\u9ed8\u8ba4\u540c\u610f");
      };
      Dissolve.prototype.updateShow = function(data) {
        var _this = this;
        this.onLoaded(function() {
          _this.parentNode.destroyAllChildren();
          data.users.forEach(function(user) {
            _this.addMember(user);
          });
          _this.time.stopAllActions();
          var times = data.dissolveTime;
          UITools_1.UITools.setNodeString(_this.time, times.toString());
          Tools_1.Tools.repeat(_this.time, function() {
            times--;
            UITools_1.UITools.setNodeString(_this.time, times.toString());
          }, 1, data.dissolveTime);
        });
      };
      Dissolve.prototype.addMember = function(user) {
        var child = cc.instantiate(this.tempLate);
        var des = child.getChildByName("des");
        var playerName = child.getChildByName("playerName");
        var name = Tools_1.Tools.nameLimit(user.name, 8);
        UITools_1.UITools.setNodeString(playerName, "[{0}]".format(name));
        var strkey = "\u7533\u8bf7\u89e3\u6563\u623f\u95f4";
        if (0 == user.dissolveState) {
          strkey = "\u62d2\u7edd\u89e3\u6563";
          this.hide();
          return;
        }
        if (1 == user.dissolveState) {
          strkey = "\u53d1\u8d77\u89e3\u6563";
          var isMy = GameData_1.gameData.uid == user.id;
          isMy && (this.dissolveBtn.active = false);
        } else 2 == user.dissolveState ? strkey = "\u540c\u610f\u89e3\u6563" : 3 == user.dissolveState && (strkey = "\u672a\u5904\u7406");
        UITools_1.UITools.setNodeString(des, strkey);
        this.parentNode.addChild(child);
        if (4 == user.dissolveState && !this.isOver) {
          this.isOver = true;
          new HallMain_1.HallMain(0).start();
        }
      };
      __decorate([ UITools_1.UITools.UIItem("time") ], Dissolve.prototype, "time", void 0);
      __decorate([ UITools_1.UITools.UIItem("recomend") ], Dissolve.prototype, "recomend", void 0);
      __decorate([ UITools_1.UITools.UIItem("template") ], Dissolve.prototype, "tempLate", void 0);
      __decorate([ UITools_1.UITools.UIItem("parentNode") ], Dissolve.prototype, "parentNode", void 0);
      __decorate([ UITools_1.UITools.UIItem("dissolvebtn") ], Dissolve.prototype, "dissolveBtn", void 0);
      __decorate([ UITools_1.UITools.OnItemClick("agreebtn") ], Dissolve.prototype, "agreeCallFunc", null);
      __decorate([ UITools_1.UITools.OnItemClick("calclebtn") ], Dissolve.prototype, "calcleCallFunc", null);
      Dissolve = __decorate([ UITools_1.UITools.AddUIComponent("", CommonComp_1.FullHoverComp, -1) ], Dissolve);
      return Dissolve;
    }(FileUI_1.UIFileItem);
    exports.Dissolve = Dissolve;
    cc._RF.pop();
  }, {
    "../../../../core/tools/Tools": "Tools",
    "../../../../core/view/FileUI": "FileUI",
    "../../../../core/view/UITools": "UITools",
    "../../../common/component/CommonComp": "CommonComp",
    "../../../hall/view/HallMain": "HallMain",
    "../data/GameData": "GameData"
  } ],
  EventDispatcher: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c701atlsCJCBaXy1EzCexjq", "EventDispatcher");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Tools_1 = require("../tools/Tools");
    var EventDispatcher = function() {
      function EventDispatcher() {
        this._listeners = {};
        this._index = 0;
      }
      EventDispatcher.prototype.recordListener = function(eventName, callback, object) {
        this._index++;
        this._listeners[this._index] = {
          type: eventName,
          callback: callback,
          target: object
        };
        return this._index;
      };
      EventDispatcher.prototype.once = function(eventName, callback, object) {
        cc.systemEvent.once(eventName, callback, object);
        return this.recordListener(eventName, callback, object);
      };
      EventDispatcher.prototype.on = function(eventName, callback, object) {
        cc.systemEvent.on(eventName, callback, object);
        return this.recordListener(eventName, callback, object);
      };
      EventDispatcher.prototype.offByName = function(eventName) {
        cc.systemEvent.off(eventName);
        for (var index in this._listeners) {
          var info = this._listeners[index];
          info.type == eventName && delete this._listeners[index];
        }
      };
      EventDispatcher.prototype.off = function(eventName, callback, object) {
        Tools_1.Tools.isNullOrUndefined(callback) ? this.offByName(eventName) : cc.systemEvent.off(eventName, callback, object);
      };
      EventDispatcher.prototype.offByIndex = function(index) {
        if (this._listeners[index]) {
          var info = this._listeners[index];
          delete this._listeners[index];
          this.off(info.type, info.callback, info.target);
        }
      };
      EventDispatcher.prototype.emit = function(eventName, data) {
        cc.systemEvent.emit(eventName, data);
      };
      return EventDispatcher;
    }();
    exports.EventDispatcher = EventDispatcher;
    exports.event = new EventDispatcher();
    cc._RF.pop();
  }, {
    "../tools/Tools": "Tools"
  } ],
  ExtraComp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "845599Kp8VJbJQuU56JbZm9", "ExtraComp");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseUI_1 = require("../../../../core/view/BaseUI");
    var PdkUtils_1 = require("../utils/PdkUtils");
    var Utils_1 = require("../../../../core/tools/Utils");
    var PDKActions_1 = require("../action/PDKActions");
    var MusicConfig_1 = require("../config/MusicConfig");
    var AnimConfig_1 = require("../config/AnimConfig");
    var ExtraComp = function(_super) {
      __extends(ExtraComp, _super);
      function ExtraComp() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ExtraComp.prototype.onEnter = function() {
        this.animConfig = AnimConfig_1.Anim.animConfig;
      };
      ExtraComp.prototype.setExtAction = function(actions) {
        this.actions = actions;
      };
      ExtraComp.prototype.musicAndAnim = function(bCardData, seat) {
        var cardLength = bCardData.length;
        var cardData = PdkUtils_1.PdkUtils.getCardTypeAndCard(bCardData, cardLength);
        var targetType = cardData.type;
        var targetCardData = cardData.value;
        if (targetType == PdkUtils_1.PdkUtils.ExtractType.CardType_single) {
          var value = 15 & targetCardData[0];
          Utils_1.utils.sound.playSound(MusicConfig_1.DDZ.cardMusic[value][0]);
        } else if (targetType == PdkUtils_1.PdkUtils.ExtractType.CardType_pair) {
          var value = 15 & targetCardData[0];
          Utils_1.utils.sound.playSound(MusicConfig_1.DDZ.extractType["\u5bf9{0}".format(value)][0]);
        } else if (targetType == PdkUtils_1.PdkUtils.ExtractType.CardType_straight) {
          Utils_1.utils.sound.playSound(MusicConfig_1.DDZ.extractType["\u987a\u5b50"][0]);
          this.actions.doAction(PDKActions_1.ActionType.ExtAction, [], seat, {
            path: this.getInfo("\u987a\u5b50").path,
            animName: this.getInfo("\u987a\u5b50").animName
          });
        } else if (targetType == PdkUtils_1.PdkUtils.ExtractType.CardType_straightPair) {
          Utils_1.utils.sound.playSound(MusicConfig_1.DDZ.extractType["\u8fde\u5bf9"][0]);
          this.actions.doAction(PDKActions_1.ActionType.ExtAction, [], seat, {
            path: this.getInfo("\u8fde\u5bf9").path,
            animName: this.getInfo("\u8fde\u5bf9").animName
          });
        } else if (targetType == PdkUtils_1.PdkUtils.ExtractType.CardType_3Add2) {
          if (5 == cardLength) {
            Utils_1.utils.sound.playSound(MusicConfig_1.DDZ.extractType["\u4e09\u5e26\u4e8c"][0]);
            this.actions.doAction(PDKActions_1.ActionType.ExtAction, [], seat, {
              path: this.getInfo("\u4e09\u5e26\u4e8c").path,
              animName: this.getInfo("\u4e09\u5e26\u4e8c").animName
            });
          }
        } else if (targetType == PdkUtils_1.PdkUtils.ExtractType.CardType_airplane) {
          Utils_1.utils.sound.playSound(MusicConfig_1.DDZ.extractType["\u98de\u673a"][0]);
          this.actions.doAction(PDKActions_1.ActionType.ExtAction, [], seat, {
            path: this.getInfo("\u98de\u673a").path,
            animName: this.getInfo("\u98de\u673a").animName
          });
        } else if (targetType == PdkUtils_1.PdkUtils.ExtractType.CardType_4Add3) {
          if (7 == cardLength) {
            Utils_1.utils.sound.playSound(MusicConfig_1.DDZ.extractType["\u56db\u5e26\u4e09"][0]);
            this.actions.doAction(PDKActions_1.ActionType.ExtAction, [], seat, {
              path: this.getInfo("\u56db\u5e26\u4e09").path,
              animName: this.getInfo("\u56db\u5e26\u4e09").animName
            });
          }
        } else if (targetType == PdkUtils_1.PdkUtils.ExtractType.CardType_bomb) {
          Utils_1.utils.sound.playSound(MusicConfig_1.DDZ.extractType["\u70b8\u5f39"][0]);
          this.actions.doAction(PDKActions_1.ActionType.ExtAction, [], seat, {
            path: this.getInfo("\u70b8\u5f39").path,
            animName: this.getInfo("\u70b8\u5f39").animName
          });
        }
      };
      ExtraComp.prototype.getInfo = function(key) {
        var info = this.animConfig[key];
        if (!info) {
          cc.error("\u52a8\u753b\u6587\u4ef6!! ", key);
          return;
        }
        return {
          path: info.path,
          animName: info.animName
        };
      };
      return ExtraComp;
    }(BaseUI_1.UIComponent);
    exports.ExtraComp = ExtraComp;
    cc._RF.pop();
  }, {
    "../../../../core/tools/Utils": "Utils",
    "../../../../core/view/BaseUI": "BaseUI",
    "../action/PDKActions": "PDKActions",
    "../config/AnimConfig": "AnimConfig",
    "../config/MusicConfig": "MusicConfig",
    "../utils/PdkUtils": "PdkUtils"
  } ],
  ExtractAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "48eb7TqXRdBU50TdKTO+nDo", "ExtractAction");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseAction_1 = require("./BaseAction");
    var TableProto_1 = require("../data/TableProto");
    var Animation_1 = require("../../../../core/base/Animation");
    var PosInfo_1 = require("../config/PosInfo");
    var ExtractAction = function(_super) {
      __extends(ExtractAction, _super);
      function ExtractAction() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ExtractAction.prototype.onInit = function() {
        this.mParent = new cc.Node();
        this.addChild(this.mParent, 1);
      };
      ExtractAction.prototype.ceateCardsArry = function(cards, seat) {};
      ExtractAction.prototype.doAction = function(params) {
        var anim = new Animation_1.Game.Animation();
        var config = {
          path: params.path
        };
        anim.play(params.animName);
        this.mParent.addChild(anim);
        var pos = cc.Vec2.ZERO;
        var scale = cc.Vec2.ZERO;
        if (params.seat == TableProto_1.Seat.Me) {
          scale.x = 1;
          scale.y = 1;
          pos.x = PosInfo_1.PosInfo.CARD_ACTION_POS_ME.x;
          pos.y = PosInfo_1.PosInfo.CARD_ACTION_POS_ME.y;
        } else if (params.seat == TableProto_1.Seat.Next) {
          scale.x = 1;
          scale.y = 1;
          pos.x = PosInfo_1.PosInfo.CARD_ACTION_POS_PER.x;
          pos.y = PosInfo_1.PosInfo.CARD_ACTION_POS_PER.y;
        } else if (params.seat == TableProto_1.Seat.Front) {
          scale.x = 1;
          scale.y = 1;
          pos.x = PosInfo_1.PosInfo.CARD_ACTION_POS_NEXT.x;
          pos.y = PosInfo_1.PosInfo.CARD_ACTION_POS_NEXT.y;
        }
        anim.setPosition(pos);
        anim.setScale(scale);
      };
      ExtractAction.prototype.clearAction = function() {};
      return ExtractAction;
    }(BaseAction_1.BaseAction);
    exports.ExtractAction = ExtractAction;
    cc._RF.pop();
  }, {
    "../../../../core/base/Animation": "Animation",
    "../config/PosInfo": "PosInfo",
    "../data/TableProto": "TableProto",
    "./BaseAction": "BaseAction"
  } ],
  FileUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7ec55cP1A9OW7LZN8BPa3/y", "FileUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseUI_1 = require("./BaseUI");
    var ResLoader_1 = require("../base/ResLoader");
    var UIFileItem = function(_super) {
      __extends(UIFileItem, _super);
      function UIFileItem(uiFile) {
        var _this = _super.call(this) || this;
        _this.isInited = false;
        _this.callList = [];
        uiFile && _this.setUIFile(uiFile);
        return _this;
      }
      UIFileItem.prototype.setUIFile = function(uiFile) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          ResLoader_1.resLoader.loadRes(uiFile).then(function(asset) {
            _this.initAsset(asset);
            resolve();
          });
        });
      };
      UIFileItem.prototype.onLoaded = function(callfunc) {
        this.isInited ? callfunc() : this.callList.push(callfunc);
      };
      UIFileItem.prototype.onInitWrap = function() {
        this.onInit();
        this.isInited = true;
        for (var _i = 0, _a = this.callList; _i < _a.length; _i++) {
          var callback = _a[_i];
          callback();
        }
        this.callList.length = 0;
        _super.prototype.onInitWrap.call(this);
      };
      UIFileItem.prototype.initAsset = function(asset) {
        this.ui = cc.instantiate(asset);
      };
      UIFileItem.prototype.show = function() {
        var _this = this;
        this.onLoaded(function() {
          _super.prototype.show.call(_this);
        });
        return this;
      };
      UIFileItem.prototype.hide = function() {
        var _this = this;
        this.onLoaded(function() {
          _super.prototype.hide.call(_this);
        });
        return this;
      };
      UIFileItem.prototype.addTo = function(parent, pos, zIndex, name) {
        var _this = this;
        this.onLoaded(function() {
          _super.prototype.addTo.call(_this, parent, pos, zIndex, name);
        });
        return this;
      };
      UIFileItem.prototype.setAnchorPoint = function(x, y) {
        var _this = this;
        this.onLoaded(function() {
          _super.prototype.setAnchorPoint.call(_this, x, y);
        });
        return this;
      };
      UIFileItem.prototype.setPosition = function(pos) {
        var _this = this;
        this.onLoaded(function() {
          _super.prototype.setPosition.call(_this, pos);
        });
        return this;
      };
      UIFileItem.prototype.setRotation = function(rotation) {
        var _this = this;
        this.onLoaded(function() {
          _super.prototype.setRotation.call(_this, rotation);
        });
        return this;
      };
      UIFileItem.prototype.setScale = function(scaleX, scaleY) {
        var _this = this;
        this.onLoaded(function() {
          _super.prototype.setScale.call(_this, scaleX, scaleY);
        });
        return this;
      };
      UIFileItem.prototype.stopAllActions = function() {
        var _this = this;
        this.onLoaded(function() {
          _super.prototype.stopAllActions.call(_this);
        });
        return this;
      };
      UIFileItem.prototype.setVisible = function(isVisible) {
        var _this = this;
        this.onLoaded(function() {
          _super.prototype.setVisible.call(_this, isVisible);
        });
        return this;
      };
      UIFileItem.prototype.addChild = function(child, zIndex, name) {
        var _this = this;
        this.onLoaded(function() {
          _super.prototype.addChild.call(_this, child, zIndex, name);
        });
        return this;
      };
      UIFileItem.prototype.destory = function() {
        var _this = this;
        this.onLoaded(function() {
          _super.prototype.destory.call(_this);
        });
      };
      UIFileItem.prototype.runAction = function(action) {
        var _this = this;
        this.onLoaded(function() {
          _super.prototype.runAction.call(_this, action);
        });
        return this;
      };
      return UIFileItem;
    }(BaseUI_1.UIEntity);
    exports.UIFileItem = UIFileItem;
    var UISceneFile = function(_super) {
      __extends(UISceneFile, _super);
      function UISceneFile() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UISceneFile.prototype.setUIFile = function(sceneName) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          ResLoader_1.resLoader.loadScene(sceneName).then(function() {
            _this.initAsset(null);
            _this.onEnterWrap();
            resolve();
          });
        });
      };
      UISceneFile.prototype.initAsset = function(asset) {
        this.ui = cc.director.getScene();
      };
      return UISceneFile;
    }(UIFileItem);
    exports.UISceneFile = UISceneFile;
    cc._RF.pop();
  }, {
    "../base/ResLoader": "ResLoader",
    "./BaseUI": "BaseUI"
  } ],
  GameData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3e037t5xaBFpr3HRp8jhkWP", "GameData");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Ddz;
    (function(Ddz) {
      var GameConfig = function() {
        function GameConfig() {}
        return GameConfig;
      }();
      Ddz.GameConfig = GameConfig;
      var GameData = function() {
        function GameData() {}
        GameData.prototype.getRoleChairID = function() {
          return this.roleChairID;
        };
        GameData.prototype.getRoleViewID = function() {
          var viewID = this.getViewIDByChairID(this.roleChairID);
          return viewID;
        };
        GameData.prototype.getViewIDByChairID = function(wChairID) {
          var wPlayerCount = 3;
          var meChairID = this.roleChairID;
          var viewID = (wChairID + wPlayerCount - meChairID) % wPlayerCount;
          return viewID;
        };
        return GameData;
      }();
      Ddz.GameData = GameData;
    })(Ddz = exports.Ddz || (exports.Ddz = {}));
    exports.gameData = new Ddz.GameData();
    cc._RF.pop();
  }, {} ],
  HallMain: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5aa93GrrJhEzriQdu2p1Fwa", "HallMain");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FileUI_1 = require("../../../core/view/FileUI");
    var UITools_1 = require("../../../core/view/UITools");
    var ViewMgr_1 = require("../../common/views/ViewMgr");
    var PdkMain_1 = require("../../game/pdk/view/PdkMain");
    var HallProto_1 = require("../data/HallProto");
    var BaseUI_1 = require("../../../core/view/BaseUI");
    var RoomNumberView_1 = require("../entity/RoomNumberView");
    var GameData_1 = require("../../game/pdk/data/GameData");
    var Tools_1 = require("../../../core/tools/Tools");
    var UIAction_1 = require("../../game/pdk/action/UIAction");
    var HallInfo = function(_super) {
      __extends(HallInfo, _super);
      function HallInfo() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      HallInfo.prototype.onEnter = function() {
        this.bindHallInfo();
        this.iconurl = "http://res-avatar.duole.com/8dc0a012f69787ce5318b082a200c6e7.jpg";
      };
      HallInfo.prototype.bindHallInfo = function() {
        var _this = this;
        this.goldNum.bind(GameData_1.gameData, "coins", function(value) {
          UITools_1.UITools.setNodeString(_this.goldNum, value);
        });
        this.userName = Tools_1.Tools.nameLimit(GameData_1.gameData.name, 14);
      };
      __decorate([ UITools_1.UITools.ImageUrl("icon") ], HallInfo.prototype, "iconurl", void 0);
      __decorate([ UITools_1.UITools.TextBind("username") ], HallInfo.prototype, "userName", void 0);
      __decorate([ UITools_1.UITools.UIItem("goldnum") ], HallInfo.prototype, "goldNum", void 0);
      return HallInfo;
    }(BaseUI_1.UIComponent);
    var HallMain = function(_super) {
      __extends(HallMain, _super);
      function HallMain(roomId) {
        var _this = _super.call(this) || this;
        _this.roomId = roomId;
        _this.hallData = new HallProto_1.Hall.HallProto();
        return _this;
      }
      HallMain.prototype.start = function() {
        this.setUIFile("hallMain");
      };
      HallMain.prototype.onEnter = function() {
        this.listenHandle();
      };
      HallMain.prototype.onExit = function() {
        this.hallData.cleanup();
      };
      HallMain.prototype.listenHandle = function() {
        this.hallData.on("enterPDK", this.enterPDK, this);
      };
      HallMain.prototype.enterPDK = function(roomInfo) {
        new PdkMain_1.PdkMain().start(roomInfo);
      };
      HallMain.prototype.clickEnterRoom = function() {
        if (0 == this.roomId) {
          var roomNumberView = new RoomNumberView_1.RoomNumberView();
          ViewMgr_1.viewMgr.showCenterView(roomNumberView);
        } else this.hallData.sendJoinRoom({
          uid: GameData_1.gameData.uid,
          roomid: this.roomId
        });
      };
      HallMain.prototype.clickCreateRoom = function() {
        this.hallData.createFriendRoom({
          uid: GameData_1.gameData.uid,
          roomCnf: {
            test: 1
          }
        });
      };
      __decorate([ UITools_1.UITools.AddUIComponent("top", HallInfo) ], HallMain.prototype, "mHallInfo", void 0);
      __decorate([ UITools_1.UITools.OnItemClick("enterroom") ], HallMain.prototype, "clickEnterRoom", null);
      __decorate([ UITools_1.UITools.AddUIComponent("createroom", UIAction_1.UIAction, UIAction_1.ACTION_TYPE.Left_to_right) ], HallMain.prototype, "createroomAction", void 0);
      __decorate([ UITools_1.UITools.AddUIComponent("enterroom", UIAction_1.UIAction, UIAction_1.ACTION_TYPE.Right_to_left) ], HallMain.prototype, "enterroomAction", void 0);
      __decorate([ UITools_1.UITools.AddUIComponent("top", UIAction_1.UIAction, UIAction_1.ACTION_TYPE.Top_to_buttom) ], HallMain.prototype, "topAction", void 0);
      __decorate([ UITools_1.UITools.OnItemClick("createroom") ], HallMain.prototype, "clickCreateRoom", null);
      return HallMain;
    }(FileUI_1.UISceneFile);
    exports.HallMain = HallMain;
    cc._RF.pop();
  }, {
    "../../../core/tools/Tools": "Tools",
    "../../../core/view/BaseUI": "BaseUI",
    "../../../core/view/FileUI": "FileUI",
    "../../../core/view/UITools": "UITools",
    "../../common/views/ViewMgr": "ViewMgr",
    "../../game/pdk/action/UIAction": "UIAction",
    "../../game/pdk/data/GameData": "GameData",
    "../../game/pdk/view/PdkMain": "PdkMain",
    "../data/HallProto": "HallProto",
    "../entity/RoomNumberView": "RoomNumberView"
  } ],
  HallProto: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "18bdcT/BBtEvrGEylTduOb6", "HallProto");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseProto_1 = require("../../../core/net/BaseProto");
    var ProtoTools_1 = require("../../../core/net/ProtoTools");
    var GameData_1 = require("../../game/pdk/data/GameData");
    var PdkCmd_1 = require("../../game/pdk/config/PdkCmd");
    var Hall;
    (function(Hall) {
      var HallProto = function(_super) {
        __extends(HallProto, _super);
        function HallProto() {
          return null !== _super && _super.apply(this, arguments) || this;
        }
        HallProto.prototype.revFriendRoom = function(msg) {
          GameData_1.gameData.gameConfig = new GameData_1.Ddz.GameConfig();
          GameData_1.gameData.gameConfig.bPlayerCount = 3;
          GameData_1.gameData.gameConfig.bAbandon = 1;
          GameData_1.gameData.gameConfig.b4Add3 = 0;
          this.emit("enterPDK", msg.roomInfo);
        };
        HallProto.prototype.revJoinRoom = function(msg) {
          GameData_1.gameData.gameConfig = new GameData_1.Ddz.GameConfig();
          GameData_1.gameData.gameConfig.bPlayerCount = 3;
          GameData_1.gameData.gameConfig.bAbandon = 1;
          GameData_1.gameData.gameConfig.b4Add3 = 0;
          this.emit("enterPDK", msg.roomInfo);
        };
        __decorate([ ProtoTools_1.protoTools.request(PdkCmd_1.PDKCmd.CREATEROOM_MSG, true) ], HallProto.prototype, "createFriendRoom", void 0);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.CREATEROOM_MSG) ], HallProto.prototype, "revFriendRoom", null);
        __decorate([ ProtoTools_1.protoTools.request(PdkCmd_1.PDKCmd.JOINROOM_MSG, true) ], HallProto.prototype, "sendJoinRoom", void 0);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.JOINROOM_MSG) ], HallProto.prototype, "revJoinRoom", null);
        return HallProto;
      }(BaseProto_1.BaseProto);
      Hall.HallProto = HallProto;
    })(Hall = exports.Hall || (exports.Hall = {}));
    cc._RF.pop();
  }, {
    "../../../core/net/BaseProto": "BaseProto",
    "../../../core/net/ProtoTools": "ProtoTools",
    "../../game/pdk/config/PdkCmd": "PdkCmd",
    "../../game/pdk/data/GameData": "GameData"
  } ],
  HeiTao3Action: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ca7ac6y2BFH45RMIsfU7rda", "HeiTao3Action");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Card_1 = require("../entity/Card");
    var PosInfo_1 = require("../config/PosInfo");
    var BaseAction_1 = require("./BaseAction");
    var TableProto_1 = require("../data/TableProto");
    var PdkEvent_1 = require("../config/PdkEvent");
    var HeiTao3Action = function(_super) {
      __extends(HeiTao3Action, _super);
      function HeiTao3Action() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.sprite_card = [];
        return _this;
      }
      HeiTao3Action.prototype.onInit = function() {
        this.size = cc.winSize;
      };
      HeiTao3Action.prototype.ceateCardsArry = function(cards, seat) {
        this.cards = cards;
        this.seat = seat;
        this._createCard();
      };
      HeiTao3Action.prototype._createCard = function() {
        var _this = this;
        this.sprite_card = [];
        this.cards.forEach(function(v) {
          var card = new Card_1.Card();
          card.setScale(0);
          card.setCardID(v);
          card.createCard(v);
          card.setScale(PosInfo_1.PosInfo.CARD_SCALE_ME);
          card.setRotation(8 * Math.random() - 3);
          var pos = cc.v2(_this.size.width / 2, .6 * _this.size.height);
          card.addTo(_this, pos);
          _this.sprite_card.push(card);
        });
      };
      HeiTao3Action.prototype.doAction = function(chairID) {
        var _this = this;
        var p = cc.Vec2.ZERO;
        switch (this.seat) {
         case TableProto_1.Seat.Me:
          p.x = this.size.width / 2;
          p.y = PosInfo_1.PosInfo.CARD_HEIGHT_ME + PosInfo_1.PosInfo.CARD_SCALE_ME * PosInfo_1.PosInfo.CARD_HEIGHT / 2;
          break;

         case TableProto_1.Seat.Front:
          p.x = PosInfo_1.PosInfo.PLAYER_POS_NEXT.x;
          p.y = PosInfo_1.PosInfo.PLAYER_POS_NEXT.y + 100;
          break;

         case TableProto_1.Seat.Next:
          p.x = PosInfo_1.PosInfo.PLAYER_POS_PER.x;
          p.y = PosInfo_1.PosInfo.PLAYER_POS_PER.y + 100;
        }
        this.sprite_card.forEach(function(card) {
          var x = Math.abs(p.x - card.getPosX() / Math.abs(p.y - card.getPosY()));
          x = Math.atan(x);
          var degx = 180 * x / Math.PI;
          _this.seat == TableProto_1.Seat.Me ? degx = 0 : _this.seat != TableProto_1.Seat.Next && _this.seat != TableProto_1.Seat.Front || (degx = -degx);
          card.runAction(cc.sequence(cc.callFunc(function() {
            card.setScale(1);
          }), cc.scaleTo(.3, 1), cc.scaleTo(.3, .7), cc.scaleTo(.3, 1), cc.scaleTo(.3, .7), cc.scaleTo(.3, 1), cc.scaleTo(.3, .7), cc.spawn(cc.scaleTo(.3, 1), cc.rotateTo(.3, degx)), cc.delayTime(.15), cc.spawn(cc.scaleTo(.4, .7), cc.moveTo(.4, p), cc.fadeOut(.7)), cc.callFunc(function() {
            _this.emit(PdkEvent_1.PdkEvent.GAME_EVENT_ACTION_COMPLETE, chairID);
            _this.clearAction();
          })));
        });
      };
      HeiTao3Action.prototype.clearAction = function() {
        if (!this.sprite_card) return;
        this.stopAllActions();
        this.sprite_card.forEach(function(card) {
          card.stopAllActions();
          card.destory();
          card = null;
        });
        this.sprite_card.length = 0;
      };
      return HeiTao3Action;
    }(BaseAction_1.BaseAction);
    exports.HeiTao3Action = HeiTao3Action;
    cc._RF.pop();
  }, {
    "../config/PdkEvent": "PdkEvent",
    "../config/PosInfo": "PosInfo",
    "../data/TableProto": "TableProto",
    "../entity/Card": "Card",
    "./BaseAction": "BaseAction"
  } ],
  Launcher: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b565fjRzypPjbLcZAf9/ump", "Launcher");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LoginMain_1 = require("./logic/login/view/LoginMain");
    var ccclass = cc._decorator.ccclass;
    var Launcher = function(_super) {
      __extends(Launcher, _super);
      function Launcher() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Launcher.prototype.start = function() {
        new LoginMain_1.LoginMain().start();
      };
      Launcher = __decorate([ ccclass ], Launcher);
      return Launcher;
    }(cc.Component);
    exports.Launcher = Launcher;
    cc._RF.pop();
  }, {
    "./logic/login/view/LoginMain": "LoginMain"
  } ],
  LoadingView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ee80JaQStMt6YIo1FmYSoT", "LoadingView");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FileUI_1 = require("../../../core/view/FileUI");
    var UITools_1 = require("../../../core/view/UITools");
    var ResLoader_1 = require("../../../core/base/ResLoader");
    var Tools_1 = require("../../../core/tools/Tools");
    var LoadingView = function(_super) {
      __extends(LoadingView, _super);
      function LoadingView(comp) {
        var _this = _super.call(this, "common/ui/loading") || this;
        _this.comp = comp;
        return _this;
      }
      LoadingView.prototype.onEnter = function() {
        var _this = this;
        ResLoader_1.resLoader.loadResDirArry(this.folder, function(count, total, item) {
          _this.loadingPercent = count / (0 == total ? 1 : total);
        }, function(error, resource) {
          if (error) {
            cc.error(error);
            return;
          }
          if (_this.comp) {
            _this.comp();
            Tools_1.Tools.performWithDelay(_this.ui, function() {
              _this.destory();
            }, .1);
          }
        });
      };
      __decorate([ UITools_1.UITools.ProgressBarBind("loadingbar") ], LoadingView.prototype, "loadingPercent", void 0);
      return LoadingView;
    }(FileUI_1.UIFileItem);
    exports.LoadingView = LoadingView;
    cc._RF.pop();
  }, {
    "../../../core/base/ResLoader": "ResLoader",
    "../../../core/tools/Tools": "Tools",
    "../../../core/view/FileUI": "FileUI",
    "../../../core/view/UITools": "UITools"
  } ],
  LoginMain: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eb6e1adaUtByJe8xDC7P4Ai", "LoginMain");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FileUI_1 = require("../../../core/view/FileUI");
    var UITools_1 = require("../../../core/view/UITools");
    var LoginProto_1 = require("../data/LoginProto");
    var HallMain_1 = require("../../hall/view/HallMain");
    var ViewMgr_1 = require("../../common/views/ViewMgr");
    var LoadingView_1 = require("../../common/entity/LoadingView");
    var Utils_1 = require("../../../core/tools/Utils");
    var GameData_1 = require("../../game/pdk/data/GameData");
    var PdkMain_1 = require("../../game/pdk/view/PdkMain");
    var LoginMain = function(_super) {
      __extends(LoginMain, _super);
      function LoginMain() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LoginMain.prototype.start = function() {
        this.setUIFile("login");
        this.loginData = new LoginProto_1.Login.LoginProto();
      };
      LoginMain.prototype.onEnter = function() {
        if (Utils_1.utils.storage.hasData("name")) {
          var data = Utils_1.utils.storage.getData("name");
          this.input.string = data.name;
          this.name = data.name;
        }
        this.loginData.on("startLoading", this.startLoading, this);
        this.loginData.on("enterScene", this.goScene, this);
      };
      LoginMain.prototype.goScene = function(gameInfo) {
        1 == gameInfo.index ? new HallMain_1.HallMain(0).start() : new PdkMain_1.PdkMain().start(gameInfo.roomInfo);
      };
      LoginMain.prototype.startLoading = function(id) {
        var _this = this;
        var loading = new LoadingView_1.LoadingView(function() {
          0 == id ? new HallMain_1.HallMain(0).start() : _this.loginData.sendJoinRoom({
            uid: GameData_1.gameData.uid,
            roomid: id
          });
        });
        loading.folder = [ "common", "hall", "game/pdk/ui" ];
        ViewMgr_1.viewMgr.showCenterView(loading);
      };
      LoginMain.prototype.onExit = function() {
        this.loginData.cleanup();
      };
      LoginMain.prototype.startLogin = function() {
        this.name = this.input.string;
        if (this.name.length <= 0) ViewMgr_1.viewMgr.showTips("\u8f93\u5165\u7528\u6237\u540d!", 2); else {
          this.loginData.connect(this.name);
          Utils_1.utils.storage.saveData("name", {
            name: this.name
          });
        }
      };
      LoginMain.prototype.editorBox = function(str, type) {
        this.name = str;
      };
      __decorate([ UITools_1.UITools.OnItemClick("loginClick") ], LoginMain.prototype, "startLogin", null);
      __decorate([ UITools_1.UITools.UIItem("EditBox", cc.EditBox) ], LoginMain.prototype, "input", void 0);
      __decorate([ UITools_1.UITools.BindEditorBox("EditBox") ], LoginMain.prototype, "editorBox", null);
      return LoginMain;
    }(FileUI_1.UISceneFile);
    exports.LoginMain = LoginMain;
    cc._RF.pop();
  }, {
    "../../../core/tools/Utils": "Utils",
    "../../../core/view/FileUI": "FileUI",
    "../../../core/view/UITools": "UITools",
    "../../common/entity/LoadingView": "LoadingView",
    "../../common/views/ViewMgr": "ViewMgr",
    "../../game/pdk/data/GameData": "GameData",
    "../../game/pdk/view/PdkMain": "PdkMain",
    "../../hall/view/HallMain": "HallMain",
    "../data/LoginProto": "LoginProto"
  } ],
  LoginProto: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8ff5aTCs11Ky56WzzntW9Tk", "LoginProto");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NetMgr_1 = require("../../../core/net/NetMgr");
    var BaseProto_1 = require("../../../core/net/BaseProto");
    var ProtoTools_1 = require("../../../core/net/ProtoTools");
    var ViewMgr_1 = require("../../common/views/ViewMgr");
    var GameData_1 = require("../../game/pdk/data/GameData");
    var PdkCmd_1 = require("../../game/pdk/config/PdkCmd");
    var Login;
    (function(Login) {
      var IP = "47.99.50.101";
      var port = "3014";
      var LoginProto = function(_super) {
        __extends(LoginProto, _super);
        function LoginProto() {
          return null !== _super && _super.apply(this, arguments) || this;
        }
        LoginProto.prototype.gateMsgRev = function(message) {
          var _this = this;
          NetMgr_1.netMgr.disconnect(function() {
            ViewMgr_1.viewMgr.showNetMask();
            NetMgr_1.netMgr.connect(message.host, message.port, _this.connectLogin, _this);
          });
        };
        LoginProto.prototype.enterMsgRev = function(message) {
          GameData_1.gameData.uid = message.uid;
          GameData_1.gameData.token = message.token;
          this.sendEnterGame({
            token: message.token,
            userInfo: {
              name: GameData_1.gameData.name,
              avatarUrl: "",
              gender: 1
            }
          });
        };
        LoginProto.prototype.revEnterMsg = function(msg) {
          var baseInfo = msg.userinfo;
          GameData_1.gameData.name = baseInfo.name;
          GameData_1.gameData.uid = baseInfo.id;
          GameData_1.gameData.gender = baseInfo.gender;
          GameData_1.gameData.city = baseInfo.city;
          GameData_1.gameData.avatarUrl = baseInfo.avatarUrl;
          GameData_1.gameData.coins = baseInfo.coins;
          GameData_1.gameData.gems = baseInfo.gems;
          this.emit("startLoading", baseInfo.roomid);
        };
        LoginProto.prototype.revJoinRoom = function(msg) {
          if (200 != msg.code) this.emit("enterScene", {
            index: 1
          }); else {
            GameData_1.gameData.gameConfig = new GameData_1.Ddz.GameConfig();
            GameData_1.gameData.gameConfig.bPlayerCount = 3;
            GameData_1.gameData.gameConfig.bAbandon = 1;
            GameData_1.gameData.gameConfig.b4Add3 = 0;
            this.emit("enterScene", {
              index: 2,
              roomInfo: msg.roomInfo
            });
          }
        };
        LoginProto.prototype.connectLogin = function(msg) {
          ViewMgr_1.viewMgr.closeNetMask();
          this.sendLogin({
            account: GameData_1.gameData.name
          });
        };
        LoginProto.prototype.connectSuccess = function(msg) {
          ViewMgr_1.viewMgr.closeNetMask();
          this.sendGate({
            account: GameData_1.gameData.name
          });
        };
        LoginProto.prototype.connect = function(account) {
          ViewMgr_1.viewMgr.showNetMask();
          GameData_1.gameData.name = account;
          NetMgr_1.netMgr.connect(IP, port, this.connectSuccess, this);
        };
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.GATE_MSG) ], LoginProto.prototype, "gateMsgRev", null);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.GAST_LOGIN) ], LoginProto.prototype, "enterMsgRev", null);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.ENTER_MSG) ], LoginProto.prototype, "revEnterMsg", null);
        __decorate([ ProtoTools_1.protoTools.request(PdkCmd_1.PDKCmd.ENTER_MSG, true) ], LoginProto.prototype, "sendEnterGame", void 0);
        __decorate([ ProtoTools_1.protoTools.request(PdkCmd_1.PDKCmd.JOINROOM_MSG, true) ], LoginProto.prototype, "sendJoinRoom", void 0);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.JOINROOM_MSG) ], LoginProto.prototype, "revJoinRoom", null);
        __decorate([ ProtoTools_1.protoTools.request(PdkCmd_1.PDKCmd.GATE_MSG) ], LoginProto.prototype, "sendGate", void 0);
        __decorate([ ProtoTools_1.protoTools.request(PdkCmd_1.PDKCmd.GAST_LOGIN) ], LoginProto.prototype, "sendLogin", void 0);
        return LoginProto;
      }(BaseProto_1.BaseProto);
      Login.LoginProto = LoginProto;
    })(Login = exports.Login || (exports.Login = {}));
    cc._RF.pop();
  }, {
    "../../../core/net/BaseProto": "BaseProto",
    "../../../core/net/NetMgr": "NetMgr",
    "../../../core/net/ProtoTools": "ProtoTools",
    "../../common/views/ViewMgr": "ViewMgr",
    "../../game/pdk/config/PdkCmd": "PdkCmd",
    "../../game/pdk/data/GameData": "GameData"
  } ],
  MusicConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73e85zh9J1JfbL+bonBdPs9", "MusicConfig");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DDZ;
    (function(DDZ) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
      DDZ.extractType = (_a = {}, _a["\u8981\u4e0d\u8d77"] = {
        0: "game/pdk/music/sound/card_g_yaobuqi",
        1: "game/pdk/music/sound/card_b_yaobuqi"
      }, _a["\u70b8\u5f39"] = {
        0: "game/pdk/music/sound/card_g_zhadan",
        1: "game/pdk/music/sound/card_b_zhadan"
      }, _a["\u6211\u8d62\u5566"] = {
        0: "game/pdk/music/sound/card_g_win",
        1: "game/pdk/music/sound/card_b_win"
      }, _a["\u6211\u5148\u51fa"] = {
        0: "game/pdk/music/sound/0_woxianchu",
        1: "game/pdk/music/sound/1_woxianchu"
      }, _a["\u6211\u8f93\u5566"] = {
        0: "",
        1: ""
      }, _a["\u987a\u5b50"] = {
        0: "game/pdk/music/sound/card_g_shunzi",
        1: "game/pdk/music/sound/card_b_shunzi"
      }, _a["\u8fde\u5bf9"] = {
        0: "game/pdk/music/sound/card_g_liandui",
        1: "game/pdk/music/sound/card_b_liandui"
      }, _a["\u98de\u673a"] = {
        0: "game/pdk/music/sound/airplane",
        1: "game/pdk/music/sound/airplane"
      }, _a["\u4e09\u5e26\u4e8c"] = {
        0: "game/pdk/music/sound/card_g_sandaier",
        1: "game/pdk/music/sound/card_b_sandaier"
      }, _a["\u56db\u5e26\u4e09"] = {
        0: "game/pdk/music/sound/card_g_sidaisan",
        1: "game/pdk/music/sound/card_b_sidaisan"
      }, _a["\u5168\u5173"] = {
        0: "",
        1: ""
      }, _a["\u5bf913"] = {
        0: "game/pdk/music/sound/card_g_dui13",
        1: "game/pdk/music/sound/card_b_dui13"
      }, _a["\u5bf912"] = {
        0: "game/pdk/music/sound/card_g_dui12",
        1: "game/pdk/music/sound/card_b_dui12"
      }, _a["\u5bf911"] = {
        0: "game/pdk/music/sound/card_g_dui11",
        1: "game/pdk/music/sound/card_b_dui11"
      }, _a["\u5bf910"] = {
        0: "game/pdk/music/sound/card_g_dui10",
        1: "game/pdk/music/sound/card_b_dui10"
      }, _a["\u5bf99"] = {
        0: "game/pdk/music/sound/card_g_dui9",
        1: "game/pdk/music/sound/card_b_dui9"
      }, _a["\u5bf98"] = {
        0: "game/pdk/music/sound/card_g_dui8",
        1: "game/pdk/music/sound/card_b_dui8"
      }, _a["\u5bf97"] = {
        0: "game/pdk/music/sound/card_g_dui7",
        1: "game/pdk/music/sound/card_b_dui7"
      }, _a["\u5bf96"] = {
        0: "game/pdk/music/sound/card_g_dui6",
        1: "game/pdk/music/sound/card_b_dui6"
      }, _a["\u5bf95"] = {
        0: "game/pdk/music/sound/card_g_dui5",
        1: "game/pdk/music/sound/card_b_dui5"
      }, _a["\u5bf94"] = {
        0: "game/pdk/music/sound/card_g_dui4",
        1: "game/pdk/music/sound/card_b_dui4"
      }, _a["\u5bf93"] = {
        0: "game/pdk/music/sound/card_g_dui3",
        1: "game/pdk/music/sound/card_b_dui3"
      }, _a["\u5bf91"] = {
        0: "game/pdk/music/sound/card_g_dui1",
        1: "game/pdk/music/sound/card_b_dui1"
      }, _a);
      DDZ.cardMusic = (_b = {}, _b[1] = (_c = {}, _c[0] = "game/pdk/music/sound/card_g_1", 
      _c[1] = "game/pdk/music/sound/card_b_1", _c), _b[3] = (_d = {}, _d[0] = "game/pdk/music/sound/card_g_3", 
      _d[1] = "game/pdk/music/sound/card_b_3", _d), _b[4] = (_e = {}, _e[0] = "game/pdk/music/sound/card_g_4", 
      _e[1] = "game/pdk/music/sound/card_b_4", _e), _b[5] = (_f = {}, _f[0] = "game/pdk/music/sound/card_g_5", 
      _f[1] = "game/pdk/music/sound/card_b_5", _f), _b[6] = (_g = {}, _g[0] = "game/pdk/music/sound/card_g_6", 
      _g[1] = "game/pdk/music/sound/card_b_6", _g), _b[7] = (_h = {}, _h[0] = "game/pdk/music/sound/card_g_7", 
      _h[1] = "game/pdk/music/sound/card_b_7", _h), _b[8] = (_j = {}, _j[0] = "game/pdk/music/sound/card_g_8", 
      _j[1] = "game/pdk/music/sound/card_b_8", _j), _b[9] = (_k = {}, _k[0] = "game/pdk/music/sound/card_g_9", 
      _k[1] = "game/pdk/music/sound/card_b_9", _k), _b[10] = (_l = {}, _l[0] = "game/pdk/music/sound/card_g_10", 
      _l[1] = "game/pdk/music/sound/card_b_10", _l), _b[11] = (_m = {}, _m[0] = "game/pdk/music/sound/card_g_11", 
      _m[1] = "game/pdk/music/sound/card_b_11", _m), _b[12] = (_o = {}, _o[0] = "game/pdk/music/sound/card_g_12", 
      _o[1] = "game/pdk/music/sound/card_b_12", _o), _b[13] = (_p = {}, _p[0] = "game/pdk/music/sound/card_g_13", 
      _p[1] = "game/pdk/music/sound/card_b_13", _p), _b[2] = (_q = {}, _q[0] = "game/pdk/music/sound/card_g_2", 
      _q[1] = "game/pdk/music/sound/card_b_2", _q), _b);
    })(DDZ = exports.DDZ || (exports.DDZ = {}));
    cc._RF.pop();
  }, {} ],
  NetMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c818byECt5Kjp/mJeixwS/6", "NetMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ViewMgr_1 = require("../../logic/common/views/ViewMgr");
    require("pomelo");
    var NetMgr = function() {
      function NetMgr() {
        this.sysNetMsg();
      }
      NetMgr.prototype.sysNetMsg = function() {
        this.register("disconnect", this.closeNet);
      };
      NetMgr.prototype.connect = function(host, port, fn, target) {
        var params = {
          host: host,
          port: port
        };
        pomelo.init(params, function(message) {
          fn.call(target, message);
        });
      };
      NetMgr.prototype.send = function(route, message, func) {
        var _this = this;
        pomelo.request(route, message || {}, function(msg) {
          func && func(msg);
          _this.emit(route, msg);
        });
      };
      NetMgr.prototype.notify = function(route, message) {
        pomelo.notify(route, message);
      };
      NetMgr.prototype.register = function(route, fn) {
        this.on(route, fn);
      };
      NetMgr.prototype.unregister = function(route, cb) {
        pomelo.off(route, cb);
      };
      NetMgr.prototype.getNetState = function() {
        return pomelo.getNetState();
      };
      NetMgr.prototype.disconnect = function(func) {
        pomelo.disconnect(func);
      };
      NetMgr.prototype.emit = function(event, msg) {
        pomelo.emit(event, msg);
      };
      NetMgr.prototype.on = function(event, fn) {
        pomelo.on(event, fn);
      };
      NetMgr.prototype.closeNet = function(msg) {
        ViewMgr_1.viewMgr.showNetMask();
      };
      return NetMgr;
    }();
    exports.NetMgr = NetMgr;
    exports.netMgr = new NetMgr();
    cc._RF.pop();
  }, {
    "../../logic/common/views/ViewMgr": "ViewMgr",
    pomelo: "pomelo"
  } ],
  Node: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ca3ebD5qFtCTqqAzpvVgWv7", "Node");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BindTools_1 = require("../bindable/BindTools");
    var Tools_1 = require("../Tools/Tools");
    function unbind(index) {
      var me = this;
      me.bindList = me.bindList ? me.bindList : {};
      for (var eachObjId in me.bindList) {
        var table = me.bindList[eachObjId];
        if (table && table[index]) {
          var ret = void 0;
          ret = Tools_1.Tools.isFunction(table[index].obj.unbind) ? table[index].obj.unbind(index) : BindTools_1.BindTool.unbind(table[index].obj, index);
          delete table[index];
          return ret;
        }
      }
      return false;
    }
    function WrapNode(node, func) {
      return function(event) {
        if (node.isValid) {
          event.node = node;
          func.apply(node, arguments);
        } else {
          node.unbindAll();
          node.unbindAllCustomEvent();
        }
      };
    }
    function bindEx(obj, propertyName, callback, triggleAtOnce) {
      void 0 === triggleAtOnce && (triggleAtOnce = true);
      console.assert(!Tools_1.Tools.isNullOrUndefined(obj), "Node bindEx null or undefined object");
      var me = this;
      me.bindList = me.bindList ? me.bindList : {};
      BindTools_1.BindTool.createBindInfo(obj);
      me.bindList[obj.bindId] || (me.bindList[obj.bindId] = {});
      var table = me.bindList[obj.bindId];
      for (var eachId in table) (function(eachId) {
        if (table[eachId].propertyName == propertyName && table[eachId].callFunc == callback) return function() {
          unbind.call(me, Number(eachId));
        };
      })(eachId);
      var bindFunc = WrapNode(me, callback);
      var bindIndex;
      bindIndex = Tools_1.Tools.isFunction(obj.bindEx) ? obj.bindEx(propertyName, bindFunc, triggleAtOnce) : BindTools_1.BindTool.bindEx(obj, propertyName, bindFunc, triggleAtOnce);
      var data = {
        obj: obj,
        callFunc: callback,
        propertyName: propertyName
      };
      table[bindIndex] = data;
      return function() {
        unbind.call(this, bindIndex);
      };
    }
    cc.Node.prototype.bindEx = function(obj, propertyName, callback, triggleAtOnce) {
      void 0 === triggleAtOnce && (triggleAtOnce = true);
      var me = this;
      if (Tools_1.Tools.isString(obj)) return BindTools_1.BindTool.bindEx(me, obj, propertyName, WrapNode(me, callback));
      if (Tools_1.Tools.isString(propertyName)) return bindEx.apply(me, arguments);
      var funcArr_1 = [];
      var propertyArray = propertyName;
      propertyArray.forEach(function(v) {
        funcArr_1.push(bindEx.call(me, obj, v, callback, triggleAtOnce));
      });
      return function() {
        funcArr_1.forEach(function(v) {
          v();
        });
      };
    };
    cc.Node.prototype.bind = function(obj, propertyName, callback, triggleAtOnce) {
      void 0 === triggleAtOnce && (triggleAtOnce = true);
      return this.bindEx(obj, propertyName, BindTools_1.BindTool.createSimpleObserveFunction(callback), triggleAtOnce);
    };
    cc.Node.prototype.bindCollectionEvent = function(obj, addCallBack, deleteCallfunc) {
      var addFunc = this.bindAdd(obj, WrapNode(this, addCallBack));
      var deleteFunc = this.bindDelete(obj, WrapNode(this, deleteCallfunc));
      return function() {
        addFunc();
        deleteFunc();
      };
    };
    cc.Node.prototype.bindEvent = function(target, eventName, callback, triggleAtOnce) {
      console.assert(!Tools_1.Tools.isNullOrUndefined(target), "Node bindEvent null or undefined object");
      var me = this;
      var obj = target;
      me.bindList = me.bindList ? me.bindList : {};
      BindTools_1.BindTool.createBindInfo(obj);
      me.bindList[obj.bindId] || (me.bindList[obj.bindId] = {});
      var table = me.bindList[obj.bindId];
      var _loop_1 = function(eachId) {
        if (table[eachId].callFunc == callback) return {
          value: function() {
            unbind.call(me, eachId);
          }
        };
      };
      for (var eachId in table) {
        var state_1 = _loop_1(eachId);
        if ("object" === typeof state_1) return state_1.value;
      }
      var bindIndex;
      bindIndex = "add" === eventName ? obj.bindAdd(WrapNode(me, callback), triggleAtOnce) : "delete" === eventName ? obj.bindDelete(WrapNode(me, callback), triggleAtOnce) : BindTools_1.BindTool.bindEvent(obj, "__" + eventName, WrapNode(me, callback));
      var data = {
        obj: obj,
        callFunc: callback
      };
      table[bindIndex] = data;
      return function() {
        unbind.call(me, bindIndex);
      };
    };
    cc.Node.prototype.bindAdd = function(obj, callback, triggleAtOnce) {
      void 0 === triggleAtOnce && (triggleAtOnce = true);
      return this.bindEvent(obj, "add", callback, triggleAtOnce);
    };
    cc.Node.prototype.bindDelete = function(obj, callback) {
      return this.bindEvent(obj, "delete", callback);
    };
    cc.Node.prototype.unbind = function(unbindFunc) {
      Tools_1.Tools.isFunction(unbindFunc) ? unbindFunc() : BindTools_1.BindTool.unbind(this, unbindFunc);
    };
    cc.Node.prototype.bindCustomEvent = function(obj, eventName, callBack, target, _isOnce) {
      var me = this;
      me.customEventRecord = me.customEventRecord || new Map();
      me.customEventRecord.has(obj) || me.customEventRecord.set(obj, {});
      var func = function() {
        if (me.isValid) callBack.apply(me, arguments); else {
          me.unbindAll();
          me.unbindAllCustomEvent();
        }
      };
      var index;
      index = _isOnce ? obj.once(eventName, func, target) : obj.on(eventName, func, target);
      me.customEventRecord.get(obj)[index] = index;
      return function() {
        if (me.customEventRecord.has(obj) && me.customEventRecord.get(obj)[index]) {
          delete me.customEventRecord.get(obj)[index];
          0 == Object.keys(me.customEventRecord.get(obj)).length && me.customEventRecord.delete(obj);
        }
        obj.offByIndex(index);
      };
    };
    cc.Node.prototype.unbindAllCustomEvent = function() {
      var me = this;
      if (me.customEventRecord) {
        me.customEventRecord.forEach(function(value, key) {
          for (var index in value) {
            key.offByIndex(Number(index));
            delete value[index];
          }
        });
        me.customEventRecord.clear();
      }
    };
    cc.Node.prototype.unbindAll = function() {
      var me = this;
      if (!me.bindList) return;
      for (var eachObjId in me.bindList) {
        var table = me.bindList[eachObjId];
        for (var eachId in table) Tools_1.Tools.isFunction(table[eachId].obj.unbind) ? table[eachId].obj.unbind(eachId) : BindTools_1.BindTool.unbind(table[eachId].obj, Number(eachId));
      }
      delete me.bindList;
      me.bindList = void 0;
    };
    cc._RF.pop();
  }, {
    "../Tools/Tools": "Tools",
    "../bindable/BindTools": "BindTools"
  } ],
  Number: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6d5d8gVH9hOspCF6Dq6PWhR", "Number");
    Number.prototype.formatString = function(unitStr, keepDecimal, maxNum, unitNum) {
      void 0 === unitStr && (unitStr = "\u4e07");
      void 0 === keepDecimal && (keepDecimal = 0);
      void 0 === maxNum && (maxNum = 1e6);
      void 0 === unitNum && (unitNum = 1e4);
      var num = this;
      var keep = Math.pow(10, keepDecimal);
      if (num >= maxNum) {
        num = Math.floor(num * keep / unitNum);
        num /= keep;
        return num.toString() + unitStr;
      }
      return num.toString();
    };
    cc._RF.pop();
  }, {} ],
  PDKActions: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0ac38bekaJD/J863Kx5KlxL", "PDKActions");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseUI_1 = require("../../../../core/view/BaseUI");
    var DealCardsAction_1 = require("./DealCardsAction");
    var Tools_1 = require("../../../../core/tools/Tools");
    var HeiTao3Action_1 = require("./HeiTao3Action");
    var PDKLastCardsAction_1 = require("./PDKLastCardsAction");
    var ThrowCardsOfMeMoveAction_1 = require("./ThrowCardsOfMeMoveAction");
    var ThrowCardsOfNextMoveAction_1 = require("./ThrowCardsOfNextMoveAction");
    var PDKThrowCardsOfFrontMoveAction_1 = require("./PDKThrowCardsOfFrontMoveAction");
    var PDKPassAction_1 = require("./PDKPassAction");
    var ExtractAction_1 = require("./ExtractAction");
    var ActionType;
    (function(ActionType) {
      ActionType[ActionType["DealCards"] = 0] = "DealCards";
      ActionType[ActionType["HeiTao"] = 1] = "HeiTao";
      ActionType[ActionType["LastCard"] = 2] = "LastCard";
      ActionType[ActionType["ThrowMe"] = 3] = "ThrowMe";
      ActionType[ActionType["ThrowFront"] = 4] = "ThrowFront";
      ActionType[ActionType["ThrowNext"] = 5] = "ThrowNext";
      ActionType[ActionType["PassAction"] = 6] = "PassAction";
      ActionType[ActionType["DanShun"] = 7] = "DanShun";
      ActionType[ActionType["ShuangShun"] = 8] = "ShuangShun";
      ActionType[ActionType["SanShun"] = 9] = "SanShun";
      ActionType[ActionType["TongHuaShun"] = 10] = "TongHuaShun";
      ActionType[ActionType["SanDai"] = 11] = "SanDai";
      ActionType[ActionType["FeiJi"] = 12] = "FeiJi";
      ActionType[ActionType["ZhaDan"] = 13] = "ZhaDan";
      ActionType[ActionType["BaoDan"] = 14] = "BaoDan";
      ActionType[ActionType["ExtAction"] = 15] = "ExtAction";
    })(ActionType = exports.ActionType || (exports.ActionType = {}));
    var PDKActions = function(_super) {
      __extends(PDKActions, _super);
      function PDKActions() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._actions = new Map();
        return _this;
      }
      PDKActions.prototype.onInit = function() {
        this.registerAction(DealCardsAction_1.DealCardsAction, ActionType.DealCards);
        this.registerAction(HeiTao3Action_1.HeiTao3Action, ActionType.HeiTao);
        this.registerAction(PDKLastCardsAction_1.PDKLastCardsAction, ActionType.LastCard);
        this.registerAction(ThrowCardsOfMeMoveAction_1.ThrowCardsOfMeMoveAction, ActionType.ThrowMe);
        this.registerAction(ThrowCardsOfNextMoveAction_1.ThrowCardsOfNextMoveAction, ActionType.ThrowFront);
        this.registerAction(PDKThrowCardsOfFrontMoveAction_1.PDKThrowCardsOfFrontMoveAction, ActionType.ThrowNext);
        this.registerAction(PDKPassAction_1.PDKPassAction, ActionType.PassAction);
        this.registerAction(ExtractAction_1.ExtractAction, ActionType.ExtAction);
      };
      PDKActions.prototype.doAction = function(actionID, cards, seat, params) {
        var action = this.getAction(actionID);
        if (action) {
          action.ceateCardsArry(cards, seat, params);
          action.doAction(params);
        }
      };
      PDKActions.prototype.clearAction = function(actionID) {
        var action = this.getAction(actionID);
        action && action.clearAction();
      };
      PDKActions.prototype.on = function(actionID, methodName, callBack, target) {
        var action = this.getAction(actionID);
        action && action.on(methodName, callBack, target);
      };
      PDKActions.prototype.registerAction = function(action, type) {
        var _action = Tools_1.Tools.applyNewWithArgArr(action, []);
        _action.onInit();
        this.addChild(_action);
        this._actions.set(type, _action);
        return _action;
      };
      PDKActions.prototype.getAction = function(type) {
        var action = this._actions.get(type);
        if (!action) {
          cc.error("\u52a8\u4f5c \u7c7b\u578b\uff1a", type);
          return null;
        }
        return action;
      };
      return PDKActions;
    }(BaseUI_1.UIComponent);
    exports.PDKActions = PDKActions;
    cc._RF.pop();
  }, {
    "../../../../core/tools/Tools": "Tools",
    "../../../../core/view/BaseUI": "BaseUI",
    "./DealCardsAction": "DealCardsAction",
    "./ExtractAction": "ExtractAction",
    "./HeiTao3Action": "HeiTao3Action",
    "./PDKLastCardsAction": "PDKLastCardsAction",
    "./PDKPassAction": "PDKPassAction",
    "./PDKThrowCardsOfFrontMoveAction": "PDKThrowCardsOfFrontMoveAction",
    "./ThrowCardsOfMeMoveAction": "ThrowCardsOfMeMoveAction",
    "./ThrowCardsOfNextMoveAction": "ThrowCardsOfNextMoveAction"
  } ],
  PDKLastCardsAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c65eA5m8tN26r0y+U1Eab6", "PDKLastCardsAction");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Card_1 = require("../entity/Card");
    var PosInfo_1 = require("../config/PosInfo");
    var BaseAction_1 = require("./BaseAction");
    var PDKLastCardsAction = function(_super) {
      __extends(PDKLastCardsAction, _super);
      function PDKLastCardsAction() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cards = [];
        _this.card_list = [];
        return _this;
      }
      PDKLastCardsAction.prototype.onInit = function() {
        this.size = cc.winSize;
      };
      PDKLastCardsAction.prototype.ceateCardsArry = function(cards, order) {
        this.cards = cards;
        this.order = order;
        this.createCards();
      };
      PDKLastCardsAction.prototype.createCardSprite = function(cardValue) {
        var card = new Card_1.Card();
        card.createCard(cardValue);
        card.setCardID(cardValue);
        card.setScale(.5);
        return card;
      };
      PDKLastCardsAction.prototype.createCards = function() {
        if (!this.mParent) {
          this.mParent = new cc.Node();
          this.addChild(this.mParent);
        }
        var WIDTH = PosInfo_1.PosInfo.CARD_THROW_LAST_WIDTH_TWO;
        var width = 0;
        for (var i = 0; i < this.cards.length; i++) {
          var card = this.createCardSprite(this.cards[i]);
          if (i <= PDKLastCardsAction.index_line) {
            card.setPosition(cc.v2(WIDTH * i + PosInfo_1.PosInfo.CARD_WIDTH, 53 + PosInfo_1.PosInfo.CARD_HEIGHT / 2));
            width = this.cards.length * WIDTH;
          } else {
            card.setPosition(cc.v2(PosInfo_1.PosInfo.CARD_WIDTH + WIDTH * (i - (PDKLastCardsAction.index_line + 1)), PosInfo_1.PosInfo.CARD_HEIGHT / 2));
            width = PDKLastCardsAction.index_line * WIDTH;
          }
          card.setScale(0);
          card.addTo(this.mParent);
          this.card_list.push(card);
        }
        var disY = 10;
        this.cards.length <= PDKLastCardsAction.index_line && (disY = -30);
        2 == this.order ? this.mParent.setPosition(cc.v2(PosInfo_1.PosInfo.PLAYER_POS_PER.x + 350, PosInfo_1.PosInfo.PLAYER_POS_PER.y + disY)) : 3 == this.order ? this.mParent.setPosition(cc.v2(PosInfo_1.PosInfo.PLAYER_POS_NEXT.x - 90, PosInfo_1.PosInfo.PLAYER_POS_NEXT.y + disY)) : 1 == this.order && this.mParent.setPosition(cc.v2(300, disY));
      };
      PDKLastCardsAction.prototype.doAction = function() {
        var _this = this;
        if (0 == this.card_list.length) return;
        var _loop_1 = function(i) {
          this_1.card_list[i].runAction(cc.sequence(cc.delayTime(.1 * i), cc.callFunc(function() {
            _this.card_list[i].setScale(.5);
          })));
        };
        var this_1 = this;
        for (var i = 0; i < this.card_list.length; i++) _loop_1(i);
      };
      PDKLastCardsAction.prototype.clearAction = function() {
        if (!this.mParent) return;
        this.mParent.stopAllActions();
        this.mParent.destroy();
        this.card_list.length = 0;
      };
      PDKLastCardsAction.index_line = 8;
      return PDKLastCardsAction;
    }(BaseAction_1.BaseAction);
    exports.PDKLastCardsAction = PDKLastCardsAction;
    cc._RF.pop();
  }, {
    "../config/PosInfo": "PosInfo",
    "../entity/Card": "Card",
    "./BaseAction": "BaseAction"
  } ],
  PDKOver: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "52f91j08VdEd4XJAYpwsZzb", "PDKOver");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FileUI_1 = require("../../../../core/view/FileUI");
    var UITools_1 = require("../../../../core/view/UITools");
    var GameData_1 = require("../data/GameData");
    var EventDispatcher_1 = require("../../../../core/base/EventDispatcher");
    var PdkEvent_1 = require("../config/PdkEvent");
    var PDKOver = function(_super) {
      __extends(PDKOver, _super);
      function PDKOver(data) {
        var _this = _super.call(this, "game/pdk/ui/prefab/endgame") || this;
        _this.tableProto = data.proto;
        return _this;
      }
      PDKOver.prototype.againGame = function() {
        var roomid = this.tableProto.roomInfo.roomid;
        this.tableProto.sendReady({
          uid: GameData_1.gameData.uid,
          roomid: roomid
        });
        EventDispatcher_1.event.emit(PdkEvent_1.PdkEvent.GAME_EVENT_ACTION_CLEARTABLE, null);
        this.destory();
      };
      PDKOver.prototype.close = function() {
        this.destory();
      };
      __decorate([ UITools_1.UITools.OnItemClick("again") ], PDKOver.prototype, "againGame", null);
      __decorate([ UITools_1.UITools.OnItemClick("close") ], PDKOver.prototype, "close", null);
      return PDKOver;
    }(FileUI_1.UIFileItem);
    exports.PDKOver = PDKOver;
    cc._RF.pop();
  }, {
    "../../../../core/base/EventDispatcher": "EventDispatcher",
    "../../../../core/view/FileUI": "FileUI",
    "../../../../core/view/UITools": "UITools",
    "../config/PdkEvent": "PdkEvent",
    "../data/GameData": "GameData"
  } ],
  PDKPassAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2540ag1YwFJlIqcXAHMT8p0", "PDKPassAction");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseAction_1 = require("./BaseAction");
    var TableProto_1 = require("../data/TableProto");
    var PosInfo_1 = require("../config/PosInfo");
    var PdkEvent_1 = require("../config/PdkEvent");
    var FileUI_1 = require("../../../../core/view/FileUI");
    var LabCard = function(_super) {
      __extends(LabCard, _super);
      function LabCard() {
        return _super.call(this, "game/pdk/ui/prefab/labAction") || this;
      }
      LabCard.prototype.onEnter = function() {};
      return LabCard;
    }(FileUI_1.UIFileItem);
    var PDKPassAction = function(_super) {
      __extends(PDKPassAction, _super);
      function PDKPassAction() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PDKPassAction.prototype.onInit = function() {
        this.mParent = new cc.Node();
        this.addChild(this.mParent);
      };
      PDKPassAction.prototype.ceateCardsArry = function(cards, seat, params) {
        var _this = this;
        var labCard = new LabCard();
        var pos = cc.Vec2.ZERO;
        var anchor = cc.Vec2.ZERO;
        if (seat == TableProto_1.Seat.Me) {
          anchor.x = .5;
          anchor.y = .5;
          pos.x = PosInfo_1.PosInfo.CARD_ACTION_POS_ME.x;
          pos.y = PosInfo_1.PosInfo.CARD_ACTION_POS_ME.y;
        } else if (seat == TableProto_1.Seat.Next) {
          anchor.x = 0;
          anchor.y = .5;
          pos.x = PosInfo_1.PosInfo.CARD_ACTION_POS_PER.x;
          pos.y = PosInfo_1.PosInfo.CARD_ACTION_POS_PER.y;
        } else if (seat == TableProto_1.Seat.Front) {
          anchor.x = 1;
          anchor.y = .5;
          pos.x = PosInfo_1.PosInfo.CARD_ACTION_POS_NEXT.x;
          pos.y = PosInfo_1.PosInfo.CARD_ACTION_POS_NEXT.y;
        }
        labCard.setScale(0);
        labCard.setPosition(pos);
        labCard.setAnchorPoint(anchor.x, anchor.y);
        labCard.addTo(this.mParent);
        var delaytime = cc.delayTime(2);
        var callFunc = cc.callFunc(function() {
          _this.emit(PdkEvent_1.PdkEvent.GAME_EVENT_ACTION_COMPLETE, params);
          labCard && labCard.destory();
        });
        var sequence = cc.sequence(cc.scaleTo(.1, 1), delaytime, callFunc);
        labCard.runAction(sequence);
      };
      PDKPassAction.prototype.doAction = function(params) {};
      PDKPassAction.prototype.clearAction = function() {};
      return PDKPassAction;
    }(BaseAction_1.BaseAction);
    exports.PDKPassAction = PDKPassAction;
    cc._RF.pop();
  }, {
    "../../../../core/view/FileUI": "FileUI",
    "../config/PdkEvent": "PdkEvent",
    "../config/PosInfo": "PosInfo",
    "../data/TableProto": "TableProto",
    "./BaseAction": "BaseAction"
  } ],
  PDKThrowCardsOfFrontMoveAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6f4f3QISYtDIbvo4ZbM/X2b", "PDKThrowCardsOfFrontMoveAction");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Card_1 = require("../entity/Card");
    var PosInfo_1 = require("../config/PosInfo");
    var BaseAction_1 = require("./BaseAction");
    var PDKThrowCardsOfFrontMoveAction = function(_super) {
      __extends(PDKThrowCardsOfFrontMoveAction, _super);
      function PDKThrowCardsOfFrontMoveAction() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cards_sprite = [];
        _this.cards_num = [];
        return _this;
      }
      PDKThrowCardsOfFrontMoveAction.prototype.onInit = function() {
        this.size = cc.winSize;
      };
      PDKThrowCardsOfFrontMoveAction.prototype.createCardSprite = function(cardvalue) {
        var card = new Card_1.Card();
        card.setCardID(cardvalue);
        card.createCard(cardvalue);
        return card;
      };
      PDKThrowCardsOfFrontMoveAction.prototype.ceateCardsArry = function(cards, seat) {
        this.cards_num = cards;
        this._ceateCards();
      };
      PDKThrowCardsOfFrontMoveAction.prototype._ceateCards = function() {
        if (!this.mParent) {
          this.mParent = new cc.Node();
          this.addChild(this.mParent);
        }
        var WIDTH = 0;
        WIDTH = this.cards_num.length > 8 ? PosInfo_1.PosInfo.CARD_THROW_WIDTH_ME_TWO : PosInfo_1.PosInfo.CARD_THROW_WIDTH_OTHERS;
        for (var i = 0; i < this.cards_num.length; i++) {
          var card = this.createCardSprite(this.cards_num[i]);
          card.setPosition(cc.v2(i * (WIDTH + 30), 0));
          card.addTo(this.mParent);
          this.cards_sprite.push(card);
        }
        this.POS_Y = PosInfo_1.PosInfo.CARD_HEIGHT_FRONT_THROW_FOUR;
        this.disX = PosInfo_1.PosInfo.CARD_POS_FRONT_FOUR_X;
      };
      PDKThrowCardsOfFrontMoveAction.prototype.doAction = function() {
        if (0 == this.cards_sprite.length) return;
        var time = .2;
        this.mParent.setScale(0);
        this.mParent.setPosition(cc.v2(PosInfo_1.PosInfo.PLAYER_POS_FRONT_FOUR.x + PosInfo_1.PosInfo.CARD_WIDTH, this.POS_Y + 30));
        this.mParent.runAction(cc.sequence(cc.delayTime(.2), cc.spawn(cc.scaleTo(time, PosInfo_1.PosInfo.CARD_SCALE_THROW).easing(cc.easeIn(4)), cc.moveTo(time, cc.v2(this.disX, this.POS_Y - 50))), cc.callFunc(function() {})));
      };
      PDKThrowCardsOfFrontMoveAction.prototype.clearAction = function() {
        this.stopAllActions();
        if (this.mParent) {
          this.mParent.stopAllActions();
          this.mParent.destroy();
        }
        this.cards_sprite.length = 0;
        this.mParent = null;
      };
      return PDKThrowCardsOfFrontMoveAction;
    }(BaseAction_1.BaseAction);
    exports.PDKThrowCardsOfFrontMoveAction = PDKThrowCardsOfFrontMoveAction;
    cc._RF.pop();
  }, {
    "../config/PosInfo": "PosInfo",
    "../entity/Card": "Card",
    "./BaseAction": "BaseAction"
  } ],
  PdkCmd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36643Xf+R5MDII1fgI26XQ8", "PdkCmd");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PDKCmd;
    (function(PDKCmd) {
      PDKCmd.EXITROOM_MSG = "pdkgame.pdkHandler.exitRoom";
      PDKCmd.PDKSTARTGAME_MSG = "onPDKStartGame";
      PDKCmd.PDKOUTCARD_MSG = "onPDKOutCard";
      PDKCmd.PDKSENDOUTCARD_MSG = "pdkgame.pdkHandler.sendOutCard";
      PDKCmd.PDKJOINROOM_MSG = "onPDKJoinRoom";
      PDKCmd.PDKLEAVEROOM_MSG = "onPDKLeaveRoom";
      PDKCmd.DISSOLVE_MSG = "pdkgame.pdkHandler.dissolveRoom";
      PDKCmd.DISSOLVE_REV_MSG = "onPDKDissolveRoom";
      PDKCmd.READYGAME_MSG = "onPDKReadyGame";
      PDKCmd.START_READY_MSG = "pdkgame.pdkHandler.readyGame";
      PDKCmd.PDKPASSCARD_MSG = "onPDKPassCard";
      PDKCmd.PDKSETTLEMENT_MSG = "onPDKSettlement";
      PDKCmd.PDKCONTINUEGAME = "pdkgame.pdkHandler.nextGame";
      PDKCmd.CREATEROOM_MSG = "hall.hallHandler.createFriendRoom";
      PDKCmd.JOINROOM_MSG = "hall.hallHandler.joinFriendRoom";
      PDKCmd.GATE_MSG = "gate.gateHandler.queryEntry";
      PDKCmd.GAST_LOGIN = "connector.loginHandler.guestLogin";
      PDKCmd.ENTER_MSG = "connector.entryHandler.enter";
    })(PDKCmd = exports.PDKCmd || (exports.PDKCmd = {}));
    cc._RF.pop();
  }, {} ],
  PdkEvent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7e54fYJ6w9HvbkH/XK7dtOg", "PdkEvent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PdkEvent = function() {
      function PdkEvent() {}
      PdkEvent.GAME_EVENT_ACTION_COMPLETE = "GAME_EVENT_ACTION_COMPLETE";
      PdkEvent.GAME_EVENT_ACTION_CLEARTABLE = "GAME_EVENT_ACTION_CLEARTABLE";
      return PdkEvent;
    }();
    exports.PdkEvent = PdkEvent;
    cc._RF.pop();
  }, {} ],
  PdkGameUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c94bHDWLdHlrlF1T+Uq4L2", "PdkGameUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseUI_1 = require("../../../../core/view/BaseUI");
    var Card_1 = require("../entity/Card");
    var PosInfo_1 = require("../config/PosInfo");
    var Tools_1 = require("../../../../core/tools/Tools");
    var PdkGameUI = function(_super) {
      __extends(PdkGameUI, _super);
      function PdkGameUI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.my_card_list = [];
        _this.record = [];
        return _this;
      }
      PdkGameUI.prototype.onInit = function() {
        this.size = cc.winSize;
        this._addTouchEventListener();
      };
      PdkGameUI.prototype.onEnter = function() {};
      PdkGameUI.prototype.createMyCards = function(cards) {
        this._createMyCards(cards);
        this.resetPosition(this.my_card_list);
      };
      PdkGameUI.prototype._addTouchEventListener = function() {
        this.ui.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.ui.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.ui.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.ui._touchListener.setSwallowTouches(false);
      };
      PdkGameUI.prototype.touchStart = function(e) {
        if (null == this.my_card_list || 0 == this.my_card_list.length) return false;
        this.recordAllCardsState();
        this.frontSelect = -1;
        this.endSelect = -1;
        this.beginSelect = -1;
        for (var i = this.my_card_list.length; i >= 0; i--) if (null != this.my_card_list[i]) {
          var rect = this.my_card_list[i].getBoundingBox();
          if (rect.contains(e.touch.getLocation())) {
            if (this.frontSelect != i) {
              this.frontSelect = i;
              this.beginSelect = i;
              this.endSelect = i;
              this.my_card_list[i].transCardState();
            }
            break;
          }
        }
        return true;
      };
      PdkGameUI.prototype.touchMove = function(e) {
        if (null == this.my_card_list || 0 == this.my_card_list.length) return;
        for (var i = this.my_card_list.length; i >= 0; i--) if (null != this.my_card_list[i]) {
          var rect = this.my_card_list[i].getBoundingBox();
          if (rect.contains(e.touch.getLocation())) {
            if (this.frontSelect != i) {
              this.endSelect = i;
              0 == this.beginSelect ? this.beginSelect = i : this.updateCardsState(this.beginSelect, this.endSelect);
              this.frontSelect = i;
            }
            return;
          }
        }
        this.frontSelect = -1;
      };
      PdkGameUI.prototype.touchEnd = function(e) {
        this.updateCardsState(this.beginSelect, this.endSelect);
      };
      PdkGameUI.prototype._createMyCards = function(cards) {
        var height = cards.length;
        for (var i = 0; i < height; i++) if (this.my_card_list && Tools_1.Tools.isDefined(this.my_card_list[i])) {
          this.my_card_list[i].destory();
          this.my_card_list[i] = void 0;
        }
        this.my_card_list = [];
        for (var i = 0; i < height; i++) {
          var card = this.createCard(cards[i]);
          card.setScale(PosInfo_1.PosInfo.CARD_SCALE_ME);
          this.my_card_list.push(card);
          this.addChild(card, i);
        }
      };
      PdkGameUI.prototype.createCard = function(value) {
        var card = new Card_1.Card();
        card.createCard(value);
        card.setCardState(Card_1.CardState.STATE_CARD_DOWN);
        card.setCardID(value);
        card.setCardUpHeight(PosInfo_1.PosInfo.CARD_UP_HEIGHT);
        card.initPosy(PosInfo_1.PosInfo.CARD_HEIGHT_ME);
        return card;
      };
      PdkGameUI.prototype.resetPosition = function(cards) {
        if (null == cards) return;
        var num = this.getCardStateNum(Card_1.CardState.STATE_CARD_UP, cards) + this.getCardStateNum(Card_1.CardState.STATE_CARD_DOWN, cards) + this.getCardStateNum(Card_1.CardState.STATE_CARD_GRAY, cards);
        var x = this.getCardsOriginPositionX(cards, num);
        var j = 0;
        for (var i = 0; i < cards.length; i++) {
          var card = cards[i];
          if (card && card.getCardState() != Card_1.CardState.STATE_CARD_GO) {
            card.setPosition(cc.v2(x + j * PosInfo_1.PosInfo.CARD_WIDTH / 2 + PosInfo_1.PosInfo.CARD_DISX, PosInfo_1.PosInfo.CARD_HEIGHT_ME));
            j++;
          }
        }
      };
      PdkGameUI.prototype.updateMyCards = function(cards) {
        if (null == cards.length) return;
        var allCards = [];
        this.my_card_list && this.my_card_list.length > 0 && this.my_card_list.forEach(function(card) {
          var cardID = card.getCardID();
          allCards.push(cardID);
        });
        this.destroyMyCards();
        this._createMyCards(cards);
        for (var i = 0; i < this.my_card_list.length; i++) {
          var card = this.my_card_list[i];
          if (null != card.getCardID()) {
            var cardID = card.getCardID();
            var y = card.getPosY();
            var x = this.getPosX(cards, cardID);
            card.initPosx(x);
            card.setPosition(cc.v2(this.getPosX(allCards, cardID), y));
            card.runAction(cc.sequence(cc.delayTime(.05), cc.moveTo(.2, cc.v2(x, y))));
          }
        }
      };
      PdkGameUI.prototype.getCardStateNum = function(state, cards) {
        var num = 0;
        if (null == cards || null == state) return num;
        for (var i = 0; i < cards.length; i++) cards[i] && cards[i].getCardState() == state && num++;
        return num;
      };
      PdkGameUI.prototype.getCardsOriginPositionX = function(cards, num) {
        var x = 0;
        if (null == num || null == cards) return x;
        if (cards.length > 0) {
          var width = PosInfo_1.PosInfo.CARD_WIDTH * PosInfo_1.PosInfo.CARD_SCALE_ME;
          x = (this.size.width - ((num - 1) * PosInfo_1.PosInfo.CARD_INT_WIDTH + width)) / 2;
        }
        return x;
      };
      PdkGameUI.prototype.getPosX = function(allCards, card) {
        if (null == allCards) return 0;
        var dis = PosInfo_1.PosInfo.CARD_DISX;
        var width = PosInfo_1.PosInfo.CARD_WIDTH * PosInfo_1.PosInfo.CARD_SCALE_ME;
        var x = (this.size.width - ((allCards.length - 1) * PosInfo_1.PosInfo.CARD_INT_WIDTH + width)) / 2;
        for (var i = 0; i < allCards.length; i++) if (allCards[i] == card) {
          x = x + i * PosInfo_1.PosInfo.CARD_WIDTH / 2 + dis;
          break;
        }
        return x;
      };
      PdkGameUI.prototype.destroyMyCards = function() {
        if (null == this.my_card_list) return;
        for (var i = 0; i < this.my_card_list.length; i++) if (this.my_card_list[i]) {
          this.my_card_list[i].destory();
          this.my_card_list[i] = null;
        }
        this.my_card_list.length = 0;
        this.my_card_list = [];
      };
      PdkGameUI.prototype.getUpCards = function() {
        var cardsArry = [];
        for (var i = 0; i < this.my_card_list.length; i++) {
          var card = this.my_card_list[i];
          card.getCardState() == Card_1.CardState.STATE_CARD_UP && cardsArry.push(card.getCardID());
        }
        return cardsArry;
      };
      PdkGameUI.prototype.upCards = function(cards) {
        this.downAllCards();
        for (var i = 0; i < this.my_card_list.length; i++) {
          var card = this.my_card_list[i];
          for (var j = 0; j < cards.length; j++) {
            var cardID = card.getCardID();
            cards[j] && cardID == cards[j] && card.setCardUp();
          }
        }
      };
      PdkGameUI.prototype.updateCardsState = function(low, height) {
        if (-1 == low || -1 == height) {
          this.downAllCards();
          return;
        }
        if (low > height) {
          var t = height;
          height = low;
          low = t;
        }
        for (var i = 0; i <= low - 1; i++) this.my_card_list && this.my_card_list.length > 0 && this.my_card_list[i].getCardState() != this.record[i] && this.my_card_list[i].transCardState();
        for (var i = low; i <= height; i++) this.my_card_list && this.my_card_list.length > 0 && this.my_card_list[i].getCardState() == this.record[i] && this.my_card_list[i].transCardState();
        for (var i = height + 1; i <= 16; i++) this.my_card_list && this.my_card_list.length > 0 && this.my_card_list[i] && this.my_card_list[i].getCardState() != this.record[i] && this.my_card_list[i].transCardState();
      };
      PdkGameUI.prototype.downAllCards = function() {
        this.my_card_list && this.my_card_list.forEach(function(card) {
          card.getCardState() == Card_1.CardState.STATE_CARD_UP && card.transCardState();
        });
      };
      PdkGameUI.prototype.recordAllCardsState = function() {
        if (null == this.my_card_list || 0 == this.my_card_list.length) return;
        this.record.length = 0;
        for (var i = 0; i < this.my_card_list.length; i++) {
          var state = this.my_card_list[i].getCardState();
          this.record.push(state);
        }
      };
      PdkGameUI.prototype.onExit = function() {
        this.ui.targetOff(this.ui);
      };
      return PdkGameUI;
    }(BaseUI_1.UIComponent);
    exports.PdkGameUI = PdkGameUI;
    cc._RF.pop();
  }, {
    "../../../../core/tools/Tools": "Tools",
    "../../../../core/view/BaseUI": "BaseUI",
    "../config/PosInfo": "PosInfo",
    "../entity/Card": "Card"
  } ],
  PdkMain: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "871c1hHLItAd4CVteVsEmRd", "PdkMain");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FileUI_1 = require("../../../../core/view/FileUI");
    var UITools_1 = require("../../../../core/view/UITools");
    var TableProto_1 = require("../data/TableProto");
    var EventDispatcher_1 = require("../../../../core/base/EventDispatcher");
    var PdkEvent_1 = require("../config/PdkEvent");
    var PdkGameUI_1 = require("../component/PdkGameUI");
    var GameData_1 = require("../data/GameData");
    var Tools_1 = require("../../../../core/tools/Tools");
    var RoleSeatUI_1 = require("../component/RoleSeatUI");
    var SettingUI_1 = require("../component/SettingUI");
    var DissolveUI_1 = require("../component/DissolveUI");
    var PDKActions_1 = require("../action/PDKActions");
    var PDKOver_1 = require("../entity/PDKOver");
    var ViewMgr_1 = require("../../../common/views/ViewMgr");
    var CardShuffle_1 = require("../utils/CardShuffle");
    var Utils_1 = require("../../../../core/tools/Utils");
    var MusicConfig_1 = require("../config/MusicConfig");
    var ExtraComp_1 = require("../component/ExtraComp");
    var PdkMain = function(_super) {
      __extends(PdkMain, _super);
      function PdkMain() {
        var _this = _super.call(this) || this;
        _this.tableProto = new TableProto_1.Table.TableProto();
        return _this;
      }
      PdkMain.prototype.start = function(roomInfo) {
        this.initData(roomInfo);
        this.setUIFile("pdk");
      };
      PdkMain.prototype.onEnter = function() {
        this.listenEvent();
        this.initPDKUI();
        this.updateTable();
      };
      PdkMain.prototype.initData = function(roomInfo) {
        this.tableProto.roomInfo = roomInfo;
        this.tableProto.gameState = roomInfo.roomState;
        this.tableProto.createPlayer(roomInfo);
      };
      PdkMain.prototype.initPDKUI = function() {
        var _this = this;
        this.showCutdown = false;
        this.settingUI.setProto(this.tableProto);
        this.roleSeatUI.setProto(this.tableProto);
        UITools_1.UITools.setNodeString(this.roominfo, "\u623f\u95f4ID:" + this.tableProto.roomInfo.roomid);
        this.cardShuffle = new CardShuffle_1.CardShuffle();
        Tools_1.Tools.repeatForever(this.roominfo, function() {
          _this.cardShuffle.update(1);
        }, 1);
        this.extraHandle.setExtAction(this.actions);
      };
      PdkMain.prototype.onRemind = function() {
        var recomendCards = this.tableProto.getRecomendCards();
        this.gameUI.upCards(recomendCards);
      };
      PdkMain.prototype.outcard = function() {
        var outCards = this.gameUI.getUpCards();
        var roomid = this.tableProto.roomInfo.roomid;
        this.tableProto.sendOutCard({
          roomid: roomid,
          wChairID: GameData_1.gameData.roleChairID,
          bCardData: outCards,
          bCardCount: outCards.length
        });
      };
      PdkMain.prototype.listenEvent = function() {
        EventDispatcher_1.event.on(PdkEvent_1.PdkEvent.GAME_EVENT_ACTION_CLEARTABLE, this.resetPDKGame, this);
        this.actions.on(PDKActions_1.ActionType.DealCards, PdkEvent_1.PdkEvent.GAME_EVENT_ACTION_COMPLETE, this.dealCardsOver, this);
        this.actions.on(PDKActions_1.ActionType.HeiTao, PdkEvent_1.PdkEvent.GAME_EVENT_ACTION_COMPLETE, this.updateCutDown, this);
        this.actions.on(PDKActions_1.ActionType.PassAction, PdkEvent_1.PdkEvent.GAME_EVENT_ACTION_COMPLETE, this.passOver, this);
        this.tableProto.on("refreshMyCard", this.refreshMyCard, this);
        this.tableProto.on("startPDKGame", this.startPDKGame, this);
        this.tableProto.on("showOutCard", this.showOutCard, this);
        this.tableProto.on("joinRoom", this.joinRoom, this);
        this.tableProto.on("leaveRoom", this.leaveRoom, this);
        this.tableProto.on("dissolve", this.dissolve, this);
        this.tableProto.on("readyState", this.readyState, this);
        this.tableProto.on("onPDKPassCard", this.onPDKPassCard, this);
        this.tableProto.on("onPDKSettlement", this.onPDKSettlement, this);
        this.tableProto.on("readyGame", this.readyGame, this);
      };
      PdkMain.prototype.dealCardsOver = function(data) {
        if (1 == data) {
          var me = this.tableProto.players.get(TableProto_1.Seat.Me);
          this.createMyHandCard(me.cards);
        }
      };
      PdkMain.prototype.joinRoom = function(msg) {
        var viewID = GameData_1.gameData.getViewIDByChairID(msg.chairID);
        this.roleSeatUI.addRole(viewID, msg.name);
      };
      PdkMain.prototype.dissolve = function(data) {
        this.dissolveUI.showDissolve(this.tableProto, data);
      };
      PdkMain.prototype.leaveRoom = function(uid) {
        this.roleSeatUI.leaveRole(uid);
      };
      PdkMain.prototype.startPDKGame = function(data) {
        this.startDealCards(data.cardsData);
        this.HeiTao3Action(data.startChairID);
        this.roleSeatUI.hideReady();
      };
      PdkMain.prototype.startDealCards = function(cardArry) {
        this.actions.doAction(PDKActions_1.ActionType.DealCards, cardArry);
      };
      PdkMain.prototype.showOutCard = function(msg) {
        this.setOutCards(msg.cardData, msg.outcardUser);
        cc.log("--show_outcard>>", msg.cardData);
        this.updateOutCards(msg.cardData, msg.outcardUser);
        this.updateCutDown(msg.currentUser);
        var seat = GameData_1.gameData.getViewIDByChairID(msg.outcardUser);
        this.extraHandle.musicAndAnim(msg.cardData, seat);
      };
      PdkMain.prototype.setOutCards = function(cards, outChairID) {
        outChairID == GameData_1.gameData.roleChairID ? this.tableProto.outRecomCards = [] : this.tableProto.outRecomCards = cards;
      };
      PdkMain.prototype.updateOutCards = function(cards, whoChairID) {
        var viewID = GameData_1.gameData.getViewIDByChairID(whoChairID);
        this.actions.clearAction(PDKActions_1.ActionType.ThrowMe);
        this.actions.clearAction(PDKActions_1.ActionType.ThrowFront);
        this.actions.clearAction(PDKActions_1.ActionType.ThrowNext);
        viewID == TableProto_1.Seat.Me ? this.actions.doAction(PDKActions_1.ActionType.ThrowMe, cards, viewID) : viewID == TableProto_1.Seat.Next ? this.actions.doAction(PDKActions_1.ActionType.ThrowNext, cards, viewID) : viewID == TableProto_1.Seat.Front && this.actions.doAction(PDKActions_1.ActionType.ThrowFront, cards, viewID);
      };
      PdkMain.prototype.calculate = function(wChairID) {
        var isMy = wChairID == GameData_1.gameData.roleChairID;
        if (isMy) {
          this.tableProto.calculate();
          cc.log("==\u91cd\u65b0\u8ba1\u7b97");
        }
      };
      PdkMain.prototype.updateMyCutDown = function(wChairID) {
        var _this = this;
        var isMy = wChairID == GameData_1.gameData.roleChairID;
        this.showCutdown = isMy;
        if (isMy) {
          this.calculate(wChairID);
          this.timelist.stopAllActions();
          var times_1 = 15;
          UITools_1.UITools.setNodeString(this.timelist, times_1.toString());
          Tools_1.Tools.repeat(this.timelist, function() {
            times_1--;
            UITools_1.UITools.setNodeString(_this.timelist, times_1.toString());
          }, 1, 15);
        }
      };
      PdkMain.prototype.updateCutDown = function(wChairID) {
        this.roleSeatUI.hideAllCutDown();
        var isMy = wChairID == GameData_1.gameData.roleChairID;
        this.showCutdown = isMy;
        if (!isMy) {
          var viewID = GameData_1.gameData.getViewIDByChairID(wChairID);
          this.roleSeatUI.updateRoleCutDown(viewID);
        }
        this.updateMyCutDown(wChairID);
      };
      PdkMain.prototype.updateTable = function() {
        var _this = this;
        var roomInfo = this.tableProto.roomInfo;
        if (roomInfo.roomState == TableProto_1.GameState.Start) {
          var chairID = roomInfo.cardInfo.currentUser;
          var viewID = GameData_1.gameData.getViewIDByChairID(chairID);
          this.refreshMyCard(roomInfo.cardInfo.handCardData);
          this.roleSeatUI.updateRoleCutDown(viewID);
          var isDissolve = this.tableProto.isDissolveSate();
          isDissolve && this.dissolve({
            users: roomInfo.userInfo,
            dissolveTime: roomInfo.dissolveTime
          });
          this.updateOutCards(roomInfo.cardInfo.turnCardData, roomInfo.cardInfo.turnUser);
          this.setOutCards(roomInfo.cardInfo.turnCardData, roomInfo.cardInfo.turnUser);
          this.updateCutDown(chairID);
          this.calculate(chairID);
        }
        if (roomInfo.roomState != TableProto_1.GameState.Start) {
          var userInfo = roomInfo.userInfo;
          userInfo.forEach(function(user) {
            _this.readyState({
              readyState: user.readyState,
              chairID: user.chairID
            });
          });
        }
      };
      PdkMain.prototype.onPDKPassCard = function(msg) {
        var _this = this;
        this.showCutdown = false;
        this.roleSeatUI.hideAllCutDown();
        this.showTimeChairID = msg.wCurrentUser;
        this.cardShuffle.push(msg, 2, function(msg, args) {
          var viewID = GameData_1.gameData.getViewIDByChairID(msg.wPassUser);
          _this.actions.doAction(PDKActions_1.ActionType.PassAction, [], viewID, {
            passUser: msg.wPassUser,
            nextUser: msg.wCurrentUser
          });
          Utils_1.utils.sound.playSound(MusicConfig_1.DDZ.extractType["\u8981\u4e0d\u8d77"][0]);
        }, msg.wCurrentUser);
      };
      PdkMain.prototype.passOver = function(msg) {
        this.updateCutDown(this.showTimeChairID);
      };
      PdkMain.prototype.HeiTao3Action = function(chairID) {
        var viewID = GameData_1.gameData.getViewIDByChairID(chairID);
        this.actions.doAction(PDKActions_1.ActionType.HeiTao, [ 3 ], viewID, chairID);
      };
      PdkMain.prototype.createMyHandCard = function(cardArry) {
        this.gameUI.createMyCards(cardArry);
      };
      PdkMain.prototype.refreshMyCard = function(cardArry) {
        var me = this.tableProto.players.get(TableProto_1.Seat.Me);
        me.setMyHandCard(cardArry);
        this.gameUI.updateMyCards(cardArry);
      };
      PdkMain.prototype.readyState = function(msg) {
        var viewID = GameData_1.gameData.getViewIDByChairID(msg.chairID);
        this.roleSeatUI.updateReady(viewID, msg.readyState);
      };
      PdkMain.prototype.readyGame = function(msg) {
        this.roleSeatUI.updateReady(TableProto_1.Seat.Me, TableProto_1.GameState.Start);
      };
      PdkMain.prototype.onPDKSettlement = function(msg) {
        var over = new PDKOver_1.PDKOver({
          data: msg,
          proto: this.tableProto
        });
        ViewMgr_1.viewMgr.showCenterView(over);
      };
      PdkMain.prototype.resetPDKGame = function() {
        cc.log("--\x3e>>>\u6570\u636e\u6e05\u9664");
        this.actions.clearAction(PDKActions_1.ActionType.ThrowMe);
        this.actions.clearAction(PDKActions_1.ActionType.ThrowFront);
        this.actions.clearAction(PDKActions_1.ActionType.ThrowNext);
        this.gameUI.destroyMyCards();
        this.showCutdown = false;
        this.roleSeatUI.hideAllCutDown();
        this.roleSeatUI.hideReady();
        this.tableProto.clear();
      };
      PdkMain.prototype.onExit = function() {
        this.tableProto.cleanup();
        EventDispatcher_1.event.offByName(PdkEvent_1.PdkEvent.GAME_EVENT_ACTION_COMPLETE);
      };
      __decorate([ UITools_1.UITools.AddUIComponent("cardLayer", PDKActions_1.PDKActions) ], PdkMain.prototype, "actions", void 0);
      __decorate([ UITools_1.UITools.AddUIComponent("cardLayer", PdkGameUI_1.PdkGameUI) ], PdkMain.prototype, "gameUI", void 0);
      __decorate([ UITools_1.UITools.AddUIComponent("roleseatui", RoleSeatUI_1.RoleSeatUI) ], PdkMain.prototype, "roleSeatUI", void 0);
      __decorate([ UITools_1.UITools.AddUIComponent("tableInfo", SettingUI_1.SettingUI) ], PdkMain.prototype, "settingUI", void 0);
      __decorate([ UITools_1.UITools.AddUIComponent("", DissolveUI_1.DissolveUI) ], PdkMain.prototype, "dissolveUI", void 0);
      __decorate([ UITools_1.UITools.AddUIComponent("", ExtraComp_1.ExtraComp) ], PdkMain.prototype, "extraHandle", void 0);
      __decorate([ UITools_1.UITools.ActiveBind("cutdown") ], PdkMain.prototype, "showCutdown", void 0);
      __decorate([ UITools_1.UITools.UIItem("timelist") ], PdkMain.prototype, "timelist", void 0);
      __decorate([ UITools_1.UITools.UIItem("roominfo") ], PdkMain.prototype, "roominfo", void 0);
      __decorate([ UITools_1.UITools.OnItemClick("tishi") ], PdkMain.prototype, "onRemind", null);
      __decorate([ UITools_1.UITools.OnItemClick("outcard") ], PdkMain.prototype, "outcard", null);
      return PdkMain;
    }(FileUI_1.UISceneFile);
    exports.PdkMain = PdkMain;
    cc._RF.pop();
  }, {
    "../../../../core/base/EventDispatcher": "EventDispatcher",
    "../../../../core/tools/Tools": "Tools",
    "../../../../core/tools/Utils": "Utils",
    "../../../../core/view/FileUI": "FileUI",
    "../../../../core/view/UITools": "UITools",
    "../../../common/views/ViewMgr": "ViewMgr",
    "../action/PDKActions": "PDKActions",
    "../component/DissolveUI": "DissolveUI",
    "../component/ExtraComp": "ExtraComp",
    "../component/PdkGameUI": "PdkGameUI",
    "../component/RoleSeatUI": "RoleSeatUI",
    "../component/SettingUI": "SettingUI",
    "../config/MusicConfig": "MusicConfig",
    "../config/PdkEvent": "PdkEvent",
    "../data/GameData": "GameData",
    "../data/TableProto": "TableProto",
    "../entity/PDKOver": "PDKOver",
    "../utils/CardShuffle": "CardShuffle"
  } ],
  PdkUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "722a8BZRItLyqrnpsVjwU03", "PdkUtils");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameData_1 = require("../data/GameData");
    var Tools_1 = require("../../../../core/tools/Tools");
    var PdkUtils;
    (function(PdkUtils) {
      var ExtractType;
      (function(ExtractType) {
        ExtractType[ExtractType["CardType_error"] = 0] = "CardType_error";
        ExtractType[ExtractType["CardType_single"] = 1] = "CardType_single";
        ExtractType[ExtractType["CardType_pair"] = 2] = "CardType_pair";
        ExtractType[ExtractType["CardType_straight"] = 3] = "CardType_straight";
        ExtractType[ExtractType["CardType_straightPair"] = 4] = "CardType_straightPair";
        ExtractType[ExtractType["CardType_3Add2"] = 5] = "CardType_3Add2";
        ExtractType[ExtractType["CardType_airplane"] = 6] = "CardType_airplane";
        ExtractType[ExtractType["CardType_4Add3"] = 7] = "CardType_4Add3";
        ExtractType[ExtractType["CardType_bomb"] = 8] = "CardType_bomb";
      })(ExtractType = PdkUtils.ExtractType || (PdkUtils.ExtractType = {}));
      function getSortCard(bCardData, bUserCardCount) {
        var _a;
        if (null == bCardData) {
          cc.error("getSortCard null");
          return;
        }
        var tableSortCard = (_a = {}, _a[1] = [], _a[2] = [], _a[3] = [], _a[4] = [], _a);
        var preValue = null;
        var tableCard = [];
        for (var key = 0; key < bUserCardCount; key++) {
          var data = bCardData[key];
          var value = 15 & data;
          1 == value ? value = 14 : 2 == value && (value = 15);
          if (null == preValue || preValue != value) {
            var num_1 = tableCard.length;
            if (num_1 > 0) {
              var tempArry = tableCard.slice();
              tableSortCard[num_1].unshift(tempArry);
            }
            preValue = value;
            tableCard.length = 0;
            tableCard.unshift(data);
          } else tableCard.unshift(data);
        }
        var num = tableCard.length;
        if (num > 0 && tableSortCard[num]) {
          var tempArry = tableCard.slice();
          tableSortCard[num].unshift(tempArry);
        }
        return tableSortCard;
      }
      PdkUtils.getSortCard = getSortCard;
      function getCardTypeAndCard(bCardData, bUserCardCount) {
        if (bUserCardCount <= 0) return {
          type: ExtractType.CardType_error,
          value: null
        };
        var tableSortCard = getSortCard(bCardData, bUserCardCount);
        if (4 == bUserCardCount && 1 == tableSortCard[4].length) return {
          type: ExtractType.CardType_bomb,
          value: tableSortCard[4][0]
        };
        if (1 == bUserCardCount && 1 == tableSortCard[1].length) return {
          type: ExtractType.CardType_single,
          value: tableSortCard[1][0]
        };
        if (2 == bUserCardCount && 1 == tableSortCard[2].length) return {
          type: ExtractType.CardType_pair,
          value: tableSortCard[2][0]
        };
        if (bUserCardCount >= 5 && bUserCardCount == tableSortCard[1].length) {
          var preValue = null;
          var tableReturnCard = [];
          for (var i = 0; i < tableSortCard[1].length; i++) {
            var data = tableSortCard[1][i][0];
            var value = 15 & data;
            1 == value && (value = 14);
            if (null != preValue && preValue + 1 != value) break;
            tableReturnCard.push(data);
            preValue = value;
          }
          if (tableReturnCard.length == bUserCardCount) return {
            type: ExtractType.CardType_straight,
            value: tableReturnCard
          };
        }
        if (bUserCardCount == 2 * tableSortCard[2].length) {
          var preValue = null;
          var tableReturnCard_1 = [];
          for (var i = 0; i < tableSortCard[2].length; i++) {
            var data = tableSortCard[2][i][0];
            var value = 15 & data;
            1 == value && (value = 14);
            if (null != preValue && preValue + 1 != value) break;
            tableSortCard[2][i].forEach(function(value) {
              tableReturnCard_1.push(value);
            });
            preValue = value;
          }
          if (tableReturnCard_1.length == bUserCardCount) return {
            type: ExtractType.CardType_straightPair,
            value: tableReturnCard_1
          };
        }
        if (bUserCardCount >= 3 && bUserCardCount <= 5 && 1 == tableSortCard[3].length) {
          var tableReturnCard = tableSortCard[3][0].slice();
          tableSortCard[3] = [];
          for (var i = 1; i < 5; i++) {
            var mc = tableSortCard[i];
            for (var j = 0; j < mc.length; j++) {
              var mk = mc[j];
              for (var m = 0; m < mk.length; m++) {
                var v = mk[m];
                tableReturnCard.push(v);
              }
            }
          }
          if (tableReturnCard.length == bUserCardCount) return {
            type: ExtractType.CardType_3Add2,
            value: tableReturnCard
          };
        }
        if (tableSortCard[3].length >= 2 && bUserCardCount >= 3 * tableSortCard[3].length && bUserCardCount <= 5 * tableSortCard[3].length) {
          var preValue = null;
          var tableReturnCard_2 = [];
          var _loop_1 = function(i) {
            var data = tableSortCard[3][i][0];
            var value = 15 & data;
            1 == value ? value = 14 : 2 == value && (value = 15);
            if (null == preValue || preValue + 1 == value) {
              tableSortCard[3][i].forEach(function(value) {
                tableReturnCard_2.push(data);
              });
              preValue = value;
            } else {
              if (!(tableReturnCard_2.length / 3 < 2)) return "break";
              tableReturnCard_2 = [];
              tableSortCard[3][i].forEach(function(value) {
                tableReturnCard_2.push(data);
              });
              preValue = value;
            }
          };
          for (var i = 0; i < tableSortCard[3].length; i++) {
            var state_1 = _loop_1(i);
            if ("break" === state_1) break;
          }
          var count_1 = tableReturnCard_2.length / 3;
          count_1 >= 2 && tableReturnCard_2.forEach(function(value) {
            var isFound = false;
            for (var i = 0; i < tableSortCard[3].length; i++) {
              var chilArry = tableSortCard[3][i];
              for (var j = 0; j < chilArry.length; j++) {
                var key = chilArry[j];
                if (value == key) {
                  chilArry.splice(j, 1);
                  isFound = true;
                  break;
                }
              }
              if (isFound) break;
            }
            for (var i = 1; i < 5; i++) {
              var m = tableSortCard[i];
              for (var j = 0; j < m.length; j++) {
                var childArry = m[j];
                for (var k = 0; k < childArry.length; k++) {
                  var value_1 = childArry[k];
                  tableReturnCard_2.push(value_1);
                  if (tableReturnCard_2.length % (5 * count_1) == 0) break;
                }
              }
              if (tableReturnCard_2.length % (5 * count_1) == 0) break;
            }
            if (tableReturnCard_2.length == bUserCardCount) return {
              type: ExtractType.CardType_airplane,
              value: tableReturnCard_2
            };
          });
        }
        return {
          type: ExtractType.CardType_error,
          value: null
        };
      }
      PdkUtils.getCardTypeAndCard = getCardTypeAndCard;
      function getExtractCardType(bCardData, bUserCardCount, bTargetCardData, bTargetUserCardCount) {
        var tableCard = {};
        if (bUserCardCount <= 0) return tableCard;
        var tableSortCard = getSortCard(bCardData, bUserCardCount);
        var targetType = null;
        var targetCardData = null;
        if (null != bTargetUserCardCount && bTargetUserCardCount > 0) {
          var cardData = getCardTypeAndCard(bTargetCardData, bTargetUserCardCount);
          targetType = cardData.type;
          targetCardData = cardData.value;
        }
        var targetValue = 0;
        null != targetCardData && (targetValue = 15 & targetCardData[0]);
        1 == targetValue ? targetValue = 14 : 2 == targetValue && (targetValue = 15);
        var _index = 0;
        var pushData = function(data, isArry) {
          void 0 === isArry && (isArry = false);
          tableCard[_index] || (tableCard[_index] = []);
          isArry ? tableCard[_index].push(data) : tableCard[_index].push([ data ]);
          _index++;
        };
        if (targetType == ExtractType.CardType_single) {
          var gameConfig = GameData_1.gameData.gameConfig;
          var wPlayerCount = gameConfig.bPlayerCount;
          var meChairID = GameData_1.gameData.getRoleChairID();
          if (0 == gameConfig.bAbandon) {
            var maxValue = null;
            var maxData = null;
            for (var i = 1; i < 5; i++) {
              var cardArry = tableSortCard[i];
              for (var j = 0; j < cardArry.length; j++) {
                var dataArr = cardArry[j];
                if (dataArr.length < 4) {
                  var value = 15 & dataArr[0];
                  1 == value ? value = 14 : 2 == value && (value = 15);
                  if (value > targetValue && (null == maxValue || value > maxValue)) {
                    maxValue = value;
                    maxData = dataArr[0];
                  }
                }
              }
            }
            maxValue && pushData(maxData);
          } else {
            var tableSortCardTemp_1 = Tools_1.Tools.clone(tableSortCard);
            for (var i = 0; i < tableSortCardTemp_1[1].length; i++) {
              var arr = tableSortCardTemp_1[1][i];
              var value = 15 & arr[0];
              1 == value ? value = 14 : 2 == value && (value = 15);
              value > targetValue && pushData(arr[arr.length - 1]);
            }
            for (var i = 0; i < tableSortCardTemp_1[2].length; i++) {
              var arr = tableSortCardTemp_1[2][i];
              var value = 15 & arr[0];
              1 == value ? value = 14 : 2 == value && (value = 15);
              value > targetValue && pushData(arr[arr.length - 1]);
            }
            for (var i = 0; i < tableSortCardTemp_1[3].length; i++) {
              var arr = tableSortCardTemp_1[3][i];
              var value = 15 & arr[0];
              1 == value ? value = 14 : 2 == value && (value = 15);
              value > targetValue && pushData(arr[arr.length - 1]);
            }
          }
        }
        if (targetType == ExtractType.CardType_pair) {
          var tableSortCardTemp_2 = Tools_1.Tools.clone(tableSortCard);
          for (var i = 0; i < tableSortCardTemp_2[2].length; i++) {
            var arr = tableSortCardTemp_2[2][i];
            var value = 15 & arr[0];
            1 == value ? value = 14 : 2 == value && (value = 15);
            value > targetValue && pushData(arr, true);
          }
          for (var i = 0; i < tableSortCardTemp_2[3].length; i++) {
            var arr = tableSortCardTemp_2[3][i];
            var value = 15 & arr[0];
            1 == value ? value = 14 : 2 == value && (value = 15);
            if (value > targetValue) {
              arr.splice(0, 1);
              pushData(arr, true);
            }
          }
        }
        if (null == targetType || targetType == ExtractType.CardType_straight) {
          var tableSortCardTemp_3 = [];
          for (var i = 1; i < 5; i++) {
            var cardArry = tableSortCard[i];
            for (var j = 0; j < cardArry.length; j++) {
              var dataArr = cardArry[j];
              if (dataArr.length < 4) {
                var value = 15 & dataArr[0];
                1 == value ? value = 14 : 2 == value && (value = 15);
                tableSortCardTemp_3[value] = dataArr[dataArr.length - 1];
              }
            }
          }
          tableSortCardTemp_3[15] = null;
          var targetMinValue = 3;
          if (null != targetCardData) {
            targetMinValue = 15 & targetCardData[0];
            1 == targetMinValue ? targetMinValue = 14 : 2 == targetMinValue && (targetMinValue = 15);
            targetMinValue += 1;
            for (var i = targetMinValue; i <= 14; i++) {
              var tableReturnCard = [];
              for (var j = 0; j < targetCardData.length; j++) {
                if (null == tableSortCardTemp_3[i + j]) break;
                tableReturnCard.push(tableSortCardTemp_3[i + j]);
              }
              tableReturnCard.length == targetCardData.length && pushData(tableReturnCard, true);
            }
          } else {
            var tableReturnCard = [];
            for (var i = 0; i < 15; i++) if (null != tableSortCardTemp_3[i]) tableReturnCard.push(tableSortCardTemp_3[i]); else {
              tableReturnCard.length >= 5 && pushData(tableReturnCard, true);
              tableReturnCard = [];
            }
          }
        }
        if (null == targetType || targetType == ExtractType.CardType_straightPair) {
          var tableSortCardTemp_4 = {};
          for (var i = 1; i < 5; i++) {
            var cardArry = tableSortCard[i];
            for (var j = 0; j < cardArry.length; j++) {
              var dataArr = cardArry[j];
              if (dataArr.length < 4 && dataArr.length >= 2) {
                var value = 15 & dataArr[0];
                1 == value ? value = 14 : 2 == value && (value = 15);
                tableSortCardTemp_4[value] = [ dataArr[dataArr.length - 2], dataArr[dataArr.length - 1] ];
                cc.log("=>>", tableSortCardTemp_4);
              }
            }
          }
          tableSortCardTemp_4[15] = null;
          var targetMinValue = 3;
          if (null != targetCardData) {
            targetMinValue = 15 & targetCardData[0];
            1 == targetMinValue ? targetMinValue = 14 : 2 == targetMinValue && (targetMinValue = 15);
            targetMinValue += 1;
          }
          if (null != targetCardData) for (var i = targetMinValue; i <= 14; i++) {
            var tableReturnCard = [];
            for (var j = 0; j <= .5 * targetCardData.length - 1; j++) {
              if (!(null != tableSortCardTemp_4[i + j] && tableSortCardTemp_4[i + j].length >= 2 && tableSortCardTemp_4[i + j].length <= 3)) break;
              var value = tableSortCardTemp_4[i + j][tableSortCardTemp_4[i + j].length - 1];
              tableReturnCard.push(value);
              value = tableSortCardTemp_4[i + j][tableSortCardTemp_4[i + j].length - 2];
              tableReturnCard.push(value);
              tableReturnCard.length == targetCardData.length && pushData(tableReturnCard, true);
            }
          } else {
            var tableReturnCard = [];
            for (var i = 0; i < 15; i++) if (null != tableSortCardTemp_4[i] && tableSortCardTemp_4[i].length >= 2 && tableSortCardTemp_4[i].length <= 3) {
              var value = tableSortCardTemp_4[i][tableSortCardTemp_4[i].length - 1];
              tableReturnCard.push(value);
              value = tableSortCardTemp_4[i][tableSortCardTemp_4[i].length - 2];
              tableReturnCard.push(value);
            } else {
              tableReturnCard.length >= 4 && tableReturnCard.length % 2 == 0 && pushData(tableReturnCard, true);
              tableReturnCard = [];
            }
          }
        }
        if (null == targetType || targetType == ExtractType.CardType_3Add2) {
          var tableSortCardTemp_5 = Tools_1.Tools.clone(tableSortCard);
          for (var i = 0; i < tableSortCardTemp_5[3].length; i++) {
            var arr = tableSortCardTemp_5[3][i];
            var value = 15 & arr[0];
            1 == value ? value = 14 : 2 == value && (value = 15);
            if (value > targetValue) {
              var tableReturnCard = Tools_1.Tools.clone(arr);
              if (tableReturnCard.length % 5 != 0) for (var j = 0; j < tableSortCardTemp_5[1].length; j++) {
                var varry = tableSortCardTemp_5[1][j];
                for (var index = 0; index < varry.length; index++) {
                  tableReturnCard.push(varry[index]);
                  if (tableReturnCard.length % 5 == 0) break;
                }
                if (tableReturnCard.length % 5 == 0) break;
              }
              if (tableReturnCard.length % 5 != 0) for (var i_1 = 0; i_1 < tableSortCardTemp_5[2].length; i_1++) {
                for (var j = 0; j < tableSortCardTemp_5[2][i_1].length; j++) {
                  tableReturnCard.push(tableSortCardTemp_5[2][i_1][j]);
                  if (tableReturnCard.length % 5 == 0) break;
                }
                if (tableReturnCard.length % 5 == 0) break;
              }
              if (tableReturnCard.length % 5 != 0) for (var i_2 = 0; i_2 < tableSortCardTemp_5[3].length; i_2++) {
                var v = tableSortCardTemp_5[3][i_2];
                var value1 = 15 & v[0];
                1 == value1 ? value1 = 14 : 2 == value1 && (value1 = 15);
                if (value != value1) {
                  for (var j = 0; j < v.length; j++) {
                    var vVar = v[j];
                    tableReturnCard.push(vVar);
                    if (tableReturnCard.length % 5 == 0) break;
                  }
                  if (tableReturnCard.length % 5 == 0) break;
                }
              }
              (null == targetCardData || null != targetCardData && tableReturnCard.length == targetCardData.length || tableReturnCard.length == bUserCardCount && bUserCardCount >= 3) && pushData(tableReturnCard, true);
            }
          }
        }
        if (1 == GameData_1.gameData.gameConfig.b4Add3 && targetType == ExtractType.CardType_4Add3) {
          var tableSortCardTemp_6 = Tools_1.Tools.clone(tableSortCard);
          for (var i = 0; i < tableSortCardTemp_6[3].length; i++) {
            var v = tableSortCardTemp_6[3][i];
            var value = 15 & v[0];
            1 == value ? value = 14 : 2 == value && (value = 15);
            if (value > targetValue) {
              var tableReturnCard = Tools_1.Tools.clone(v);
              if (tableReturnCard.length % 7 != 0) for (var j = 0; j < tableSortCardTemp_6[0].length; j++) {
                var arr = tableSortCardTemp_6[0][j];
                for (var k = 0; k < arr.length; k++) {
                  var vvar = arr[k];
                  tableReturnCard.push(vvar);
                  if (tableReturnCard.length % 7 == 0) break;
                }
                if (tableReturnCard.length % 7 == 0) break;
              }
              if (tableReturnCard.length % 7 != 0) for (var j = 0; j < tableSortCardTemp_6[1].length; j++) {
                var arr = tableSortCardTemp_6[0][j];
                for (var k = 0; k < arr.length; k++) {
                  var vvar = arr[k];
                  tableReturnCard.push(vvar);
                  if (tableReturnCard.length % 7 == 0) break;
                }
                if (tableReturnCard.length % 7 == 0) break;
              }
              if (tableReturnCard.length % 7 != 0) for (var j = 0; j < tableSortCardTemp_6[2].length; j++) {
                var arr = tableSortCardTemp_6[0][j];
                for (var k = 0; k < arr.length; k++) {
                  var vvar = arr[k];
                  tableReturnCard.push(vvar);
                  if (tableReturnCard.length % 7 == 0) break;
                }
                if (tableReturnCard.length % 7 == 0) break;
              }
              (null == targetCardData || null != targetCardData && tableReturnCard.length == targetCardData.length) && pushData(tableReturnCard, true);
            }
          }
        }
        if (null == targetType || targetType == ExtractType.CardType_airplane) {
          var tableSortCardTemp_7 = [];
          for (var i = 1; i < 5; i++) {
            var cardArry = tableSortCard[i];
            for (var j = 0; j < cardArry.length; j++) {
              var dataArr = cardArry[j];
              if (dataArr.length < 4) {
                var value = 15 & dataArr[0];
                1 == value ? value = 14 : 2 == value && (value = 15);
                tableSortCardTemp_7[value] = Tools_1.Tools.clone(dataArr);
              }
            }
          }
          tableSortCardTemp_7[15] = null;
          var targetMinValue = 3;
          if (null != targetCardData) {
            targetMinValue = 15 & targetCardData[0];
            1 == targetMinValue ? targetMinValue = 14 : 2 == targetMinValue && (targetMinValue = 15);
            targetMinValue += 1;
          }
          if (null != targetCardData) {
            var count = targetCardData.length / 5;
            for (var i = targetMinValue; i <= 14; i++) {
              var tableReturnCard = [];
              var table3SameValue = [];
              var isAirplane = true;
              for (var j = 0; j < count - 1; j++) {
                if (null == tableSortCardTemp_7[i + j] || 3 != tableSortCardTemp_7[i + j].length) {
                  isAirplane = false;
                  break;
                }
                table3SameValue[i + j] = true;
                for (var k = 0; k < tableSortCardTemp_7[i + j].length; k++) {
                  var var1 = tableSortCardTemp_7[i + j][k];
                  tableReturnCard.push(var1);
                }
              }
              if (true == isAirplane) {
                for (var i_3 = 0; i_3 < tableSortCard[1].length; i_3++) {
                  var var1 = tableSortCard[1][i_3];
                  for (var j = 0; j < var1.length; j++) {
                    var v = var1[j];
                    tableReturnCard.push(v);
                    if (tableReturnCard.length % (5 * count) == 0) break;
                  }
                  if (tableReturnCard.length % (5 * count) == 0) break;
                }
                if (tableReturnCard.length % (5 * count) != 0) for (var i_4 = 0; i_4 < tableSortCard[2].length; i_4++) {
                  var arryT = tableSortCard[2][i_4];
                  for (var j = 0; j < arryT.length; j++) {
                    var v = arryT[j];
                    tableReturnCard.push(v);
                    if (tableReturnCard.length % (5 * count) == 0) break;
                  }
                  if (tableReturnCard.length % (5 * count) == 0) break;
                }
                if (tableReturnCard.length % (5 * count) != 0) for (var i_5 = 0; i_5 < tableSortCard[3].length; i_5++) {
                  var value1 = tableSortCard[3][i_5];
                  var value = 15 & value1[0];
                  2 == value ? value = 14 : 2 == value && (value = 15);
                  if (null == table3SameValue[value]) {
                    for (var k = 0; k < value1.length; k++) {
                      var v = value1[k];
                      tableReturnCard.push(v);
                      if (tableReturnCard.length % (5 * count) == 0) break;
                    }
                    if (tableReturnCard.length % (5 * count) == 0) break;
                  }
                }
                pushData(tableReturnCard, true);
              }
            }
          } else {
            var tableReturnCard = [];
            var table3SameValue = [];
            for (var i = 0; i < 15; i++) if (null != tableSortCardTemp_7[i] && 3 == tableSortCardTemp_7[i].length) {
              table3SameValue[i] = true;
              for (var j = 0; j < tableSortCardTemp_7[i].length; j++) {
                var v = tableSortCardTemp_7[i][j];
                tableReturnCard.push(v);
              }
            } else {
              if (tableReturnCard.length >= 6) {
                var count = tableReturnCard.length / 3;
                if (tableReturnCard.length % (5 * count) != 0) for (var i_6 = 0; i_6 < tableSortCard[1].length; i_6++) {
                  var arryT = tableSortCard[1][i_6];
                  for (var j = 0; j < arryT.length; j++) {
                    var v = arryT[j];
                    tableReturnCard.push(v);
                    if (tableReturnCard.length % (5 * count) == 0) break;
                  }
                  if (tableReturnCard.length % (5 * count) == 0) break;
                }
                if (tableReturnCard.length % (5 * count) != 0) for (var i_7 = 0; i_7 < tableSortCard[2].length; i_7++) {
                  var arryT = tableSortCard[2][i_7];
                  for (var j = 0; j < arryT.length; j++) {
                    var v = arryT[j];
                    tableReturnCard.push(v);
                    if (tableReturnCard.length % (5 * count) == 0) break;
                  }
                  if (tableReturnCard.length % (5 * count) == 0) break;
                }
                if (tableReturnCard.length % (5 * count) != 0) for (var i_8 = 0; i_8 < tableSortCard[3].length; i_8++) {
                  var value1 = tableSortCard[3][i_8];
                  var value = 15 & value1[0];
                  2 == value ? value = 14 : 2 == value && (value = 15);
                  if (null == table3SameValue[value]) {
                    for (var k = 0; k < value1.length; k++) {
                      var v = value1[k];
                      tableReturnCard.push(v);
                      if (tableReturnCard.length % (5 * count) == 0) break;
                    }
                    if (tableReturnCard.length % (5 * count) == 0) break;
                  }
                }
                pushData(tableReturnCard, true);
              }
              tableReturnCard = [];
              table3SameValue = [];
            }
          }
        }
        null != targetType && targetType == ExtractType.CardType_bomb || (targetValue = 0);
        var tableSortCardTemp = Tools_1.Tools.clone(tableSortCard);
        for (var i = 0; i < tableSortCardTemp[4].length; i++) {
          var v = tableSortCardTemp[4][i];
          var value = 15 & v[0];
          1 == value ? value = 14 : 2 == value && (value = 15);
          value > targetValue && pushData(v, true);
        }
        tableCard._index = _index;
        return tableCard;
      }
      PdkUtils.getExtractCardType = getExtractCardType;
    })(PdkUtils = exports.PdkUtils || (exports.PdkUtils = {}));
    cc._RF.pop();
  }, {
    "../../../../core/tools/Tools": "Tools",
    "../data/GameData": "GameData"
  } ],
  PosInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bbc89w1BmNFTpPVdjd6vggV", "PosInfo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ViewMgr_1 = require("../../../common/views/ViewMgr");
    var PosInfo = function() {
      function PosInfo() {}
      Object.defineProperty(PosInfo, "PLAYER_POS_NEXT", {
        get: function() {
          return cc.v2(ViewMgr_1.viewMgr.winSize.width / 2 + 452, 360);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PosInfo, "PLAYER_POS_PER", {
        get: function() {
          return cc.v2(.5 * ViewMgr_1.viewMgr.winSize.width - 452, 360);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PosInfo, "CARD_POS_NEXT_X", {
        get: function() {
          return .5 * ViewMgr_1.viewMgr.winSize.width + 353;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PosInfo, "PLAYER_POS_FRONT_FOUR", {
        get: function() {
          return cc.v2(.5 * ViewMgr_1.viewMgr.winSize.width - 305, 500);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PosInfo, "CARD_POS_FRONT_FOUR_X", {
        get: function() {
          return .5 * ViewMgr_1.viewMgr.winSize.width - 192;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PosInfo, "CARD_ACTION_POS_ME", {
        get: function() {
          return cc.v2(.5 * ViewMgr_1.viewMgr.winSize.width, 224 + PosInfo.CARD_HEIGHT_ME + 45);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PosInfo, "CARD_ACTION_POS_NEXT", {
        get: function() {
          return cc.v2(PosInfo.CARD_POS_NEXT_X, PosInfo.CARD_HEIGHT_OTHERS_THROW + 45);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PosInfo, "CARD_ACTION_POS_PER", {
        get: function() {
          return cc.v2(PosInfo.CARD_POS_PER_X, PosInfo.CARD_HEIGHT_OTHERS_THROW + 45);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PosInfo, "CARD_POS_PER_X", {
        get: function() {
          return .5 * ViewMgr_1.viewMgr.winSize.width - 353;
        },
        enumerable: true,
        configurable: true
      });
      PosInfo.CARD_SCALE_ME = 1;
      PosInfo.CARD_HEIGHT_ME = 105;
      PosInfo.CARD_INT_WIDTH = 58;
      PosInfo.CARD_WIDTH = 120;
      PosInfo.CARD_HEIGHT = 156;
      PosInfo.CARD_DISX = 100;
      PosInfo.CARD_UP_HEIGHT = 36;
      PosInfo.CARD_SCALE_THROW = .56;
      PosInfo.CARD_HEIGHT_THROW = 220;
      PosInfo.CARD_THROW_LAST_WIDTH_TWO = 30;
      PosInfo.CARD_THROW_WIDTH_OTHERS = 30;
      PosInfo.CARD_THROW_WIDTH_ME_TWO = 30;
      PosInfo.CARD_HEIGHT_OTHERS_THROW = 405;
      PosInfo.CARD_HEIGHT_OTHERS_THROW_FOUR = 405;
      PosInfo.CARD_HEIGHT_FRONT_THROW_FOUR = 517;
      return PosInfo;
    }();
    exports.PosInfo = PosInfo;
    cc._RF.pop();
  }, {
    "../../../common/views/ViewMgr": "ViewMgr"
  } ],
  ProtoTools: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "22bbc3doqBFzrg3hm0Z6/d8", "ProtoTools");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ProtocolModule = function() {
      function ProtocolModule() {}
      ProtocolModule.ProtoType = {
        Send: 1,
        Rev: 2,
        Notify: 3
      };
      return ProtocolModule;
    }();
    exports.ProtocolModule = ProtocolModule;
    var protoTools;
    (function(protoTools) {
      function receive(route) {
        var model = new ProtocolModule();
        model.commandID = route;
        model.type = ProtocolModule.ProtoType.Rev;
        return function(target, key) {
          model.functionKey = key;
          target.__protocolList = target.__protocolList || [];
          target.__protocolList.push(model);
        };
      }
      protoTools.receive = receive;
      function request(route, isShowMask) {
        void 0 === isShowMask && (isShowMask = false);
        var model = new ProtocolModule();
        model.commandID = route;
        model.type = ProtocolModule.ProtoType.Send;
        model.isShow = isShowMask;
        return function(target, key) {
          model.functionKey = key;
          target.__protocolList = target.__protocolList || [];
          target.__protocolList.push(model);
        };
      }
      protoTools.request = request;
      function notify(route) {
        var model = new ProtocolModule();
        model.commandID = route;
        model.type = ProtocolModule.ProtoType.Notify;
        return function(target, key) {
          model.functionKey = key;
          target.__protocolList = target.__protocolList || [];
          target.__protocolList.push(model);
        };
      }
      protoTools.notify = notify;
    })(protoTools = exports.protoTools || (exports.protoTools = {}));
    cc._RF.pop();
  }, {} ],
  ResLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3d537VQW4dFFZVYi5lIyZxv", "ResLoader");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var resLoader;
    (function(resLoader) {
      function loadScene(sceneName) {
        return new Promise(function(resolve, reject) {
          cc.director.loadScene(sceneName, function(error) {
            if (error) {
              reject(error.message || error);
              return;
            }
            resolve();
          });
        });
      }
      resLoader.loadScene = loadScene;
      function loadRemoteImage(url, success) {}
      resLoader.loadRemoteImage = loadRemoteImage;
      function loadRes(path, type) {
        return new Promise(function(resolve, reject) {
          var asset = getRes(path, type);
          asset ? resolve(asset) : cc.loader.loadRes(path, function(err, asset) {
            if (err) {
              reject(err.message || err);
              return;
            }
            resolve(asset);
          });
        });
      }
      resLoader.loadRes = loadRes;
      function getRes(path, resType) {
        return cc.loader.getRes(path, resType);
      }
      resLoader.getRes = getRes;
      function loadResDir(path) {
        return new Promise(function(resolve, reject) {
          cc.loader.loadResDir(path, function(err, assets, urls) {
            if (err) {
              reject(err.message || err);
              return;
            }
            resolve(assets);
          });
        });
      }
      resLoader.loadResDir = loadResDir;
      function loadResDirArry(path, progressCallback, completeCallback, type) {
        var allUrls = [];
        path.forEach(function(str) {
          var urls = [];
          cc.loader._resources.getUuidArray(str, type, urls);
          allUrls = allUrls.concat(urls);
        });
        cc.loader.loadResArray(allUrls, type, progressCallback, completeCallback);
      }
      resLoader.loadResDirArry = loadResDirArry;
      function playAnimation(path, armatureName, newAnimation, playTimes, completeCallback) {
        var subPath = path.split("/");
        var nodeName = subPath.length > 0 ? subPath[subPath.length - 1] : path;
        var node = new cc.Node(nodeName);
        loadResDir(path).then(function(assets) {
          var armatureDisplay = node.addComponent(dragonBones.ArmatureDisplay);
          for (var i = 0; i < assets.length; i++) {
            assets[i] instanceof dragonBones.DragonBonesAsset && (armatureDisplay.dragonAsset = assets[i]);
            assets[i] instanceof dragonBones.DragonBonesAtlasAsset && (armatureDisplay.dragonAtlasAsset = assets[i]);
          }
          armatureDisplay.armatureName = armatureName;
          armatureDisplay.playAnimation(newAnimation, playTimes);
          completeCallback && armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, completeCallback);
        });
        return node;
      }
      resLoader.playAnimation = playAnimation;
    })(resLoader = exports.resLoader || (exports.resLoader = {}));
    cc._RF.pop();
  }, {} ],
  RoleSeatUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "962f9pDz/RLxrqS4Vlpf8LR", "RoleSeatUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UITools_1 = require("../../../../core/view/UITools");
    var GameData_1 = require("../data/GameData");
    var Tools_1 = require("../../../../core/tools/Tools");
    var BaseUI_1 = require("../../../../core/view/BaseUI");
    var TableProto_1 = require("../data/TableProto");
    var Animation_1 = require("../../../../core/base/Animation");
    var RoleSeatUI = function(_super) {
      __extends(RoleSeatUI, _super);
      function RoleSeatUI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.playerAnim = [];
        return _this;
      }
      RoleSeatUI.prototype.startGameCallFunc = function() {
        this.startGameBtn.active = false;
        var roomid = this.tableProto.roomInfo.roomid;
        this.tableProto.sendReady({
          uid: GameData_1.gameData.uid,
          roomid: roomid
        });
        this.showReadyAnimation();
      };
      RoleSeatUI.prototype.onInit = function() {
        this.hideAllCutDown();
        this.hideAllName();
        this.hideAllSeat();
        this.hideAllListCardNum();
        this.hideAllReady();
        this.initUI();
      };
      RoleSeatUI.prototype.onEnter = function() {
        this.bindInfo();
      };
      RoleSeatUI.prototype.initUI = function() {
        this.cutdownArry = [ null ].concat(this.cutdownArry || []);
        this.readys = [ null ].concat(this.readys || []);
      };
      RoleSeatUI.prototype.setProto = function(tableProto) {
        this.tableProto = tableProto;
      };
      RoleSeatUI.prototype.bindInfo = function() {
        var _this = this;
        this.tableProto.players.forEach(function(player, seat) {
          _this.ui.bind(player, "chairID", function(chairID) {
            var viewID = GameData_1.gameData.getViewIDByChairID(chairID);
            _this.addRole(viewID, player.name.toString());
          });
        });
      };
      RoleSeatUI.prototype._instanceRole = function(viewID, path, armatureName) {
        if (!this.playerAnim[viewID]) {
          var anim = new Animation_1.Game.Animation();
          var config = {
            path: path,
            armatureName: armatureName
          };
          var node = this.anim_Arry[viewID];
          if (!node) {
            cc.error("error viewID", viewID);
            return;
          }
          anim.setConfig(config);
          node.addChild(anim);
          anim.play("idle");
          var scale = .75;
          viewID == TableProto_1.Seat.Me || viewID == TableProto_1.Seat.Next ? anim.setScale(-scale, scale) : anim.setScale(scale, scale);
          this.playerAnim[viewID] = anim;
        }
        this.playerArry[viewID].active = true;
      };
      RoleSeatUI.prototype.addRole = function(viewID, name) {
        this._instanceRole(viewID, "game/pdk/animation/girl", "armatureName");
        this.initPlayerInfo(name, viewID);
      };
      RoleSeatUI.prototype.initPlayerInfo = function(name, viewID) {
        var node = this.nameArry[viewID];
        node.active = true;
        var nameNode = node.getChildByName("name");
        var limitName = Tools_1.Tools.nameLimit(name, 12);
        UITools_1.UITools.setNodeString(nameNode, limitName);
      };
      RoleSeatUI.prototype.roleLeave = function(viewID) {
        viewID != TableProto_1.Seat.Me && (this.cutdownArry[viewID].active = false);
        this.nameArry[viewID].active = false;
        this.playerArry[viewID].active = false;
        var node = this.readys[viewID];
        node && (node.active = false);
      };
      RoleSeatUI.prototype.hideAllCutDown = function() {
        this.cutdownArry.forEach(function(node) {
          node && (node.active = false);
        });
      };
      RoleSeatUI.prototype.hideAllListCardNum = function() {};
      RoleSeatUI.prototype.hideAllSeat = function() {
        this.playerArry.forEach(function(node) {
          node.active = false;
        });
      };
      RoleSeatUI.prototype.hideAllName = function() {
        this.nameArry.forEach(function(node) {
          node.active = false;
        });
      };
      RoleSeatUI.prototype.leaveRole = function(uid) {
        var player = this.tableProto.findPlayerByUID(uid);
        var viewId = GameData_1.gameData.getViewIDByChairID(player.chairID);
        this.nameArry[viewId].active = false;
        this.playerArry[viewId].active = false;
        viewId != TableProto_1.Seat.Me && (this.cutdownArry[viewId].active = false);
      };
      RoleSeatUI.prototype.updateRoleCutDown = function(viewID) {
        this.hideAllCutDown();
        var node = this.cutdownArry[viewID];
        if (node) {
          node.active = true;
          var child_1 = node.getChildByName("timelist");
          child_1.stopAllActions();
          var times_1 = 10;
          UITools_1.UITools.setNodeString(child_1, times_1.toString());
          Tools_1.Tools.repeat(child_1, function() {
            times_1--;
            UITools_1.UITools.setNodeString(child_1, times_1.toString());
          }, 1, 10);
        }
      };
      RoleSeatUI.prototype.updateReady = function(viewID, state) {
        if (viewID == TableProto_1.Seat.Me) {
          if (state == TableProto_1.GameState.Ready) this.startGameBtn.active = true; else if (state == TableProto_1.GameState.Start) {
            this.showReadyAnimation();
            this.startGameBtn.active = false;
          }
        } else {
          var node = this.readys[viewID];
          node && (node.active = 1 == state);
        }
      };
      RoleSeatUI.prototype.updateOther = function() {};
      RoleSeatUI.prototype.hideReady = function() {
        this.hideAllReady();
        this.readyMe.active = false;
        this.readyMe.stopAllActions();
      };
      RoleSeatUI.prototype.hideAllReady = function() {
        this.readys.forEach(function(node) {
          node && (node.active = false);
        });
        this.readyMe.stopAllActions();
        this.readyMe.active = false;
        this.startGameBtn.active = false;
      };
      RoleSeatUI.prototype.showReadyAnimation = function() {
        var _this = this;
        this.readyMe.active = true;
        this.readyMe.stopAllActions();
        var index = 0;
        var str = "\u65f6\u523b\u51c6\u5907\u7740";
        var showStr = str;
        Tools_1.Tools.repeatForever(this.readyMe, function() {
          index++;
          showStr += ".";
          if (4 == index) {
            index = 0;
            showStr = str;
          }
          UITools_1.UITools.setNodeString(_this.readyMe, showStr);
        }, .8);
      };
      __decorate([ UITools_1.UITools.UIItemArray("anim_{0}", [ 1, 2, 3 ]) ], RoleSeatUI.prototype, "anim_Arry", void 0);
      __decorate([ UITools_1.UITools.UIItemArray("cutdown_{0}", [ 2, 3 ]) ], RoleSeatUI.prototype, "cutdownArry", void 0);
      __decorate([ UITools_1.UITools.UIItemArray("seat_{0}", [ 1, 2, 3 ]) ], RoleSeatUI.prototype, "nameArry", void 0);
      __decorate([ UITools_1.UITools.UIItemArray("player{0}", [ 1, 2, 3 ]) ], RoleSeatUI.prototype, "playerArry", void 0);
      __decorate([ UITools_1.UITools.UIItemArray("ready_{0}", [ 2, 3 ]) ], RoleSeatUI.prototype, "readys", void 0);
      __decorate([ UITools_1.UITools.UIItem("readyme") ], RoleSeatUI.prototype, "readyMe", void 0);
      __decorate([ UITools_1.UITools.UIItem("startGame") ], RoleSeatUI.prototype, "startGameBtn", void 0);
      __decorate([ UITools_1.UITools.OnItemClick("startGame") ], RoleSeatUI.prototype, "startGameCallFunc", null);
      return RoleSeatUI;
    }(BaseUI_1.UIComponent);
    exports.RoleSeatUI = RoleSeatUI;
    cc._RF.pop();
  }, {
    "../../../../core/base/Animation": "Animation",
    "../../../../core/tools/Tools": "Tools",
    "../../../../core/view/BaseUI": "BaseUI",
    "../../../../core/view/UITools": "UITools",
    "../data/GameData": "GameData",
    "../data/TableProto": "TableProto"
  } ],
  RoomNumberView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "515c7P1t39GxKHlJMdV+AZr", "RoomNumberView");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UITools_1 = require("../../../core/view/UITools");
    var CommonComp_1 = require("../../common/component/CommonComp");
    var FileUI_1 = require("../../../core/view/FileUI");
    var ViewMgr_1 = require("../../common/views/ViewMgr");
    var RoomProto_1 = require("../data/RoomProto");
    var Tools_1 = require("../../../core/tools/Tools");
    var GameData_1 = require("../../game/pdk/data/GameData");
    var RoomNumberView = function(_super) {
      __extends(RoomNumberView, _super);
      function RoomNumberView() {
        var _this = _super.call(this, "game/pdk/ui/prefab/roominput") || this;
        _this._numbArry = [];
        _this.roomProto = new RoomProto_1.Room.RoomProto();
        return _this;
      }
      RoomNumberView.prototype.onEnter = function() {
        this.updateShow();
      };
      RoomNumberView.prototype.onItemClick = function(e) {
        if (this._numbArry.length >= 6) return;
        var str = e.target.name;
        var numstr = str.split("_")[1];
        "10" == numstr && (numstr = 0);
        this._numbArry.push(numstr);
        this.updateShow();
      };
      RoomNumberView.prototype.confirmCallFunc = function() {
        this._numbArry.length < 6 ? ViewMgr_1.viewMgr.showTips("\u623f\u95f4id\u9519\u8bef!") : this.joinRoom();
      };
      RoomNumberView.prototype.joinRoom = function() {
        var roomID = this.getRoomID();
        this.roomProto.sendJoinRoom({
          uid: GameData_1.gameData.uid,
          roomid: roomID
        });
      };
      RoomNumberView.prototype.onDeleteCallFunc = function() {
        this._numbArry.pop();
        this.updateShow();
      };
      RoomNumberView.prototype.close = function() {
        this.destory();
      };
      RoomNumberView.prototype.updateShow = function() {
        var _this = this;
        var index = 0;
        this.inputNumbArry.forEach(function(node) {
          var str = Tools_1.Tools.isNullOrUndefined(_this._numbArry[index]) ? "" : _this._numbArry[index];
          node.active = parseInt(str) >= 0;
          UITools_1.UITools.setNodeString(node, str);
          index++;
        });
        6 == this._numbArry.length && this.joinRoom();
      };
      RoomNumberView.prototype.getRoomID = function() {
        var roomID = "";
        this._numbArry.forEach(function(value) {
          roomID += value;
        });
        return parseInt(roomID);
      };
      RoomNumberView.prototype.onExit = function() {
        this.roomProto.cleanup();
      };
      __decorate([ UITools_1.UITools.UIItemArrayWithRange("lab_{0}", 1, 6) ], RoomNumberView.prototype, "inputNumbArry", void 0);
      __decorate([ UITools_1.UITools.OnItemArryClick("button_{0}", 1, 10) ], RoomNumberView.prototype, "onItemClick", null);
      __decorate([ UITools_1.UITools.OnItemClick("button_confirm") ], RoomNumberView.prototype, "confirmCallFunc", null);
      __decorate([ UITools_1.UITools.OnItemClick("button_delete") ], RoomNumberView.prototype, "onDeleteCallFunc", null);
      __decorate([ UITools_1.UITools.OnItemClick("close_button") ], RoomNumberView.prototype, "close", null);
      RoomNumberView = __decorate([ UITools_1.UITools.AddUIComponent("", CommonComp_1.FullHoverComp, -1) ], RoomNumberView);
      return RoomNumberView;
    }(FileUI_1.UIFileItem);
    exports.RoomNumberView = RoomNumberView;
    cc._RF.pop();
  }, {
    "../../../core/tools/Tools": "Tools",
    "../../../core/view/FileUI": "FileUI",
    "../../../core/view/UITools": "UITools",
    "../../common/component/CommonComp": "CommonComp",
    "../../common/views/ViewMgr": "ViewMgr",
    "../../game/pdk/data/GameData": "GameData",
    "../data/RoomProto": "RoomProto"
  } ],
  RoomProto: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0d8e3//b/JLF4O3XYy/BbP9", "RoomProto");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseProto_1 = require("../../../core/net/BaseProto");
    var ProtoTools_1 = require("../../../core/net/ProtoTools");
    var PdkCmd_1 = require("../../game/pdk/config/PdkCmd");
    var Room;
    (function(Room) {
      var RoomProto = function(_super) {
        __extends(RoomProto, _super);
        function RoomProto() {
          return null !== _super && _super.apply(this, arguments) || this;
        }
        __decorate([ ProtoTools_1.protoTools.request(PdkCmd_1.PDKCmd.JOINROOM_MSG, true) ], RoomProto.prototype, "sendJoinRoom", void 0);
        return RoomProto;
      }(BaseProto_1.BaseProto);
      Room.RoomProto = RoomProto;
    })(Room = exports.Room || (exports.Room = {}));
    cc._RF.pop();
  }, {
    "../../../core/net/BaseProto": "BaseProto",
    "../../../core/net/ProtoTools": "ProtoTools",
    "../../game/pdk/config/PdkCmd": "PdkCmd"
  } ],
  SettingUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c98aa4/yfFBUpROVsJTwHnn", "SettingUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseUI_1 = require("../../../../core/view/BaseUI");
    var UITools_1 = require("../../../../core/view/UITools");
    var GameData_1 = require("../data/GameData");
    var HallMain_1 = require("../../../hall/view/HallMain");
    var ViewMgr_1 = require("../../../common/views/ViewMgr");
    var SettingUI = function(_super) {
      __extends(SettingUI, _super);
      function SettingUI() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      SettingUI.prototype.setProto = function(tableProto) {
        this.tableProto = tableProto;
      };
      SettingUI.prototype.onEnter = function() {
        this.oldPos = this.settingbg.getPosition();
        this.isShow = false;
        this.isMoveOver = true;
        this.settingbg.setPosition(cc.v2(this.oldPos.x - 300, this.oldPos.y));
        this.listenEvent();
      };
      SettingUI.prototype.listenEvent = function() {
        this.tableProto.on("exitTable", this.exitTable, this);
      };
      SettingUI.prototype.leaveClick = function() {
        var roomInfo = this.tableProto.roomInfo;
        var gameState = this.tableProto.gameState;
        0 == gameState ? this.tableProto.sendLeave({
          uid: GameData_1.gameData.uid,
          roomid: roomInfo.roomid
        }) : 1 == gameState ? this.tableProto.sendDissolve({
          uid: GameData_1.gameData.uid,
          roomid: roomInfo.roomid,
          dissolveState: 1
        }) : ViewMgr_1.viewMgr.showTips("\u5f02\u5e38\u9519\u8bef\uff01", 1);
      };
      SettingUI.prototype.backBtnCall = function() {
        if (!this.isMoveOver) return;
        this.isMoveOver = false;
        this.isShow ? this.rotateAng(90) : this.rotateAng(-90);
        this.isShow = !this.isShow;
        this.doAction(this.isShow);
      };
      SettingUI.prototype.exitTable = function(msg) {
        new HallMain_1.HallMain(0).start();
      };
      SettingUI.prototype.doAction = function(isShow) {
        var _this = this;
        this.ui.stopAllActions();
        if (isShow) {
          this.settingbg.setPosition(cc.v2(this.oldPos.x - 300, this.oldPos.y));
          var move = cc.moveTo(.3, this.oldPos);
          this.settingbg.runAction(cc.sequence(move, cc.callFunc(function() {
            _this.isMoveOver = true;
          })));
        } else {
          this.settingbg.setPosition(this.oldPos);
          var move = cc.moveTo(.3, cc.v2(this.oldPos.x - 300, this.oldPos.y));
          this.settingbg.runAction(cc.sequence(move, cc.callFunc(function() {
            _this.isMoveOver = true;
          })));
        }
      };
      SettingUI.prototype.rotateAng = function(ang) {
        this.backBtn.stopAllActions();
        this.backBtn.runAction(cc.rotateBy(.3, ang));
      };
      __decorate([ UITools_1.UITools.OnItemClick("leave") ], SettingUI.prototype, "leaveClick", null);
      __decorate([ UITools_1.UITools.UIItem("back_button") ], SettingUI.prototype, "backBtn", void 0);
      __decorate([ UITools_1.UITools.UIItem("settingbg") ], SettingUI.prototype, "settingbg", void 0);
      __decorate([ UITools_1.UITools.OnItemClick("back_button") ], SettingUI.prototype, "backBtnCall", null);
      return SettingUI;
    }(BaseUI_1.UIComponent);
    exports.SettingUI = SettingUI;
    cc._RF.pop();
  }, {
    "../../../../core/view/BaseUI": "BaseUI",
    "../../../../core/view/UITools": "UITools",
    "../../../common/views/ViewMgr": "ViewMgr",
    "../../../hall/view/HallMain": "HallMain",
    "../data/GameData": "GameData"
  } ],
  String: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "02059H/fEdHMIwRbewMXF6a", "String");
    String.prototype.encodeXMLEscapeChars = function() {
      var OutPut = this;
      OutPut = "" != OutPut.trim() ? OutPut.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
      return OutPut;
    };
    String.prototype.xmlUnparsedString = function() {
      var OutPut = this;
      OutPut = "" != OutPut.trim() ? "<![CDATA[" + OutPut + "]]>" : "";
      return OutPut;
    };
    String.prototype.formatByObject = function(arg) {
      var result = this;
      for (var key in arg) if ("undefined" !== typeof arg[key]) {
        var reg = new RegExp("({" + key + "})", "g");
        result = result.replace(reg, arg[key].toString());
      }
      return result.toString();
    };
    String.prototype.formatByObjectWithConvert = function(arg) {
      var result = this;
      for (var key in arg) if ("undefined" !== typeof arg[key]) {
        var reg = new RegExp("({" + key + "})", "g");
        var rep = void 0;
        rep = "number" === typeof arg[key] ? arg[key].formatString() : arg[key].toString();
        result = result.replace(reg, rep);
      }
      return result.toString();
    };
    String.prototype.format = function(args) {
      var result = this;
      for (var i = 0; i < arguments.length; i++) if (void 0 != arguments[i]) {
        var reg = new RegExp("({)" + i + "(})", "g");
        result = result.replace(reg, arguments[i]);
      }
      return result.toString();
    };
    String.prototype.endsWith = function(str) {
      if (null == str || 0 == this.length || str.length > this.length) return false;
      return this.substring(this.length - str.length) == str;
    };
    String.prototype.startsWith = function(str) {
      if (null == str || "" == str || 0 == this.length || str.length > this.length) return false;
      return this.substr(0, str.length) == str;
    };
    String.prototype.padHeadWith = function(length, padStr) {
      var str = "";
      for (var i = 0; i < length - this.length; i++) str += padStr;
      return str + this;
    };
    String.prototype.getBLen = function() {
      var len = 0;
      for (var i = 0; i < this.length; i++) this.charCodeAt(i) > 127 ? len += 2 : len++;
      return len;
    };
    cc._RF.pop();
  }, {} ],
  System: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "027217/9AJGnpQTnvPcZ+PP", "System");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var System = function() {
      function System() {}
      System.winWidth = cc.winSize.width;
      System.winHeight = cc.winSize.height;
      return System;
    }();
    exports.System = System;
    cc._RF.pop();
  }, {} ],
  TableProto: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "85999uxX3RBkKGMkFtu0HPt", "TableProto");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseProto_1 = require("../../../../core/net/BaseProto");
    var ProtoTools_1 = require("../../../../core/net/ProtoTools");
    var GameData_1 = require("./GameData");
    var PdkCmd_1 = require("../config/PdkCmd");
    var PdkUtils_1 = require("../utils/PdkUtils");
    var GameState;
    (function(GameState) {
      GameState[GameState["Ready"] = 0] = "Ready";
      GameState[GameState["Start"] = 1] = "Start";
      GameState[GameState["End"] = 2] = "End";
    })(GameState = exports.GameState || (exports.GameState = {}));
    var Seat;
    (function(Seat) {
      Seat[Seat["Me"] = 0] = "Me";
      Seat[Seat["Next"] = 1] = "Next";
      Seat[Seat["Front"] = 2] = "Front";
    })(Seat = exports.Seat || (exports.Seat = {}));
    var Table;
    (function(Table) {
      var Player = function() {
        function Player() {
          this.cards = [];
        }
        Player.prototype.setMyHandCard = function(cards) {
          this.cards = cards.slice();
        };
        return Player;
      }();
      Table.Player = Player;
      var TableProto = function(_super) {
        __extends(TableProto, _super);
        function TableProto() {
          var _this = null !== _super && _super.apply(this, arguments) || this;
          _this.recomends = [];
          _this.recomendIndex = 0;
          _this.players = new Map();
          return _this;
        }
        TableProto.prototype.revDissolve = function(msg) {};
        TableProto.prototype.revDissolveMsg = function(msg) {
          this.emit("dissolve", {
            users: msg.users,
            dissolveTime: msg.dissolveTime
          });
        };
        TableProto.prototype.revSettlement = function(msg) {
          this.emit("onPDKSettlement", msg);
        };
        TableProto.prototype.revReady = function(msg) {
          this.emit("readyGame", msg);
        };
        TableProto.prototype.revLeaveMsg = function(msg) {
          this.players.clear();
          this.emit("exitTable", msg);
        };
        TableProto.prototype.revReadyGame = function(msg) {
          this.emit("readyState", {
            chairID: msg.chairID,
            readyState: msg.readyState
          });
        };
        TableProto.prototype.revJoinRoom = function(msg) {
          this.insertPlayer(msg);
          this.emit("joinRoom", msg);
        };
        TableProto.prototype.revPDKLeaveRoom = function(msg) {
          this.emit("leaveRoom", msg.uid);
        };
        TableProto.prototype.revPDKStartData = function(msg) {
          GameData_1.gameData.roleChairID = msg.wChairID;
          this.gameState = GameState.Start;
          var player = this.players.get(Seat.Me);
          player.cards = msg.cbCardData;
          this.emit("startPDKGame", {
            cardsData: msg.cbCardData,
            startChairID: msg.wCurrentUser
          });
        };
        TableProto.prototype.revPDKHandCard = function(msg) {
          this.emit("refreshMyCard", msg.handCardData);
        };
        TableProto.prototype.revPDKShowOutCard = function(msg) {
          this.emit("showOutCard", msg);
        };
        TableProto.prototype.revPDKPassCard = function(msg) {
          this.emit("onPDKPassCard", msg);
        };
        TableProto.prototype.isDissolveSate = function() {
          var isDissolve = false;
          if (!this.roomInfo.userInfo.users) return isDissolve;
          this.roomInfo.userInfo.users.forEach(function(user) {
            if (1 == user.dissolveState) {
              isDissolve = true;
              return isDissolve;
            }
          });
          return isDissolve;
        };
        TableProto.prototype.findPlayerByUID = function(uid) {
          var _player = null;
          this.players.forEach(function(player) {
            if (player.id == uid) {
              _player = player;
              return;
            }
          });
          return _player;
        };
        TableProto.prototype.insertPlayer = function(user) {
          var player = new Player();
          player.avatarUrl = user.avatarUrl;
          player.name = user.name;
          player.id = user.id;
          player.gems = user.gems;
          player.gender = user.gender;
          player.coins = user.coins;
          player.chairID = user.chairID;
          var viewID = GameData_1.gameData.getViewIDByChairID(user.chairID);
          this.players.set(viewID, player);
        };
        Object.defineProperty(TableProto.prototype, "outRecomCards", {
          set: function(v) {
            this.outCards = v;
          },
          enumerable: true,
          configurable: true
        });
        TableProto.prototype.createPlayer = function(roomInfo) {
          this.players.clear();
          var userInfo = roomInfo.userInfo;
          for (var index = 0; index < userInfo.length; index++) {
            var user = roomInfo.userInfo[index];
            user.id == GameData_1.gameData.uid && (GameData_1.gameData.roleChairID = user.chairID);
          }
          for (var index = 0; index < userInfo.length; index++) {
            var user = roomInfo.userInfo[index];
            this.insertPlayer(user);
          }
        };
        TableProto.prototype.getRecomendCards = function() {
          var count = this.recomends.length;
          this.recomendIndex >= count && (this.recomendIndex = 0);
          return this.recomends[this.recomendIndex++] || [];
        };
        TableProto.prototype.calculate = function() {
          this.recomendIndex = 0;
          this.recomends.length = 0;
          var bCard = this.players.get(Seat.Me).cards || [];
          var bTar = this.outCards || [];
          var recomendCards = PdkUtils_1.PdkUtils.getExtractCardType(bCard, bCard.length, bTar, bTar.length);
          cc.log("--\x3e>>bCard", bCard);
          cc.log("--\x3e>>bTar", bTar);
          cc.log("--\x3e>>recomendCards", recomendCards);
          var count = recomendCards._index;
          for (var i = 0; i < count; i++) {
            var arry = recomendCards[i];
            for (var j = 0; j < arry.length; j++) {
              var cardsArry = arry[j];
              this.recomends.push(cardsArry);
            }
          }
        };
        TableProto.prototype.clear = function() {
          this.recomendIndex = 0;
          this.recomends.length = 0;
          this.outCards.length = 0;
          this.players.get(Seat.Me).cards.length = 0;
        };
        __decorate([ ProtoTools_1.protoTools.request(PdkCmd_1.PDKCmd.START_READY_MSG, true) ], TableProto.prototype, "sendReady", void 0);
        __decorate([ ProtoTools_1.protoTools.request(PdkCmd_1.PDKCmd.EXITROOM_MSG, true) ], TableProto.prototype, "sendLeave", void 0);
        __decorate([ ProtoTools_1.protoTools.request(PdkCmd_1.PDKCmd.DISSOLVE_MSG, true) ], TableProto.prototype, "sendDissolve", void 0);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.DISSOLVE_MSG) ], TableProto.prototype, "revDissolve", null);
        __decorate([ ProtoTools_1.protoTools.request(PdkCmd_1.PDKCmd.PDKCONTINUEGAME, true) ], TableProto.prototype, "sendNextGame", void 0);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.DISSOLVE_REV_MSG) ], TableProto.prototype, "revDissolveMsg", null);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.PDKSETTLEMENT_MSG) ], TableProto.prototype, "revSettlement", null);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.START_READY_MSG) ], TableProto.prototype, "revReady", null);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.EXITROOM_MSG) ], TableProto.prototype, "revLeaveMsg", null);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.READYGAME_MSG) ], TableProto.prototype, "revReadyGame", null);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.PDKJOINROOM_MSG) ], TableProto.prototype, "revJoinRoom", null);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.PDKLEAVEROOM_MSG) ], TableProto.prototype, "revPDKLeaveRoom", null);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.PDKSTARTGAME_MSG) ], TableProto.prototype, "revPDKStartData", null);
        __decorate([ ProtoTools_1.protoTools.request(PdkCmd_1.PDKCmd.PDKSENDOUTCARD_MSG) ], TableProto.prototype, "sendOutCard", void 0);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.PDKSENDOUTCARD_MSG) ], TableProto.prototype, "revPDKHandCard", null);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.PDKOUTCARD_MSG) ], TableProto.prototype, "revPDKShowOutCard", null);
        __decorate([ ProtoTools_1.protoTools.receive(PdkCmd_1.PDKCmd.PDKPASSCARD_MSG) ], TableProto.prototype, "revPDKPassCard", null);
        return TableProto;
      }(BaseProto_1.BaseProto);
      Table.TableProto = TableProto;
    })(Table = exports.Table || (exports.Table = {}));
    cc._RF.pop();
  }, {
    "../../../../core/net/BaseProto": "BaseProto",
    "../../../../core/net/ProtoTools": "ProtoTools",
    "../config/PdkCmd": "PdkCmd",
    "../utils/PdkUtils": "PdkUtils",
    "./GameData": "GameData"
  } ],
  ThrowCardsOfMeMoveAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7da5aHA+YlAwoYs/CNYX0yt", "ThrowCardsOfMeMoveAction");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Card_1 = require("../entity/Card");
    var PosInfo_1 = require("../config/PosInfo");
    var BaseAction_1 = require("./BaseAction");
    var ThrowCardsOfMeMoveAction = function(_super) {
      __extends(ThrowCardsOfMeMoveAction, _super);
      function ThrowCardsOfMeMoveAction() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.spIDTable = [];
        _this.sprite_list = [];
        return _this;
      }
      ThrowCardsOfMeMoveAction.prototype.onInit = function() {
        this.size = cc.winSize;
      };
      ThrowCardsOfMeMoveAction.prototype.doAction = function() {
        if (0 == this.spIDTable.length) return;
        var time = .2;
        for (var i = 0; i < this.sprite_list.length; i++) {
          var card = this.sprite_list[i];
          var moveto = cc.moveTo(time, cc.v2(this.getPosX(this.spIDTable, card.getCardID()), PosInfo_1.PosInfo.CARD_HEIGHT_THROW + PosInfo_1.PosInfo.CARD_HEIGHT_ME));
          var scalto = cc.scaleTo(time, PosInfo_1.PosInfo.CARD_SCALE_THROW);
          var easeIn = cc.easeIn(4);
          scalto.easing(easeIn);
          var spawn = cc.spawn(moveto, scalto);
          this.sprite_list[i].runAction(cc.sequence(cc.delayTime(.2), spawn, cc.callFunc(function() {})));
        }
      };
      ThrowCardsOfMeMoveAction.prototype.clearAction = function() {
        if (!this.sprite_list || 0 == this.sprite_list.length) return;
        this.stopAllActions();
        this.sprite_list.forEach(function(card) {
          card.destory();
        });
        this.sprite_list.length = 0;
      };
      ThrowCardsOfMeMoveAction.prototype.ceateCardsArry = function(cardArry, seat) {
        this.spIDTable = cardArry;
        this._createCards();
      };
      ThrowCardsOfMeMoveAction.prototype._createCards = function() {
        for (var index = 0; index < this.spIDTable.length; index++) {
          var card = new Card_1.Card();
          card.createCard(this.spIDTable[index]);
          card.setScale(0);
          card.setCardID(this.spIDTable[index]);
          this.sprite_list.push(card);
          var pos = cc.v2(this.getPosX(this.spIDTable, card.getCardID()), PosInfo_1.PosInfo.CARD_HEIGHT_ME);
          card.addTo(this, pos, index);
        }
      };
      ThrowCardsOfMeMoveAction.prototype.getPosX = function(allCards, card) {
        if (null == allCards) return 0;
        var dis = PosInfo_1.PosInfo.CARD_DISX;
        var width = PosInfo_1.PosInfo.CARD_WIDTH * PosInfo_1.PosInfo.CARD_SCALE_ME;
        var x = (this.size.width - ((allCards.length - 1) * PosInfo_1.PosInfo.CARD_INT_WIDTH + width)) / 2;
        for (var i = 0; i < allCards.length; i++) if (allCards[i] == card) {
          x = x + i * PosInfo_1.PosInfo.CARD_WIDTH / 2 + dis;
          break;
        }
        return x;
      };
      return ThrowCardsOfMeMoveAction;
    }(BaseAction_1.BaseAction);
    exports.ThrowCardsOfMeMoveAction = ThrowCardsOfMeMoveAction;
    cc._RF.pop();
  }, {
    "../config/PosInfo": "PosInfo",
    "../entity/Card": "Card",
    "./BaseAction": "BaseAction"
  } ],
  ThrowCardsOfNextMoveAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ef132nmH9tH+6XGiQB8ACbz", "ThrowCardsOfNextMoveAction");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Card_1 = require("../entity/Card");
    var PosInfo_1 = require("../config/PosInfo");
    var BaseAction_1 = require("./BaseAction");
    var ThrowCardsOfNextMoveAction = function(_super) {
      __extends(ThrowCardsOfNextMoveAction, _super);
      function ThrowCardsOfNextMoveAction() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cards_sprite = [];
        _this.cards_num = [];
        return _this;
      }
      ThrowCardsOfNextMoveAction.prototype.onInit = function() {
        this.size = cc.winSize;
      };
      ThrowCardsOfNextMoveAction.prototype.createCardSprite = function(cardvalue) {
        var card = new Card_1.Card();
        card.setCardID(cardvalue);
        card.createCard(cardvalue);
        return card;
      };
      ThrowCardsOfNextMoveAction.prototype.ceateCardsArry = function(cards, seat) {
        this.cards_num = cards;
        this._ceateCards();
      };
      ThrowCardsOfNextMoveAction.prototype._ceateCards = function() {
        if (!this.mParent) {
          this.mParent = new cc.Node();
          this.addChild(this.mParent);
        }
        var WIDTH = 0;
        WIDTH = this.cards_num.length > 8 ? PosInfo_1.PosInfo.CARD_THROW_WIDTH_ME_TWO : PosInfo_1.PosInfo.CARD_THROW_WIDTH_OTHERS;
        var x = 0;
        for (var i = 0; i < this.cards_num.length; i++) {
          var card = this.createCardSprite(this.cards_num[i]);
          x = -(this.cards_num.length - i) * (WIDTH + 30);
          card.setPosition(cc.v2(x, 0));
          card.addTo(this.mParent);
          this.cards_sprite.push(card);
        }
        this.POS_Y = PosInfo_1.PosInfo.CARD_HEIGHT_OTHERS_THROW + 50;
        this.PLAYER_X = PosInfo_1.PosInfo.PLAYER_POS_NEXT.x;
        this.disX = PosInfo_1.PosInfo.CARD_POS_NEXT_X;
      };
      ThrowCardsOfNextMoveAction.prototype.doAction = function() {
        if (0 == this.cards_sprite.length) return;
        var time = .2;
        this.mParent.setScale(0);
        this.mParent.setPosition(cc.v2(this.size.width / 2 + this.PLAYER_X, this.POS_Y));
        this.mParent.runAction(cc.sequence(cc.delayTime(.2), cc.spawn(cc.scaleTo(time, PosInfo_1.PosInfo.CARD_SCALE_THROW).easing(cc.easeIn(4)), cc.moveTo(time, cc.v2(this.disX + this.size.width / 2 - 600, PosInfo_1.PosInfo.CARD_HEIGHT_OTHERS_THROW))), cc.callFunc(function() {})));
      };
      ThrowCardsOfNextMoveAction.prototype.clearAction = function() {
        if (0 == this.cards_sprite.length) return;
        this.stopAllActions();
        if (this.mParent) {
          this.mParent.stopAllActions();
          this.mParent.destroy();
          this.cards_sprite.length = 0;
        }
        this.mParent = null;
      };
      return ThrowCardsOfNextMoveAction;
    }(BaseAction_1.BaseAction);
    exports.ThrowCardsOfNextMoveAction = ThrowCardsOfNextMoveAction;
    cc._RF.pop();
  }, {
    "../config/PosInfo": "PosInfo",
    "../entity/Card": "Card",
    "./BaseAction": "BaseAction"
  } ],
  Tools: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42664FuWxdG+K3Vp00/obQa", "Tools");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Tools;
    (function(Tools) {
      function isDefined(v) {
        return "undefined" !== typeof v;
      }
      Tools.isDefined = isDefined;
      function warn(val, errMsg) {
        val || cc.warn(errMsg);
      }
      Tools.warn = warn;
      function isString(value) {
        return "string" === typeof value;
      }
      Tools.isString = isString;
      function isNumber(value) {
        return "number" === typeof value;
      }
      Tools.isNumber = isNumber;
      function isUndefined(v) {
        return "undefined" === typeof v;
      }
      Tools.isUndefined = isUndefined;
      function isFunction(v) {
        return "function" === typeof v;
      }
      Tools.isFunction = isFunction;
      function isNullOrUndefined(v) {
        return null === v || void 0 === v;
      }
      Tools.isNullOrUndefined = isNullOrUndefined;
      function applyNewWithArgArr(ctor, args) {
        var applyArgs = [ null ].concat(args || []);
        var f = Function.prototype.bind.apply(ctor, applyArgs);
        return new f();
      }
      Tools.applyNewWithArgArr = applyNewWithArgArr;
      function runInNextFrame(func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
        false;
        setTimeout(function() {
          func.apply(this, args);
        }, 0);
      }
      Tools.runInNextFrame = runInNextFrame;
      function runEveryFrame(node, callback) {
        var action = cc.repeatForever(cc.sequence(Array(cc.callFunc(callback))));
        node.runAction(action);
        return action;
      }
      Tools.runEveryFrame = runEveryFrame;
      function schedule(node, callback, delay) {
        var delayAction = cc.delayTime(delay);
        var sequence = cc.sequence(delayAction, cc.callFunc(callback));
        var action = cc.repeatForever(sequence);
        node.runAction(action);
        return action;
      }
      Tools.schedule = schedule;
      function repeat(node, callFunc, delta, times) {
        void 0 === delta && (delta = 1);
        void 0 === times && (times = 1);
        var delay = cc.delayTime(delta);
        var sequence = cc.sequence(delay, cc.callFunc(callFunc));
        var action = cc.repeat(sequence, times);
        node.runAction(action);
        return action;
      }
      Tools.repeat = repeat;
      function repeatForever(node, callFunc, delta) {
        void 0 === delta && (delta = 1);
        var delay = cc.delayTime(delta);
        var sequence = cc.sequence(delay, cc.callFunc(callFunc));
        var action = cc.repeatForever(sequence);
        node.runAction(action);
        return action;
      }
      Tools.repeatForever = repeatForever;
      function performWithDelay(node, callback, delay) {
        var delayAction = cc.delayTime(delay);
        var sequence = cc.sequence(delayAction, cc.callFunc(callback));
        node.runAction(sequence);
        return sequence;
      }
      Tools.performWithDelay = performWithDelay;
      function getTotalFrames() {
        return cc.director.getTotalFrames();
      }
      Tools.getTotalFrames = getTotalFrames;
      var time;
      (function(time) {
        function getLocalTime() {
          return new Date().getTime() / 1e3;
        }
        time.getLocalTime = getLocalTime;
        function getCostTime(date1, date2) {
          var startTime;
          startTime = isNumber(date1) ? date1 : date1.getTime();
          var endTime;
          endTime = isNumber(date2) ? date2 : date2.getTime();
          var costTime = endTime - startTime;
          return getCostTimeByDelta(costTime);
        }
        time.getCostTime = getCostTime;
        function getCostTimeFormatObject(info) {
          var formatObj = {};
          for (var key in info) formatObj[key] = info[key] >= 10 ? info[key].toString() : "0" + info[key].toString();
          return formatObj;
        }
        time.getCostTimeFormatObject = getCostTimeFormatObject;
        function getCostTimeByDelta(delta) {
          var days = Math.floor(delta / 864e5);
          var leave1 = delta % 864e5;
          var hours = Math.floor(leave1 / 36e5);
          var leave2 = leave1 % 36e5;
          var minutes = Math.floor(leave2 / 6e4);
          var leave3 = leave2 % 6e4;
          var seconds = Math.floor(leave3 / 1e3);
          return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
          };
        }
        time.getCostTimeByDelta = getCostTimeByDelta;
        function formatTime(str, val) {
          var obj = val;
          isNumber(val) && (obj = getCostTimeByDelta(val));
          obj = getCostTimeFormatObject(obj);
          return str.formatByObject(obj);
        }
        time.formatTime = formatTime;
      })(time = Tools.time || (Tools.time = {}));
      function newConstructor(obj) {
        if (isDefined(obj)) return obj.constructor ? new obj.constructor() : obj;
        return;
      }
      Tools.newConstructor = newConstructor;
      function clone(obj) {
        var o;
        if ("object" == typeof obj) if (null === obj) o = null; else if (obj instanceof Array) {
          o = [];
          for (var i = 0, len = obj.length; i < len; i++) o.push(clone(obj[i]));
        } else {
          o = {};
          for (var j in obj) o[j] = clone(obj[j]);
        } else o = obj;
        return o;
      }
      Tools.clone = clone;
      function nameLimit(str, len) {
        if (!str || !len) return "";
        var build = "";
        for (var i = 0; i < str.length && len > 0; i++) {
          build += str.substr(i, 1);
          len -= str.charCodeAt(i) > 127 ? 2 : 1;
        }
        build.length < str.length && (build += "...");
        return build;
      }
      Tools.nameLimit = nameLimit;
    })(Tools = exports.Tools || (exports.Tools = {}));
    cc._RF.pop();
  }, {} ],
  UIAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "04275HRhJhNVa5R9MlDd799", "UIAction");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseUI_1 = require("../../../../core/view/BaseUI");
    var Tools_1 = require("../../../../core/tools/Tools");
    var ACTION_TYPE;
    (function(ACTION_TYPE) {
      ACTION_TYPE[ACTION_TYPE["None"] = 0] = "None";
      ACTION_TYPE[ACTION_TYPE["Left_to_right"] = 1] = "Left_to_right";
      ACTION_TYPE[ACTION_TYPE["Right_to_left"] = 2] = "Right_to_left";
      ACTION_TYPE[ACTION_TYPE["Top_to_buttom"] = 3] = "Top_to_buttom";
      ACTION_TYPE[ACTION_TYPE["buttom_to_Top"] = 4] = "buttom_to_Top";
    })(ACTION_TYPE = exports.ACTION_TYPE || (exports.ACTION_TYPE = {}));
    var UIAction = function(_super) {
      __extends(UIAction, _super);
      function UIAction(actiontype) {
        void 0 === actiontype && (actiontype = ACTION_TYPE.None);
        var _this = _super.call(this) || this;
        _this.actiontype = actiontype;
        return _this;
      }
      UIAction.prototype.onEnter = function() {
        this.runActionByType();
      };
      UIAction.prototype.runActionByType = function() {
        this.actiontype == ACTION_TYPE.Right_to_left ? this.doAction(.2, cc.v2(-300, 0)) : this.actiontype == ACTION_TYPE.Left_to_right ? this.doAction(.2, cc.v2(300, 0)) : this.actiontype == ACTION_TYPE.Top_to_buttom && this.doAction(.4, cc.v2(0, -100));
      };
      UIAction.prototype.doAction = function(time, pos) {
        var _this = this;
        var oldPos = this.ui.getPosition();
        this.ui.active = false;
        this.ui.setPosition(oldPos.x - pos.x, oldPos.y - pos.y);
        Tools_1.Tools.runInNextFrame(function() {
          _this.ui.active = true;
          _this.ui.stopAllActions();
          _this.ui.runAction(cc.moveTo(time, oldPos));
        });
      };
      return UIAction;
    }(BaseUI_1.UIComponent);
    exports.UIAction = UIAction;
    cc._RF.pop();
  }, {
    "../../../../core/tools/Tools": "Tools",
    "../../../../core/view/BaseUI": "BaseUI"
  } ],
  UITools: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b7daesJ/7NAn7m/xKF3IT8g", "UITools");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Tools_1 = require("../tools/Tools");
    require("String");
    var UITools;
    (function(UITools) {
      var classDecoratorMap = new Map();
      function getClassDecoratorInfo(c) {
        var info = classDecoratorMap.get(c);
        if (!info) {
          info = {};
          classDecoratorMap.set(c, info);
        }
        return info;
      }
      function initUI(target) {
        if ("undefined" === typeof target.Items) {
          var items_1 = target.Items = {};
          var checkNode_1 = function(node) {
            items_1[node.name] = node;
            var childs = node.children;
            for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
              var child = childs_1[_i];
              checkNode_1(child);
            }
          };
          checkNode_1(target.ui);
        }
      }
      function defineUIProperty(target) {
        if (target.__isDefinedUI) return;
        var isDefinedUI = true;
        Object.defineProperty(target, "__isDefinedUI", {
          get: function() {
            return isDefinedUI;
          },
          set: function(value) {
            isDefinedUI = value;
          },
          enumerable: false,
          configurable: false
        });
        var oldValue = target.ui;
        oldValue && delete target.ui;
        Object.defineProperty(target, "ui", {
          get: function() {
            return this.__hide_ui;
          },
          set: function(value) {
            this.__hide_ui = value;
            registUIExtend(this);
          },
          enumerable: true,
          configurable: true
        });
      }
      function registerUIOnInit(classPrototype, onLoaded) {
        var recorder = getClassDecoratorInfo(classPrototype.constructor);
        defineUIProperty(classPrototype);
        recorder.__customInitFunc = recorder.__customInitFunc || [];
        recorder.__customInitFunc.push(onLoaded);
      }
      function registerUIOnLoaded(classPrototype, onLoaded) {
        var recorder = getClassDecoratorInfo(classPrototype.constructor);
        defineUIProperty(classPrototype);
        recorder.__customExtFunc = recorder.__customExtFunc || [];
        recorder.__customExtFunc.push(onLoaded);
      }
      function registUIExtend(target) {
        initUI(target);
        var solveItemList = function(recorder, target) {
          recorder.__uiItemsList && recorder.__uiItemsList.forEach(function(value) {
            if ("undefined" !== typeof value.itemName) {
              var itemUI = "" === value.itemName ? target.ui : target.Items[value.itemName];
              itemUI ? target[value.propertyName] = value.component ? itemUI.getComponent(value.component) : itemUI : Tools_1.Tools.warn(false, "\u5728ui\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + value.itemName);
            } else if ("undefined" !== typeof value.itemNameMap) ; else {
              var itemArr_1 = [];
              value.itemNameArray.forEach(function(v) {
                var item = "" === v ? target.ui : target.Items[v];
                item ? itemArr_1.push(value.component ? item.getComponent(value.component) : item) : Tools_1.Tools.warn(false, "\u5728ui\u6587\u4ef6\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + v);
              });
              target[value.propertyName] = itemArr_1;
            }
          });
        };
        var solveInitFunc = function(recorder, target) {
          recorder.__customInitFunc && recorder.__customInitFunc.forEach(function(value) {
            value.call(target);
          });
        };
        var solveExtFunc = function(recorder, target) {
          recorder.__customExtFunc && recorder.__customExtFunc.forEach(function(value) {
            value.call(target);
          });
        };
        var protoList = [];
        var collectionProto = function(proto) {
          proto.__proto__ && proto.__proto__.constructor !== Object && collectionProto(proto.__proto__);
          protoList.push(getClassDecoratorInfo(proto.constructor));
        };
        var solve = function(func) {
          for (var _i = 0, protoList_1 = protoList; _i < protoList_1.length; _i++) {
            var recorder = protoList_1[_i];
            func(recorder, target);
          }
        };
        collectionProto(target.__proto__);
        solve(solveItemList);
        solve(solveInitFunc);
        solve(solveExtFunc);
      }
      function addNodeUIComponent(me, uiItem, comp, args) {
        me.uiComponents || (me.uiComponents = new Map());
        var list = me.uiComponents.get(comp);
        list || me.uiComponents.set(comp, list = []);
        var inst = Tools_1.Tools.applyNewWithArgArr(comp, args);
        list.push(inst);
        inst.ui = uiItem;
        me.ui.isValid || inst.onExit();
        return inst;
      }
      function WhenUIInit() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        return function(self, propertyName) {
          registerUIOnInit(self, function() {
            this[propertyName].apply(this, args);
          });
        };
      }
      UITools.WhenUIInit = WhenUIInit;
      function WhenUILoaded() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        return function(self, propertyName) {
          registerUIOnLoaded(self, function() {
            this[propertyName].apply(this, args);
          });
        };
      }
      UITools.WhenUILoaded = WhenUILoaded;
      function UIItem(itemName, component) {
        return function(self, propertyName) {
          var recorder = getClassDecoratorInfo(self.constructor);
          defineUIProperty(self);
          itemName = Tools_1.Tools.isDefined(itemName) ? itemName : propertyName;
          recorder.__uiItemsList = recorder.__uiItemsList || [];
          recorder.__uiItemsList.push({
            itemName: itemName,
            propertyName: propertyName,
            component: component
          });
        };
      }
      UITools.UIItem = UIItem;
      function OnItemClick(itemName, listenType) {
        void 0 === listenType && (listenType = cc.Node.EventType.TOUCH_END);
        return function(self, propertyName) {
          function onLoaded() {
            var me = this;
            var uiItem = itemName && "" !== itemName ? me.Items[itemName] : me.ui;
            if (!uiItem) {
              Tools_1.Tools.warn(false, "\u5728ui\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + me.itemName);
              return;
            }
            uiItem.on(listenType, function(e) {
              if (Tools_1.Tools.isFunction(me[propertyName])) {
                var ret = me[propertyName](e);
                if (listenType == cc.Node.EventType.TOUCH_START && "boolean" === typeof ret) return ret;
              }
              return true;
            }, uiItem);
          }
          registerUIOnLoaded(self, onLoaded);
        };
      }
      UITools.OnItemClick = OnItemClick;
      function OnItemArryClick(itemNameTemplate, minValue, maxNum, listenType) {
        void 0 === listenType && (listenType = cc.Node.EventType.TOUCH_END);
        var indexArray = [];
        for (var i = minValue; i <= maxNum; i++) indexArray.push(i);
        return function(self, propertyName) {
          function onLoaded() {
            var me = this;
            var itemArry = [];
            indexArray.forEach(function(value) {
              var itemName = itemNameTemplate.format(value.toString());
              var uiItem = itemName && "" !== itemName ? me.Items[itemName] : me.ui;
              if (!uiItem) {
                Tools_1.Tools.warn(false, "\u5728ui\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + me.itemName);
                return;
              }
              itemArry.push(uiItem);
            });
            itemArry.forEach(function(node) {
              node.on(listenType, function(e) {
                if (Tools_1.Tools.isFunction(me[propertyName])) {
                  var ret = me[propertyName](e);
                  if (listenType == cc.Node.EventType.TOUCH_START && "boolean" === typeof ret) return ret;
                }
                return true;
              }, node);
            });
          }
          registerUIOnLoaded(self, onLoaded);
        };
      }
      UITools.OnItemArryClick = OnItemArryClick;
      function ImageUrl(itemName) {
        return function(self, propertyName) {
          function onLoaded() {
            var me = this;
            var item = itemName && "" !== itemName ? me.Items[itemName] : me.ui;
            if (!item) {
              Tools_1.Tools.warn(false, "\u5728ui\u6587\u4ef6\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + itemName);
              return;
            }
            item.bind(me, propertyName, function(value) {});
          }
          registerUIOnLoaded(self, onLoaded);
        };
      }
      UITools.ImageUrl = ImageUrl;
      function AddUIComponent(itemName, comp) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
        return function(self, propertyName) {
          var proto = self;
          1 == arguments.length && (proto = proto.prototype);
          function onLoaded() {
            var me = this;
            var uiItem = itemName && "" !== itemName ? me.Items[itemName] : me.ui;
            if (!uiItem) {
              Tools_1.Tools.warn(false, "\u5728ui\u6587\u4ef6\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + itemName);
              return;
            }
            var inst = addNodeUIComponent(me, uiItem, comp, args);
            propertyName && (me[propertyName] = inst);
          }
          registerUIOnInit(proto, onLoaded);
        };
      }
      UITools.AddUIComponent = AddUIComponent;
      function AddUIChild(itemName, type, pos, zIndex) {
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) args[_i - 4] = arguments[_i];
        return function(self, propertyName) {
          var proto = self;
          1 == arguments.length && (proto = self.prototype);
          function onLoaded() {
            var me = this;
            var uiItem = itemName && "" !== itemName ? me.Items[itemName] : me.ui;
            var inst = Tools_1.Tools.applyNewWithArgArr(type, args);
            if (Tools_1.Tools.isNullOrUndefined(pos)) {
              var size = cc.view.getVisibleSize();
              pos = cc.v2(size.width / 2, size.height / 2);
            }
            inst.addTo(uiItem, pos, zIndex);
            propertyName && (me[propertyName] = inst);
          }
          registerUIOnInit(proto, onLoaded);
        };
      }
      UITools.AddUIChild = AddUIChild;
      function OnSlider(itemName) {
        return function(self, propertyName) {
          function onLoaded() {
            var _this = this;
            var me = this;
            var uiItem = itemName && "" !== itemName ? me.Items[itemName] : me.ui;
            if (!uiItem) {
              Tools_1.Tools.warn(false, "\u5728ui\u6587\u4ef6\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + itemName);
              return;
            }
            var slider = uiItem.getComponent(cc.Slider);
            uiItem.on("slide", function(e) {
              Tools_1.Tools.isFunction(_this[propertyName]) && _this[propertyName](slider.progress, slider);
            });
          }
          registerUIOnLoaded(self, onLoaded);
        };
      }
      UITools.OnSlider = OnSlider;
      function UIItemArrayWithRange(itemNameTemplate, minValue, maxNum, component) {
        var indexArray = [];
        for (var i = minValue; i <= maxNum; i++) indexArray.push(i);
        return UIItemArray(itemNameTemplate, indexArray);
      }
      UITools.UIItemArrayWithRange = UIItemArrayWithRange;
      function ProgressBarBind(itemName) {
        return function(self, propertyName) {
          function onLoaded() {
            var me = this;
            var uiItem = itemName && "" !== itemName ? me.Items[itemName] : me.ui;
            if (!uiItem) {
              Tools_1.Tools.warn(false, "\u5728ui\u6587\u4ef6\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + itemName);
              return;
            }
            var progressBar = uiItem.getComponent(cc.ProgressBar);
            uiItem.bind(me, propertyName, function(value) {
              progressBar.progress = value;
            });
          }
          registerUIOnLoaded(self, onLoaded);
        };
      }
      UITools.ProgressBarBind = ProgressBarBind;
      function UIItemArray(itemNameTemplate, indexArray, component) {
        return function(self, propName) {
          var recorder = getClassDecoratorInfo(self.constructor);
          defineUIProperty(self);
          recorder.__uiItemsList = recorder.__uiItemsList || [];
          var itemInfo = {
            itemNameArray: [],
            propertyName: propName,
            component: component
          };
          indexArray.forEach(function(value) {
            itemInfo.itemNameArray.push(itemNameTemplate.format(value.toString()));
          });
          recorder.__uiItemsList.push(itemInfo);
        };
      }
      UITools.UIItemArray = UIItemArray;
      function ActiveBind(itemName) {
        return function(self, propertyName) {
          function onLoaded() {
            var me = this;
            var item = itemName && "" !== itemName ? me.Items[itemName] : me.ui;
            if (!item) {
              Tools_1.Tools.warn(false, "\u5728ui\u6587\u4ef6\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + itemName);
              return;
            }
            var bindObj = this;
            var bindProperty = propertyName;
            item.bind(bindObj, bindProperty, function(value) {
              item.active = !!value;
            });
          }
          registerUIOnLoaded(self, onLoaded);
        };
      }
      UITools.ActiveBind = ActiveBind;
      function BindEditorBox(itemName) {
        return function(self, propertyName) {
          function onLoaded() {
            var _this = this;
            var me = this;
            var item = itemName && "" !== itemName ? me.Items[itemName] : me.ui;
            if (!item) {
              Tools_1.Tools.warn(false, "\u5728ui\u6587\u4ef6\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + itemName);
              return;
            }
            var editorbox = item.getComponent(cc.EditBox);
            item.on("editing-did-began", function(e) {
              Tools_1.Tools.isFunction(_this[propertyName]) && _this[propertyName](editorbox.string, "began");
            });
            item.on("text-changed", function(e) {
              _this[propertyName](editorbox.string, "change");
            });
            item.on("editing-return", function(e) {
              _this[propertyName](editorbox.string, "return");
            });
          }
          registerUIOnLoaded(self, onLoaded);
        };
      }
      UITools.BindEditorBox = BindEditorBox;
      function ImageBind(itemName, atlasFile) {
        void 0 === atlasFile && (atlasFile = "");
        return function(self, propertyName) {
          function onLoaded() {
            var me = this;
            var item = itemName && "" !== itemName ? me.Items[itemName] : me.ui;
            if (!item) {
              Tools_1.Tools.warn(false, "\u5728ui\u6587\u4ef6\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + itemName);
              return;
            }
            var bindObj = this;
            var bindProperty = propertyName;
            item.bind(bindObj, bindProperty, function(value) {
              if ("" === atlasFile) {
                var texture_1 = cc.loader.getRes(value.toString(), cc.Texture2D);
                texture_1 ? item.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture_1) : cc.loader.loadRes(value.toString(), cc.Texture2D, function(error, loadedAsset) {
                  if (error) {
                    cc.error(error.message || error);
                    return;
                  }
                  texture_1 = loadedAsset;
                  item.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture_1);
                });
              } else {
                var asset_1 = cc.loader.getRes(atlasFile, cc.SpriteAtlas);
                asset_1 ? item.getComponent(cc.Sprite).spriteFrame = asset_1.getSpriteFrame(value.toString()) : cc.loader.loadRes(atlasFile, cc.SpriteAtlas, function(error, loadedAsset) {
                  if (error) {
                    cc.error(error.message || error);
                    return;
                  }
                  asset_1 = loadedAsset;
                  item.getComponent(cc.Sprite).spriteFrame = asset_1.getSpriteFrame(value.toString());
                });
              }
            });
          }
          registerUIOnLoaded(self, onLoaded);
        };
      }
      UITools.ImageBind = ImageBind;
      function TextBind(itemName, formatStr) {
        return function(self, propertyName) {
          function onLoaded() {
            var me = this;
            var item = itemName && "" !== itemName ? me.Items[itemName] : me.ui;
            if (!item) {
              Tools_1.Tools.warn(false, "\u5728ui\u6587\u4ef6\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + itemName);
              return;
            }
            var bindObj = this;
            var bindProperty = propertyName;
            item.bind(bindObj, bindProperty, function(value) {
              var text;
              text = formatStr ? formatStr.format(value.toString()) : value.toString();
              setNodeString(item, text);
            });
          }
          registerUIOnLoaded(self, onLoaded);
        };
      }
      UITools.TextBind = TextBind;
      function OnToggle(itemName, checkStatus) {
        return function(self, propertyName) {
          function onLoaded() {
            var _this = this;
            var me = this;
            var uiItem = itemName && "" !== itemName ? me.Items[itemName] : me.ui;
            if (!uiItem) {
              Tools_1.Tools.warn(false, "\u5728ui\u6587\u4ef6\u4e2d\u627e\u4e0d\u5230\u7ed3\u70b9" + itemName);
              return;
            }
            var toggle = uiItem.getComponent(cc.Toggle);
            var isNeedCheckStatus = Tools_1.Tools.isDefined(checkStatus);
            uiItem.on("toggle", function(e) {
              Tools_1.Tools.isFunction(_this[propertyName]) && (isNeedCheckStatus ? checkStatus == toggle.isChecked && _this[propertyName](toggle.isChecked, toggle) : _this[propertyName](toggle.isChecked, toggle));
            });
          }
          registerUIOnLoaded(self, onLoaded);
        };
      }
      UITools.OnToggle = OnToggle;
      function eachUIComponent(inst, callfunc) {
        inst.uiComponents && inst.uiComponents.forEach(function(arr) {
          arr.forEach(function(value) {
            callfunc(value);
          });
        });
      }
      UITools.eachUIComponent = eachUIComponent;
      function getUIComponent(inst, comp) {
        if (inst.uiComponents) {
          var list = inst.uiComponents.get(comp);
          if (list) return list[0];
        }
        return null;
      }
      UITools.getUIComponent = getUIComponent;
      function setNodeString(item, text) {
        var richComp = item.getComponent(cc.RichText);
        if (richComp) richComp.string = text; else {
          var labelComp = item.getComponent(cc.Label);
          labelComp && (labelComp.string = text);
        }
      }
      UITools.setNodeString = setNodeString;
    })(UITools = exports.UITools || (exports.UITools = {}));
    cc._RF.pop();
  }, {
    "../tools/Tools": "Tools",
    String: "String"
  } ],
  Utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e8287BuCcNHha6fe3ojyNXU", "Utils");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ResLoader_1 = require("../base/ResLoader");
    var utils;
    (function(utils) {
      var storage;
      (function(storage) {
        function saveData(key, value) {
          cc.sys.localStorage.setItem(key, JSON.stringify(value));
        }
        storage.saveData = saveData;
        function removeData(key) {
          cc.sys.localStorage.removeItem(key);
        }
        storage.removeData = removeData;
        function hasData(key) {
          return !!cc.sys.localStorage.getItem(key);
        }
        storage.hasData = hasData;
        function getData(key) {
          try {
            return JSON.parse(cc.sys.localStorage.getItem(key));
          } catch (e) {
            cc.sys.localStorage.removeItem(key);
          }
        }
        storage.getData = getData;
        function saveFile(filePath, str) {
          if (cc.sys.isNative) {
            var rootPath = jsb.fileUtils.getWritablePath();
            filePath = rootPath + filePath;
            jsb.fileUtils.writeDataToFile(str, filePath);
          }
        }
        storage.saveFile = saveFile;
        function readFile(filePath) {
          if (cc.sys.isNative) {
            var rootPath = jsb.fileUtils.getWritablePath();
            filePath = rootPath + filePath;
            return jsb.fileUtils.getStringFromFile(filePath);
          }
          return "";
        }
        storage.readFile = readFile;
      })(storage = utils.storage || (utils.storage = {}));
      var sound;
      (function(sound) {
        var BG_VOLUME_KEY = "BG_VOLUME_KEY";
        var SOUND_VOLUME_KEY = "SOUND_VOLUME_KEY";
        function playBgMusic(path) {
          cc.audioEngine.setMusicVolume(getMusicVolume());
          return ResLoader_1.resLoader.loadRes(path).then(function(clip) {
            cc.audioEngine.playMusic(clip, true);
          });
        }
        sound.playBgMusic = playBgMusic;
        function getMusicVolume() {
          var volume = storage.getData(BG_VOLUME_KEY);
          if ("number" === typeof volume) return volume;
          return .5;
        }
        sound.getMusicVolume = getMusicVolume;
        function setMusicVolume(volume) {
          storage.saveData(BG_VOLUME_KEY, volume);
          cc.audioEngine.setMusicVolume(volume);
        }
        sound.setMusicVolume = setMusicVolume;
        function getEffectVolume() {
          var volume = storage.getData(SOUND_VOLUME_KEY);
          if ("number" === typeof volume) return volume;
          return .5;
        }
        sound.getEffectVolume = getEffectVolume;
        function setEffectVolume(volume) {
          storage.saveData(SOUND_VOLUME_KEY, volume);
          cc.audioEngine.setEffectsVolume(volume);
        }
        sound.setEffectVolume = setEffectVolume;
        function playSound(path) {
          cc.audioEngine.setMusicVolume(getEffectVolume());
          return ResLoader_1.resLoader.loadRes(path).then(function(clip) {
            cc.audioEngine.playEffect(clip, false);
          });
        }
        sound.playSound = playSound;
      })(sound = utils.sound || (utils.sound = {}));
    })(utils = exports.utils || (exports.utils = {}));
    cc._RF.pop();
  }, {
    "../base/ResLoader": "ResLoader"
  } ],
  ViewMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "79987JSmkRLEJHmczm4N9xx", "ViewMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ref_1 = require("../../../core/ref");
    var CommonUI_1 = require("../entity/CommonUI");
    var Tools_1 = require("../../../core/tools/Tools");
    var ViewMgr = function() {
      function ViewMgr() {}
      ViewMgr.prototype.showCenterView = function(unit) {
        var layer = this.getLayer(ref_1.UILayerOrder.View);
        unit.addTo(layer, this.center);
      };
      ViewMgr.prototype.showView = function(unit) {
        var layer = this.getLayer(ref_1.UILayerOrder.View);
        unit.addTo(layer);
      };
      Object.defineProperty(ViewMgr.prototype, "center", {
        get: function() {
          var size = cc.view.getVisibleSize();
          return new cc.Vec2(size.width / 2, size.height / 2);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ViewMgr.prototype, "winSize", {
        get: function() {
          return cc.winSize;
        },
        enumerable: true,
        configurable: true
      });
      ViewMgr.prototype.getLayer = function(order) {
        this.layers = this.layers || {};
        var layer = this.layers[order];
        if (layer && layer.isValid) return layer;
        layer = new cc.Node();
        var widget = layer.addComponent(cc.Widget);
        widget.isAlignBottom = true;
        widget.isAlignRight = true;
        widget.isAlignLeft = true;
        widget.isAlignTop = true;
        layer.anchorX = 0;
        layer.anchorY = 0;
        var parent = cc.director.getScene();
        parent.addChild(layer, order, ref_1.UILayerOrder[order.toString()]);
        return this.layers[order] = layer;
      };
      ViewMgr.prototype.showTips = function(tips, time) {
        void 0 === time && (time = 1);
        var layer = this.getLayer(ref_1.UILayerOrder.Tips);
        var item = new CommonUI_1.Tips();
        if (this.preTips) {
          this.preTips.destory();
          this.preTips = void 0;
        }
        this.preTips = item;
        item.text = tips;
        item.addTo(layer, this.center);
        item.runAction(cc.sequence(cc.delayTime(time), cc.fadeOut(.3), cc.removeSelf()));
      };
      ViewMgr.prototype.showNetMask = function() {
        var layer = this.getLayer(ref_1.UILayerOrder.System);
        var item = new CommonUI_1.NetMask();
        if (Tools_1.Tools.isDefined(this.preMask)) {
          this.preMask.destory();
          this.preMask = void 0;
        }
        this.preMask = item;
        item.addTo(layer, this.center);
      };
      ViewMgr.prototype.closeNetMask = function() {
        if (Tools_1.Tools.isDefined(this.preMask)) {
          this.preMask.destory();
          this.preMask = void 0;
        }
      };
      ViewMgr.prototype.closeMask = function() {
        this.closeNetMask();
      };
      return ViewMgr;
    }();
    exports.viewMgr = new ViewMgr();
    cc._RF.pop();
  }, {
    "../../../core/ref": "ref",
    "../../../core/tools/Tools": "Tools",
    "../entity/CommonUI": "CommonUI"
  } ],
  http: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "29088mqox1OD7pzGVPDN+lK", "http");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var http;
    (function(http) {
      function XML_HTTP_REQUEST(url, timeout, successCallback, failedCallback, sendData) {
        cc.log("url = " + url);
        var request = new XMLHttpRequest();
        request.responseType = "arraybuffer";
        var time = false;
        var timer = setTimeout(function() {
          time = true;
          request.abort();
          if ("undefined" != typeof failedCallback) {
            failedCallback("\u8bf7\u6c42\u8d85\u65f6");
            cc.log("XML_HTTP_REQUEST \u8bf7\u6c42\u8d85\u65f6");
          }
        }, timeout);
        request.onreadystatechange = function() {
          if (4 == request.readyState) {
            cc.log("XML_HTTP_REQUEST request.readyState == 4");
            if (time) return;
            clearTimeout(timer);
            if (200 == request.status) {
              cc.log("XML_HTTP_REQUEST request.status == 200");
              successCallback(request.response);
            } else "undefined" != typeof failedCallback && failedCallback("\u8bf7\u6c42\u5931\u8d25");
          }
        };
        if ("undefined" == typeof sendData) {
          request.open("GET", url, true);
          request.send();
          cc.log("XML_HTTP_REQUEST get open");
        } else {
          request.open("POST", url, true);
          request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          if ("string" == typeof sendData) {
            request.send(sendData);
            cc.log("post send data is " + sendData);
          } else {
            var str = "";
            for (var key in sendData) if (sendData.hasOwnProperty(key)) {
              var element = sendData[key];
              str += key + "=" + element + "&";
            }
            str.substring(0, str.length - 1);
            cc.log("post send data is " + str);
            request.send(str);
          }
        }
      }
      http.XML_HTTP_REQUEST = XML_HTTP_REQUEST;
    })(http = exports.http || (exports.http = {}));
    cc._RF.pop();
  }, {} ],
  pomelo: [ function(require, module, exports) {
    (function(Buffer) {
      "use strict";
      cc._RF.push(module, "50bddaOVJVCcpfPuxZtd7nc", "pomelo");
      "use strict";
      (function() {
        function Emitter(obj) {
          if (obj) return mixin(obj);
        }
        function mixin(obj) {
          for (var key in Emitter.prototype) obj[key] = Emitter.prototype[key];
          return obj;
        }
        Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
          this._callbacks = this._callbacks || {};
          (this._callbacks[event] = this._callbacks[event] || []).push(fn);
          return this;
        };
        Emitter.prototype.once = function(event, fn) {
          var self = this;
          this._callbacks = this._callbacks || {};
          function on() {
            self.off(event, on);
            fn.apply(this, arguments);
          }
          on.fn = fn;
          this.on(event, on);
          return this;
        };
        Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
          this._callbacks = this._callbacks || {};
          if (0 == arguments.length) {
            this._callbacks = {};
            return this;
          }
          var callbacks = this._callbacks[event];
          if (!callbacks) return this;
          if (1 == arguments.length) {
            delete this._callbacks[event];
            return this;
          }
          var cb;
          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            if (cb === fn || cb.fn === fn) {
              callbacks.splice(i, 1);
              break;
            }
          }
          return this;
        };
        Emitter.prototype.emit = function(event) {
          this._callbacks = this._callbacks || {};
          var args = [].slice.call(arguments, 1), callbacks = this._callbacks[event];
          if (callbacks) {
            callbacks = callbacks.slice(0);
            for (var i = 0, len = callbacks.length; i < len; ++i) callbacks[i].apply(this, args);
          }
          return this;
        };
        Emitter.prototype.listeners = function(event) {
          this._callbacks = this._callbacks || {};
          return this._callbacks[event] || [];
        };
        Emitter.prototype.hasListeners = function(event) {
          return !!this.listeners(event).length;
        };
        "undefined" != typeof window && (window.EventEmitter = Emitter);
      })();
      (function(exports, ByteArray, global) {
        var Protocol = exports;
        var PKG_HEAD_BYTES = 4;
        var MSG_FLAG_BYTES = 1;
        var MSG_ROUTE_CODE_BYTES = 2;
        var MSG_ID_MAX_BYTES = 5;
        var MSG_ROUTE_LEN_BYTES = 1;
        var MSG_ROUTE_CODE_MAX = 65535;
        var MSG_COMPRESS_ROUTE_MASK = 1;
        var MSG_TYPE_MASK = 7;
        var Package = Protocol.Package = {};
        var Message = Protocol.Message = {};
        Package.TYPE_HANDSHAKE = 1;
        Package.TYPE_HANDSHAKE_ACK = 2;
        Package.TYPE_HEARTBEAT = 3;
        Package.TYPE_DATA = 4;
        Package.TYPE_KICK = 5;
        Message.TYPE_REQUEST = 0;
        Message.TYPE_NOTIFY = 1;
        Message.TYPE_RESPONSE = 2;
        Message.TYPE_PUSH = 3;
        Protocol.strencode = function(str) {
          var byteArray = new ByteArray(3 * str.length);
          var offset = 0;
          for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            var codes = null;
            codes = charCode <= 127 ? [ charCode ] : charCode <= 2047 ? [ 192 | charCode >> 6, 128 | 63 & charCode ] : [ 224 | charCode >> 12, 128 | (4032 & charCode) >> 6, 128 | 63 & charCode ];
            for (var j = 0; j < codes.length; j++) {
              byteArray[offset] = codes[j];
              ++offset;
            }
          }
          var _buffer = new ByteArray(offset);
          copyArray(_buffer, 0, byteArray, 0, offset);
          return _buffer;
        };
        Protocol.strdecode = function(buffer) {
          var bytes = new ByteArray(buffer);
          var array = [];
          var offset = 0;
          var charCode = 0;
          var end = bytes.length;
          while (offset < end) {
            if (bytes[offset] < 128) {
              charCode = bytes[offset];
              offset += 1;
            } else if (bytes[offset] < 224) {
              charCode = ((63 & bytes[offset]) << 6) + (63 & bytes[offset + 1]);
              offset += 2;
            } else {
              charCode = ((15 & bytes[offset]) << 12) + ((63 & bytes[offset + 1]) << 6) + (63 & bytes[offset + 2]);
              offset += 3;
            }
            array.push(charCode);
          }
          return String.fromCharCode.apply(null, array);
        };
        Package.encode = function(type, body) {
          var length = body ? body.length : 0;
          var buffer = new ByteArray(PKG_HEAD_BYTES + length);
          var index = 0;
          buffer[index++] = 255 & type;
          buffer[index++] = length >> 16 & 255;
          buffer[index++] = length >> 8 & 255;
          buffer[index++] = 255 & length;
          body && copyArray(buffer, index, body, 0, length);
          return buffer;
        };
        Package.decode = function(buffer) {
          var offset = 0;
          var bytes = new ByteArray(buffer);
          var length = 0;
          var rs = [];
          while (offset < bytes.length) {
            var type = bytes[offset++];
            length = (bytes[offset++] << 16 | bytes[offset++] << 8 | bytes[offset++]) >>> 0;
            var body = length ? new ByteArray(length) : null;
            copyArray(body, 0, bytes, offset, length);
            offset += length;
            rs.push({
              type: type,
              body: body
            });
          }
          return 1 === rs.length ? rs[0] : rs;
        };
        Message.encode = function(id, type, compressRoute, route, msg) {
          var idBytes = msgHasId(type) ? caculateMsgIdBytes(id) : 0;
          var msgLen = MSG_FLAG_BYTES + idBytes;
          if (msgHasRoute(type)) if (compressRoute) {
            if ("number" !== typeof route) throw new Error("error flag for number route!");
            msgLen += MSG_ROUTE_CODE_BYTES;
          } else {
            msgLen += MSG_ROUTE_LEN_BYTES;
            if (route) {
              route = Protocol.strencode(route);
              if (route.length > 255) throw new Error("route maxlength is overflow");
              msgLen += route.length;
            }
          }
          msg && (msgLen += msg.length);
          var buffer = new ByteArray(msgLen);
          var offset = 0;
          offset = encodeMsgFlag(type, compressRoute, buffer, offset);
          msgHasId(type) && (offset = encodeMsgId(id, buffer, offset));
          msgHasRoute(type) && (offset = encodeMsgRoute(compressRoute, route, buffer, offset));
          msg && (offset = encodeMsgBody(msg, buffer, offset));
          return buffer;
        };
        Message.decode = function(buffer) {
          var bytes = new ByteArray(buffer);
          var bytesLen = bytes.length || bytes.byteLength;
          var offset = 0;
          var id = 0;
          var route = null;
          var flag = bytes[offset++];
          var compressRoute = flag & MSG_COMPRESS_ROUTE_MASK;
          var type = flag >> 1 & MSG_TYPE_MASK;
          if (msgHasId(type)) {
            var m = parseInt(bytes[offset]);
            var i = 0;
            do {
              var m = parseInt(bytes[offset]);
              id += (127 & m) * Math.pow(2, 7 * i);
              offset++;
              i++;
            } while (m >= 128);
          }
          if (msgHasRoute(type)) if (compressRoute) route = bytes[offset++] << 8 | bytes[offset++]; else {
            var routeLen = bytes[offset++];
            if (routeLen) {
              route = new ByteArray(routeLen);
              copyArray(route, 0, bytes, offset, routeLen);
              route = Protocol.strdecode(route);
            } else route = "";
            offset += routeLen;
          }
          var bodyLen = bytesLen - offset;
          var body = new ByteArray(bodyLen);
          copyArray(body, 0, bytes, offset, bodyLen);
          return {
            id: id,
            type: type,
            compressRoute: compressRoute,
            route: route,
            body: body
          };
        };
        var copyArray = function copyArray(dest, doffset, src, soffset, length) {
          if ("function" === typeof src.copy) src.copy(dest, doffset, soffset, soffset + length); else for (var index = 0; index < length; index++) dest[doffset++] = src[soffset++];
        };
        var msgHasId = function msgHasId(type) {
          return type === Message.TYPE_REQUEST || type === Message.TYPE_RESPONSE;
        };
        var msgHasRoute = function msgHasRoute(type) {
          return type === Message.TYPE_REQUEST || type === Message.TYPE_NOTIFY || type === Message.TYPE_PUSH;
        };
        var caculateMsgIdBytes = function caculateMsgIdBytes(id) {
          var len = 0;
          do {
            len += 1;
            id >>= 7;
          } while (id > 0);
          return len;
        };
        var encodeMsgFlag = function encodeMsgFlag(type, compressRoute, buffer, offset) {
          if (type !== Message.TYPE_REQUEST && type !== Message.TYPE_NOTIFY && type !== Message.TYPE_RESPONSE && type !== Message.TYPE_PUSH) throw new Error("unkonw message type: " + type);
          buffer[offset] = type << 1 | (compressRoute ? 1 : 0);
          return offset + MSG_FLAG_BYTES;
        };
        var encodeMsgId = function encodeMsgId(id, buffer, offset) {
          do {
            var tmp = id % 128;
            var next = Math.floor(id / 128);
            0 !== next && (tmp += 128);
            buffer[offset++] = tmp;
            id = next;
          } while (0 !== id);
          return offset;
        };
        var encodeMsgRoute = function encodeMsgRoute(compressRoute, route, buffer, offset) {
          if (compressRoute) {
            if (route > MSG_ROUTE_CODE_MAX) throw new Error("route number is overflow");
            buffer[offset++] = route >> 8 & 255;
            buffer[offset++] = 255 & route;
          } else if (route) {
            buffer[offset++] = 255 & route.length;
            copyArray(buffer, offset, route, 0, route.length);
            offset += route.length;
          } else buffer[offset++] = 0;
          return offset;
        };
        var encodeMsgBody = function encodeMsgBody(msg, buffer, offset) {
          copyArray(buffer, offset, msg, 0, msg.length);
          return offset + msg.length;
        };
        "undefined" != typeof window && (window.Protocol = Protocol);
      })("undefined" == typeof window ? module.exports : {}, "undefined" == typeof window ? Buffer : Uint8Array, void 0);
      (function(exports, global) {
        var Protobuf = exports;
        Protobuf.init = function(opts) {
          Protobuf.encoder.init(opts.encoderProtos);
          Protobuf.decoder.init(opts.decoderProtos);
        };
        Protobuf.encode = function(key, msg) {
          return Protobuf.encoder.encode(key, msg);
        };
        Protobuf.decode = function(key, msg) {
          return Protobuf.decoder.decode(key, msg);
        };
        "undefined" != typeof window && (window.protobuf = Protobuf);
      })("undefined" == typeof window ? module.exports : {}, void 0);
      (function(exports, global) {
        var constants = exports.constants = {};
        constants.TYPES = {
          uInt32: 0,
          sInt32: 0,
          int32: 0,
          double: 1,
          string: 2,
          message: 2,
          float: 5
        };
      })("undefined" !== typeof protobuf ? protobuf : module.exports, void 0);
      (function(exports, global) {
        var Util = exports.util = {};
        Util.isSimpleType = function(type) {
          return "uInt32" === type || "sInt32" === type || "int32" === type || "uInt64" === type || "sInt64" === type || "float" === type || "double" === type;
        };
      })("undefined" !== typeof protobuf ? protobuf : module.exports, void 0);
      (function(exports, global) {
        var Codec = exports.codec = {};
        var buffer = new ArrayBuffer(8);
        var float32Array = new Float32Array(buffer);
        var float64Array = new Float64Array(buffer);
        var uInt8Array = new Uint8Array(buffer);
        Codec.encodeUInt32 = function(n) {
          var n = parseInt(n);
          if (isNaN(n) || n < 0) return null;
          var result = [];
          do {
            var tmp = n % 128;
            var next = Math.floor(n / 128);
            0 !== next && (tmp += 128);
            result.push(tmp);
            n = next;
          } while (0 !== n);
          return result;
        };
        Codec.encodeSInt32 = function(n) {
          var n = parseInt(n);
          if (isNaN(n)) return null;
          n = n < 0 ? 2 * Math.abs(n) - 1 : 2 * n;
          return Codec.encodeUInt32(n);
        };
        Codec.decodeUInt32 = function(bytes) {
          var n = 0;
          for (var i = 0; i < bytes.length; i++) {
            var m = parseInt(bytes[i]);
            n += (127 & m) * Math.pow(2, 7 * i);
            if (m < 128) return n;
          }
          return n;
        };
        Codec.decodeSInt32 = function(bytes) {
          var n = this.decodeUInt32(bytes);
          var flag = n % 2 === 1 ? -1 : 1;
          n = (n % 2 + n) / 2 * flag;
          return n;
        };
        Codec.encodeFloat = function(float) {
          float32Array[0] = float;
          return uInt8Array;
        };
        Codec.decodeFloat = function(bytes, offset) {
          if (!bytes || bytes.length < offset + 4) return null;
          for (var i = 0; i < 4; i++) uInt8Array[i] = bytes[offset + i];
          return float32Array[0];
        };
        Codec.encodeDouble = function(double) {
          float64Array[0] = double;
          return uInt8Array.subarray(0, 8);
        };
        Codec.decodeDouble = function(bytes, offset) {
          if (!bytes || bytes.length < offset + 8) return null;
          for (var i = 0; i < 8; i++) uInt8Array[i] = bytes[offset + i];
          return float64Array[0];
        };
        Codec.encodeStr = function(bytes, offset, str) {
          for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            var codes = encode2UTF8(code);
            for (var j = 0; j < codes.length; j++) {
              bytes[offset] = codes[j];
              offset++;
            }
          }
          return offset;
        };
        Codec.decodeStr = function(bytes, offset, length) {
          var array = [];
          var end = offset + length;
          while (offset < end) {
            var code = 0;
            if (bytes[offset] < 128) {
              code = bytes[offset];
              offset += 1;
            } else if (bytes[offset] < 224) {
              code = ((63 & bytes[offset]) << 6) + (63 & bytes[offset + 1]);
              offset += 2;
            } else {
              code = ((15 & bytes[offset]) << 12) + ((63 & bytes[offset + 1]) << 6) + (63 & bytes[offset + 2]);
              offset += 3;
            }
            array.push(code);
          }
          var str = "";
          for (var i = 0; i < array.length; ) {
            str += String.fromCharCode.apply(null, array.slice(i, i + 1e4));
            i += 1e4;
          }
          return str;
        };
        Codec.byteLength = function(str) {
          if ("string" !== typeof str) return -1;
          var length = 0;
          for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            length += codeLength(code);
          }
          return length;
        };
        function encode2UTF8(charCode) {
          return charCode <= 127 ? [ charCode ] : charCode <= 2047 ? [ 192 | charCode >> 6, 128 | 63 & charCode ] : [ 224 | charCode >> 12, 128 | (4032 & charCode) >> 6, 128 | 63 & charCode ];
        }
        function codeLength(code) {
          return code <= 127 ? 1 : code <= 2047 ? 2 : 3;
        }
      })("undefined" !== typeof protobuf ? protobuf : module.exports, void 0);
      (function(exports, global) {
        var protobuf = exports;
        var MsgEncoder = exports.encoder = {};
        var codec = protobuf.codec;
        var constant = protobuf.constants;
        var util = protobuf.util;
        MsgEncoder.init = function(protos) {
          this.protos = protos || {};
        };
        MsgEncoder.encode = function(route, msg) {
          var protos = this.protos[route];
          if (!checkMsg(msg, protos)) return null;
          var length = codec.byteLength(JSON.stringify(msg));
          var buffer = new ArrayBuffer(length);
          var uInt8Array = new Uint8Array(buffer);
          var offset = 0;
          if (!!protos) {
            offset = encodeMsg(uInt8Array, offset, protos, msg);
            if (offset > 0) return uInt8Array.subarray(0, offset);
          }
          return null;
        };
        function checkMsg(msg, protos) {
          if (!protos) return false;
          for (var name in protos) {
            var proto = protos[name];
            switch (proto.option) {
             case "required":
              if ("undefined" === typeof msg[name]) {
                console.warn("no property exist for required! name: %j, proto: %j, msg: %j", name, proto, msg);
                return false;
              }

             case "optional":
              if ("undefined" !== typeof msg[name]) {
                var message = protos.__messages[proto.type] || MsgEncoder.protos["message " + proto.type];
                if (!!message && !checkMsg(msg[name], message)) {
                  console.warn("inner proto error! name: %j, proto: %j, msg: %j", name, proto, msg);
                  return false;
                }
              }
              break;

             case "repeated":
              var message = protos.__messages[proto.type] || MsgEncoder.protos["message " + proto.type];
              if (!!msg[name] && !!message) for (var i = 0; i < msg[name].length; i++) if (!checkMsg(msg[name][i], message)) return false;
            }
          }
          return true;
        }
        function encodeMsg(buffer, offset, protos, msg) {
          for (var name in msg) if (!!protos[name]) {
            var proto = protos[name];
            switch (proto.option) {
             case "required":
             case "optional":
              offset = writeBytes(buffer, offset, encodeTag(proto.type, proto.tag));
              offset = encodeProp(msg[name], proto.type, offset, buffer, protos);
              break;

             case "repeated":
              msg[name].length > 0 && (offset = encodeArray(msg[name], proto, offset, buffer, protos));
            }
          }
          return offset;
        }
        function encodeProp(value, type, offset, buffer, protos) {
          switch (type) {
           case "uInt32":
            offset = writeBytes(buffer, offset, codec.encodeUInt32(value));
            break;

           case "int32":
           case "sInt32":
            offset = writeBytes(buffer, offset, codec.encodeSInt32(value));
            break;

           case "float":
            writeBytes(buffer, offset, codec.encodeFloat(value));
            offset += 4;
            break;

           case "double":
            writeBytes(buffer, offset, codec.encodeDouble(value));
            offset += 8;
            break;

           case "string":
            var length = codec.byteLength(value);
            offset = writeBytes(buffer, offset, codec.encodeUInt32(length));
            codec.encodeStr(buffer, offset, value);
            offset += length;
            break;

           default:
            var message = protos.__messages[type] || MsgEncoder.protos["message " + type];
            if (!!message) {
              var tmpBuffer = new ArrayBuffer(2 * codec.byteLength(JSON.stringify(value)));
              var length = 0;
              length = encodeMsg(tmpBuffer, length, message, value);
              offset = writeBytes(buffer, offset, codec.encodeUInt32(length));
              for (var i = 0; i < length; i++) {
                buffer[offset] = tmpBuffer[i];
                offset++;
              }
            }
          }
          return offset;
        }
        function encodeArray(array, proto, offset, buffer, protos) {
          var i = 0;
          if (util.isSimpleType(proto.type)) {
            offset = writeBytes(buffer, offset, encodeTag(proto.type, proto.tag));
            offset = writeBytes(buffer, offset, codec.encodeUInt32(array.length));
            for (i = 0; i < array.length; i++) offset = encodeProp(array[i], proto.type, offset, buffer);
          } else for (i = 0; i < array.length; i++) {
            offset = writeBytes(buffer, offset, encodeTag(proto.type, proto.tag));
            offset = encodeProp(array[i], proto.type, offset, buffer, protos);
          }
          return offset;
        }
        function writeBytes(buffer, offset, bytes) {
          for (var i = 0; i < bytes.length; i++, offset++) buffer[offset] = bytes[i];
          return offset;
        }
        function encodeTag(type, tag) {
          var value = constant.TYPES[type] || 2;
          return codec.encodeUInt32(tag << 3 | value);
        }
      })("undefined" !== typeof protobuf ? protobuf : module.exports, void 0);
      (function(exports, global) {
        var protobuf = exports;
        var MsgDecoder = exports.decoder = {};
        var codec = protobuf.codec;
        var util = protobuf.util;
        var buffer;
        var offset = 0;
        MsgDecoder.init = function(protos) {
          this.protos = protos || {};
        };
        MsgDecoder.setProtos = function(protos) {
          !protos || (this.protos = protos);
        };
        MsgDecoder.decode = function(route, buf) {
          var protos = this.protos[route];
          buffer = buf;
          offset = 0;
          if (!!protos) return decodeMsg({}, protos, buffer.length);
          return null;
        };
        function decodeMsg(msg, protos, length) {
          while (offset < length) {
            var head = getHead();
            var type = head.type;
            var tag = head.tag;
            var name = protos.__tags[tag];
            switch (protos[name].option) {
             case "optional":
             case "required":
              msg[name] = decodeProp(protos[name].type, protos);
              break;

             case "repeated":
              msg[name] || (msg[name] = []);
              decodeArray(msg[name], protos[name].type, protos);
            }
          }
          return msg;
        }
        function isFinish(msg, protos) {
          return !protos.__tags[peekHead().tag];
        }
        function getHead() {
          var tag = codec.decodeUInt32(getBytes());
          return {
            type: 7 & tag,
            tag: tag >> 3
          };
        }
        function peekHead() {
          var tag = codec.decodeUInt32(peekBytes());
          return {
            type: 7 & tag,
            tag: tag >> 3
          };
        }
        function decodeProp(type, protos) {
          switch (type) {
           case "uInt32":
            return codec.decodeUInt32(getBytes());

           case "int32":
           case "sInt32":
            return codec.decodeSInt32(getBytes());

           case "float":
            var float = codec.decodeFloat(buffer, offset);
            offset += 4;
            return float;

           case "double":
            var double = codec.decodeDouble(buffer, offset);
            offset += 8;
            return double;

           case "string":
            var length = codec.decodeUInt32(getBytes());
            var str = codec.decodeStr(buffer, offset, length);
            offset += length;
            return str;

           default:
            var message = protos && (protos.__messages[type] || MsgDecoder.protos["message " + type]);
            if (!!message) {
              var length = codec.decodeUInt32(getBytes());
              var msg = {};
              decodeMsg(msg, message, offset + length);
              return msg;
            }
          }
        }
        function decodeArray(array, type, protos) {
          if (util.isSimpleType(type)) {
            var length = codec.decodeUInt32(getBytes());
            for (var i = 0; i < length; i++) array.push(decodeProp(type));
          } else array.push(decodeProp(type, protos));
        }
        function getBytes(flag) {
          var bytes = [];
          var pos = offset;
          flag = flag || false;
          var b;
          do {
            b = buffer[pos];
            bytes.push(b);
            pos++;
          } while (b >= 128);
          flag || (offset = pos);
          return bytes;
        }
        function peekBytes() {
          return getBytes(true);
        }
      })("undefined" !== typeof protobuf ? protobuf : module.exports, void 0);
      cc.Pomelo = function() {
        var JS_WS_CLIENT_TYPE = "js-websocket";
        var JS_WS_CLIENT_VERSION = "0.0.1";
        var Protocol = window.Protocol;
        var protobuf = window.protobuf;
        var decodeIO_protobuf = window.decodeIO_protobuf;
        var decodeIO_encoder = null;
        var decodeIO_decoder = null;
        var Package = Protocol.Package;
        var Message = Protocol.Message;
        var EventEmitter = window.EventEmitter;
        var rsa = window.rsa;
        var disconnectCb = null;
        "undefined" != typeof window && "undefined" != typeof sys && sys.localStorage && (window.localStorage = sys.localStorage);
        var RES_OK = 200;
        var RES_FAIL = 500;
        var RES_OLD_CLIENT = 501;
        "function" !== typeof Object.create && (Object.create = function(o) {
          function F() {}
          F.prototype = o;
          return new F();
        });
        var root = window;
        var pomelo = Object.create(EventEmitter.prototype);
        var socket = null;
        var reqId = 0;
        var callbacks = {};
        var handlers = {};
        var routeMap = {};
        var dict = {};
        var abbrs = {};
        var serverProtos = {};
        var clientProtos = {};
        var protoVersion = 0;
        var heartbeatInterval = 0;
        var heartbeatTimeout = 0;
        var nextHeartbeatTimeout = 0;
        var gapThreshold = 100;
        var heartbeatId = null;
        var heartbeatTimeoutId = null;
        var handshakeCallback = null;
        var decode = null;
        var encode = null;
        var reconnect = false;
        var reconncetTimer = null;
        var reconnectUrl = null;
        var reconnectAttempts = 0;
        var reconnectionDelay = 5e3;
        var DEFAULT_MAX_RECONNECT_ATTEMPTS = 10;
        var netState = 0;
        var useCrypto;
        var handshakeBuffer = {
          sys: {
            type: JS_WS_CLIENT_TYPE,
            version: JS_WS_CLIENT_VERSION,
            rsa: {}
          },
          user: {}
        };
        var initCallback = null;
        pomelo.init = function(params, cb) {
          initCallback = cb;
          var host = params.host;
          var port = params.port;
          encode = params.encode || defaultEncode;
          decode = params.decode || defaultDecode;
          var url = "ws://" + host;
          port && (url += ":" + port);
          handshakeBuffer.user = params.user;
          if (params.encrypt) {
            useCrypto = true;
            rsa.generate(1024, "10001");
            var data = {
              rsa_n: rsa.n.toString(16),
              rsa_e: rsa.e
            };
            handshakeBuffer.sys.rsa = data;
          }
          handshakeCallback = params.handshakeCallback;
          connect(params, url, cb);
        };
        var defaultDecode = pomelo.decode = function(data) {
          var msg = Message.decode(data);
          if (msg.id > 0) {
            msg.route = routeMap[msg.id];
            delete routeMap[msg.id];
            if (!msg.route) return;
          }
          msg.body = deCompose(msg);
          return msg;
        };
        var defaultEncode = pomelo.encode = function(reqId, route, msg) {
          var type = reqId ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY;
          if (protobuf && clientProtos[route]) msg = protobuf.encode(route, msg); else if (decodeIO_encoder && decodeIO_encoder.lookup(route)) {
            var Builder = decodeIO_encoder.build(route);
            msg = new Builder(msg).encodeNB();
          } else msg = Protocol.strencode(JSON.stringify(msg));
          var compressRoute = 0;
          if (dict && dict[route]) {
            route = dict[route];
            compressRoute = 1;
          }
          return Message.encode(reqId, type, compressRoute, route, msg);
        };
        var connect = function connect(params, url, cb) {
          console.log("connect to " + url);
          var params = params || {};
          var maxReconnectAttempts = params.maxReconnectAttempts || DEFAULT_MAX_RECONNECT_ATTEMPTS;
          reconnectUrl = url;
          if (window.localStorage && window.localStorage.getItem("protos") && 0 === protoVersion) {
            var protos = JSON.parse(window.localStorage.getItem("protos"));
            protoVersion = protos.version || 0;
            serverProtos = protos.server || {};
            clientProtos = protos.client || {};
            !protobuf || protobuf.init({
              encoderProtos: clientProtos,
              decoderProtos: serverProtos
            });
            if (!!decodeIO_protobuf) {
              decodeIO_encoder = decodeIO_protobuf.loadJson(clientProtos);
              decodeIO_decoder = decodeIO_protobuf.loadJson(serverProtos);
            }
          }
          handshakeBuffer.sys.protoVersion = protoVersion;
          var onopen = function onopen(event) {
            !reconnect || pomelo.emit("reconnect");
            netState = 1;
            reset();
            var obj = Package.encode(Package.TYPE_HANDSHAKE, Protocol.strencode(JSON.stringify(handshakeBuffer)));
            send(obj);
          };
          var onmessage = function onmessage(event) {
            processPackage(Package.decode(event.data), cb);
            heartbeatTimeout && (nextHeartbeatTimeout = Date.now() + heartbeatTimeout);
          };
          var onerror = function onerror(event) {
            netState = 0;
            pomelo.emit("io-error", event);
            console.error("socket error: ", event);
          };
          var onclose = function onclose(event) {
            netState = 0;
            pomelo.emit("close", event);
            pomelo.emit("disconnect", event);
            console.warn("socket close: ", event);
            if (!!params.reconnect && reconnectAttempts < maxReconnectAttempts) {
              reconnect = true;
              reconnectAttempts++;
              reconncetTimer = setTimeout(function() {
                connect(params, reconnectUrl, cb);
              }, reconnectionDelay);
              reconnectionDelay *= 2;
            }
            socket = null;
            disconnectCb && disconnectCb();
            disconnectCb = null;
          };
          socket = new WebSocket(url);
          socket.binaryType = "arraybuffer";
          socket.onopen = onopen;
          socket.onmessage = onmessage;
          socket.onerror = onerror;
          socket.onclose = onclose;
        };
        pomelo.getNetState = function() {
          return netState;
        };
        pomelo.disconnect = function(cb) {
          disconnectCb = cb;
          if (socket) {
            socket.disconnect && socket.disconnect();
            socket.close && socket.close();
            console.log("disconnect");
            socket = null;
          }
          if (heartbeatId) {
            clearTimeout(heartbeatId);
            heartbeatId = null;
          }
          if (heartbeatTimeoutId) {
            clearTimeout(heartbeatTimeoutId);
            heartbeatTimeoutId = null;
          }
        };
        var reset = function reset() {
          reconnect = false;
          reconnectionDelay = 5e3;
          reconnectAttempts = 0;
          clearTimeout(reconncetTimer);
        };
        pomelo.request = function(route, msg, cb) {
          if (2 === arguments.length && "function" === typeof msg) {
            cb = msg;
            msg = {};
          } else msg = msg || {};
          route = route || msg.route;
          if (!route) return;
          reqId++;
          sendMessage(reqId, route, msg);
          callbacks[reqId] = cb;
          routeMap[reqId] = route;
        };
        pomelo.notify = function(route, msg) {
          msg = msg || {};
          sendMessage(0, route, msg);
        };
        var sendMessage = function sendMessage(reqId, route, msg) {
          if (useCrypto) {
            msg = JSON.stringify(msg);
            var sig = rsa.signString(msg, "sha256");
            msg = JSON.parse(msg);
            msg["__crypto__"] = sig;
          }
          encode && (msg = encode(reqId, route, msg));
          var packet = Package.encode(Package.TYPE_DATA, msg);
          send(packet);
        };
        var send = function send(packet) {
          null !== socket && socket.send(packet.buffer);
        };
        var handler = {};
        var heartbeat = function heartbeat(data) {
          if (!heartbeatInterval) return;
          var obj = Package.encode(Package.TYPE_HEARTBEAT);
          if (heartbeatTimeoutId) {
            clearTimeout(heartbeatTimeoutId);
            heartbeatTimeoutId = null;
          }
          if (heartbeatId) return;
          heartbeatId = setTimeout(function() {
            heartbeatId = null;
            send(obj);
            nextHeartbeatTimeout = Date.now() + heartbeatTimeout;
            heartbeatTimeoutId = setTimeout(heartbeatTimeoutCb, heartbeatTimeout);
          }, heartbeatInterval);
        };
        var heartbeatTimeoutCb = function heartbeatTimeoutCb() {
          var gap = nextHeartbeatTimeout - Date.now();
          if (gap > gapThreshold) heartbeatTimeoutId = setTimeout(heartbeatTimeoutCb, gap); else {
            console.error("server heartbeat timeout");
            pomelo.emit("heartbeat timeout");
          }
        };
        var handshake = function handshake(data) {
          data = JSON.parse(Protocol.strdecode(data));
          if (data.code === RES_OLD_CLIENT) {
            pomelo.emit("error", "client version not fullfill");
            return;
          }
          if (data.code !== RES_OK) {
            pomelo.emit("error", "handshake fail");
            return;
          }
          handshakeInit(data);
          var obj = Package.encode(Package.TYPE_HANDSHAKE_ACK);
          send(obj);
          initCallback && initCallback(socket);
        };
        var onData = function onData(data) {
          var msg = data;
          decode && (msg = decode(msg));
          processMessage(pomelo, msg);
        };
        var onKick = function onKick(data) {
          data = JSON.parse(Protocol.strdecode(data));
          pomelo.emit("onKick", data);
        };
        handlers[Package.TYPE_HANDSHAKE] = handshake;
        handlers[Package.TYPE_HEARTBEAT] = heartbeat;
        handlers[Package.TYPE_DATA] = onData;
        handlers[Package.TYPE_KICK] = onKick;
        var processPackage = function processPackage(msgs) {
          if (Array.isArray(msgs)) for (var i = 0; i < msgs.length; i++) {
            var msg = msgs[i];
            handlers[msg.type](msg.body);
          } else handlers[msgs.type](msgs.body);
        };
        var processMessage = function processMessage(pomelo, msg) {
          if (!msg.id) {
            cc.log("[serverPush rev ]: ", msg.route);
            pomelo.emit(msg.route, msg.body);
            return;
          }
          var cb = callbacks[msg.id];
          delete callbacks[msg.id];
          if ("function" !== typeof cb) return;
          cb(msg.body);
          return;
        };
        var processMessageBatch = function processMessageBatch(pomelo, msgs) {
          for (var i = 0, l = msgs.length; i < l; i++) processMessage(pomelo, msgs[i]);
        };
        var getTotalFrames = function getTotalFrames() {
          return cc.director.getTotalFrames();
        };
        var deCompose = function deCompose(msg) {
          var route = msg.route;
          if (msg.compressRoute) {
            if (!abbrs[route]) return {};
            route = msg.route = abbrs[route];
          }
          return protobuf && serverProtos[route] ? protobuf.decode(route, msg.body) : decodeIO_decoder && decodeIO_decoder.lookup(route) ? decodeIO_decoder.build(route).decode(msg.body) : JSON.parse(Protocol.strdecode(msg.body));
        };
        var handshakeInit = function handshakeInit(data) {
          if (data.sys && data.sys.heartbeat) {
            heartbeatInterval = 1e3 * data.sys.heartbeat;
            heartbeatTimeout = 2 * heartbeatInterval;
          } else {
            heartbeatInterval = 0;
            heartbeatTimeout = 0;
          }
          initData(data);
          "function" === typeof handshakeCallback && handshakeCallback(data.user);
        };
        var initData = function initData(data) {
          if (!data || !data.sys) return;
          dict = data.sys.dict;
          var protos = data.sys.protos;
          if (dict) {
            dict = dict;
            abbrs = {};
            for (var route in dict) abbrs[dict[route]] = route;
          }
          if (protos) {
            protoVersion = protos.version || 0;
            serverProtos = protos.server || {};
            clientProtos = protos.client || {};
            window.localStorage.setItem("protos", JSON.stringify(protos));
            !protobuf || protobuf.init({
              encoderProtos: protos.client,
              decoderProtos: protos.server
            });
            if (!!decodeIO_protobuf) {
              decodeIO_encoder = decodeIO_protobuf.loadJson(clientProtos);
              decodeIO_decoder = decodeIO_protobuf.loadJson(serverProtos);
            }
          }
        };
        return pomelo;
      };
      window.pomelo = new cc.Pomelo();
      cc._RF.pop();
    }).call(this, require("buffer").Buffer);
  }, {
    buffer: 2
  } ],
  ref: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0d50eZazhZGdra6/kZc8ycl", "ref");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UILayerOrder;
    (function(UILayerOrder) {
      UILayerOrder[UILayerOrder["Scene"] = 0] = "Scene";
      UILayerOrder[UILayerOrder["View"] = 1] = "View";
      UILayerOrder[UILayerOrder["Tips"] = 10] = "Tips";
      UILayerOrder[UILayerOrder["Guide"] = 11] = "Guide";
      UILayerOrder[UILayerOrder["Hover"] = 12] = "Hover";
      UILayerOrder[UILayerOrder["Loading"] = 13] = "Loading";
      UILayerOrder[UILayerOrder["System"] = 14] = "System";
    })(UILayerOrder = exports.UILayerOrder || (exports.UILayerOrder = {}));
    cc._RF.pop();
  }, {} ]
}, {}, [ "Launcher", "Animation", "Animation1", "EventDispatcher", "ResLoader", "BindTools", "pomelo", "BaseProto", "NetMgr", "ProtoTools", "Node", "Number", "String", "System", "ref", "Async", "Tools", "Utils", "http", "BaseUI", "FileUI", "UITools", "CommonComp", "CommonUI", "LoadingView", "ViewMgr", "BaseAction", "DealCardsAction", "ExtractAction", "HeiTao3Action", "PDKActions", "PDKLastCardsAction", "PDKPassAction", "PDKThrowCardsOfFrontMoveAction", "ThrowCardsOfMeMoveAction", "ThrowCardsOfNextMoveAction", "UIAction", "DissolveUI", "ExtraComp", "PdkGameUI", "RoleSeatUI", "SettingUI", "AnimConfig", "MusicConfig", "PdkCmd", "PdkEvent", "PosInfo", "GameData", "TableProto", "Card", "Dissolve", "PDKOver", "CardShuffle", "PdkUtils", "PdkMain", "HallProto", "RoomProto", "RoomNumberView", "HallMain", "LoginProto", "LoginMain" ]);