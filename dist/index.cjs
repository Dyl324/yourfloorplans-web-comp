'use strict';

function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}

const EMPTY_OBJ = !!({}.NODE_ENV !== "production") ? Object.freeze({}) : {};
const EMPTY_ARR = !!({}.NODE_ENV !== "production") ? Object.freeze([]) : [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s = str ? `on${capitalize(str)}` : ``;
  return s;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};

function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}

const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}

const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};

function warn$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}

let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    /**
     * @internal
     */
    this._active = true;
    /**
     * @internal
     */
    this.effects = [];
    /**
     * @internal
     */
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (!!({}.NODE_ENV !== "production")) {
      warn$1(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}

const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};

const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol(!!({}.NODE_ENV !== "production") ? "iterate" : "");
const MAP_KEY_ITERATE_KEY = Symbol(!!({}.NODE_ENV !== "production") ? "Map key iterate" : "");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = !!({}.NODE_ENV !== "production") ? { effect: activeEffect, target, type, key } : void 0;
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (!!({}.NODE_ENV !== "production") && activeEffect.onTrack) {
      activeEffect.onTrack(
        extend(
          {
            effect: activeEffect
          },
          debuggerEventExtraInfo
        )
      );
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = !!({}.NODE_ENV !== "production") ? { target, type, key, newValue, oldValue, oldTarget } : void 0;
  if (deps.length === 1) {
    if (deps[0]) {
      if (!!({}.NODE_ENV !== "production")) {
        triggerEffects(deps[0], eventInfo);
      } else {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    if (!!({}.NODE_ENV !== "production")) {
      triggerEffects(createDep(effects), eventInfo);
    } else {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect2 of effects) {
    if (effect2.computed) {
      triggerEffect(effect2, debuggerEventExtraInfo);
    }
  }
  for (const effect2 of effects) {
    if (!effect2.computed) {
      triggerEffect(effect2, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect2, debuggerEventExtraInfo) {
  if (effect2 !== activeEffect || effect2.allowRecurse) {
    if (!!({}.NODE_ENV !== "production") && effect2.onTrigger) {
      effect2.onTrigger(extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
    if (effect2.scheduler) {
      effect2.scheduler();
    } else {
      effect2.run();
    }
  }
}

const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _shallow = false) {
    this._isReadonly = _isReadonly;
    this._shallow = _shallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, shallow = this._shallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(shallow = false) {
    super(false, shallow);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!this._shallow) {
      if (!isShallow$1(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(shallow = false) {
    super(true, shallow);
  }
  set(target, key) {
    if (!!({}.NODE_ENV !== "production")) {
      warn$1(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    if (!!({}.NODE_ENV !== "production")) {
      warn$1(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);

const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly = false, isShallow = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
  target = target["__v_raw"];
  !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (!!({}.NODE_ENV !== "production")) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (!!({}.NODE_ENV !== "production")) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = !!({}.NODE_ENV !== "production") ? isMap(target) ? new Map(target) : new Set(target) : void 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly, isShallow) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (!!({}.NODE_ENV !== "production")) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(
      method,
      false,
      false
    );
    readonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      false
    );
    shallowInstrumentations2[method] = createIterableMethod(
      method,
      false,
      true
    );
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}

const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1 /* COMMON */;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2 /* COLLECTION */;
    default:
      return 0 /* INVALID */;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 /* INVALID */ : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (!!({}.NODE_ENV !== "production")) {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0 /* INVALID */) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow$1(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;

function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    if (!!({}.NODE_ENV !== "production")) {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    } else {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    if (!!({}.NODE_ENV !== "production")) {
      triggerEffects(dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    } else {
      triggerEffects(dep);
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow$1(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}

class ComputedRefImpl {
  constructor(getter, _setter, isReadonly, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly;
  }
  get value() {
    const self = toRaw(this);
    trackRefValue(self);
    if (self._dirty || !self._cacheable) {
      self._dirty = false;
      self._value = self.effect.run();
    }
    return self._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = !!({}.NODE_ENV !== "production") ? () => {
      console.warn("Write operation failed: computed value is readonly");
    } : NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (!!({}.NODE_ENV !== "production") && debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}

const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn(msg, ...args) {
  if (!!!({}.NODE_ENV !== "production"))
    return;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}

const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = !!({}.NODE_ENV !== "production") ? ErrorTypeStrings[type] : type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  if (!!({}.NODE_ENV !== "production")) {
    const info = ErrorTypeStrings[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  } else {
    console.error(err);
  }
}

let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  if (!!({}.NODE_ENV !== "production")) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (!!({}.NODE_ENV !== "production") && checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    if (!!({}.NODE_ENV !== "production")) {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (!!({}.NODE_ENV !== "production") && checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  if (!!({}.NODE_ENV !== "production")) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = !!({}.NODE_ENV !== "production") ? (job) => checkRecursiveUpdates(seen, job) : NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (!!({}.NODE_ENV !== "production") && check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}

let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Set();
if (!!({}.NODE_ENV !== "production")) {
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      queueJob(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
  }
  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(
        normalizeClassComponent(instance.type)
      );
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}

let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version) {
  emit$1("app:init" /* APP_INIT */, app, version, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app) {
  emit$1("app:unmount" /* APP_UNMOUNT */, app);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added" /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook("component:updated" /* COMPONENT_UPDATED */);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed" /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      component.parent ? component.parent.uid : void 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start" /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end" /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit" /* COMPONENT_EMIT */,
    component.appContext.app,
    component,
    event,
    params
  );
}

function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  if (!!({}.NODE_ENV !== "production")) {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener = event.startsWith("update:");
  const modelArg = isModelListener && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  if (!!({}.NODE_ENV !== "production") || false) {
    devtoolsComponentEmit(instance, event, args);
  }
  if (!!({}.NODE_ENV !== "production")) {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}

let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    if (!!({}.NODE_ENV !== "production") || false) {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}

let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  if (!!({}.NODE_ENV !== "production")) {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(
        render.call(
          proxyToUse,
          proxyToUse,
          renderCache,
          props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (!!({}.NODE_ENV !== "production") && attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(
        render2.length > 1 ? render2(
          props,
          !!({}.NODE_ENV !== "production") ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit
          } : { attrs, slots, emit }
        ) : render2(
          props,
          null
          /* we know it doesn't need it */
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if (!!({}.NODE_ENV !== "production") && result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      } else if (!!({}.NODE_ENV !== "production") && !accessedAttrs && root.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i = 0, l = allAttrs.length; i < l; i++) {
          const key = allAttrs[i];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn(
            `Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
          );
        }
        if (eventAttrs.length) {
          warn(
            `Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
          );
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!!({}.NODE_ENV !== "production") && !isElementRoot(root)) {
      warn(
        `Runtime directive used on component with non-element root node. The directives will not function as intended.`
      );
    }
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!!({}.NODE_ENV !== "production") && !isElementRoot(root)) {
      warn(
        `Component inside <Transition> renders non-element root node that cannot be animated.`
      );
    }
    root.transition = vnode.transition;
  }
  if (!!({}.NODE_ENV !== "production") && setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren);
  if (!childRoot) {
    return [vnode, void 0];
  }
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (!!({}.NODE_ENV !== "production") && (prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");

const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!!({}.NODE_ENV !== "production") && !isFunction(cb)) {
    warn(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  var _a;
  if (!!({}.NODE_ENV !== "production") && !cb) {
    if (immediate !== void 0) {
      warn(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s) => {
    warn(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = getCurrentScope() === ((_a = currentInstance) == null ? void 0 : _a.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow$1(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow$1(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
        !!({}.NODE_ENV !== "production") && warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    !!({}.NODE_ENV !== "production") && warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (!!({}.NODE_ENV !== "production")) {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    );
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}

function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}

const isAsyncWrapper = (i) => !!i.type.__asyncLoader;

const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}

function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else if (!!({}.NODE_ENV !== "production")) {
    const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
    warn(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().` + (` If you are using async setup(), make sure to register lifecycle hooks before the first await statement.` )
    );
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}

function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    if (!!({}.NODE_ENV !== "production") && !Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}

const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => !!({}.NODE_ENV !== "production") ? shallowReadonly(i.props) : i.props,
    $attrs: (i) => !!({}.NODE_ENV !== "production") ? shallowReadonly(i.attrs) : i.attrs,
    $slots: (i) => !!({}.NODE_ENV !== "production") ? shallowReadonly(i.slots) : i.slots,
    $refs: (i) => !!({}.NODE_ENV !== "production") ? shallowReadonly(i.refs) : i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i) ,
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i) 
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (!!({}.NODE_ENV !== "production") && key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1 /* SETUP */:
            return setupState[key];
          case 2 /* DATA */:
            return data[key];
          case 4 /* CONTEXT */:
            return ctx[key];
          case 3 /* PROPS */:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1 /* SETUP */;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2 /* DATA */;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3 /* PROPS */;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4 /* CONTEXT */;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0 /* OTHER */;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
        !!({}.NODE_ENV !== "production") && markAttrsAccessed();
      } else if (!!({}.NODE_ENV !== "production") && key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4 /* CONTEXT */;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (!!({}.NODE_ENV !== "production") && currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (!!({}.NODE_ENV !== "production") && setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      !!({}.NODE_ENV !== "production") && warn(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      !!({}.NODE_ENV !== "production") && warn(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (!!({}.NODE_ENV !== "production") && key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
if (!!({}.NODE_ENV !== "production") && true) {
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p) => (normalized[p] = null, normalized),
    {}
  ) : props;
}

function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = !!({}.NODE_ENV !== "production") ? createDuplicateChecker() : null;
  if (!!({}.NODE_ENV !== "production")) {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props" /* PROPS */, key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        if (!!({}.NODE_ENV !== "production")) {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
          ctx[key] = methodHandler.bind(publicThis);
        }
        if (!!({}.NODE_ENV !== "production")) {
          checkDuplicateProperties("Methods" /* METHODS */, key);
        }
      } else if (!!({}.NODE_ENV !== "production")) {
        warn(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!!({}.NODE_ENV !== "production") && !isFunction(dataOptions)) {
      warn(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (!!({}.NODE_ENV !== "production") && isPromise(data)) {
      warn(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject(data)) {
      !!({}.NODE_ENV !== "production") && warn(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      if (!!({}.NODE_ENV !== "production")) {
        for (const key in data) {
          checkDuplicateProperties("Data" /* DATA */, key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (!!({}.NODE_ENV !== "production") && get === NOOP) {
        warn(`Computed property "${key}" has no getter.`);
      }
      const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : !!({}.NODE_ENV !== "production") ? () => {
        warn(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      } : NOOP;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      if (!!({}.NODE_ENV !== "production")) {
        checkDuplicateProperties("Computed" /* COMPUTED */, key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    if (!!({}.NODE_ENV !== "production")) {
      checkDuplicateProperties("Inject" /* INJECT */, key);
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else if (!!({}.NODE_ENV !== "production")) {
      warn(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else if (!!({}.NODE_ENV !== "production")) {
        warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else if (!!({}.NODE_ENV !== "production")) {
    warn(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      !!({}.NODE_ENV !== "production") && warn(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return (extend)(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}

function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      !!({}.NODE_ENV !== "production") && warn(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    if (!!({}.NODE_ENV !== "production")) {
      Object.defineProperty(context.config, "unwrapInjectedRef", {
        get() {
          return true;
        },
        set() {
          warn(
            `app.config.unwrapInjectedRef has been deprecated. 3.3 now always unwraps injected refs in Options API.`
          );
        }
      });
    }
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        if (!!({}.NODE_ENV !== "production")) {
          warn(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          !!({}.NODE_ENV !== "production") && warn(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else if (!!({}.NODE_ENV !== "production")) {
          warn(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if (!!({}.NODE_ENV !== "production")) {
            warn(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        if (!!({}.NODE_ENV !== "production")) {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (!!({}.NODE_ENV !== "production") && context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!!({}.NODE_ENV !== "production")) {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (!!({}.NODE_ENV !== "production") && context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          if (!!({}.NODE_ENV !== "production") && rootContainer.__vue_app__) {
            warn(
              `There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`
            );
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (!!({}.NODE_ENV !== "production")) {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer, isSVG);
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          if (!!({}.NODE_ENV !== "production") || false) {
            app._instance = vnode.component;
            devtoolsInitApp(app, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else if (!!({}.NODE_ENV !== "production")) {
          warn(
            `App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``
          );
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          if (!!({}.NODE_ENV !== "production") || false) {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else if (!!({}.NODE_ENV !== "production")) {
          warn(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (!!({}.NODE_ENV !== "production") && key in context.provides) {
          warn(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = null;
        }
      }
    };
    return app;
  };
}
let currentApp = null;

function provide(key, value) {
  if (!currentInstance) {
    if (!!({}.NODE_ENV !== "production")) {
      warn(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else if (!!({}.NODE_ENV !== "production")) {
      warn(`injection "${String(key)}" not found.`);
    }
  } else if (!!({}.NODE_ENV !== "production")) {
    warn(`inject() can only be used inside setup() or functional components.`);
  }
}

function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (!!({}.NODE_ENV !== "production")) {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(!!({}.NODE_ENV !== "production") && isInHmrContext(instance)) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  if (!!({}.NODE_ENV !== "production")) {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0 /* shouldCast */]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1 /* shouldCastTrue */] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!!({}.NODE_ENV !== "production") && !isString(raw[i])) {
        warn(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!!({}.NODE_ENV !== "production") && !isObject(raw)) {
      warn(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0 /* shouldCast */] = booleanIndex > -1;
          prop[1 /* shouldCastTrue */] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else if (!!({}.NODE_ENV !== "production")) {
    warn(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(
      key,
      resolvedValues[key],
      opt,
      !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
    );
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}

const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (!!({}.NODE_ENV !== "production") && currentInstance) {
      warn(
        `Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
      );
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      if (!!({}.NODE_ENV !== "production") && true) {
        warn(
          `Non-function value encountered for slot "${key}". Prefer function slots for better performance.`
        );
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  if (!!({}.NODE_ENV !== "production") && !isKeepAlive(instance.vnode) && true) {
    warn(
      `Non-function value encountered for default slot. Prefer function slots for better performance.`
    );
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(
        children,
        instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (!!({}.NODE_ENV !== "production") && isHmrUpdating) {
        extend(slots, children);
        trigger(instance, "set", "$slots");
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};

function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref } = rawRef;
  if (!!({}.NODE_ENV !== "production") && !owner) {
    warn(
      `Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`
    );
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref)) {
    callWithErrorHandling(ref, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref);
    const _isRef = isRef(ref);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref) ? setupState[ref] : refs[ref] : ref.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref] = [refValue];
                if (hasOwn(setupState, ref)) {
                  setupState[ref] = refs[ref];
                }
              } else {
                ref.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref] = value;
          if (hasOwn(setupState, ref)) {
            setupState[ref] = value;
          }
        } else if (_isRef) {
          ref.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else if (!!({}.NODE_ENV !== "production")) {
          warn("Invalid template ref type:", ref, `(${typeof ref})`);
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else if (!!({}.NODE_ENV !== "production")) {
      warn("Invalid template ref type:", ref, `(${typeof ref})`);
    }
  }
}

let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  if (!!({}.NODE_ENV !== "production") || false) {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  if (!!({}.NODE_ENV !== "production") || false) {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}

function initFeatureFlags() {
  const needWarn = [];
  if (!!({}.NODE_ENV !== "production") && needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(
      `Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}

const queuePostRenderEffect = queueEffectWithSuspense ;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  if (!!({}.NODE_ENV !== "production") || false) {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!({}.NODE_ENV !== "production") && isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else if (!!({}.NODE_ENV !== "production")) {
          patchStaticNode(n1, n2, container, isSVG);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (!!({}.NODE_ENV !== "production")) {
          warn("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref != null && parentComponent) {
      setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      isSVG,
      n2.el,
      n2.anchor
    );
  };
  const patchStaticNode = (n1, n2, container, isSVG) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        isSVG
      );
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      isSVG,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        isSVG && type !== "foreignObject",
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(
            el,
            key,
            null,
            props[key],
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (!!({}.NODE_ENV !== "production") || false) {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (!!({}.NODE_ENV !== "production") && subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (!!({}.NODE_ENV !== "production") && isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds
      );
      if (!!({}.NODE_ENV !== "production")) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          isSVG
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                isSVG,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        isSVG
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              isSVG,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (!!({}.NODE_ENV !== "production") && // #5523 dev root fragment may inherit directives
    (isHmrUpdating || patchFlag & 2048)) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        n2.children,
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        if (!!({}.NODE_ENV !== "production")) {
          traverseStaticChildren(n1, n2);
        } else if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          isSVG,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = (initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    ));
    if (!!({}.NODE_ENV !== "production") && instance.type.__hmrId) {
      registerHMR(instance);
    }
    if (!!({}.NODE_ENV !== "production")) {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      if (!!({}.NODE_ENV !== "production")) {
        startMeasure(instance, `init`);
      }
      setupComponent(instance);
      if (!!({}.NODE_ENV !== "production")) {
        endMeasure(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    );
    if (!!({}.NODE_ENV !== "production")) {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        if (!!({}.NODE_ENV !== "production")) {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        if (!!({}.NODE_ENV !== "production")) {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            if (!!({}.NODE_ENV !== "production")) {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            if (!!({}.NODE_ENV !== "production")) {
              endMeasure(instance, `render`);
            }
            if (!!({}.NODE_ENV !== "production")) {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
            if (!!({}.NODE_ENV !== "production")) {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          if (!!({}.NODE_ENV !== "production")) {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          if (!!({}.NODE_ENV !== "production")) {
            endMeasure(instance, `render`);
          }
          if (!!({}.NODE_ENV !== "production")) {
            startMeasure(instance, `patch`);
          }
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            isSVG
          );
          if (!!({}.NODE_ENV !== "production")) {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        if (!!({}.NODE_ENV !== "production") || false) {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        if (!!({}.NODE_ENV !== "production")) {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        if (!!({}.NODE_ENV !== "production")) {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        if (!!({}.NODE_ENV !== "production")) {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        if (!!({}.NODE_ENV !== "production")) {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        if (!!({}.NODE_ENV !== "production")) {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
        if (!!({}.NODE_ENV !== "production") || false) {
          devtoolsComponentUpdated(instance);
        }
        if (!!({}.NODE_ENV !== "production")) {
          popWarningContext();
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => effect.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    if (!!({}.NODE_ENV !== "production")) {
      effect.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
      effect.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
      update.ownerInstance = instance;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if (!!({}.NODE_ENV !== "production") && keyToNewIndexMap.has(nextChild.key)) {
            warn(
              `Duplicate keys found during update:`,
              JSON.stringify(nextChild.key),
              `Make sure keys are unique.`
            );
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove2 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove2();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove2, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref != null) {
      setRef(ref, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (!!({}.NODE_ENV !== "production") && vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (!!({}.NODE_ENV !== "production") && instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    if (!!({}.NODE_ENV !== "production") || false) {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (!!({}.NODE_ENV !== "production") && c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}

const isTeleport = (type) => type.__isTeleport;

const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
      /* isBlock */
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (!!({}.NODE_ENV !== "production") && n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    n1.shapeFlag &= ~256;
    n2.shapeFlag &= ~512;
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(
    ...args
  );
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref,
  ref_key,
  ref_for
}) => {
  if (typeof ref === "number") {
    ref = "" + ref;
  }
  return ref != null ? isString(ref) || isRef(ref) || isFunction(ref) ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for } : ref : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (!!({}.NODE_ENV !== "production") && vnode.key !== vnode.key) {
    warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = !!({}.NODE_ENV !== "production") ? createVNodeWithArgsTransform : _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!!({}.NODE_ENV !== "production") && !type) {
      warn(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  if (!!({}.NODE_ENV !== "production") && shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn(
      `Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`,
      `
Component that was made reactive: `,
      type
    );
  }
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref ? isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: !!({}.NODE_ENV !== "production") && patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}

const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  if (!!({}.NODE_ENV !== "production")) {
    instance.ctx = createDevRenderContext(instance);
  } else {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
let internalSetCurrentInstance;
let globalCurrentInstanceSetters;
let settersKey = "__VUE_INSTANCE_SETTERS__";
{
  if (!(globalCurrentInstanceSetters = getGlobalThis()[settersKey])) {
    globalCurrentInstanceSetters = getGlobalThis()[settersKey] = [];
  }
  globalCurrentInstanceSetters.push((i) => currentInstance = i);
  internalSetCurrentInstance = (instance) => {
    if (globalCurrentInstanceSetters.length > 1) {
      globalCurrentInstanceSetters.forEach((s) => s(instance));
    } else {
      globalCurrentInstanceSetters[0](instance);
    }
  };
}
const setCurrentInstance = (instance) => {
  internalSetCurrentInstance(instance);
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a;
  const Component = instance.type;
  if (!!({}.NODE_ENV !== "production")) {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  if (!!({}.NODE_ENV !== "production")) {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [!!({}.NODE_ENV !== "production") ? shallowReadonly(instance.props) : instance.props, setupContext]
    );
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (!!({}.NODE_ENV !== "production") && !instance.suspense) {
          const name = (_a = Component.name) != null ? _a : "Anonymous";
          warn(
            `Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
          );
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (!!({}.NODE_ENV !== "production") && isVNode(setupResult)) {
      warn(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    if (!!({}.NODE_ENV !== "production") || false) {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    if (!!({}.NODE_ENV !== "production")) {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (!!({}.NODE_ENV !== "production") && setupResult !== void 0) {
    warn(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        if (!!({}.NODE_ENV !== "production")) {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
        if (!!({}.NODE_ENV !== "production")) {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      unsetCurrentInstance();
    }
  }
  if (!!({}.NODE_ENV !== "production") && !Component.render && instance.render === NOOP && !isSSR) {
    if (Component.template) {
      warn(
        `Component provided template option but runtime compilation is not supported in this build of Vue.` + (` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".` )
        /* should not happen */
      );
    } else {
      warn(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    !!({}.NODE_ENV !== "production") ? {
      get(target, key) {
        markAttrsAccessed();
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      }
    } : {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (!!({}.NODE_ENV !== "production")) {
      if (instance.exposed) {
        warn(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  if (!!({}.NODE_ENV !== "production")) {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  } else {
    return {
      get attrs() {
        return getAttrsProxy(instance);
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}

const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};

const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
      !!({}.NODE_ENV !== "production") && warn(
        `Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`
      );
    }
    return ctx;
  }
};

function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}

function initCustomFormatter() {
  if (!!!({}.NODE_ENV !== "production") || typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#0b1bc9" };
  const stringStyle = { style: "color:#b62e24" };
  const keywordStyle = { style: "color:#9d288c" };
  const formatter = {
    header(obj) {
      if (!isObject(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed = extractKeys(instance, "computed");
    if (computed) {
      blocks.push(createInstanceBlock("computed", computed));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject(v)) {
      return ["object", { object: asRaw ? toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}

const version = "3.3.8";

const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const vtcKey = Symbol("_vtc");

function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}

const vShowOldKey = Symbol("_vod");

function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if (vShowOldKey in el) {
      style.display = currentDisplay;
    }
  }
}
const semicolonRE = /[^\\];\s*$/;
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (!!({}.NODE_ENV !== "production")) {
      if (semicolonRE.test(val)) {
        warn(
          `Unexpected semicolon at the end of '${name}' style value: '${val}'`
        );
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}

const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}

function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    el._value = value;
    const oldValue = tag === "OPTION" ? el.getAttribute("value") : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (!!({}.NODE_ENV !== "production") && !needRemove) {
      warn(
        `Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`,
        e
      );
    }
  }
  needRemove && el.removeAttribute(key);
}

function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}

const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }
  return key in el;
}

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineCustomElement(options, hydrate2) {
  const Comp = defineComponent(options);
  class VueCustomElement extends VueElement {
    constructor(initialProps) {
      super(Comp, initialProps, hydrate2);
    }
  }
  VueCustomElement.def = Comp;
  return VueCustomElement;
}
const BaseClass = typeof HTMLElement !== "undefined" ? HTMLElement : class {
};
class VueElement extends BaseClass {
  constructor(_def, _props = {}, hydrate2) {
    super();
    this._def = _def;
    this._props = _props;
    /**
     * @internal
     */
    this._instance = null;
    this._connected = false;
    this._resolved = false;
    this._numberProps = null;
    this._ob = null;
    if (this.shadowRoot && hydrate2) {
      hydrate2(this._createVNode(), this.shadowRoot);
    } else {
      if (!!({}.NODE_ENV !== "production") && this.shadowRoot) {
        warn(
          `Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use \`defineSSRCustomElement\`.`
        );
      }
      this.attachShadow({ mode: "open" });
      if (!this._def.__asyncLoader) {
        this._resolveProps(this._def);
      }
    }
  }
  connectedCallback() {
    this._connected = true;
    if (!this._instance) {
      if (this._resolved) {
        this._update();
      } else {
        this._resolveDef();
      }
    }
  }
  disconnectedCallback() {
    this._connected = false;
    if (this._ob) {
      this._ob.disconnect();
      this._ob = null;
    }
    nextTick(() => {
      if (!this._connected) {
        render(null, this.shadowRoot);
        this._instance = null;
      }
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = true;
    for (let i = 0; i < this.attributes.length; i++) {
      this._setAttr(this.attributes[i].name);
    }
    this._ob = new MutationObserver((mutations) => {
      for (const m of mutations) {
        this._setAttr(m.attributeName);
      }
    });
    this._ob.observe(this, { attributes: true });
    const resolve = (def, isAsync = false) => {
      const { props, styles } = def;
      let numberProps;
      if (props && !isArray(props)) {
        for (const key in props) {
          const opt = props[key];
          if (opt === Number || opt && opt.type === Number) {
            if (key in this._props) {
              this._props[key] = toNumber(this._props[key]);
            }
            (numberProps || (numberProps = /* @__PURE__ */ Object.create(null)))[camelize(key)] = true;
          }
        }
      }
      this._numberProps = numberProps;
      if (isAsync) {
        this._resolveProps(def);
      }
      this._applyStyles(styles);
      this._update();
    };
    const asyncDef = this._def.__asyncLoader;
    if (asyncDef) {
      asyncDef().then((def) => resolve(def, true));
    } else {
      resolve(this._def);
    }
  }
  _resolveProps(def) {
    const { props } = def;
    const declaredPropKeys = isArray(props) ? props : Object.keys(props || {});
    for (const key of Object.keys(this)) {
      if (key[0] !== "_" && declaredPropKeys.includes(key)) {
        this._setProp(key, this[key], true, false);
      }
    }
    for (const key of declaredPropKeys.map(camelize)) {
      Object.defineProperty(this, key, {
        get() {
          return this._getProp(key);
        },
        set(val) {
          this._setProp(key, val);
        }
      });
    }
  }
  _setAttr(key) {
    let value = this.getAttribute(key);
    const camelKey = camelize(key);
    if (this._numberProps && this._numberProps[camelKey]) {
      value = toNumber(value);
    }
    this._setProp(camelKey, value, false);
  }
  /**
   * @internal
   */
  _getProp(key) {
    return this._props[key];
  }
  /**
   * @internal
   */
  _setProp(key, val, shouldReflect = true, shouldUpdate = true) {
    if (val !== this._props[key]) {
      this._props[key] = val;
      if (shouldUpdate && this._instance) {
        this._update();
      }
      if (shouldReflect) {
        if (val === true) {
          this.setAttribute(hyphenate(key), "");
        } else if (typeof val === "string" || typeof val === "number") {
          this.setAttribute(hyphenate(key), val + "");
        } else if (!val) {
          this.removeAttribute(hyphenate(key));
        }
      }
    }
  }
  _update() {
    render(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const vnode = createVNode(this._def, extend({}, this._props));
    if (!this._instance) {
      vnode.ce = (instance) => {
        this._instance = instance;
        instance.isCE = true;
        if (!!({}.NODE_ENV !== "production")) {
          instance.ceReload = (newStyles) => {
            if (this._styles) {
              this._styles.forEach((s) => this.shadowRoot.removeChild(s));
              this._styles.length = 0;
            }
            this._applyStyles(newStyles);
            this._instance = null;
            this._update();
          };
        }
        const dispatch = (event, args) => {
          this.dispatchEvent(
            new CustomEvent(event, {
              detail: args
            })
          );
        };
        instance.emit = (event, ...args) => {
          dispatch(event, args);
          if (hyphenate(event) !== event) {
            dispatch(hyphenate(event), args);
          }
        };
        let parent = this;
        while (parent = parent && (parent.parentNode || parent.host)) {
          if (parent instanceof VueElement) {
            instance.parent = parent._instance;
            instance.provides = parent._instance.provides;
            break;
          }
        }
      };
    }
    return vnode;
  }
  _applyStyles(styles) {
    if (styles) {
      styles.forEach((css) => {
        const s = document.createElement("style");
        s.textContent = css;
        this.shadowRoot.appendChild(s);
        if (!!({}.NODE_ENV !== "production")) {
          (this._styles || (this._styles = [])).push(s);
        }
      });
    }
  }
}

const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  return (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn(event, ...args);
  };
};

const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const render = (...args) => {
  ensureRenderer().render(...args);
};

function initDev() {
  {
    initCustomFormatter();
  }
}

if (!!({}.NODE_ENV !== "production")) {
  initDev();
}

const _imports_0 = "data:image/jpeg;base64,/9j/4QAWRXhpZgAATU0AKgAAAAgAAAAAAAD/4QshaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIvPjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSJ1dWlkOmZhZjViZGQ1LWJhM2QtMTFkYS1hZDMxLWQzM2Q3NTE4MmYxYiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj48eG1wOkNyZWF0ZURhdGU+MjAyMy0xMC0yNlQyMzoxNDo0Mi41OTk8L3htcDpDcmVhdGVEYXRlPjwvcmRmOkRlc2NyaXB0aW9uPjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSJ1dWlkOmZhZjViZGQ1LWJhM2QtMTFkYS1hZDMxLWQzM2Q3NTE4MmYxYiIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj48ZGM6Y3JlYXRvcj48cmRmOlNlcSB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxyZGY6bGk+SGVucnkgV2lsbGlhbXM8L3JkZjpsaT48L3JkZjpTZXE+DQoJCQk8L2RjOmNyZWF0b3I+PC9yZGY6RGVzY3JpcHRpb24+PC9yZGY6UkRGPjwveDp4bXBtZXRhPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAHBQUGBQQHBgUGCAcHCAoRCwoJCQoVDxAMERgVGhkYFRgXGx4nIRsdJR0XGCIuIiUoKSssKxogLzMvKjInKisq/9sAQwEHCAgKCQoUCwsUKhwYHCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq/8AAEQgC5gPSAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+kaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOJ+KvxF/4Vl4VttZ/sv8AtPz71bTyftHk7dyO+7dtb+5jGO9eR/8ADXP/AFJP/lW/+010v7Vf/JLNN/7DUX/oievkmgD6R/4a5/6kn/yrf/aaP+Guf+pJ/wDKt/8Aaa8OtvAPjG8tYrqz8J65PbzIJIpYtNmZJFIyGUhcEEHIIqT/AIVx43/6E3xB/wCCuf8A+JoA9t/4a5/6kn/yrf8A2mj/AIa5/wCpJ/8AKt/9prxL/hXHjf8A6E3xB/4K5/8A4mj/AIVx43/6E3xB/wCCuf8A+JoA9t/4a5/6kn/yrf8A2mj/AIa5/wCpJ/8AKt/9prxBPh541ljWSPwfrzowDKy6ZMQQe4O2nf8ACuPG/wD0JviD/wAFc/8A8TQB7b/w1z/1JP8A5Vv/ALTR/wANc/8AUk/+Vb/7TXiD/DzxrFG0kng/XkRQWZm0yYAAdydtO/4Vx43/AOhN8Qf+Cuf/AOJoA9t/4a5/6kn/AMq3/wBpo/4a5/6kn/yrf/aa8S/4Vx43/wChN8Qf+Cuf/wCJo/4Vx43/AOhN8Qf+Cuf/AOJoA9t/4a5/6kn/AMq3/wBpo/4a5/6kn/yrf/aa8S/4Vx43/wChN8Qf+Cuf/wCJo/4Vx43/AOhN8Qf+Cuf/AOJoA9t/4a5/6kn/AMq3/wBpo/4a5/6kn/yrf/aa8S/4Vx43/wChN8Qf+Cuf/wCJo/4Vx43/AOhN8Qf+Cuf/AOJoA9t/4a5/6kn/AMq3/wBpo/4a5/6kn/yrf/aa8S/4Vx43/wChN8Qf+Cuf/wCJo/4Vx43/AOhN8Qf+Cuf/AOJoA9t/4a5/6kn/AMq3/wBpq9on7Uk+va/p+kWfgyNLjULqO1iaXVyEVnYKCxEBOMnnANeCf8K48b/9Cb4g/wDBXP8A/E1c+H2kalb/ABl8NafcafdRXsGsWzy2zwMskarIrsWUjIAUFjnoAT0oA+z/ALd43/6F7w//AOD6f/5Do+3eN/8AoXvD/wD4Pp//AJDrpKxvE2l3HiHw/dabpmqvptyZYs3MRfKbXSQofLdHAZRtO11OH60AVPt3jf8A6F7w/wD+D6f/AOQ6rah4g8VaRYSX2q6V4XsbSLHmXFz4jljjTJAGWa0AGSQPqaw/+Fa+IP8Aobf/ACLq3/yyqF/hhq+oW0fm+KYrmEskyb5NVZcqwdGGdS6hgrA9iARQBN/wtX/qIfD/AP8ACy/+5qP+Fq/9RD4f/wDhZf8A3NTX+HOvRKGk8XhQWCgmbVupOAP+Ql3JAp3/AArXxB/0Nv8A5F1b/wCWVAB/wtX/AKiHw/8A/Cy/+5qP+Fq/9RD4f/8AhZf/AHNW1pvgDT7fT7azv9Z1++voLeMXFx/b9/GZmxgybBPhdxVjgcDp2q3/AMIHpH/P54g/8KPUP/j9AHiP/DXP/Uk/+Vb/AO00f8Nc/wDUk/8AlW/+014PfeDfE+mafLf6l4c1a0s4TtkubixljjQ7tuCxXA+bj68UzSvCfiPXrVrrQ9A1TUrdHMbS2dlJMisACVJUEZwQce4oA97/AOGuf+pJ/wDKt/8Aaapa3+1XPqmgahYWfhaSwuLq1khiu4tWO+3ZlKiRcRA5UnIwR06ivH/+FceN/wDoTfEH/grn/wDiaoxeE/Ec+szaRBoGqSanboJJrJLKQzRrx8zIBuA+ZeSP4h60AfdP/CB6R/z+eIP/AAo9Q/8Aj9H/AAgekf8AP54g/wDCj1D/AOP14JquiXeg2q3OufG/xppsDuI1lvNC1SFWYgnaCzgZwCcexqLS9Nk1sgaL8dvGGok78fZNE1OXOzbu+656eYmfTevqKAPoD/hA9I/5/PEH/hR6h/8AH6P+ED0j/n88Qf8AhR6h/wDH68R/4QnxB/0Vz4gf+E1q3/xVIngzXpY1kj+L/j50YBlZfDerEEHuDuoA9g1jw54b0KxF3qV74mWEtszDreqTHOCfuxysccHnGKzNEXwV4h1Y6bpmqeKDd+S0/lXGr6tASisqscSSL0MifXPHevMm8Ga8jKG+L/j5S52qD4b1b5jgnA+b0BP4Uv8AwhPiD/ornxA/8JrVv/iqAPRfiRZWvgHwNc+KdMuNcluNLurSbypfEF66TL9piDxsHlZSGUspyp69K86/4a5/6kn/AMq3/wBprC8YeCPEk3he+gtfHfjbxRPiNv7HufD+pIk4Mg5YyEqMYLDI5Kcc15f/AMK48b/9Cb4g/wDBXP8A/E0Ae2/8Nc/9ST/5Vv8A7TR/w1z/ANST/wCVb/7TXiCfDzxrIuY/B+vMASuV0yY8g4I+72IxWVqui6roN0trrmmXmm3DoJFivLdoXZSSAwDAHGQRn2NAH0J/w1z/ANST/wCVb/7TR/w1z/1JP/lW/wDtNeHW3gHxjeWsV1Z+E9cnt5kEkUsWmzMkikZDKQuCCDkEVJ/wrjxv/wBCb4g/8Fc//wATQB7b/wANc/8AUk/+Vb/7TXU/DTxhH8a9f1y/v7fVNJt9OtbSGG0s9cuY03M1wzyHyjGCSNg5B+4Oa+af+FceN/8AoTfEH/grn/8Aia7f4deAfFlv/aP23VfGHgjd5W37FoV/L9r+/nd5OMbe2f75x3oA+pP+ED0j/n88Qf8AhR6h/wDH6P8AhA9I/wCfzxB/4Ueof/H68mT4T+LJY1kj+M3ip0YBlZbG8IIPcHzqd/wqPxf/ANFk8Wf+AF7/APHqAPV/+ED0j/n88Qf+FHqH/wAfo/4QPSP+fzxB/wCFHqH/AMfryZ/hP4sijaST4zeKkRQWZmsbwAAdyfOp3/Co/F//AEWTxZ/4AXv/AMeoA9X/AOED0j/n88Qf+FHqH/x+j/hA9I/5/PEH/hR6h/8AH68o/wCFR+L/APosniz/AMAL3/49R/wqPxf/ANFk8Wf+AF7/APHqAPQNb0vwp4dKDVL/AMUr5ill8jVtWnyB/wBc5GwfbrWRBqfw/uLyC2XVvFcclxNHBGJ9S1iHLyOEQfO46sQM9B3Irlv+FR+L/wDosniz/wAAL3/49R/wqPxf/wBFk8Wf+AF7/wDHqAPV/wDhA9I/5/PEH/hR6h/8friPifqUHwk03RfFGm/2xf7NT8iezudeu5I50e3n4Ild14YK2dpOV7Vz/wDwqPxf/wBFk8Wf+AF7/wDHq474m/CvxlbeGbd4/FfifxsTeKP7Pk066Ii+R/3vzO44+70/j60AbX/DXP8A1JP/AJVv/tNH/DXP/Uk/+Vb/AO014l/wrjxv/wBCb4g/8Fc//wATR/wrjxv/ANCb4g/8Fc//AMTQB7b/AMNc/wDUk/8AlW/+00f8Nc/9ST/5Vv8A7TXiX/CuPG//AEJviD/wVz//ABNULfwt4gu9Yn0m10LUp9St13zWcdnI00S8csgG4D5l6juPWgD3z/hrn/qSf/Kt/wDaaP8Ahrn/AKkn/wAq3/2mvEv+FceN/wDoTfEH/grn/wDiaP8AhXHjf/oTfEH/AIK5/wD4mgD6W+GnjCP416/rl/f2+qaTb6da2kMNpZ65cxpuZrhnkPlGMEkbByD9wc16L/wgekf8/niD/wAKPUP/AI/Xy38OvAPiy3/tH7bqvjDwRu8rb9i0K/l+1/fzu8nGNvbP9847123/AAhPiD/ornxA/wDCa1b/AOKoA9Dvb3wJp88kV1qPjEPGSH2XmtuBjryrEfjWtoGkeFPE9rcXGjan4imjtp/s8u7X9SQo+xXxhphn5XU5HHP1ryb/AIQnxB/0Vz4gf+E1q3/xVH/CE+IP+iufED/wmtW/+KoA9u/4QPSP+fzxB/4Ueof/AB+j/hA9I/5/PEH/AIUeof8Ax+vEf+EJ8Qf9Fc+IH/hNat/8VR/whPiD/ornxA/8JrVv/iqAPbv+ED0j/n88Qf8AhR6h/wDH6P8AhA9I/wCfzxB/4Ueof/H68R/4QnxB/wBFc+IH/hNat/8AFUf8IT4g/wCiufED/wAJrVv/AIqgD27/AIQPSP8An88Qf+FHqH/x+j/hA9I/5/PEH/hR6h/8frxH/hCfEH/RXPiB/wCE1q3/AMVR/wAIT4g/6K58QP8AwmtW/wDiqAPbv+ED0j/n88Qf+FHqH/x+uX1K58CaTq9zpl5qvio3dq6pNHb6pq8+1iiuB+7kb+F1OenOM54rzn/hCfEH/RXPiB/4TWrf/FUf8IT4g/6K58QP/Ca1b/4qgD1jQ9J8K+IlkbSr7xS4iAL+fq+rQYznH+skXPQ8DpWt/wAIHpH/AD+eIP8Awo9Q/wDj9eI/8IT4g/6K58QP/Ca1b/4qj/hCfEH/AEVz4gf+E1q3/wAVQASftGSeBNS1TwvL4euNX/svU7yBLy51dzI6C4k2Al0djtUquSxOFo/4a5/6kn/yrf8A2mvINb+HXjV9f1BovD/iTVUa6kK38uk3KvdjccSsGUsC33iDzzzVH/hXHjf/AKE3xB/4K5//AImgD23/AIa5/wCpJ/8AKt/9po/4a5/6kn/yrf8A2mvDrnwD4xs7WW6vPCeuQW8KGSWWXTZlSNQMlmJXAAAySao6R4c1zxB539g6NqGp+Rt837FavN5e7ON20HGcHGfQ0AfW3ww1KD4t6brXijUv7YsN+p+RBZ22vXcccCJbwcAROi8sWbO0HLd67f8A4QPSP+fzxB/4Ueof/H6+aPh/4D8UwaBOt54n8aeDHN0xFhZ6BqEqSDav70mLC5P3cHn5B7V1CeDNekXMfxf8fMASuV8N6seQcEfe7EYoA9v/AOED0j/n88Qf+FHqH/x+oLzwfoVhZS3VzeeIxFCu5/L1/UpGx7KsxJ/AV4u/gzXo1zJ8X/HygkLlvDerDknAH3u5OKX/AIQnxB/0Vz4gf+E1q3/xVAHpmiL4K8Q6udM0vVPFDXYhefy59W1aAlFKKxHmSLkZkT6546HHH+O/ievwV8fSabbafqGt2moaZbzrHe63PJ5DiW4Vipl8w/MNmQCB8g61hHwZrwkEZ+L/AI+DsCwX/hG9WyQMZON3uPzFeefED4f+L59fgazfxZ4zQWqg395ot7E8Z3N+6AlBbA+9kcfOfegD0T/hrn/qSf8Ayrf/AGmj/hrn/qSf/Kt/9pr57n0XVbXWRpF1pl5DqbOkYspLdlmLPjauwjdk7hgY5yPWtf8A4Vx43/6E3xB/4K5//iaAPbf+Guf+pJ/8q3/2mj/hrn/qSf8Ayrf/AGmvEH+HnjWNcyeD9eUEhctpkw5JwB93uTinf8K48b/9Cb4g/wDBXP8A/E0Ae2/8Nc/9ST/5Vv8A7TR/w1z/ANST/wCVb/7TXiX/AArjxv8A9Cb4g/8ABXP/APE01vh541RlDeD9eUudqg6ZN8xwTgfL6An8KAPb/wDhrn/qSf8Ayrf/AGmj/hrn/qSf/Kt/9prxL/hXHjf/AKE3xB/4K5//AImj/hXHjf8A6E3xB/4K5/8A4mgD23/hrn/qSf8Ayrf/AGmj/hrn/qSf/Kt/9prxL/hXHjf/AKE3xB/4K5//AImj/hXHjf8A6E3xB/4K5/8A4mgD23/hrn/qSf8Ayrf/AGmj/hrn/qSf/Kt/9prxL/hXHjf/AKE3xB/4K5//AImj/hXHjf8A6E3xB/4K5/8A4mgD23/hrn/qSf8Ayrf/AGmj/hrn/qSf/Kt/9prxL/hXHjf/AKE3xB/4K5//AImj/hXHjf8A6E3xB/4K5/8A4mgD23/hrn/qSf8Ayrf/AGmj/hrn/qSf/Kt/9prxL/hXHjf/AKE3xB/4K5//AImmv8PPGsUbSSeD9eRFBZmbTJgAB3J20Ae3/wDDXP8A1JP/AJVv/tNH/DXP/Uk/+Vb/AO014l/wrjxv/wBCb4g/8Fc//wATR/wrjxv/ANCb4g/8Fc//AMTQB7b/AMNc/wDUk/8AlW/+00f8Nc/9ST/5Vv8A7TXiDfDzxqjKG8H68pc7VB0yb5jgnA+X0BP4U7/hXHjf/oTfEH/grn/+JoA9t/4a5/6kn/yrf/aa9J+Efxc/4Wp/a/8AxJP7K/s3yf8Al78/zPM8z/YXGPL9859q+Ja+kf2Rv+Zu/wC3L/2vQB9JUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHiX7Vf/JLNN/7DUX/oievkmvrb9qv/AJJZpv8A2Gov/RE9fJNAH3/8OP8AklnhT/sC2f8A6ISukrm/hx/ySzwp/wBgWz/9EJXSUAFFFFAFHRP+QBp//XrH/wCgir1Zdkmq2en29t9ls38mJY932phuwMZx5ftU3m6r/wA+Vn/4Ft/8boANb/5AGof9esn/AKCahitEvL/UDPLc/u51RAlzIgUeUhxhWA6kn8ah1eXUjod8JLS1VPs8m4rdMSBtPQeWM/nVyw/4/dT/AOvpf/RMdAB/ZFt/z0vP/A2b/wCKo/si2/56Xn/gbN/8VV6igCj/AGRbf89Lz/wNm/8AiqhltEs7/TzBLc/vJ2Rw9zI4YeU5xhmI6gH8K1Ko3/8Ax+6Z/wBfTf8AomSgCKS3W71yeOaS4CR28TKsdw8YBLSZOFIz0H5VL/ZFt/z0vP8AwNm/+Koi/wCQ/d/9esH/AKFLV6gCj/ZFt/z0vP8AwNm/+Ko/si2/56Xn/gbN/wDFVeooAyb6xjtIYpoJroOLiFfmu5WBBlUEEFiDwTXztpH/ACe9J/19XH/pE9fSOr/8eUf/AF9W/wD6OSvmrT4Irn9tmWK4iSWNrqfKOoYH/Q3PQ0AfUdUbD/j91P8A6+l/9Ex0f2JpX/QMs/8AwHX/AAqnZaRpr3eohtPtWCXAVQYF+UeVGcDj1JP40AbVUdE/5AGn/wDXrH/6CKP7E0r/AKBln/4Dr/hVPSNI02XQ7GSTT7V3a3jZmaBSSSo5JxQBc1f/AI8o/wDr6t//AEclcP4i8EQ678Sr/V59EstRNrpVmsMeo2iSQXJ82682MMykK4AiO4cjK54NdZqmkabHaIY9PtVJuIFysCjgyoCOncHFVbaKxm8aalpDaVp4t7XT7S6RhbLvLSyXCsCemMQrjjuevGABbPQNFmhn0h9BsodLezt2OlyWsfkoTJK+DGAUyG54zzz70n/CuPBH/Qm+H/8AwVwf/E1n+INLtbHULnVLWKzhXT7SOR7adFEE6s0m5Tx8rnaNrDnPHIJFO8NWtn4kmfWZdPhtLeMtBFprQKskRB+Zpxj7/ovRQc8k8AHmPxP8J2dj8FfFGp2+lWejxC5RYLOygSEttvQoeYoPmYBmVV5CgnueNL9lZgnwp1NnIVV1mUkk4AHkQ1f+NOnWUXwD8Rzx2dukq3CqsixKGAF8owDj04+lcd+zysWqeA4/Ds7HybzWrq7uYsH99DBDbZQkfwl5Ysg/eXKkEE0Ae3yeL45ow+h6PqmuRlsCSyjjSMjGdyyTPGrr7qT1rnLPxJqg+JWsyjwZrjSNpNgpgE1jvQCa8IY/6TtwdxAwSflOQOM+gRzQtK8ETqXhADov8GRx+lY9vpF9F45vNWZrH7FPZpAAtuBOWViRl+u0ZfuQdwwF2kuAY3iK707xR4eOjeJE1rwsbueLy52KRyRSpMrR7Z0MkasXVcfNk5456RaPoEXhjxp4c0qG9vb8RaRqrtdahN5s8rPdWbku+Bk5bHToBXY3Is7zzNNuxFMJoSZLeQBg8Z4OQeo5xXA6UkF18RrHR77F9/Y9nqlqDcpvO3fp8seS3UiOVBu749SaAPR6o6J/yANP/wCvWP8A9BFH9iaV/wBAyz/8B1/wqnpGkabLodjJJp9q7tbxszNApJJUck4oAuX/APx+6Z/19N/6Jkq9WLe6RpqXenBdPtVD3BVgIF+YeVIcHj1AP4Vak0jR4Ymkl0+xSNAWZmhQBQOpJxQA6L/kP3f/AF6wf+hS1erzm1u73xLezXXgzw3pf9kOipDqWqrsjmILEvDCqlnU7gNxKA7eMirUmgeMoVLx2/gu8OOIjps1vz6b98n/AKDQB12kf8eUn/X1cf8Ao56+V/2q/wDkqem/9gWL/wBHz17dZT6uuof2NN4U0VdSkWa5jF1MyK8QkAZ0ZYZFYKZY12synkcAV8z/ABhjuG1HwtfXt5Jd3GpeGrS9lZoIYgjSGQlVWJEG0HOMgtzyTxQB9efDj/klnhT/ALAtn/6ISukrm/hx/wAks8Kf9gWz/wDRCV0lABRRRQBR0T/kAaf/ANesf/oIq9WXZJqtnp9vbfZbN/JiWPd9qYbsDGceX7VN5uq/8+Vn/wCBbf8AxugA1v8A5AGof9esn/oJqvY2Md3DLNPNdFzcTL8t3KoAErAAAMAOAKj1eXUjod8JLS1VPs8m4rdMSBtPQeWM/nVzSP8Ajyk/6+rj/wBHPQAf2Rbf89Lz/wADZv8A4qj+yLb/AJ6Xn/gbN/8AFVeooAo/2Rbf89Lz/wADZv8A4qoZbRLO/wBPMEtz+8nZHD3Mjhh5TnGGYjqAfwrUqjf/APH7pn/X03/omSgCGK0S8v8AUDPLc/u51RAlzIgUeUhxhWA6kn8am/si2/56Xn/gbN/8VRYf8fup/wDX0v8A6Jjq9QBR/si2/wCel5/4Gzf/ABVH9kW3/PS8/wDA2b/4qr1FAGTfWMdpDFNBNdBxcQr813KwIMqgggsQeCa8a8Af8neeNv8AsHyf+h21e26v/wAeUf8A19W//o5K8S8Af8neeNv+wfJ/6HbUAe90UUUAFFFFABUF5dCztjM0byfMqBExlizBQOSB1I71PVDWi405TGqs/wBog2hjgE+cnU4OPyoAX7fc/wDQJvP++4f/AI5R9vuf+gTef99w/wDxyjzdV/58rP8A8C2/+N0ebqv/AD5Wf/gW3/xugA+33P8A0Cbz/vuH/wCOUybVZYEDy6XeKpZUB3QnliFA/wBZ6kU/zdV/58rP/wAC2/8AjdU9Ul1I2ieZaWqj7RByt0x581Mf8sx3/wAnpQBc+33P/QJvP++4f/jlH2+5/wCgTef99w//AByjzdV/58rP/wAC2/8AjdHm6r/z5Wf/AIFt/wDG6AD7fc/9Am8/77h/+OUybVZYEDy6XeKpZUB3QnliFA/1nqRT/N1X/nys/wDwLb/43VPVJdSNonmWlqo+0QcrdMefNTH/ACzHf/J6UAXPt9z/ANAm8/77h/8AjlH2+5/6BN5/33D/APHKPN1X/nys/wDwLb/43R5uq/8APlZ/+Bbf/G6AD7fc/wDQJvP++4f/AI5R9vuf+gTef99w/wDxyjzdV/58rP8A8C2/+N1FcXupW0QkksrUgyJH8t23VmCj/ln6mgDA+Imov/wrXxLDPYXMHnaReojuYyMi2kbHyuT0U9q8f/ZG/wCZu/7cv/a9er/E571vh7rIu7e3iT+zr7BjnZzn7HP2KD+dfOXwc0K11HwN8RdUnlvI7nSdKE1qbe7lgCyeXOwZgjDcQUGA2RyeOaAPsiqOkf8AHlJ/19XH/o564Waz8Qv4ll0Oyh8PzSw20NzLOdJESQxyNIi/MZXMjkwucBFUdzzirUfw91ooDN4qhR/MLlbfRLYLySdv7wOcc469hjFAHYav/wAeUf8A19W//o5KvV5tq1lrfhSxF1qlnpevaTA6SXV1a2At7u3iVgzuYxlZRgHIXacZ4Ndta6dol7Zw3VpY2MsE8ayRSLAhDqwyCOOhBoAll/5D9p/16z/+hRVerFl0jTRrltGNPtQjW8zFfIXBIaPBxj3P5mrn9iaV/wBAyz/8B1/woA+V/Hn/ACeTa/8AYa0r/wBAt6+tq+RvG0EVt+2JZxW8SRRrrWl4RFCgfLAegr65oAo6v/x5R/8AX1b/APo5KvVV1GCW5s9luEMiyxyAOxUHa6tjIBx09Kj83Vf+fKz/APAtv/jdAF6sXxM7xWMUkbMjqZWVlOCCLeXkGrnm6r/z5Wf/AIFt/wDG6yfET3rWKi7t7eJMTYMc7Oc/Z5exQfzoA1v7Itv+el5/4Gzf/FUf2Rbf89Lz/wADZv8A4qr1FAFH+yLb/npef+Bs3/xVH9kW3/PS8/8AA2b/AOKq9RQBnWUQttYuoI5JmjEELhZZnkwS0gJG4nHQflUGl6fFc6PZzzTXjSSQI7t9tmGSVBJ+9VqL/kP3f/XrB/6FLRon/IA0/wD69Y//AEEUAH9kW3/PS8/8DZv/AIqj+yLb/npef+Bs3/xVXqKAKP8AZFt/z0vP/A2b/wCKrN1e3W0juY4ZLgpJpt0zLJcPICRswcMTjqfzroKxPEH/AC1/7Bl3/wC06ANuiqPm6r/z5Wf/AIFt/wDG6PN1X/nys/8AwLb/AON0AF//AMfumf8AX03/AKJkq9WcYtQuby0e4gtoo4JTISk7OT8jLjBQf3vWtGgD83K+kf2Rv+Zu/wC3L/2vXzdX0j+yN/zN3/bl/wC16APpKiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8S/ar/wCSWab/ANhqL/0RPXyTX1t+1X/ySzTf+w1F/wCiJ6+SaAPv/wCHH/JLPCn/AGBbP/0QldJXN/Dj/klnhT/sC2f/AKISukoAKKKKACiiigCjrf8AyANQ/wCvWT/0E1UnmvbDUJ0tYLe4a8lEkamZlZQERSSNpGAVznPfHWret/8AIA1D/r1k/wDQTVHSrfUZLNL4XdqZbuNZXZ7VmIBGQufMHAzgcfzoAnsH1W7062uTd2i+dEsmDascZGcZ8wetT+Vqv/P5Z/8AgI3/AMcqeytvsen29tu3+TEse7GN2BjOPwqegCj5Wq/8/ln/AOAjf/HKimstSmlgka9tQYJDIuLRuTtZef3noxrTooAzFstSW8kuRe2u+SNYyPsjYwpYj/lp/tH9Kl8rVf8An8s//ARv/jlXqKAKPlar/wA/ln/4CN/8cqC+fVbPT7i5+1WbeTE0m37KwzgE4z5latQXtt9s0+4tt2zzomj3YztyMZx+NAGT9o1C9nGnXUFtFLFLFKz+cw8xFdW3Ku3kcYxng9a+edPmWD9tmWRw5VbqfIRGc/8AHm/YAk19Daza6h/Zsty93a+Zao00bx2rKylRng+YevToR7V8+aR/ye8+ef8ASbj/ANInoA+kv7Xtv+ed5/4BTf8AxNU7LVLdbvUSY7rDXAIxZyn/AJZRjn5eOnQ/1raqjYf8fup/9fS/+iY6AD+17b/nnef+AU3/AMTVPSNUt49DsUaO6JW3jB22crD7o6ELg/WtqqOif8gDT/8Ar1j/APQRQBT1TVLd7RAsd0D9ogPzWco6Soe6/p3rDTX7Cw+Imv3t61xBbpounb3e1lG3E171+XI6jHr2rqNX/wCPKP8A6+rf/wBHJXnPjbU79PilaWGj2n2m+SyinWNtNhljk+aXyyXe7g3OpWYqh3YyzAZyaAOrZ9O1TxHHf3UV+yQW8MkVu9nKFD7pCHZNmdy54zwCT3HF7OnLrP8AacUd/FcNH5UuyzmCzD+HeNnJXseoyR04rmIp/iBtub8NY/bPs8OdO/sZfOI8yRRz/aHl9Mt/rOmO4wbn/CQ+M/7B8r/hFdQ/tb/n6+z2Xkfez/qf7Q3fd4/1nXnp8tAHHfF7XLLUvgB4mjtDOXW7CuGtpF8tvtyHaxK4U4I4PqK5T9mL/l0/7i//ALi6q/FGbxDN8P8AXJNWxYSuy/abaPTUQ3Mf2vhndLyYKEkAAJUE7tqlhuItfsxf8un/AHF//cXQB7Je6tLo95rN3CiySPq2nWQD5wFmeCInjuPOY/WuurhBCx1XX9yfLceKbN4yehCWtpk/nGw+oru6AOP0DWZNY1TwzfXsQt7zUvD0l08KqQEbdbGReeRtaQDnn9awdNuEtvjlqryLIwJvR+7iaQ/8eujdlBP41reH4Max4WnDgiHSb+0wB1/e23P/AJC/X2rO0X/ku2rf9v3/AKTaNQB3f9r23/PO8/8AAKb/AOJqnpGqW8eh2KNHdErbxg7bOVh90dCFwfrW1VHRP+QBp/8A16x/+gigCne6pbtd6cRHdYW4JObOUf8ALKQcfLz16D+lYnxJvJL74aa/baZFeG4ksnUKLKb5lx8y9F6ruHUda6e//wCP3TP+vpv/AETJV6gClo95p+oaLZ3WiyRSafLCrWzQ/c2Y4x6ccY7VdriT4Lez8Q3z+EtauvD/AJkcc72sSJNavIxcFvJcYUnaPuFM981P/wAI941l3JceOYUjJ4NroqJIBnpueRx+O2gC3ff8lT0L/sC6l/6Psa+SfjJ/zIX/AGJmnf8AtSvp/SvA9x50mqR+JdSj1EvNA1z5VvI7oJCNhaSN3VPkU7UZR+mPmT45abqui6/4a0jXIbOO403w5a2itZ3LTJKsbSKHJaNCpJB+XBxxyewB9ZfDj/klnhT/ALAtn/6ISukrm/hx/wAks8Kf9gWz/wDRCV0lABRRRQAUUUUAUdb/AOQBqH/XrJ/6CapefqGnN9khtraeSaaV4v37BtrOW3MuzgDdzz9OtXdb/wCQBqH/AF6yf+gmqOlW+oyWaXwu7Uy3cayuz2rMQCMhc+YOBnA4/nQBPYPqt3p1tcm7tF86JZMG1Y4yM4z5g9an8rVf+fyz/wDARv8A45U9lbfY9Pt7bdv8mJY92MbsDGcfhU9AFHytV/5/LP8A8BG/+OVFNZalNLBI17agwSGRcWjcnay8/vPRjWnRQBmQ2WpQyzyLe2pM8gkbNo3B2qvH7z0UVL5Wq/8AP5Z/+Ajf/HKvUUAUfK1X/n8s/wDwEb/45UF8+q2mnXNyLuzbyYmkwLVhnAJ6+ZWrUF7bfbNPuLbds86Jo92M7cjGcfjQBlmbUL6UWNxBbRSRSxSO3nNl1V1bcq7ehxjrx3rx/wAAf8neeNv+wfJ/6HbV6/q9vqK6dLdNd2vmWqNNGyWrKwIGcA+YeuMdCK8g8Af8neeNs/8AQPk/9DtqAPe6KKKACiiigAqjq/8Ax5R/9fVv/wCjkq9VHV/+PKP/AK+rf/0clAF6iiigAqjq/wDx5R/9fVv/AOjkq9VHV/8Ajyj/AOvq3/8ARyUAXqKKKACqOr/8eUf/AF9W/wD6OSr1UdX/AOPKP/r6t/8A0clAF6iiigAqjq//AB5R/wDX1b/+jkq9VHV/+PKP/r6t/wD0clAHN/Fb/knOsf8AYPvf/SKevnv4G/8AJLPiz/2BR/6Iuq+hPit/yTnWP+wfe/8ApFPXz7+zzoOr+JNE8b6VperWmn217aQ2l2Lixa4LrIsygoRIm0gbuu4HPTigD6Ns5ol+LWtQtIglk0TT2RCw3MBPe5IHfGR+Yrp65WX4d6NPbxRzz6pMYW3xyXGpzzujYxuUyOxU49Me1UtM8F3psyIPG/ieFElkiCm4gm4SRlB3Swu2cAd6AOk8Ra9p/hvQ7jUtWkCwRrgIBlpWPRFX+JieABWF8Py+hfD3Q9M1KK9F1bWaJKrWcpKHGduQmOM449KR/Auk6fPbapcveatqUNzAIrzU7lp3izKgOwH5Y8jrtUZrsaAMWXVLc65bP5d1gW8wP+hy55aPttz26/T1FXP7Xtv+ed5/4BTf/E0S/wDIftP+vWf/ANCiq9QB8jeNpln/AGxLORA4Vta0vAdGQ/dg7EAivrmvknx5/wAnk2v/AGGtK/8AQLevragAooooAKyfEFu93DbW0ZUPNJJGpboCbeUc1rVieJ3mSLThbS+VLJfJEsmM7d6OpOPoaAG3Oq6mZDFBBax7Jo45JhI0qqWcLtxtXJ+YHrwPer/lar/z+Wf/AICN/wDHKgXS7sW8Nsbm1W3jkR9sdqwJ2uG6mQ9SOuD1rVoAo+Vqv/P5Z/8AgI3/AMco8rVf+fyz/wDARv8A45V6igDMWy1JbyS5F7a75I1jI+yNjCliP+Wn+0f0otbLUrSzhto721KQxrGpa0bJAGOf3ladFAFHytV/5/LP/wABG/8AjlHlar/z+Wf/AICN/wDHKvUUAZF7Nq9o9t5clpcmWUp5QhaPcAjNjcXbH3fSqd5Jcahpt3fSxwRRx2FxEVSVmYMwUkEFVxjZ+tbN9ay3Jt3t5kikgl8wF4y4PyMuMAj+961h63BeWsM08lxAwuYZopVigKb8QuwJy55G3H40AdNRRRQAUUUUAfm5X0j+yN/zN3/bl/7Xr5ur6R/ZG/5m7/ty/wDa9AH0lRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAeSfGXwxrnxN/4o3QU0+3/ALO+y6rLeXt06bvM+0xCNUWNv7hJYkdhjvXztH8GfE0vxEn8HpLp5u7eaOCW785vIV5LZ7hBnbvOUifkLgFcHqCfsCx/5Knrv/YF03/0ffV5tY/8nMa7/wBhrTf/AEzX1AHpPw4/5JZ4U/7Atn/6ISukrm/hx/ySzwp/2BbP/wBEJXSUAFFFFABRRRQBR1v/AJAGof8AXrJ/6CaNE/5AGn/9esf/AKCKNb/5AGof9esn/oJo0T/kAaf/ANesf/oIoAvUUUUAFFFFABRRRQAUUUUAUdb/AOQBqH/XrJ/6Ca+atPMq/tsym3RHk+1T4V3Kg/6G/cA/yr6V1v8A5AGof9esn/oJr5u0j/k96T/r6uP/AEiegD6R83Vf+fKz/wDAtv8A43VDzdUS11aWxis/tqXSt5U0zeUwEUeRvC5GR328Hsa3a43xc8Y0LVYpbK3vvtOp21ssF0T5RaQQIC4HLKC2SvfGKNXohofpHxJ0nVZUgW01NbgzfZ28mwluIVfOD+/iVoiue+7jvjmuhWK6sreC2sIIZoYYlQNNOUbgY6BCOgHP6Vy2h6v4o1C+n0eCz0uzj0e6W3vL5FYRyjaj7YIc5XKPglmwp6bu3b03tckxdUl1I2ieZaWqj7RByt0x581Mf8sx3/yelZ154au9R1rUr2+tbOWK+s7W2ES3Tq0LQSTusiuEyGzMMEYKlM5543dX/wCPKP8A6+rf/wBHJWTY/wDJU9d/7Aum/wDo++pDI4dSutP8RRaddeRJeXFnEsbz3DDzihkz8wiC7zydoA4BIGAcaLatdrqiad9nszdPGZfLW6clUBxubEXAzwM9ecdDWV4mAvdQuNIis/td3eW0JhzuVbcq8h85nHK7CQRg7icY9Q/wvb3Gh3s+laxvur+4JnGq7OL4Dj5uyOoIGzpjlf4goB578WdPl0/4CeKW+zxM1xdq9zdNcFpZG+2oORsAwOgAwAOw6VzH7MX/AC6f9xf/ANxdd58bP+TfPEv/AF9D/wBL1rg/2Yv+XT/uL/8AuLoA9daVV1i3Rzg3niV1RfUpaO3P/fot+Arta4q2iW51jSnkBZ49evphjsViniB+m1sfU12tAHEeG5vPuNKk27Gjv9XtTznIS6kUn8TGDWRprXC/HLVTaRRyvm9yJJCgx9l0buFP8q2LHyrXVdMhwsRbX79VAAAZnjnl49yMsfcGszRf+S7at/2/f+k2jUAd35uq/wDPlZ/+Bbf/ABuqekS6kNDsRHaWrJ9nj2lrpgSNo6jyzj862qo6J/yANP8A+vWP/wBBFAFO9l1I3enbrS1BFwdoF0xyfKk6/u+OM+v9auebqv8Az5Wf/gW3/wAbov8A/j90z/r6b/0TJV6gDmNR19dB1Ge61u40nTYnihjEl5qPkxlsykAMyDLHDceg79qn/CzPDn/Qy+E//B/H/wDE0eI/+SheF/8AsIJ/6RajXZUAcHp3xI8ORWrr/wAJL4WGZ5m+fXY1PMjHpt6c8HuMGvnL9o3XbLxB8RbC606+0+9iTSo4zJp94tzGGEspwWAGG5HHoR619k18k/tV/wDJU9N/7AsX/o+egD6S+HH/ACSzwp/2BbP/ANEJXSVzfw4/5JZ4U/7Atn/6ISukoAKKKKACiiigCjrf/IA1D/r1k/8AQTRon/IA0/8A69Y//QRRrf8AyANQ/wCvWT/0E0aJ/wAgDT/+vWP/ANBFAF6iiigAooooAKKKKACiiigCjrf/ACANQ/69ZP8A0E14l4A/5O88bf8AYPk/9Dtq9t1v/kAah/16yf8AoJrxLwB/yd542/7B8n/odtQB73RRRQAUUUUAFUdX/wCPKP8A6+rf/wBHJV6qGtOkWnLJIyoi3EDMzHAAEyck0AX6Ko/23pX/AEE7P/wIX/Gj+29K/wCgnZ/+BC/40AXqo6v/AMeUf/X1b/8Ao5KP7b0r/oJ2f/gQv+NU9U1fTZLRBHqFqxFxA2FnU8CVCT17AZoA2qKo/wBt6V/0E7P/AMCF/wAaP7b0r/oJ2f8A4EL/AI0AXqo6v/x5R/8AX1b/APo5KP7b0r/oJ2f/AIEL/jVPVNX02S0QR6hasRcQNhZ1PAlQk9ewGaANqiqP9t6V/wBBOz/8CF/xo/tvSv8AoJ2f/gQv+NAF6qOr/wDHlH/19W//AKOSj+29K/6Cdn/4EL/jVXUNU0+5t4ore+tpZGuoMIkysT++Q9AaAMX4rf8AJOdY/wCwfe/+kU9fPv7NPie80bVdf03StAutbu7yGGfy7eeGLy0iZlYkyMoPMy8A5r6C+K3/ACTnWP8AsH3v/pFPXz3+yp/yVPUv+wLL/wCj4KAPoT/hLfFn/RONU/8ABlZf/HqgtPEviy1haP8A4V1qj7pZJM/2jZD7zlsf67tnFdzRQBx9n4k1HXrK8WbQ20ufT9Sgtp7e6u0Zw/7mVeYwylSsqc7sjnjjFdF5uq/8+Vn/AOBbf/G65vTv+Qt4v/7GOz/9JbGuyoAxZZdS/ty2JtLXf9nmwPtTYI3R558v6dvX05uebqv/AD5Wf/gW3/xuiX/kP2n/AF6z/wDoUVXqAPmHxZ4P8R3/AO0ifFg05P7JsfEGlQXVwlyhEblbUAYOHP8ArE5C459jX09XLS6To9xLrYur/wApZtdsrqY+cg2XEa2hij5HG4xwjaeTv46iupoAKKKKACsTxN/zCP8AsJw/1rbrE8Tf8wj/ALCcP9aANuiiigAooooAKKKKACiiigArE8Vf8g1P+23/AKTy1t1ieKv+Qan/AG2/9J5aANuiiigAooooA/NyvpH9kb/mbv8Aty/9r14BL4c1y3/s7z9G1CL+1MfYN9q4+15248rI+fO5fu5+8PUV7/8As5x3ngSbXI/GGkaxpH9qTWMFpJc6VcCN3LyIAX2bUy0qDLEDLUAfSVFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQByE009v488UzWbRrcR+HrF4mlQugYS3xBZQQSM9QCM+oryzwVqVxrHxvutRvRGLi61HSpZPKUquTot6eASSB7ZOPU9a9agQy/EvxDGMZbQ9PUZ95r6vHfhzZ3On/FhLTUImhu4Z9FS4jbqkg0K83g/wDAs0AezfDj/klnhT/sC2f/AKISukrm/hx/ySzwp/2BbP8A9EJXSUAFFFFABRRRQBR1v/kAah/16yf+gmjRP+QBp/8A16x/+gijW/8AkAah/wBesn/oJo0T/kAaf/16x/8AoIoAvUUUUAFFFFABRRRQAUUUUAUdb/5AGof9esn/AKCa+atPhWf9tmWNy4VrqfJR2Q/8eb9wQRX0rrf/ACANQ/69ZP8A0E181afPFbftsyy3EqRRrdT5d2Cgf6G46mgD6V/si2/56Xn/AIGzf/FVx/jdrGw8HazFfx2ctpJqVtA76qfNhiD+QvmPvPIXdu5OOBXYf23pX/QTs/8AwIX/ABrHv7nSJtJ1ifUtYisNPN2m69F0kSr+7iA+c8Dnj9KTGtzyuDR/h94Z1bTNQ0LxD4d8QXb6jbRfYvKsC43yqu+LyEV1Zd27+IYX8a9yuLGK5kDyPcKQMfu7iSMfkrAfjXE3/j7wjp1jYxaDrOh6veyXltapFHfQySuHlVGfCnJIDFunau2uNRsrSQR3d5bwORuCySqpI9cE1f2fm/yRPUzdU0u3S0QrJdE/aIB815KesqDu369q5u9sp7P4hagmnRXE9xfaXZx2xa+l2xlJboyPLh9wRRJHgH7xOF/iI6TVNX02S0QR6hasRcQNhZ1PAlQk9ewGa8p8beG9P+I3x0TRG/sy6gi8OpeLLcCeZY3FyyMFWG4iGWDJkkniNRUjPU7TSY11SWGe4upXS0g3SC6lUu26QE/e6cdM4FX/AOyLb/npef8AgbN/8VXkH/DN2kf88vD/AP4Aah/8sK0v+FJS/wBg/wBif2pp/wDZP/Ph5Wp+R97f/q/7R2/e+bp1560AYXxeuDZ/BzxFp2rectw9wPsVx58hiu1F6uVKlsCRQCSD1A3DPzBcX9mL/l0/7i//ALi6yfip8K9H8E+G7xlsdLe4fT3uoLiziu4XhZLu0iIIkupVYMty3YYwK3P2bo47bwtZ6m6HjWruwMmThBNb2zjP1eBF+rD1oA9i8GWaz6Wbu48wzQ6vqpjJPVWvZgD7jaFx7Yrqq5/wu62bahosrAXNpdzTBTwWhmkaRHHqPmKZ9UaugoA5fWtLS21zw5PbcL/bklzKGYnl7K4j+X8WBx9a5nTbdLn45aqkjSKAb0/u5WjP/Hro3dSD+Fdbq8wv/F2jaZbMrSWUjajdjr5cflyRxg+hZ34z1Eb+lcxpU9nD8TLfV5Jo4IdUg1WVZJZMCTZJp8KkEnoVgBGO2DQB3X9kW3/PS8/8DZv/AIqqekaXbyaHYu0l0C1vGTtvJVH3R0AbA+la8M8VzCstvKksbdHRgwPbqKg0uGS20ezgmXbJHAiOuc4IUAigDPvdLt1u9OAkusNcEHN5Kf8AllIePm46dR/Wrn9kW3/PS8/8DZv/AIqpLuGSW6sXRcrFOXc56Dy3XP5sKsO6RRtJIyoigszMcAAdyaAPLfihLLoElvqWlzzR3dmk88EkkrS7HXTdSYHDkg4Kjggjr6nLrGH4g6utzcaVrdw1pFe3NpG9zqVpHI/kzvCWKrpbBcmMnG48Gs/41X6XGkk6ZLa3TmG4BX7RgbRpuo7zkBuVVsgY5O0ErnI6z4az65Jpd2mpadp9vaf2nqbCW3v3lk837fNuXYYVG0EsA27JAB2jJCgGHfQ/EHSFtrjVdbuFtJb22tJHttStJJE86dIQwVtLUNgyA43DgV87/HybUP8Ahb2oWGpancan/Z0MEEE9zHEkmxoxLg+UiKcNK3OM4r2v4l618Uo5nh0vQLO401NWtjG8wVQGW7iNrtbzQW3uEDZA27iOAN1fOvxLu/EN98QtRuPGlnFZa26w/aYIsbVxCgXozclApPPUnp0oA+1fhx/ySzwp/wBgWz/9EJXSVzfw4/5JZ4U/7Atn/wCiErpKACiiigAooooAo63/AMgDUP8Ar1k/9BNGif8AIA0//r1j/wDQRRrf/IA1D/r1k/8AQTRon/IA0/8A69Y//QRQBeooooAKKKKACiiigAooooAo63/yANQ/69ZP/QTXiXgD/k7zxt/2D5P/AEO2r23W/wDkAah/16yf+gmvEvAH/J3njb/sHyf+h21AHvdFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFUdX/48o/+vq3/APRyVeqjq/8Ax5R/9fVv/wCjkoAvUUUUAFUdX/48o/8Ar6t//RyVeqjq/wDx5R/9fVv/AOjkoA5v4rf8k51j/sH3v/pFPXyb8DdNsdX+M+hWOq2dvfWkv2jzLe5iWSN8W8hGVYEHBAP1FfWXxW/5JzrH/YPvf/SKevjX4ceEo/HXj7T/AA5NdvZrerN+/RA5QpC7g4yMjKjjI4oA+oND+Fug6/bXd7MbazY6nfwR21toml7Ejhu5YkA32rMcKi5JJOaXXfhXofh+0s7+IW93/wATOxgeC50TS/LkSW7iicHZaq33XbkEHNU/hn8IbHToLbUV1e9uDp+p3MMaXCo/li2vJ0URNjMSvyXAzuLN0BrsfiVoNpqGl2l3cTagko1PTINtvqVxDHta/hBPlo4Xd8xw+NwOCCCowAcx8LLSObwPJI7TBvP0hMJO6jB07T+wIGeevXp6Cr+geO7rVfEM9rN4w0JZ47u6iGirYN9pKxO4UeZ53XagbOysv4STWWn+A5bd7tUdrrS5ts9wWbBsLBmPzEnaOcDooGBgAAdlpPhbxHpMkttF4jsH0qS5nmNudJbzQssjOV83z8ZBfrs7dKT20HpYpeGPHWo6zpmgi9toYdSuJTFfwKDj/j2aZGTJ4DAKR16kdqd4O8T6j4g1Bra/1KwmZ7dnu9Ojhe1utOkyAEILFnXkjfgcrkcHi5H8P4I9T0C+jv5Y5tJsvsc3lLt+1KIjGrHn5WXcxB5+8R70/S/DWp2erWuoeIdct7+LS4JI7WQWphlKsAC08hdt5wOwUZ5I6Y0bjzO39b/8AzXNy6lZvCl1MuuwW8seLjxHp+oxmaV2IjgFkzgkgncfIfA5HK8jt2tcFNpV3qaeIX09EuEufFGmXsTRyoQ8MIsDI2c9vJk46nbwDkZ72oLCiiigArE8Tf8AMI/7CcP9a26xPE3/ADCP+wnD/WgDbooooAKKKKACiiigAooooAKxPFX/ACDU/wC23/pPLW3WJ4q/5Bqf9tv/AEnloA26KKKACiiigD5t8V/829/9un/tnXt3jz/kXbX/ALDWlf8Apwt68R8V/wDNvf8A26f+2der6nrR8RfDfSdVaJYTcaxph2K2QMalCvX8KAO7ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAObsf8Akqeu/wDYF03/ANH31ebWP/JzGu/9hrTf/TNfV6TY/wDJU9d/7Aum/wDo++rySDV/J/bCvtG8jd9rvba787f9zydJnTbtxznz85zxt754APW/hx/ySzwp/wBgWz/9EJXSVzfw4/5JZ4U/7Atn/wCiErpKACiiigAooooAo63/AMgDUP8Ar1k/9BNGif8AIA0//r1j/wDQRTtXR5dDvo41Z3a3kVVUZJJU8AUaQjxaHYxyKyOtvGrKwwQQo4IoAuUUUUAFFFFABRRRQAUUUUAUdb/5AGof9esn/oJr5u0j/k96T/r6uP8A0ievpHW/+QBqH/XrJ/6Ca+atPkaL9tmV0ieZhdT4RCAT/ob+pA/WgD6jrPs40lutUWVFdTdLkMMj/Ux077fc/wDQJvP++4f/AI5VOyvbgXeokaZdMWuASA0Xy/uo+D8/48etAGotlaqwZbaEEHIIjHFR6XNJc6PZzzNukkgR3bGMkqCTUf2+5/6BN5/33D/8cqnpF7cJodiq6ZdOBbxgMrRYb5RyMuDQBc1f/jyj/wCvq3/9HJXCf83Tf9yZ/wC3tdfql7cNaIG0y6QfaIDlmi7Spxw/fpXF28zzftRlpLeS3I8G42yFST/pvX5SRQBoeMPirp3g3xJLpGpG1ile0imtGuJzEsju8ikO207UUICTgnnABOBWj4L+IGm+Mru/tLG4s55rJUdpLKczROr5xglVIIKnII9ME5rQ1Lwjp+p6tLqby3MF80UUcc8EgVoTGzlWXIIz+8YHOQQcEEZqzpGhrpck1xPfXepXsyqkl3ebN7IpJVcRqqADc3RRnPOaOg5Wvp/Wh5N+0j/yLsn/AGBbn/04aZVX9mfTrfVvgzrFjeKxhm1iUEq21lIhgIZSOjAgEHsQDVr9pH/kXZP+wLc/+nDTK5r9nyfxPa/C7VZ9BnsY7WLUpncXOnmc7hDET8wuYyBjHGw9+TnABHrWpARSRJ4qN1Y3lohWz8S2SADa3XecMEPyqWWRTGSFIzjCyS63C2neY/xD0qK1kACXcKwCQ5xgqzOyE8jHyEHI45p2fiB/z96X/wCCQ/8AywqqR44j1GNBLoolkjZ939hHd8pUf8/3+36/nzgAs2VsdQt5rDw3Fd2tldPvvtYuQyzXOeCI93zMSBjfgKq42ZwMWpbaGz+JHh21tIlhgh0LUI440GFRRNYgAD0Aqtn4gf8AP3pf/gkP/wAsKi0m38Ry+Lhq2umK8On209jHDY2K2/8ArjbyFmL3T5x5SgAf3s57AA57x2moTeL9blsbXVriSx0m3lglstUe3SzctNmRohIok+6CRhshcY5qS+8ap/wsrT5ob68eytxb2cix2sxt5fPUszs4Xy1ILQY3EEAt612Go+CtD8RX/wDaerWN4l1JEsMiC/miV0UsQrpFJscfM3BzwcH0q5FoOi3Wgz2UNqG0/UCZpFDuN+/BznO5e2MYxgYximnb+v63X9diWu39bfqv61vylj4bsbX4ia2Yp9TK2dhb3MEcmq3TokkhnDHY0hUg7V4IIGOAKo+F9c128TwDFqNhc2sEsGWunvFk+1/6IxBZQc8/e+bv716E1hp9vqUl00e26v40tXfcx8xUDsq9cDAZznj+VRx6Fptna6alvZsV0hMWUayHMY8spgZPPynHzH/GmmkmvT9f8xSTl/Xp/wAE4D4w2095AtrZwyT3E0NxHFFEhZ5GOmamAqgckknAAqPSvGOtaDBdWdn4dkvLd9QvLqKaWz1aF2Wa5kmAZBp7AECTBwx6Vu63cSTfELwv5lpNB/xMB/rCh6WWof3WPXJ/I+2e5qRnlOq+Mda16C1s7zw7JZ26ahZ3Us0Vnq0zqsNzHMQqHT1BJEeBlh1r52+O8xvPjHq1+tteQW94kEkH2y0ltnkUQohYJIqtjcjDOP4TX2/XyT+1X/yVPTf+wLF/6PnoA+kvhx/ySzwp/wBgWz/9EJXSVzfw4/5JZ4U/7Atn/wCiErpKACiiigAooooAwNc12ez1i00e00g6nLe28szKZljUIhRWB3dc+YOPrVCPxm0q6XbaLokk812lwPs7TJD9n8h1jdSeQcMcDHHFZfj61tpPGGi3OqWmvS2MdldI0miJdl0kLwlQxtvmAIVuDxx7Vz8+l/Zj4f8A7a0/xGNMtxfpB/Zsd19pjjaSMxCU2/z5Khj83J/iy2aa2Xz/AF/4BVlf+ux3lx4o1O31Cw08eH2e+u4ZpzCLxAI0jZFJ3dCT5g4rT0fXItXsJp/ImtZbaVobm3lALwuvJB2kg8EEEHkEVxKaraaVr2g6haaX4ml02KxvLbdNpt5cTq7SQsN4dTJg7WwW9OK6XwxDcQJrer3drPb/ANo3rXUdu6/vBGsSRrlR0YiPO3ryB1o0tfyf5/5ak9ifSvEp1DUIbW5024sWu7drq1MxUmSNSoO4DlGG9eD6+xFbtcP4N1oa9rkuo6jp2sWupSwlY4rzS57eK0h3A+WHdArOTgsQecccLXcUPZC6hRRRSGFFFFAFHW/+QBqH/XrJ/wCgmvEvAH/J3njb/sHyf+h21e263/yANQ/69ZP/AEE14b4Iheb9rjxqsdxJbkWDndGFJPz2/HzAigD6Aoqj9guf+gtef98Q/wDxumRC4ttYhge9muI5IJHKyqgwVZACNqj+8aANGiiigAqC8lngs5JLS2+1TKMpD5gTefTceBU9FAHH2nje9mt5bm60CS2t4r1bFn+1o580zLF0HbLZz7Vq654mi0NrkS27y/Z9OmvztYDKxkZX6ndXNXejXV34N1OyltLsG48Qh9sYeOQxG8Ql1K4YDbk7gRgDOareIPCK6Z/bC6NBqtytz4evIv395c3hMhK7UUyO2GPPC4zjvihfCm/P/wBJv+ZdlzW87fLmt+R2Okapq1/KpvtE+wwPHvWU3aSemBgVX0rxV/bdpqT6ZYSST2U5iSGSQJ5654kUngKcHH0NchpN3Y6dpd3/AMI3p/jBtWeyMcS6pDqLQhyAB/r8ouGxyOcA9q19C0HVPC3iXTEknW/sriwFg7W9mYxCYhujZzubqDIMnHJA71TWtv6/r/MyTdr/ANf1/kSxeOdQewuLuTw48ccN2LLm8Q7pjMsWOB0y3X2q3deMpNMW/TV9Jltbi00+TUERZlkWeOP7wVh0IJXqB94deaxrzRru88G6nYvbXiNceIQ+IQ8cnlG8QmRSuGA25bcOgGc1U1Pw1Polv4nsLa31TVV1LR5jZ3lxPNeSxsEIa33MWIBJVlH8RLdcCp+zd9v0T/M1UVzW8/wvb8jtNI1TVr+VTfaJ9hgePespu0k9MDAq1q//AB5R/wDX1b/+jkrkfAzaNBfpFp1r4sjuXt9rnV49Q8lcYJwbj5AcjjHNddq//HlH/wBfVv8A+jkqpaGUW2tS9RRRUlBVHV/+PKP/AK+rf/0clXqo6v8A8eUf/X1b/wDo5KAOb+K3/JOdY/7B97/6RT18wfs86Jfav8VkuNKv7exu9MspruN7m1a4jfOISpVZEPSYnO7qK+n/AIrf8k51j/sH3v8A6RT18wfs/wDjHQvBHj691LxPffYbSXTJIEk8l5MuZYmAwik9FbnGOKAPog/DTXPOnki8S29v580k7x2y6pDHvkcu5CJqIVcszHAAGTQPhprnnQSS+Jbe48iaOdI7ldUmj3xuHQlH1Eq2GVTggjIpV/aB+GTsFTxKWZjgAafckk/9+62tP+J3hrVrRbrSzrF7bt92a20G+kQ9+GWEjvQBk+CtI/4R/S9Z0bz/ALR/Z2rabaeds2eZ5dlp6btuTjOM4ya9Ery638WxWureI2OheJpIr3WLe8gkTQLvDxpb2qtwYwQd0LjBHYdjmt//AIWXY/8AQu+LP/Ceuv8A4igDpJf+Q/af9es//oUVXq4R/iHZtqkFyPD3irZHDJGR/wAI/dZyzIR/B/sn9Ks/8LLsf+hd8Wf+E9df/EUAYeq+Kraz1rX9JbXYoNUk8VaUltZG8CztAw0/eETO4oQZcgDBy+e9enV8ca7rlp4j/av0/VNPWdIJtb01QtxC0UilPJRgytyCGU9a+x6ACiiigArE8Tf8wj/sJw/1rbrE8Tf8wj/sJw/1oA26KKKACiiigAooooAKKKKACsTxV/yDU/7bf+k8tbdYnir/AJBqf9tv/SeWgDbooooAKKKKAPm3xX/zb3/26f8AtnXoOl6drOk/BPw/Y+JrUWmqQ6vpwuIhIj4P9qxEHKEryCDweM4rz7xX/wA29/8Abp/7Z17d48/5F21/7DWlf+nC3oA6SiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA5ux/5Knrv/YF03/0ffV4j/wA32f5/6Ble3WP/ACVPXf8AsC6b/wCj76vEf+b7P8/9AygD274cf8ks8Kf9gWz/APRCV0lc38OP+SWeFP8AsC2f/ohK6SgAooooAKKKKAOK8Z+KDonibSrK48R2Xh+zurWeV7i8VMO6NGFUFyB0dj+FY9x47uRb+H5NS8RadodtqEV2zX8qII7jy5EWJk3tgB1JbGT1rpPEmla9J4n03V/D9tpd19mtZ7eWLULmSEfvGjYMpWN848s9cdax18J+I9LvNOv9Ji0e7uI2vXuLe5uJIIYzcSI4EZWNyQNmOQM5z3xTVrK/n+pWl/67FiPVdT1LVtFsdG8T211bXdnc3TahDbRyLN5ckagDBxgb2Bwe1bvhvVby+h1G01HyZL/TLpraSSJSiS/Iro2CTtyrrkZODmsW607xm+saXrMGn6ALu2t7i2mtjqMwjCyNGysriDJP7s5BUdeprc0HRrnTrW+lvbiNtQ1G4a5nkhX5EYqEUKD1CqqjJ64zgZxRpb5P776fgT2/r+tSjoOr6jL4kn0rUby0vJYrRZ7lbZNotJS2BHnPzAjJGeflyeorqK5ax0PWbzWIb3xE9mrWtjLZCS1YubrzCuZHVkCp9wEJ8wyx5x1vf8IrZ/3/APyVt/8A41R0X9dQ6s26KxP+EVs/7/8A5K2//wAao/4RWz/v/wDkrb//ABqkBt0Vif8ACK2f9/8A8lbf/wCNUf8ACK2f9/8A8lbf/wCNUAXdb/5AGof9esn/AKCa+btI/wCT3pP+vq4/9Inr6E/4RWz/AL//AJK2/wD8ar5n8KXV3f8A7ZE7+ZGs6alfwCR49wIjhmjBIBHJC84wMnpjigD6zqjYf8fup/8AX0v/AKJjo8rVf+fyz/8AARv/AI5VOyi1I3eo7bu1BFwNxNqxyfKj6fvOOMev9KANqqOif8gDT/8Ar1j/APQRR5Wq/wDP5Z/+Ajf/AByqekRakdDsTHd2qp9nj2hrViQNo6nzBn8qALmr/wDHlH/19W//AKOSvE/in44h+H3xxi1lriWKeTw5FaoBpgu0ZWuZWbP+kQlSDGuOWzlumK9Q8Ra3DpUMMWq+INHtne5gVI5V8tmbzFIwDLk9M4A5AP1r50/aEjl8QePkvtP1PSrqKz0WPzmF3Db5HmznaqSSbpG4zhMnleMkZAOj/wCGnf8Ap9/8tn/740f8NO/9Pv8A5bP/AN8aveGv2avB+s6TNdXWpa4jx6he2oEc8IG2G6lhU8xHkrGCffPTpWv/AMMqeCP+gr4g/wDAiD/4zQB5b8QvjFY+N/D95b3NxcTXbWTWlskejraxjfc20zM7G7lJ4tsABerV6J+zf/yQzxF/2ELn/wBJoq5/4pfs/wDhXwR8NdU8Q6Vf6xNd2fk+WlzNE0Z3zIhyFjB6Me/Wj4BeJ7ax+GetaMstzJdyXc0v2W10e6u2KNDGoO+IFVyVI56Yz3oA+m6oy/8AIftP+vWf/wBCirm/+E3X11T/AMJDUv8A4mqz+MQ2qQTbdVISGRS//CJalgZZDjGzJzt69sH1FAHd1RsP+P3U/wDr6X/0THXN/wDCbr66p/4SGpf/ABNVrbxiI7i8YrqqiWYMCfCWpHd+7QZA2cdMYPpnvQB3dUdE/wCQBp//AF6x/wDoIrnNG8cWmv8AiCfQ9O1Vf7Tt4TNNbXOiXVsyKNnXzSvP71Djrhgela+kRakdDsTHd2qp9nj2hrViQNo6nzBn8qALl/8A8fumf9fTf+iZKvVi3sWpC707dd2pJuDtItWGD5UnX95zxn0/pVzytV/5/LP/AMBG/wDjlAFLUNF0rXtVubXXNMs9St0hgkWK8t1mRWDTAMAwIzgkZ9zVb/hXHgj/AKE3w/8A+CuD/wCJq1FFqX9uXIF3a7/s8OT9lbBG6THHmfXv6enNzytV/wCfyz/8BG/+OUAc7pfw88FSWjmTwfoLEXE65bTITwJXAH3ewGK+a/2ldF0rQfiTp9roemWem276THI0VnbrCjMZpgWIUAZwAM+wr6q0uLUjaP5d3aqPtE/DWrHnzXz/AMtB3/yetfL37Ua3C/E/Thdyxyv/AGPFgxxlBjzpuxY/zoA+l/hx/wAks8Kf9gWz/wDRCV0lc38OP+SWeFP+wLZ/+iErpKACiiigAooooAr6jcPaaXdXMYUvDC8ihuhIUnmjTrh7vS7W5kCh5oUkYL0BKg8U+6t0u7Oa2kLBJo2jYr1AIxxWT/witn/f/wDJW3/+NUAbdFYn/CK2f9//AMlbf/41R/witn/f/wDJW3/+NUAbdFYn/CK2f9//AMlbf/41R/witn/f/wDJW3/+NUAbdFYn/CK2f9//AMlbf/41R/witn/f/wDJW3/+NUAbdFYn/CK2f9//AMlbf/41R/witn/f/wDJW3/+NUAXdb/5AGof9esn/oJrxLwB/wAneeNv+wfJ/wCh21ewf8IrZ/3/APyVt/8A41Xzx+zz4hvPFfx313W9TEQu7zSJHl8lSq5EsAyAScdKAPp2W6t4JI45544nlO2NXcAufQA9eo/Oq0v/ACH7T/r1n/8AQoqxfE9wyeItDiQ43zAOPUeZGf5qK2pf+Q/af9es/wD6FFQBeooooAKKKKACiiigAooooAKKKKACqGtKX05VV2Qm4gAZcZX98nIzkVfqjq//AB5R/wDX1b/+jkoAPsFz/wBBa8/74h/+N0fYLn/oLXn/AHxD/wDG6vUUAUfsFz/0Frz/AL4h/wDjdVdQtJoreJ31G5mUXUGUdYwD++T0QH9a2Ko6v/x5R/8AX1b/APo5KAOb+K3/ACTnWP8AsH3v/pFPXyx8FPh1pHxG8Q31jr899bwQQBo5LOVEJkJOFO5Gz8qsf+A19T/Fb/knOsf9g+9/9Ip68C/ZvAgTWtSwxNjqWmMdpP3ZftEDE+oAmLf8Bz2oA5342fD3QvhnrOm6f4cu9Qnlu7Z5bg3kkblV3BVC7UXGcNn/APXn33wb8M/DF/4J8I6uugaM1y+k2hvFuNPikW5VolLMcjiTJJ39T0Oe3kv7TBN1qWm6gWV0mvr23hIHISFbaMqT3/eiU/jivor4cf8AJLPCn/YFs/8A0QlAB/wrjwR/0Jvh/wD8FcH/AMTR/wAK48Ef9Cb4f/8ABXB/8TXRSuY4ndY2kKqSETGW9hkgZ+pqtpmp22r2K3VmzbclXR12vE4+8jL1DA9RQBjf8K48Ef8AQm+H/wDwVwf/ABNZ2r/CrwlqUcVtb+GtCs7dnzctDpcKyun9xHC/Jk9WHOM4wTkdNp2sW+q3F0lksjw2z+UbnA8qRxncqHOW2kYJxjJxkkMBfoA+P/Fem2Oj/tc2FjpNnb2NpDrOl+Xb20QjRMrAThRwMkk/UmvsCvknx5/yeTa/9hrSv/QLevragAooooAKxPE3/MI/7CcP9a26p6lpsOqQxxzsyiOTzBhVbJwRyGBB6ntQBcrK1zxJp/h1tPGpvIn9oXa2kJRNw8xgSM+g4PNQ/wDCK2f9/wD8lbf/AONVy/jTwzC8mh2MD4a7vpFVvKjTawtLjafkVehIPOelA0r3+Z2Mmv2MfiaHQWZzfTWzXSqFyojVguSexyeB3wfSiz1+wvta1DS7eRjdads88FcAbhkYPf39K4bQ9VW+8RWXii+UwrcWd2SHGDHHCsKsDn/bEh/GotJGtaPc6Jruq2trHBqEksdxsnYyE3TeZGHBUAYcIg5ON1O39eetv8hdL/1pudfa+NNNu5YVihvRHdBvscz25CXZVS2Iz3JAJGcZAyM1W/4WBYD7d5umavCunoXumktMCIBN/PPdf51zvh/VbKDWNKsvDetyXMbyhLjw9dKkkmmLsYkggCSLacDDkgg4HUVa1z/kGfErt/ov/tmKUtFcuEVKaidEnjC3Nlc3lxpeq2ttb2z3Lyz2u1SijJxzycdqms/FFrc6lb2M9rfWM90rNALqAqsu0ZIDDIzjnGc4B9K8/TW9HuvBut21l8RG8RXD6LPtsXktT5eIzlgIo1bjpySK27LT73SPGmj/APCSa5e6zbzxMNNluIoIlt7nYdykRIu4tGW2k9NrDqRVW1/rzM/sJ/10/wAzv6xPFX/INT/tt/6Ty0f8IrZ/3/8AyVt//jVB8LWm1gszpvVkJS3gU4IwRkR5HBIqRm3RRRQAUUUUAfNviv8A5t7/AO3T/wBs69u8ef8AIu2v/Ya0r/04W9eI+K/+be/+3T/2zr27x5/yLtr/ANhrSv8A04W9AHSUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHN2P/JU9d/7Aum/+j76vEf+b7P8/wDQMr26x/5Knrv/AGBdN/8AR99XiP8AzfZ/n/oGUAe3fDj/AJJZ4U/7Atn/AOiErpK5v4cf8ks8Kf8AYFs//RCV0lABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV8k+A/+Tybr/sNar/6BcV9bV8jeCYIrn9sS8iuIkljbWtUyjqGB+Wc9DQB9I2Wu+ItWs7m70nSdMeOK9ubWOO51CSMv5Nw8JYlYW258stjB6ge9NtfENxYXmpHV9EvoI/tALT2q/ao1/dRjGE/ee+dmOevWofA2kabJ4eujJp9qxGsaouWgU8C/nAHTsBitay0jTXu9RDafasEuAqgwL8o8qM4HHqSfxoAZN4t0+RYo9EddYu58+VBaSK2ADgs7dEUHgk85GACeKoaNoF3qeh2L+INSmkiNvEVsbN2ghUbRgMykPIfXJCn+6Kwda8GWGgavc6tBHHa213L5r34hV/schxxMh4ktzjvgx5OCFOU2fCc2mX9pb6dqmk2lvqsdrHKyNCrLcRkAebGxHzDJGe6k4PUEgGvNpGm6TpscWl2FtZp9qt/lgiVM/vk9BzW1WLqmkabHaIY9PtVJuIFysCjgyoCOncHFatva29pGY7SCOBCdxWNAoJ9cCgDA8B/8i7df9hrVf/ThcV0lc34D/wCRduv+w1qv/pwuK6SgDzb9oP8A5IT4h/7dv/SmKvM/gJ4B0Pxh8KL+a/0+ybUrfWX+zXk9okxTbDEQjBh88eWOUPHJIwcEemftB/8AJCfEP/bt/wClMVc3+yp/ySzUv+w1L/6IgoA9Gi+HHgzyU8/wd4dMu0bymlQ7c98ZXpT/APhXHgj/AKE3w/8A+CuD/wCJrpKzdP1y3v8AUr3Tiklte2bfPBMAGeMn5ZVwSGRvUdDkHBGKAM3/AIVx4I/6E3w//wCCuD/4mq1/8NfCUtjKmneE/DcFywwksmkQuE55O3byQM4Hrit86tAdaGlwq806p5kxQZWBf4d57Fuw6nk9Bmr1AHkPgXwzpPhj4yahZaNZxW6RxXsW9Y1VnUQaQ+CQBxukkbHQF2wBmvUNE/5AGn/9esf/AKCK8/021t7v45arHdwRzoDesFkQMAfsujc4NdppGkabLodjJJp9q7tbxszNApJJUck4oAuX/wDx+6Z/19N/6Jkq9WLe6RpqXenBdPtVD3BVgIF+YeVIcHj1AP4VQ1gWcd2uk6Do2nXWqyKHbzYV8q0jJx5kmBnsdqDBcgjIAZlANC81Ww0fVLu51S7htYfs9ugeVwu5i8oCj1JPAA5JqNfEF9e86PoN5LGRlZ70i1jb8GzIPxSs7R/BekWOv3U13aw6hem2iZrm4hUlSzSbgi4xGvyr8q46DOTzXQf2JpX/AEDLP/wHX/CgDnNN1vWrG60i11TTrBI9U1O5tSbe8eQxOFuJs/NGu4fuSueOoOO1fPX7Vf8AyVPTf+wLF/6Pnr3rUtL086t4SzY2x3eIbtGzCvKi1vsA8dBgcewrwD9qO1t7T4n6dHaQRwIdHiYrGgUE+dNzgUAfS/w4/wCSWeFP+wLZ/wDohK6Sub+HH/JLPCn/AGBbP/0QldJQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFfJP7Kn/JU9S/7Asv/AKPgr62r5J/ZU/5KnqX/AGBZf/R8FAHuviWeZ/E19L5rBtNijltsAYU7o+vHPLk/lXZy/wDIftP+vWf/ANCirifEX/If1/8A69Yv/Qoa7aX/AJD9p/16z/8AoUVAF6iiigAooooAKKKKACiiigAooooAKo6v/wAeUf8A19W//o5KvVR1f/jyj/6+rf8A9HJQBeooooAKo6v/AMeUf/X1b/8Ao5KvVR1f/jyj/wCvq3/9HJQBzfxW/wCSc6x/2D73/wBIp68J/ZwtxdeD/iLC0ph3WdviUYzGdlwQwzxkHB/Cvdvit/yTnWP+wfe/+kU9eBfs7qLjw34y08oJBqU2m2LIf4o5XmWT8oy5x7UAJ8f3M3gP4cXLbfMu7S6u5dvTzJRBI/8A485r0L4K+E/iDpXhdL0+KLQ6bqNnaS2FvqME14YE8ssVVBMixD5wOC24KOFxg+f/ALRpMOm+HNPdlZtPvtUgwoxtQvBJEv4RyR19FfDj/klnhT/sC2f/AKISgDy3xd8OvG2p6vqc92k2vaxJLBJoWuWt4tjBpA3/ALxfIMm4bR3AkLDHO6uv8R2Or+Itca68ET/Z7OBvL1d0k8saoFIBhjbs6gMplBGCQu75Tt9FkjWWJo5BlHUqw9QabbW0NnaxW1pEkMEKBI441CqigYAAHQUAU9Du9Pu9HhOkosNtEPJFuE2GArwYyn8JXpitCoYrO3hup7mGFEmuNvnOowZNowCfUgcZ/wAKmoA+SfHn/J5Nr/2GtK/9At6+tq+SfHn/ACeTa/8AYa0r/wBAt6+tqACiiigAooooAKKKKACiiigBNoDEgDJ6nHWloooAKKKKACiiigAooooAKKKKAPm3xX/zb3/26f8AtnXt3jz/AJF21/7DWlf+nC3rxHxX/wA29/8Abp/7Z17d48/5F21/7DWlf+nC3oA6SiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8/wDEHjDRvAnj7UdT8Vz3Fhp97pljb2939imlieVJbxmj3ojAMFdTgkHBzXhP/CwfDH/DWP8AwmX9p/8AEg/5/Ps8v/Pj5X3Nu/7/AB09+nNek/tV/wDJLNN/7DUX/oievkmgD7/+HH/JLPCn/YFs/wD0QldJXN/Dj/klnhT/ALAtn/6ISukoAKKKKACiiigAooooAKKKKACiiigAooqO4uYLO2kuLuaOCCJS8ksjBVRR1JJ4AoAkornRqesa8P8AiQRJp9kTxqF9EWaUZHMcOQcEZwzkdjtYVKvhKxmw2r3F5q0mMMby4JQ/9sl2xj8FoA2hNGZPLEil/wC7uGfyr5J8EzLB+2JeSOHKrrWqZCIzn7s/YAk19Car4f0bRfEXgwaNpFjp4GsSqBaWyRYBsLskfKBxnmvn7wH/AMnk3X/Ya1X/ANAuKAPobwNqlunh66DR3RP9saofls5T1v5z2X9O1a1lqlut3qJMd1hrgEYs5T/yyjHPy8dOh/rVXwH/AMi7df8AYa1X/wBOFxWtYf8AH7qf/X0v/omOgBG1W1dSrw3bKwwQbGYgj/vivPJ0OiaBY+VLcxWVvCs1nfPaSv8A2TNs6McfPbN0IB+UHH3cFPUqoaMofw7YK4DK1rGCCMgjYKAMaHxPb614ft7j7PdQzfaYVnhNtIfKkWZd6Z24OCDj14x1FdHb3CXMZeNZFAOP3kTRn8mAP415xfRx/D3xJ9nQOPD2ryQ3G4kbdOliljVsn/nmUKAdduzso+X0wEEAg5B6EUAc34D/AORduv8AsNar/wCnC4rpK5vwH/yLt1/2GtV/9OFxXSUAebftB/8AJCfEP/bt/wClMVeOfs8+FvGl80WveG/EUdhpFrezxXVldGWSGSTyFw3kI6iQ/OvVlxtBy2MV7H+0H/yQnxD/ANu3/pTFXN/sqf8AJLNS/wCw1L/6IgoA1vG3g3xRrepWUviSCLxnoqwyxvoumk6Wsc2MxzkvO3md1ILjbkMoJzmKw8P+JG+H2g+HftwXxxp8G9tT37xp0bMSEkcffJjxHt5BK7uQoavXKhtrO3s/N+ywpF50jSyFRy7nqx9T/gKAOd8EXCW9i+jX0fka5agPqCu25rlzwbhW/jRyOD2+6QMYrqKgksbWa9gvJYI2ubcMsUpX5kDfeAPocDj2FT0AeY6bcJbfHLVXkWRgTej93E0h/wCPXRuygn8a7TSNUt49DsUaO6JW3jB22crD7o6ELg/WuQ0X/ku2rf8Ab9/6TaNXd6J/yANP/wCvWP8A9BFAGJ4n8RrYw2EllbXE94115dtC9rKgkkaKQAfd6DO44yQoY44q1oYs9GsDGfttxczOZrq5exm3Tynqx+XgcAAdgABwKp3Jk1D4jWjn/j20o+UmG6zywyM+R6qix4P/AE0auroAxYtUtxrly/l3WDbwgf6HLnhpO23Pfr9fQ1c/te2/553n/gFN/wDE0Rf8h+7/AOvWD/0KWr1AHB6lqMI1bwllLn5fEN25xaydDa33T5eTyOOo5z0NeAftR3CXPxP0541kUDR4h+8iaM/66bswB/GvonUf+Qt4Q/7GO8/9Jb6vnv8Aar/5Knpv/YFi/wDR89AH0l8OP+SWeFP+wLZ/+iErpK5v4cf8ks8Kf9gWz/8ARCV0lABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV8k/sqf8lT1L/sCy/wDo+Cvravkn9lT/AJKnqX/YFl/9HwUAe5eIv+Q/r/8A16xf+hQ120v/ACH7T/r1n/8AQoqztbjxrdnJ/eRF/K5gP9a0Zf8AkP2n/XrP/wChRUAXqKKKACiiigAooooAKKKKACiiigAqhrTFNOVlRnIuICFXGW/fJwM4FX6r39s93a+VHIsbiRJFZl3AFXDcjIz09aAIft9z/wBAm8/77h/+OUfb7n/oE3n/AH3D/wDHKPK1X/n8s/8AwEb/AOOUeVqv/P5Z/wDgI3/xygA+33P/AECbz/vuH/45Ve+nu7m3WOPSroETRSfM8PRZFY/x+gqx5Wq/8/ln/wCAjf8AxyjytV/5/LP/AMBG/wDjlAHJfE65lm+HusrJY3FuBp18d0jRkH/Q5+PlYmvDf2W42uvFmo25jkMUAivi4OFDIksSqfXIuGIHT5c9QK95+I1ney/DbxFLd3Vu6QaTeyBY7dkJJtpV6lz/AHvSvkb4dfCrXPib/aP9g3Wn2/8AZ3leb9tkdN3mb8bdqN/cOc47UAeh/tVW0tt4t0giNRbXMMk4cHlpcJG+R7LHFz/hXtHw41C81nwJ4Ut9IcwafZaZZi7vNoJmdYkzBHnsCMO/blR82Snhf/DKnjf/AKCvh/8A8CJ//jNH/DKnjf8A6Cvh/wD8CJ//AIzQB9bUV8d6J+zV4x17QNP1ez1LQ0t9QtY7qJZZ5g6q6hgGAiIzg84Jq9/wyp43/wCgr4f/APAif/4zQB9bVnawuppHFdaOyySQEs9o+AtyvdQ38LdwemeDwcj5a/4ZU8b/APQV8P8A/gRP/wDGaP8AhlTxv/0FfD//AIET/wDxmgCr4r1CHVP2urG7tg4STWdLG2RCrIwWAMrA9CCCCPUV9gV8ieGvgp4j8M+NLPV7+90uS30HxHp1rdLDLIXdpJLZlKAxgEYuEzkjo3tn67oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA+bfFf/Nvf/bp/wC2de3ePP8AkXbX/sNaV/6cLevEfFf/ADb3/wBun/tnXt3jz/kXbX/sNaV/6cLegDpKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDxL9qv/AJJZpv8A2Gov/RE9fJNfW37Vf/JLNN/7DUX/AKInr5JoA+//AIcf8ks8Kf8AYFs//RCV0lc38OP+SWeFP+wLZ/8AohK6SgAooooAKKKKACiiigAooooAKKKKAGyypDE8szqkaKWZ2OAoHUk1zFlZyeLrqPVtXiZdJicPp2nyrxKVOVuZR3JwGRT90YYjdwtnXlGsapaeH+tvIpur8dQ0KnCxn/ff8CqOO9dBQAUUUUAc34o/5GLwZ/2GpP8A033lfNXgkyr+2JeG3RHk/trVMK7lQfln7gH+VfSvij/kYvBn/Yak/wDTfeV8f6t4UvvG/wC0Br/h7SpbeG7vNav/AC3uWZYxseVzkqCeint1oA+tPA0upDw9deXaWrD+2NU5a6Yc/b58/wDLM9/8jpWtZS6kLvUdtpakm4G4G6YYPlR9P3fPGPT+tZnwt8KX3gj4a6X4e1WW3mu7PzvMe2ZmjO+Z3GCwB6MO3WutoAo+bqv/AD5Wf/gW3/xuqekS6kNDsRHaWrJ9nj2lrpgSNo6jyzj862qKAOM8ZRahPLoE01tbIINXhyq3LMJA6smxgY/u5YH8B16V5Z8TPit4m+EHiaDw9odnpclhNaLdwxXfmTfZwzuvlowKYQbMhSDjOAcAAeofFTwbfeN/DEGnabFp80sc0rldQdljG+1nhVwQj/MjzK446p1Bwa+f/wDhlTxv/wBBXw//AOBE/wD8ZoA+kvAf/Iu3X/Ya1X/04XFdJXyT/wAMqeN/+gr4f/8AAif/AOM0f8MqeN/+gr4f/wDAif8A+M0Ae2/tB/8AJCfEP/bt/wClMVcH+zXqN2fhvf6Toqj7fLq0kjzuuY7SMwwje395iQQq9yDnABrjv+GVPG//AEFfD/8A4ET/APxmj/hlTxv/ANBXw/8A+BE//wAZoA+s4UMUKI0jSlVALvjLYHU44zT6+Sf+GVPG/wD0FfD/AP4ET/8Axmj/AIZU8b/9BXw//wCBE/8A8ZoA+tqqapbXV3ps0On3hsbpgDFcBA+xgQRlT1Bxgjg4JwQea+VP+GVPG/8A0FfD/wD4ET//ABmj/hlTxv8A9BXw/wD+BE//AMZoA9X8K6nf3Pxr1SG5tbeLV4kvGubU3B2qpg0lVdWCnKsY2IyAcdcEYr0XSJdSGh2IjtLVk+zx7S10wJG0dR5Zx+dfMf8Awyp43/6Cvh//AMCJ/wD4zR/wyp43/wCgr4f/APAif/4zQB9A6NNezzPdx21oWn1u5ywuWwzxpJAQT5fYRYz/ALOMenT+bqv/AD5Wf/gW3/xus3wRoc/hzwrHp11b2dq63V1MLexYtDAstxJKsaEqnCq4X7o6dK6CgDFil1L+3Lki0td/2eHI+1NgDdJjny/r29PXi55uq/8APlZ/+Bbf/G6vUUAcHqUmof2t4SxbWx/4qG7K5uW5b7LfZB+Tgdee+BwM8eAftRtcN8T9ON3FHE/9jxYEchcY86buVH8q+hfip4NvvG/hiDTtNi0+aWOaVyuoOyxjfazwq4IR/mR5lccdU6g4NfHfxA+H+q/DjX4NI1y4s57ia1W6VrN2ZApZlAJZVOcoe3pQB9rfDj/klnhT/sC2f/ohK6SuU+Gt5bSfDLwtDHcwvKujWgZFcFgfJTtXV0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXyT+yp/yVPUv+wLL/6Pgr62r5E/ZcuEtvifqLyLIwOjyj93E0h/10PZQT+NAH1lc6fbXk8E1wjM8B3R4cjByDyAeeVB59Kil/5D9p/16z/+hRUf2vbf887z/wAApv8A4moo7hbvXIJIY7gJHbyqzSW7xgEtHgZYDPQ/lQBp0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHN/Ef/AJJZ4r/7At5/6IevEf2Rv+Zu/wC3L/2vXt3xH/5JZ4r/AOwLef8Aoh68R/ZG/wCZu/7cv/a9AH0lRRRQBzfw4/5JZ4U/7Atn/wCiErpK5v4cf8ks8Kf9gWz/APRCVy/iLxRren3d1Z2t6Ul0/VGu5y0YYvp6RpI6Aen7zbnrxQtXYOh6ZRXk+ueLdbht9SvLTUZI4JLDVri1Cop2eQ8UcbDg553sM5zv+lbHgbVb298R3NvBqut6lp8NsDc/25ZpbTQTkgoEURRsQV3E5BHAwetUotpef9foEtFc3Lr/AIRj/iafaf8AoNWf23/W/wDH9/ov2fp/269Pl/vfxV0lcleaFYzf2zv1q3j+1eINPvZc7f3EsX2PZAfm+9J5KYzg/vlwDxnrakAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD5t8V/829/9un/ALZ16ne+KbPxr8MdI8QaZDcwWt5rOmmOO6QLIAupwocgEjkqSOehFeWeK/8Am3v/ALdP/bOvRbCzfT/gvoFrJCYGi1fTl8ort2f8TSLAx6UAem0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHiX7Vf8AySzTf+w1F/6Inr5Jr62/ar/5JZpv/Yai/wDRE9fJNAH3/wDDj/klnhT/ALAtn/6ISukrzb4deK9Rb4ZeG1tvBXiCeKLTLeFZg1nGsuyMJvVZLhW2nbkEqMgg9DXS/wDCUav/ANCJ4g/7/wCn/wDyVQB0lFc3/wAJRq//AEIniD/v/p//AMlUf8JRq/8A0IniD/v/AKf/APJVAHSUVzf/AAlGr/8AQieIP+/+n/8AyVWRqXj/AMQRazY6Rpfw71yS8u3XdNfSRRWcMfzZd7iJplBG37mNxB4ySoYA7uiub+3eN/8AoXvD/wD4Pp//AJDo+3eN/wDoXvD/AP4Pp/8A5DoA6Siub+3eN/8AoXvD/wD4Pp//AJDo+3eN/wDoXvD/AP4Pp/8A5DoA6Siub+3eN/8AoXvD/wD4Pp//AJDrxvUv2qbrSNVu9N1DwJ5N3ZzPBPH/AGwG2OjFWGRCQcEHkHFAHtmgq1xrGuajJtbzLsW0JC4IihQDaT3/AHjTH/gVblcv8PJLmXwrLJfIiXTatqXmrHIZFVhfTjaGIBYDGASBwBwOldRQAUUUUAc34o/5GLwZ/wBhqT/033lfNvgP/k8m6/7DWq/+gXFe9/FPWZ/DtnoOtWtpHePp2oT3RgkmMQdU068ZhuCtg7QcccnA4zkfOvwh1I6/+01Za8IRAupX1/cmEPv8kyQzvsJwM9euBnH1AAPsWiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAzLvw1oV/GI77RdPuEByFltUbBznIyODkA/hVN/DDWg3+HtUu9McHIiZzcW7cEYMbk7V74QoeOvXO/RQBgweIJ7G7isfE9ullLMwSC7iYtbXDE4Chjyjn+63UnClq3qhu7S3v7OW0vYUnt5lKSRSLlXU9QRWFp89x4e1WLRb+V57C5yNNu5W3MpAybeRj1IAJVjywBB5GWAOjooryf4pfG9vht4nh0dPDw1Qy2K3hk+3eSQC8ikBfLbOPLznPfpwTQB6xRXLW2p+Op7WKWXwtods8iBmhl1+UvGSMlW22hXI6HBI9Cal+3eN/+he8P/wDg+n/+Q6AOkorm/t3jf/oXvD//AIPp/wD5Do+3eN/+he8P/wDg+n/+Q6AOkorm/t3jf/oXvD//AIPp/wD5DrIbxt4usPFEelav8O7ya3nRjBf6Nfx3UTsqqxDGRYREMEjLlcsuFDZzQB3dFc3/AMJRq/8A0IniD/v/AKf/APJVH/CUav8A9CJ4g/7/AOn/APyVQB0lFc3/AMJRq/8A0IniD/v/AKf/APJVH/CUav8A9CJ4g/7/AOn/APyVQB0lfJP7Kn/JU9S/7Asv/o+Cvo258Yapa2stxL4D8SMkKF2ET2MjkAZO1FuSzH0ABJ6AV85fsqf8lT1L/sCy/wDo+CgD62ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDm/iP8A8ks8V/8AYFvP/RD14j+yN/zN3/bl/wC169u+I/8AySzxX/2Bbz/0Q9eI/sjf8zd/25f+16APpKiiigDm/hx/ySzwp/2BbP8A9EJVi48JaZc+IL7WJhI1xfWH9nyqWGzyskkgY+8c4J9AKr/Dj/klnhT/ALAtn/6ISukpWuO9jlJPh3pD6LaaX594sFppc2mIwkXc0cuzczEry/7sHPTk8Vs/2HbL4iTWY5JY7gWxtZFUjZMm7cu8YySpzggj7zetaVFU5N7/ANX/AOHF0scleeFL64/tnZLbj7f4g0/U4ss3EUH2PeDx94/ZnwBkcrkjJxNcajr9z44vdK0y502G0s9Ptroi4tJJJHaaSdcbhKoAHkA/dOd3tXBa94x0Ky8Za54Uub7Zrd94t0ee3tfJc70A08k7wu0f6t+CQePcV6BY/wDJU9d/7Aum/wDo++pATtqPiKyZjd6JBfQgDD6ddDzCe/7uQKAB7OSfT1taV4i03WJpLe0nZLuEZltLiNoZ4xkgExuA20kHDYwccE1p1Q1XRLHWY4xexHzYW3QXEbFJYW9Uccqf59DkUAX6KwLHUb3Sr6LSvEMqzGY7bPUQoUXB/uOBwsuPThuSMcqN+gAooooAKKKKACiiigAooooAKKKKACiiigAooooA+bfFf/Nvf/bp/wC2de3ePP8AkXbX/sNaV/6cLevknVvi5/an/Cvf+JJ5X/CF+V/y97vtmzyf9geXnyf9r73tz7j4P+Jeq/GuCez0zw9Z6Xb6XqGnXV1NcamzvtS5WbCIIMMSIGHLL1FAHtNFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB4l+1X/ySzTf+w1F/wCiJ6+Sa+tv2q/+SWab/wBhqL/0RPXyTQB9v+AbPxi3w28NNZ67ocVudJtTFHLoszuq+SuAzC6UMQOpAGfQdK6D7D43/wChh8P/APghn/8Akyj4cf8AJLPCn/YFs/8A0QldJQBzf2Hxv/0MPh//AMEM/wD8mUfYfG//AEMPh/8A8EM//wAmV0lFAHN/YfG//Qw+H/8AwQz/APyZR9h8b/8AQw+H/wDwQz//ACZXSUUAc39h8b/9DD4f/wDBDP8A/JlH2Hxv/wBDD4f/APBDP/8AJldJRQBzf2Hxv/0MPh//AMEM/wD8mUfYfG//AEMPh/8A8EM//wAmV0lFAHN/YfG//Qw+H/8AwQz/APyZXy/4L0yDVP2sLmw8Q29nqaSatqQuY5LYGGVgs5z5blsDcMgEnHHJxmvsSvknwH/yeTdf9hrVf/QLigD6t0/TbHSLCOx0qzt7G0iz5dvbRLHGmSScKoAGSSfqas0UUAFFFFAFHVdF0rXrVbXXNMs9St0cSLFeW6zIrAEBgGBGcEjPuapaf4K8K6Rfx32leGtHsbuLPl3FtYRRyJkEHDKoIyCR9DW3RQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVR1nS4tZ0meymZozIAY5V+9DIDlJF91YAj3FXqKAMvw7qcmraJFPdII7uNnguowCAs0bFHxnB27lJB7gg96+Xf2q/+Sp6b/2BYv8A0fPX0xpa/Y/GWuWiIwjuY7e/DFsguwaJgB2wIEPoS2eua+Z/2q/+Sp6b/wBgWL/0fPQB9JfYfG//AEMPh/8A8EM//wAmUfYfG/8A0MPh/wD8EM//AMmV0lFAHN/YfG//AEMPh/8A8EM//wAmUfYfG/8A0MPh/wD8EM//AMmV0lFAHN/YfG//AEMPh/8A8EM//wAmUfYfG/8A0MPh/wD8EM//AMmV0lFAHN/YfG//AEMPh/8A8EM//wAmUfYfG/8A0MPh/wD8EM//AMmV0lFAHN/YfG//AEMPh/8A8EM//wAmUfYfG/8A0MPh/wD8EM//AMmV0lFAHN/YfG//AEMPh/8A8EM//wAmV82/sqf8lT1L/sCy/wDo+Cvravkn9lT/AJKnqX/YFl/9HwUAfW1FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAc38R/+SWeK/wDsC3n/AKIevEf2Rv8Ambv+3L/2vXt3xH/5JZ4r/wCwLef+iHrxH9kb/mbv+3L/ANr0AfSVFFFAHG6J4c8Y6DoGn6RZ+JNDe30+1jtYml0KYuyooUFiLsDOBzgCr32Hxv8A9DD4f/8ABDP/APJldJRQBzf2Hxv/ANDD4f8A/BDP/wDJlH2Hxv8A9DD4f/8ABDP/APJldJRQB8geLEvov2urFNVuLe5uxrWl+ZLbW7Qxt8sGMIzuRxgfeOTzx0H03Y/8lT13/sC6b/6Pvq+bfHn/ACeTa/8AYa0r/wBAt6+krH/kqeu/9gXTf/R99QB0lFFFAFTVdLtdZ0uewv0LwTLg7WKsp6hlYcqwIBDDkEAiqHhy/uZY7nTdUffqOmuIppMY89CMxzAf7Q6+jK47VtVg6sn2HxRpOpxjC3BbT7nGACrAvGx9cOu0f9dTQBvUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfm5X0j+yN/zN3/bl/wC16+bq+kf2Rv8Ambv+3L/2vQB9JUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHiX7Vf/JLNN/7DUX/AKInr5Jr62/ar/5JZpv/AGGov/RE9fJNAH2/4B8feD7P4beGrW88WaHBcQ6TaxyxS6lCrxsIVBVgWyCCMEGug/4WP4I/6HLw/wD+DSD/AOKr5/8ADn7Lv/CQeFdK1n/hL/s/9o2UN35P9mb/AC/MQPt3eaM4zjOBWl/wyN/1O3/lJ/8At1AHt3/Cx/BH/Q5eH/8AwaQf/FUf8LH8Ef8AQ5eH/wDwaQf/ABVeI/8ADI3/AFO3/lJ/+3Uf8Mjf9Tt/5Sf/ALdQB7d/wsfwR/0OXh//AMGkH/xVH/Cx/BH/AEOXh/8A8GkH/wAVXiP/AAyN/wBTt/5Sf/t1H/DI3/U7f+Un/wC3UAe3f8LH8Ef9Dl4f/wDBpB/8VR/wsfwR/wBDl4f/APBpB/8AFV4j/wAMjf8AU7f+Un/7dR/wyN/1O3/lJ/8At1AHt3/Cx/BH/Q5eH/8AwaQf/FUf8LH8Ef8AQ5eH/wDwaQf/ABVeI/8ADI3/AFO3/lJ/+3Uf8Mjf9Tt/5Sf/ALdQB7d/wsfwR/0OXh//AMGkH/xVfNHw6uYLz9r+W6s5o57ebVtTkilicMkimOchlI4IIOQRXU/8Mjf9Tt/5Sf8A7dXE/CDSP+Ef/agtNG8/7R/Z17f2nnbNnmeXDMm7bk4zjOMmgD7IooooAKKKKACiiigAooooAKKKKACsjVfFnhzQbpbXXNf0vTbh0EixXl7HC7KSQGAYg4yCM+xrXr5J/ar/AOSp6b/2BYv/AEfPQB9Jf8LH8Ef9Dl4f/wDBpB/8VR/wsfwR/wBDl4f/APBpB/8AFV8//wDDLv8A1N//AJTP/ttH/DLv/U3/APlM/wDttAH0B/wsfwR/0OXh/wD8GkH/AMVR/wALH8Ef9Dl4f/8ABpB/8VXz/wD8Mu/9Tf8A+Uz/AO20f8Mu/wDU3/8AlM/+20AfQH/Cx/BH/Q5eH/8AwaQf/FUf8LH8Ef8AQ5eH/wDwaQf/ABVfP/8Awy7/ANTf/wCUz/7bWR4c/Z6/4SDxp4m0D/hJ/s/9g/Zf3/8AZ+7z/PjL/d8wbduMdTn2oA+l/wDhY/gj/ocvD/8A4NIP/iqP+Fj+CP8AocvD/wD4NIP/AIqvEf8Ahkb/AKnb/wApP/26j/hkb/qdv/KT/wDbqAPbv+Fj+CP+hy8P/wDg0g/+Ko/4WP4I/wChy8P/APg0g/8Aiq8R/wCGRv8Aqdv/ACk//bqP+GRv+p2/8pP/ANuoA9u/4WP4I/6HLw//AODSD/4qj/hY/gj/AKHLw/8A+DSD/wCKrxH/AIZG/wCp2/8AKT/9uo/4ZG/6nb/yk/8A26gD27/hY/gj/ocvD/8A4NIP/iqP+Fj+CP8AocvD/wD4NIP/AIqvEf8Ahkb/AKnb/wApP/26j/hkb/qdv/KT/wDbqAPbv+Fj+CP+hy8P/wDg0g/+Krzbx98frHw54qSx0XVtPvNPayjmFxZWS6jmUvIHRmW6iC4VYyB8x+Y5xxnmv+GRv+p2/wDKT/8AbqP+GRv+p2/8pP8A9uoA7zRPiPPqmgaff3nxG8B2FxdWsc0tpLanfbsyhjG2b0HKk4OQOnQVd/4Tn/qqfw//APAX/wC7q82/4ZG/6nb/AMpP/wBuo/4ZG/6nb/yk/wD26gD0n/hOf+qp/D//AMBf/u6j/hOf+qp/D/8A8Bf/ALurzb/hkb/qdv8Ayk//AG6j/hkb/qdv/KT/APbqAPTdK8YaPD4gbUdc+JHg28jNqYFjs2S3IO8MCWa5kyOvGB1HPr4B+0rrela98SdPutD1Oz1K3TSY42ls7hZkVhNMSpKkjOCDj3Fdl/wyN/1O3/lJ/wDt1H/DI3/U7f8AlJ/+3UAe3f8ACx/BH/Q5eH//AAaQf/FUf8LH8Ef9Dl4f/wDBpB/8VXxt8Kvh1/ws3xVc6N/an9meRZNd+d9n87dtdE27dy/385z2r1v/AIZG/wCp2/8AKT/9uoA9u/4WP4I/6HLw/wD+DSD/AOKo/wCFj+CP+hy8P/8Ag0g/+KrxH/hkb/qdv/KT/wDbqP8Ahkb/AKnb/wApP/26gD27/hY/gj/ocvD/AP4NIP8A4qj/AIWP4I/6HLw//wCDSD/4qvEf+GRv+p2/8pP/ANuo/wCGRv8Aqdv/ACk//bqAPbv+Fj+CP+hy8P8A/g0g/wDiqP8AhY/gj/ocvD//AINIP/iq8R/4ZG/6nb/yk/8A26vJPir8Ov8AhWXiq20b+1P7T8+yW7877P5O3c7pt27m/uZznvQB9k/8LH8Ef9Dl4f8A/BpB/wDFUf8ACx/BH/Q5eH//AAaQf/FV4j/wyN/1O3/lJ/8At1H/AAyN/wBTt/5Sf/t1AHt3/Cx/BH/Q5eH/APwaQf8AxVfL/wCzVrelaD8SdQutc1Oz023fSZI1lvLhYUZjNCQoLEDOATj2Ndl/wyN/1O3/AJSf/t1H/DI3/U7f+Un/AO3UAe3f8LH8Ef8AQ5eH/wDwaQf/ABVH/Cx/BH/Q5eH/APwaQf8AxVeI/wDDI3/U7f8AlJ/+3Uf8Mjf9Tt/5Sf8A7dQB7d/wsfwR/wBDl4f/APBpB/8AFUf8LH8Ef9Dl4f8A/BpB/wDFV4j/AMMjf9Tt/wCUn/7dR/wyN/1O3/lJ/wDt1AHt3/Cx/BH/AEOXh/8A8GkH/wAVV3SvFnhzXrprXQ9f0vUrhEMjRWd7HM6qCAWIUk4yQM+4rwT/AIZG/wCp2/8AKT/9ur1L4VfDa++GWlXOlf27b6np88zXOP7PaGVZWVF+/wCaw27U6bc5Oc9qAOpg8WeHLrWTpFrr+lzamrvGbKO9jaYMmdy7Ad2RtORjjB9KJ/Fnhy11kaRda/pcOps6RiykvY1mLPjauwndk7hgY5yPWiC28RrrJlutV0uTTN7kW0emSJMF52jzTOVyOMnZzg8DPBPbeI21kS2uq6XHpm9CbaTTJHmK8bh5onC5PODs4yODjkANV8WeHNBultdc1/S9NuHQSLFeXscLspJAYBiDjIIz7Gi+8WeHNLtbS61PX9Ls7e+TzLWW4vY40uFwDuQkgMMMpyM9R60arbeI5rpW0PVdLs7fYA0d5pklw5bJyQyzxgDGOMHoeecAvrbxHJa2i6Zqul29wiYupLjTJJklbA5RROhQZ3cEv1HPGSAEvizw5Bo0Orz6/pcemXDmOG9e9jEMjc/Krk7SflbgH+E+lEXizw5Po02rwa/pcmmW7iOa9S9jMMbcfKzg7QfmXgn+IetEtt4jOjQxQarpaamrkzXL6ZI0LrzwsQnDKfu8lz0PHPBFbeIxo00U+q6W+ps4MNymmSLCi8cNEZyzH73IcdRxxyAFj4s8Oapa3d1pmv6XeW9inmXUtvexyJbrgnc5BIUYVjk46H0ql/wsfwR/0OXh/wD8GkH/AMVV2xtvEcdrdrqeq6XcXDpi1kt9MkhSJsHl1M7lxnbwCnQ885HkHjH9nG+8b+LLzxDqvjG3hu7zZ5iW2jssY2IqDAa4J6KO/WgD1L/hY/gj/ocvD/8A4NIP/iqP+Fj+CP8AocvD/wD4NIP/AIqvEf8Ahkb/AKnb/wApP/26j/hkb/qdv/KT/wDbqAPbv+Fj+CP+hy8P/wDg0g/+Ko/4WP4I/wChy8P/APg0g/8Aiq8R/wCGRv8Aqdv/ACk//bqP+GRv+p2/8pP/ANuoA9O8fePvB958NvEtrZ+LNDnuJtJuo4ootShZ5GMLAKoDZJJOABXj/wCy74j0Pw//AMJT/b2s6fpnn/ZPK+23SQ+Zt87O3cRnGRnHqK0v+GRv+p2/8pP/ANuo/wCGRv8Aqdv/ACk//bqAPbv+Fj+CP+hy8P8A/g0g/wDiqP8AhY/gj/ocvD//AINIP/iq8R/4ZG/6nb/yk/8A26j/AIZG/wCp2/8AKT/9uoA9u/4WP4I/6HLw/wD+DSD/AOKo/wCFj+CP+hy8P/8Ag0g/+KrxH/hkb/qdv/KT/wDbqP8Ahkb/AKnb/wApP/26gD27/hY/gj/ocvD/AP4NIP8A4qj/AIWP4I/6HLw//wCDSD/4qvEf+GRv+p2/8pP/ANuo/wCGRv8Aqdv/ACk//bqAON8aa3pV1+1hbava6nZzaYurabIb2O4VoQqLBubeDtwNpyc8YPpX0l4c1vSte+JOv3Wh6nZ6lbppOnRtLZ3CzIrCa9JUlSRnBBx7ivH/APhkb/qdv/KT/wDbq9X+GXw4n+HllJaz6xHqafZYrWEpZmAoqTXE2WzI+4lrlhxjAUdetAHd0UUUAFYPjXyV8Kz3FzIsUdnNBdmRm2hPKmSTJPYfLz2xnPFb1ZviPSP+Eg8K6ro3n/Z/7RsprTztm/y/MQpu25GcZzjIoAzf+Fj+CP8AocvD/wD4NIP/AIqj/hY/gj/ocvD/AP4NIP8A4qvjf4q/Dxvhj4nt9EGrHU1uLNLsy/Z/JAJeRNu3c2cbCc571xFAH3//AMLH8Ef9Dl4f/wDBpB/8VR/wsfwR/wBDl4f/APBpB/8AFV8AUUAff/8AwsfwR/0OXh//AMGkH/xVH/Cx/BH/AEOXh/8A8GkH/wAVXwBRQB9//wDCx/BH/Q5eH/8AwaQf/FUf8LH8Ef8AQ5eH/wDwaQf/ABVfAFFAH3//AMLH8Ef9Dl4f/wDBpB/8VR/wsfwR/wBDl4f/APBpB/8AFV8AUUAff/8AwsfwR/0OXh//AMGkH/xVH/Cx/BH/AEOXh/8A8GkH/wAVXwBRQB9//wDCx/BH/Q5eH/8AwaQf/FUf8LH8Ef8AQ5eH/wDwaQf/ABVfAFFABX0j+yN/zN3/AG5f+16+bq+kf2Rv+Zu/7cv/AGvQB9JUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHiX7Vf/ACSzTf8AsNRf+iJ6+Sa+tv2q/wDklmm/9hqL/wBET18k0Aff/wAOP+SWeFP+wLZ/+iErpK5v4cf8ks8Kf9gWz/8ARCV0lABRRRQAUUUUAFFFFABRRRQAV8k+A/8Ak8m6/wCw1qv/AKBcV9bV8k+A/wDk8m6/7DWq/wDoFxQB9bUUUUAFFFFABRRRQAUUUUAFFFFABXyT+1X/AMlT03/sCxf+j56+tq+Sf2q/+Sp6b/2BYv8A0fPQB9JUVj2Phiw069jure41V5I84W41e6nQ5BHKPIVPXuOOvUUX3hiw1G9kuri41VJJMZW31e6gQYAHCJIFHTsOevU0AMTSrh/FlxqE2zyFSMQ7sk5AbOMNgdR1U5rbrn/+EL0v/n61z/wf33/x6tDVNFtdY8r7XLfR+Vnb9k1Ce2znGc+U67unGc45x1NAGhXI/Dj/AJLP8S/+4V/6TvV7/hC9L/5+tc/8H99/8ernPAHhuxuPih8RdNkn1MQQvpbq8eq3KTE/Z5PvTLIJGHzHgsR044GAD2eiub/4QPSP+fzxB/4Ueof/AB+tKy0G0sNKuNPgm1BobjdvefUriaUbl2nbK7l04HG1hg8jB5oA0qK5v/hA9I/5/PEH/hR6h/8AH6u6V4ZsdGumuLOfVJHZChF5q11dJjIPCSyMoPHUDPUZ5NAGvXklp4S8OatbwLqOj6SJ9T8RarHPfzafDJPJsvLkrGHdTgkJjJydqkDBwR3dz4K0u6upbiW61xXmcuwi1++jQEnJ2oswVR6AAAdAK5zw+kUPghdEi02PVjda1qkEcF/MXTal9cEvK7hmbAHXDMWI9SQAJongDwdD4j1TST4b0W/gtooZlkm0qAtCzlwYiwjAbhFbByw388Fagb4c+ENZ8SavaTaFpOnR6esaQw2+m2ql1eMN55JQkjcWQA8Zjbg5rrPDTJZSXWjHSbTSprfFx5dkcwyrIzfODtX5iytuBGc85Oc1oajoWk6wyNqum2l60YIQ3EKuQD1HI6HHI6GgDkvDPgrwjqXhe3vLrwb4elmIkUSJpVuBcKrsqyjCkAOqhx7MK5228D+FF8J6b4kOlaNJdXUkDPbPpNuIXaRwrW4j8sMpBYqP4gV+bPzA+ufJFFwAiIOgGAAK4m1lhSaHxUfCmmw2926OLtGH2xUk2qJXXYBnG3cAxIUdyNtAFvwPptjpGqeLrHSrO3sbSLWk8u3toljjTNhaE4VQAMkk/U11tctoECXWseOLeUyKk2rIjGKRo3AOnWgO11IZT6EEEdQal/4QPSP+fzxB/wCFHqH/AMfoA6Sis3SNBtNE877FNqEvnbd323Uri7xjONvnO23rzjGeM9BWb/wgekf8/niD/wAKPUP/AI/QB0lFYmn+EtO0y/ju7a51h5Y87VudbvLiM5BHMckrKevcHB56ijUPCWnanfyXdzc6wksmNy22t3lvGMADiOOVVHTsBk89TQB8yfsqf8lT1L/sCy/+j4K+tq+Sf2VP+Sp6l/2BZf8A0fBX1tQAUUUUAFFFFABXyT+1X/yVPTf+wLF/6Pnr62r5J/ar/wCSp6b/ANgWL/0fPQB9bUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB8k/tV/8lT03/sCxf+j568o8J6VBr3jTRNIvGkS31DUILWVoiA6q8iqSpIIzg8ZBr1f9qv8A5Knpv/YFi/8AR89ebfDj/kqfhT/sNWf/AKPSgD6S/wCGVPBH/QV8Qf8AgRB/8Zo/4ZU8Ef8AQV8Qf+BEH/xmvbaKAPEv+GVPBH/QV8Qf+BEH/wAZo/4ZU8Ef9BXxB/4EQf8AxmvbaKAPEv8AhlTwR/0FfEH/AIEQf/GaP+GVPBH/AEFfEH/gRB/8Zr22igDxL/hlTwR/0FfEH/gRB/8AGaP+GVPBH/QV8Qf+BEH/AMZr22igDxL/AIZU8Ef9BXxB/wCBEH/xmj/hlTwR/wBBXxB/4EQf/Ga9tooA8S/4ZU8Ef9BXxB/4EQf/ABmj/hlTwR/0FfEH/gRB/wDGa9tooA8S/wCGVPBH/QV8Qf8AgRB/8ZroPhj8P9K+HHjTxHpGh3F5Pbzafp90zXjqzhjJdqQCqqMYQdvWvTa5ux/5Knrv/YF03/0ffUAdJRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAeJftV/wDJLNN/7DUX/oievkmvrb9qv/klmm/9hqL/ANET18k0AfXXgLTNAvvh5oE7/B6S/dtPhV7uTT9NU3DKgVpP3syuQxBYMwG4EHvXQf2B4f8A+iJf+SWk/wDyRXS/Dj/klnhT/sC2f/ohK6SgDzb+wPD/AP0RL/yS0n/5Io/sDw//ANES/wDJLSf/AJIr0migDzb+wPD/AP0RL/yS0n/5IqlKngqz1mHT9U+DV5ZiVC5uk8NW13DGOcbmtjKQSVxjBPIJABzXq1FAHm32T4Y/9CD/AOWRc/8AyNR9k+GP/Qg/+WRc/wDyNXpNFAHm32T4Y/8AQg/+WRc//I1H2T4Y/wDQg/8AlkXP/wAjV6TRQB5t9k+GP/Qg/wDlkXP/AMjV85XmgeOtA+KWp+IfAvhXXLNI9Qun06WLQ5QiQuzqu2N48AbGwAV49BivtaigDm/AGp3Wr+EEur67uLyUXt7Cs91AIZXSO6ljTegRNrbEUEbVOc5ANdJWD4TWK3g1WwiI3Wuq3JkXOSrTP9o5+onB/Gt6gAooooA4T4s61rei+HLFvDVzeQX1zdSxRiysxcyysLO4kjQIUfgyxx5IHC55AyR4p8N/id8RfFXxQ0/wr4g8TXtmJpJ47lItPtY5oWjikbaQ8Jw25ACCOOe/T6C8Uf8AIxeDP+w1J/6b7yvmTwml9L+11fJpVxb212da1Ty5bm3aaNflnzlFdCeMj7wweeehAPq3V9Lu9S8n7HruoaR5e7d9ijt283OMbvOifpjjGOpznjBe6Xd3WlW9pBruoWc0W3fewR25lmwuDuDxMgyeTtVeRxgcUavBrk3k/wBg6jp9ljd5v22we539Mbds0e3HOc5zkdMcl7Brj6Vbx6fqOnwagu3z557B5YpPl+bbGJlK5bBGXbA4560AH9l3f9g/YP7d1D7T/wBBLy7fz/vbunleV0+X7nT35qKx0a+tLW7iuPEuqXz3CbY5riO1D2xwRuTZCqk8g/OGHyjjrmXyNc/sHyv7R0/+1v8An6+wP5H3s/6nzt33eP8AWdeeny1FY23iOO1u11PVdLuLh0xayW+mSQpE2Dy6mdy4zt4BToeecgANK0a+066aW88S6pqqMhUQ3kdqqKcg7h5UKNnjHJxyeOmPlL9pWwudO+JOnxXmrXmqu2kxsJrxIVdR50w2jyo0XHGeRnk89MfVulW3iOG6Ztc1XS7y32ELHZ6ZJbuGyMEs08gIxnjA6jnjB8t+IHwG1X4j6/Bq+ueLrOC4htVtVWz0ZlQqGZgSGuGOcue/pQBZ/t/xH/z+yf8AhB6p/wDHKP7f8R/8/sn/AIQeqf8AxyvYKKAPH/7f8R/8/sn/AIQeqf8Axyj+3/Ef/P7J/wCEHqn/AMcr2CigDx/+3/Ef/P7J/wCEHqn/AMcqr8PNUu9E+IHjXVPEdhrLR6p9h+zXVv4Zv40n8uJ1bEex2TGQPmPPUcdPaqKAOb/4TzSP+fPxB/4Tmof/ABij/hPNI/58/EH/AITmof8AxiukooA5v/hPNI/58/EH/hOah/8AGKP+E80j/nz8Qf8AhOah/wDGK6SigDm/+E80j/nz8Qf+E5qH/wAYrzw61q9rAbew0a63W2q3l/Z3wtNVikAnnlk2vH/ZzqRtl2lSSMjIIIBHs9FAHkmmeMtfsLq5vLjw3JeXt0FWWeSDVVwi52oqrpgAUbmPrljkmtL/AIWV4g/6FL/yFq3/AMra9JooA82PxJ8QEEHwjkHqDDq3/wAra5yPW9fS3t7BtHvG0m2kR4rHydUAAQhkjLjS9xjBA+XPIGCSMg+2UUAed+FvFS2c+t3muadqkFxqmoC6WGz0TUp0jUW0EIBdrVCSTCT93uK6D/hPNI/58/EH/hOah/8AGK6SigDm/wDhPNI/58/EH/hOah/8Yo/4TzSP+fPxB/4Tmof/ABiukooA5v8A4TzSP+fPxB/4Tmof/GKP+E80j/nz8Qf+E5qH/wAYrpKKAPkn9njwV9q8fSf8Jf4a87T7vRZLiz/tSw3RTYlg/eR+YuG+VxyOze9fSX/CuPBH/Qm+H/8AwVwf/E0aH4R/sX/hG/8ATfO/sPRX0r/VbfP3fZ/3n3jt/wCPf7vP3+vHPSUAc3/wrjwR/wBCb4f/APBXB/8AE0f8K48Ef9Cb4f8A/BXB/wDE10lFAHnfj7wD4Ps/ht4lurPwnocFxDpN1JFLFpsKvGwhYhlIXIIIyCK9Erm/iP8A8ks8V/8AYFvP/RD10lABXyT+1X/yVPTf+wLF/wCj56+tq+Sf2q/+Sp6b/wBgWL/0fPQB9bUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFNkOI2I64NeZeBdah1TT9Oln1PxPNqT2xkk+0Wtwtqz7CT+8MYQj0w2DxjNK+/kO2lz0+ivL/C3ijWJ/B2kW2sXbtqhnsJTcdDc207rhv1ZD/u57itlNLuV8e3Fn/busG2isI7tYjdcbzK4IPHTCgYqpLlevn+CuT3+X4ux29FeT+GfEzaknh+LSdW1y61qbyZb63u7WYW7w8CZt8kYXAzkFG5O3GQa3he6yNZk8IGe4M5uPtS6h3FiTu+9/fDfuvXBDU7a2/r+v8n2G9G12/r+vVHdUUUVIBRRRQAUUUUAFFFcy+p33iW8ltPD032XTYXaO51UAFpHHBjgBBBwchpDwCMAMclQDT1PxDpmkTJb3dxm6kUtHaQI0s8gBAJWNAWIBIycYGeTVR9X164jZtL8ObSDhf7TvVtw4z1/drKRx6gH2FaGl6NYaNA0enwCMyHdLKxLyStjG53OWY+5Jq9QB4r8RPg9q3xE8Vxaxq9tZYisY7WOO11l7faVeRmJLWkm4HeuPu4weueOXi+BP/CG6xouvfZtn2TWtP+b+3ftGN13En+r+xR7vvf3xjrzjB+kq5vx5/wAi7a/9hrSv/Thb0AdJRRRQAUUVleKL+fSvCOrahZlVuLWylmiLDIDKhIyO/IpPRDinJpI1aK8+m8X3ugSI95q1rrkLadPeSxQwqkkJjVSOVYjaSdvI645rTuL7X9BXT77V7+3u4LueO3uYI7fyxA0h2oY2ySQGIBDZyDnjGKb0JTurnXUV5loXjqW/h0N7TxTpmsaheyQreaRCImliVv8AWEBG3Jszk7gemOCa37a/8Ra5a3OraNdW0cMVzLDbWEsI2zrHIUYvJnKlirYxwOMg807Mb0dv6/rQ66iuKuPiFo+larr9hr2vaZp9xaTKLWC5uEjcoYEfOCcn5mbmul0G8l1Dw3pt5ckGa4tYpZCBgFmQE8fU0lqr+n4g9Hb+v61NCiiigArm7H/kqeu/9gXTf/R99XSVzdj/AMlT13/sC6b/AOj76gDpKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDxL9qv/klmm/8AYai/9ET18k19bftV/wDJLNN/7DUX/oievkmgD7/+HH/JLPCn/YFs/wD0QldJXN/Dj/klnhT/ALAtn/6ISukoAKKKKACiiigAooooAKKKKACiiigDnmlGk+O1WQ7bbW4QqEkAC5hBO31LPFz9ID+PQ1Q1rS11jS3thK0EwZZIJ0+9DKpyrj1wRyO4yDwah0LWG1O3khvYhbalaMI7y2znY3ZlPdG6q3cdcEEAA1aKKKAOb8Uf8jF4M/7DUn/pvvK+bfAf/J5N1/2GtV/9AuK+kvFH/IxeDP8AsNSf+m+8r5t8B/8AJ5N1/wBhrVf/AEC4oA+tqKKKACiiigAooooAKKKKACiiigAorJ8Saw+h6ZFdRRpIXvLe3Ic4AEkyxk/gGz+FZN14uujpt5q1hbRPpcM0UFtLITm6ZpVR3XHRBnAP8RBPTBJv/X9dwOsorlNU1bxPbeKLTTLOLSWivVmeF5TLuVY9v3sdzu7elCeIddvobjUNI061ubC2neDyvMYT3PltskZP4Rhg2AfvY6jNC1B6HV0Vi22uma41yORI4/7NmEceW5ceSkmT+LkfhWLb+KNc1TULa20yLTId+lW1/I12z/elLjauOw2frR/wPx1/QNv69P8ANHaUVyUXjC4t/HsPhvVbeFRNYxSrdwsdhnYyfu+exWNiD7GtvQdTfV9JW7ljWNjNNHtXp8kjID/47mnbqGzsaVFFFIAooooAKKKKACiiigAooooA5Lw54UvtH/4RL7TLbt/Yvh+TTLjy2Y75W+y4KZAyv+jvycHleOuLnjW7/svQo9XMjRx6bdRXExDEDyt22TPqAjMfwqn4csPENv8A8Il/az3B+zeH5INU8y5D5vD9l2l/mO9vkn+fnq3Pzc9Rc20F7ayW15BHcQSqUkilQMrqeoIPBHtSGrdTxa7vNWi8P6rp13e3IurXTrnWiwmbcgnhXaufQSPMAO2welb/AIBsNUurqz1KK3ureJLy8+13c2oNIt3H5kqqgi3EDDbTkgY28da9Fm0uwuPO+0WNtL58Igm3wq3mRjOEbI5Xk8Hjk1LbWtvZwCG0gjgiBJEcSBVBJyTgepJP1NacytoQ02/68v1uYHxH/wCSWeK/+wLef+iHrpK5v4j/APJLPFf/AGBbz/0Q9dJUFBXyT+1X/wAlT03/ALAsX/o+evravkn9qv8A5Knpv/YFi/8AR89AH1tRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAjDcpXpkYrj/D/hfxRollZ6bJ4m0640y1jEPlDR2SVkAwB5nnkA++38K7Gigd2cg3w/hbTfC8H25luPD5hAnWLH2hEAyjLngEqrdTggda3P7H/wCKlm1bz/8AW2S2vlbOm12bdnP+1jGO1adFD138/wAdxf19zuc2vhExaHoNpb3xjvNEMXk3Yi++FXa6ld33XXIxng4PatP+yf8AiqP7Y87/AJc/svk7P9vduzn8MYrRopttu/8AWugPXf8ArqFFFFIAooooAKKKKAOd1+aTVtRj8M2M7wmaLz9Qmhfa8NuSQFBHKtIQygjkBXIIIFb1tbQ2drFbWkSQwQoEjjjUKqKBgAAdBWH4PAu9Nn10ne+szG7RgxI8jG2AD0HlqjYHGWY9ya6CgAooooAK5vx5/wAi7a/9hrSv/Thb10lc348/5F21/wCw1pX/AKcLegDpKKKKACszxJps2seFtU022ZFmvLSWCNpCQoZkIGcAnHPpWnRRuOLcXdGNL4Y06bw3c6T9mht0u7YwTNbxhScrjPA/GssaR4j1eSztPEI01LKxmSczWsztJeOnKEoUAiG7DEBn6YrraKHq9SbaWOQtPCN5p2j+HW097WLVdJjjhncEiO4i2hZUJC5I43DI+8o96b/YnibT47rSNElsY9Nup5Zkv3mcXFoJHLuqxhCrkFm2sXXGRkHHPY0U7tu43qYtlo1xbTa8zyRsNRnEkJycgeRHH83HXKE8Z4xVzRLKTTfD+n2M7K0ttbRwuUJKkqoBxntxV6ii/wCn4A9Wn/X9aBRRRSAK5ux/5Knrv/YF03/0ffV0lc3Y/wDJU9d/7Aum/wDo++oA6SiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA828b+Crf4m+Krvw5r2qahb6Tp1lZX8VvZeSm6eR7uMuzNGzfdQAAEDrxmvEoPgnoc3xqvvC39o6guk2l7bWnVPPfzrCe53b9u0YaDGNnIbsRz9JWP/JU9d/7Aum/+j76vNrH/k5jXf8AsNab/wCma+oA9C8D3Q034e+HbG8gukuLXS7aGVVtJXAdYlBAZVIPI6gkGt0ava7lDC5TeyoC9pKoyTgDJXA5IFGif8gDT/8Ar1j/APQRRq//AB5R/wDX1b/+jkoAvUUUUAFFFFABRRRQAUUUUAFFFFABWTrOitqDR3mnXP2DVLdSILoJvBHXZIuRvjJ6rkHuCDzWtRQBg23idLe4Sy8SQjSbxiFR3fNvcH/pnLwCf9lsN7Ec1vUyeCK5geG5iSWJxhkkUMrD0IPWsNfB9laIy6Hd32ijYEVLKf8AdRgdNkMgaJfwT0z0oAi8Uf8AIxeDP+w1J/6b7yvm3wH/AMnk3X/Ya1X/ANAuK+lx4bupdS0u61DW7i9XTLhrmJZIIkLOYZIfmKKONsrHAA5x9K+aPAf/ACeTdf8AYa1X/wBAuKAPraiiigAooooAKKKKACiiigAooooA53xzokviHw2unRW/2hXvbV5Y94XMSzoz8kj+EH39Kxr/AMN6paWOpaJpNkJdKlngu7LbIii3Pnq0sWCR8vBdccckdgD3dFC0/r0/yGYuoafcz+MdGvoot1tbQ3KyvuA2lwm3jOTnaelYdvH4j0C1utD0nSGuDNczS2mpmWIQQrLIX/eqWD7lLEYVSGwORk47aihaCOKfwFpWqap4hvdf8O6ZqFzdTKbW4urWKV2QW8a8FgSo3huDj1rn7vwpKuqafNrPgBfE8UWiWtoATaN9nlQvvH76Rf7y8rkHFeq0Uf8AA/BNfqO9/wCvT/I4WPwvcateag8umtosE+mWcdmu+MtaTQySsoARiPkyh44Occ81ueCbLUtP8I2kGuQpDqG+V50jYMoZpWbgjtzW9RTbuTbW4UUUUhhRRRQAUUUUAFFFFABRRRQB4lof7Qfhj/im/wC2vE3/ADBX/tf/AECX/j+/0fb92P8A6+PufL/47XSf8NB/DH/oZv8AyQuf/jdc3/wyp4I/6CviD/wIg/8AjNH/AAyp4I/6CviD/wACIP8A4zQB0n/DQfwx/wChm/8AJC5/+N0f8NB/DH/oZv8AyQuf/jdc3/wyp4I/6CviD/wIg/8AjNH/AAyp4I/6CviD/wACIP8A4zQBZ8a/HL4dav4B8Qabp/iHzru80y5ggj+xXC73eJlUZMYAySOScVt/8NB/DH/oZv8AyQuf/jdc3/wyp4I/6CviD/wIg/8AjNH/AAyp4I/6CviD/wACIP8A4zQB0n/DQfwx/wChm/8AJC5/+N187/tAeMdC8b+PrLUvDF99utItMjgeTyXjw4llYjDqD0ZecY5r2T/hlTwR/wBBXxB/4EQf/GaP+GVPBH/QV8Qf+BEH/wAZoA5r4F/Ejxv8QfH02m+IfE9wbS1smvPLgtLVPNKyxrsY+VnaQ5ztIPoRXveq6NfajdLLZ+JdU0pFQKYbOO1ZGOSdx82F2zzjg44HHXPE+C/gVoXgHXxq/hzXNciuCnlSrK9u6TR7lYowMOQCUGSpDehFdtqujX2o3Sy2fiXVNKRUCmGzjtWRjkncfNhds844OOBx1yAS6vpd3qXk/Y9d1DSPL3bvsUdu3m5xjd50T9McYx1Oc8Yil0a+k0aGyTxLqkVxG5ZtQSO186Uc/KwMJjxyPuoD8o565l1fS7vUvJ+x67qGkeXu3fYo7dvNzjG7zon6Y4xjqc54xFLo19Jo0NkniXVIriNyzagkdr50o5+VgYTHjkfdQH5Rz1yAEWjX0ejTWT+JdUluJHDLqDx2vnRDj5VAhEeOD95CfmPPTBY6NfWlrdxXHiXVL57hNsc1xHah7Y4I3JshVSeQfnDD5Rx1yRaNfR6NNZP4l1SW4kcMuoPHa+dEOPlUCER44P3kJ+Y89MFjo19aWt3FceJdUvnuE2xzXEdqHtjgjcmyFVJ5B+cMPlHHXIB81fFD4r/EHwV8S9U8O6T4snltbQwiN7qytC53wo5yRCo6sew4r1z4BeMNc8a+A77UfEuof2hdQ6m9ukvkJFhBFE2MIoHVm5IzzXD/ABy+EGk2XhPXfHVzrOsahrafZ9z3LQCN8vHDyscS9EPbHI71t/sqf8ks1L/sNS/+iIKAPbaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArG8Y376V4F17UYhl7TTbidQDjJWJmHPbpWzUdzbQXlrLa3kMc9vMhjlilQMkikYKsDwQQcEGgBtnbJZ2MFrEMJDGsagegGB/Kpq5v8A4Vx4I/6E3w//AOCuD/4mj/hXHgj/AKE3w/8A+CuD/wCJoA6Siub/AOFceCP+hN8P/wDgrg/+Jo/4Vx4I/wChN8P/APgrg/8AiaAOkrm/Hn/Iu2v/AGGtK/8AThb185fH57bwN8SbW18L6Nodlb3OkwySRHRrWVCwmnG4B42CkjAJGM4Gc4GPOtM+Imo2Wt6dfXNho8sVlewXbR22j2drI/lSLJtEscIZM7cZHY9xxQB97UV82/8ADXP/AFJP/lW/+00f8Nc/9ST/AOVb/wC00AfSVFfNv/DXP/Uk/wDlW/8AtNafhz9qL/hIPFWlaN/wiH2f+0b2G087+09/l+Y4Tdt8oZxnOMigD3+iiigAooooAKKKKACiiuN13xnrFn45j8M6BoNtqc7WkN08k9+9uER3lQscQuNq+VySQTvAANAHZVzdj/yVPXf+wLpv/o++o+3eN/8AoXvD/wD4Pp//AJDqj4cl1Wb4k6+2uWdnZ3H9k6cFjs7trhCvnXuCWaOMg5zxg9BzzgAHZUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHH3MTT+OPFUSNIjSeHbFQ0UhjcEyXwyrKQVPoQQRXknw5nkufi40808tw8t7pLmWaQu7Z0S9OSxySfckn1r2W1QSfE/X0bOG0TTgcf9dr6vJfBmkHw/8AGybRmmE7adeaPamULtEhj0K8XdjtnGcUAe5aJ/yANP8A+vWP/wBBFGr/APHlH/19W/8A6OSqekXtwmh2Krpl04FvGAytFhvlHIy4NSX093c26xx6VdAiaKT5nh6LIrH+P0FAGtRVH7fc/wDQJvP++4f/AI5UFzryWbKt3ZzQFhlRLNAufzkoA1aKxP8AhKrP+5/5NW//AMdo/wCEqs/7n/k1b/8Ax2gDborE/wCEqs/7n/k1b/8Ax2j/AISqz/uf+TVv/wDHaANuisT/AISqz/uf+TVv/wDHaP8AhKrP+5/5NW//AMdoA26KxP8AhKrP+5/5NW//AMdq5pusQapJMkCsDCFLfOjg7s45RmH8J4+lAF+iiigAooooAK+SfAf/ACeTdf8AYa1X/wBAuK+tq+SfAf8AyeTdf9hrVf8A0C4oA+tqKKKACiiigAoorn/H9xNafDXxNc2k0kE8OkXUkUsTFWRhCxDAjkEHnIoA6CiuDsPBMVnqjafqV14ju4JNz2t8mv3446mOULNhWHZsAMPQjnY/4QPSP+fzxB/4Ueof/H6AOkorjNZ8JWGnacZbFPEt/dOwjhgj8R6gAWPQs3nYRR1LHoPU4B5CHwJq8fibULSPxHrV5d2Wn2d61s+uXkcM7Sy3avEGEu9RiNArEkgqCc5NAHsVFclp3g/SdQ0+G6L+J7UyrloLjxBqCSRnupHn9QfTg9QSKs/8IHpH/P54g/8ACj1D/wCP0AdJRXxh4++Juv2HivWtD0y6vbOHT9QuLaOZNa1F5GRHdFLb7llzwG4Ucj0yKseHvil4o8Sa5FpdosMEsqSOHn1vWdoCRs5Hy3bMSQpAABySBQB9j0V80zWvxmtbVrq98LG3tY13yzHxLqMnloOSxRL9nOBzhVLegJ4q3d6Z8VlupbfR7XTtckgKrOLDxLq4WIsocAtLdoudrKcAk4ZT3oA+i6K+bGsfjHbjzdS8OpYWq5Mt1J4l1KRIlAyWZYr53x9FNdv8LLB/Fuj603iW4v0vtL1mfTWOm+ItTELiJU+Yb7gk5LHnjjHAoA9crE8T+MvD3gywW78T6tb6fE/+rWQlpJcEA7I1yz43LnaDgHJwKrf8IHpH/P54g/8ACj1D/wCP0f8ACB6R/wA/niD/AMKPUP8A4/QB5t/w1X4I/wCgV4g/8B4P/j1H/DVfgj/oFeIP/AeD/wCPV6T/AMIHpH/P54g/8KPUP/j9H/CB6R/z+eIP/Cj1D/4/QBxGg/tKeAtb1VLGd9Q0jzMBLjUYEWIsWAClkdtvXO5sKADkivW68/8AGvhOy0jwD4g1LT9Q8QQ3dnplzPBJ/wAJFftsdImZTgzEHBA4IxXoFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHm37Qf/JCfEP8A27f+lMVfNPw/+NfiP4caBPpGh2Wlz281010zXkUjOGKqpAKyKMYQdvWvpb9oP/khPiH/ALdv/SmKub/ZU/5JZqX/AGGpf/REFAHZeGPil4cvND8zX/FvhuO+jurmF/KvY4UkWOd0SRUaRiA6KrD5j97IOMVr/wDCx/BH/Q5eH/8AwaQf/FUeA/8AkXbr/sNar/6cLiukoA5v/hY/gj/ocvD/AP4NIP8A4qj/AIWP4I/6HLw//wCDSD/4qukooA8y8f8Axe0rRtCin8I+JPDd5eF5S6SXK3A2pbTSgbY5VILPHHGDnrIOCSBXi3/DVfjf/oFeH/8AwHn/APj1fTWvF31rw5BEAc37ySZ/hRbeXkf8CKD8a3KAPkn/AIar8b/9Arw//wCA8/8A8eo/4ar8b/8AQK8P/wDgPP8A/Hq+tqKAPkn/AIar8b/9Arw//wCA8/8A8eo/4ar8b/8AQK8P/wDgPP8A/Hq+tqKAPkn/AIar8b/9Arw//wCA8/8A8eo/4ar8b/8AQK8P/wDgPP8A/Hq+tqKAPkn/AIar8b/9Arw//wCA8/8A8eo/4ar8b/8AQK8P/wDgPP8A/Hq+tqKAPkn/AIar8b/9Arw//wCA8/8A8eo/4ar8b/8AQK8P/wDgPP8A/Hq+tqKAPkn/AIar8b/9Arw//wCA8/8A8eo/4ar8b/8AQK8P/wDgPP8A/Hq+tqKAPkn/AIar8b/9Arw//wCA8/8A8eo/4ar8b/8AQK8P/wDgPP8A/Hq+tqKAPkn/AIar8b/9Arw//wCA8/8A8eo/4ar8b/8AQK8P/wDgPP8A/Hq+tqKAPkn/AIar8b/9Arw//wCA8/8A8eo/4ar8b/8AQK8P/wDgPP8A/Hq+tqKAPkn/AIar8b/9Arw//wCA8/8A8eo/4ar8b/8AQK8P/wDgPP8A/Hq+tqKAPkn/AIar8b/9Arw//wCA8/8A8eo/4ar8b/8AQK8P/wDgPP8A/Hq+tqKAPgX4gfEDVfiPr8Gr65b2cFxDaraqtmjKhUMzAkMzHOXPf0rlq/SOigD83KK/SOigD83K6T4cf8lT8Kf9hqz/APR6V6T+1X/yVPTf+wLF/wCj568y8AtOvxJ8NNZxxy3A1a1MUcshRGbzlwGYBioJ6kA49D0oA/QOiub+3eN/+he8P/8Ag+n/APkOj7d43/6F7w//AOD6f/5DoA6Siub+3eN/+he8P/8Ag+n/APkOj7d43/6F7w//AOD6f/5DoA6Siub+3eN/+he8P/8Ag+n/APkOj7d43/6F7w//AOD6f/5DoA6Subsf+Sqa5/2BdN/9H31H27xv/wBC94f/APB9P/8AIdZsFt43h8VX2s/2J4fb7XZW1p5P9tz/ACeS877t32TnPn4xjjb3zwAcRo+seHH8FeE7qz8Z3Fz4muJtIFxbHxRPNJI8k8AnVoDMQflaQFduAM8DFek2P/JU9d/7Aum/+j76j7d43/6F7w//AOD6f/5Do0HT9c/4SrVNZ1610+0+1WVraRQ2V49z/qnuHLMzRR4z54AAB6GgDpKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDm7H/kqeu/8AYF03/wBH31ebWP8Aycxrv/Ya03/0zX1ek2P/ACVPXf8AsC6b/wCj76vG49Quov2159NSXFpcTRzyx7R8zx6W6oc4yMCV+AcHdz0GAD2bSLK1vPs/2u2hn2aZa7fNjDbc+ZnGfpWp/Ymlf9Ayz/8AAdf8KpeH/wDll/2DLT/2pW3QBz2uQaXpsVv5FrZW9086NCxRYwNjqzEtjgYGPxp+ntavr0LwXsN7cNbSmeWNw38UWBgHgdcD6981oS/8h+0/69Z//QoqvUAFFFFAGPq/iW20fUrWwe1vbq5uo3lSO0g8whEKhieeOXX86qSeN9MCWBtIL69e+WVoora2JdfKYLIGU4KkMwBB71zfxAvbKx8d6FJqPilvDEZsLtRdq0K7zvg+T96jLz14GeK5tr21sJvDjaj4ok8PWyjU0h1b9zG14pmjIc+cjLl+WOAM4yMA4prVL5/qVbX+ux6VP4xtreazgfTNVNzeJJIlutrmRURlDMwzwMuv51qaTq1prViLqwdim9o3WRCjxupwyspwVIPY158vi3w5p3ijw7f3ni61vrI6dewLqlzPEomk82A7coFTIHYAdK6Lww1xLb+I9V0+Lel/fPNYLMCiyhYY4w3TIVmQnPcc96LaX8n+dvy1J7G5a65YXmvX2kW0u+8sI45LhQOEEm7aM+uFJx9PWqml/wDI2a9/27/+gGuX8FW+oWPj/Vbe/sVilbTLWS4mFwHMkhknJc4A+8S3HYACuo0v/kbNe/7d/wD0A0NWDq/66G3RRRSAKKKKACvknwH/AMnk3X/Ya1X/ANAuK+tq+SfAf/J5N1/2GtV/9AuKAPraiiigAooooAK5v4j/APJLPFf/AGBbz/0Q9dJXN/Ef/klniv8A7At5/wCiHoA6SuP1TxTdeFr5NMv0/tG61ByNJYMsZmYsB5cvZdu4fPjBHbdgN1Ml9aw3sFnLPGtzcBmiiLfM4X7xA9Bkc+4rLt/CtlnUJdU/4mVxqOVnlnUf6rOViUD7qL2A7/MeTmgC9pFvfW2momrXgvLxiXlkRAiAk52oP7o6DOTgcnNZFj/yVPXf+wLpv/o++rUtQmi2EFvqGombMvkwzXBAdsn5EJ/ibtnqfqayrIgfFLXSTgDRdOyT/wBdr6gDV1hdRFslxpEqedbtva3lwEuFxyhbqp7huxHORmsLQPEc/jW9jvtFlNrolo2JWZVMt3Lt5jxztRcjLdWONp28tp39laeLtKtxFfmTSpm3zLbsNt5GMjYW/uE9cfeAxnBOZzocMWrQ6hp7/Y5FQRTRxqNk8YGFVl9V/hYcjkdDigD4T+I//JU/Ff8A2Grz/wBHvSfDpQ3xR8KqwBB1mzBBHX98ldl4/wDhR4zuvFXjDxHbaQkulQ6je3Uk63sBKRh2kJKb9wO3BxjPPSrXhb4LfEjw94ktdVuPBpvVtg5WIanaoQ5RgjhizAFGKuPlPKigD6yil1WTxBdW9zZ240gQKYZxJl3c/eUr6f8A1uTuIXxv9njVvEF78OjNaQW96Tri21y8ziLyraO0t41KhRyQiKO5JAz1LB11rv7Qd7YS2c/gvR445ozG8tvcxLKARglS1wyhsdCVIB7HpWF4D0j4z/Drwy2k+H/BFnJ5tw08z3moQOrMQBkKsqkHCqPvEfL0ySSAe2/Ef/klniv/ALAt5/6IeuZ+DKhV8eKoAA8ZagAAOn+rrlrrWPjtq1pNp+teAdIk0+6jaG5jtbyGOSSNgQyhnmkUZB7qa7H4O6DrehaL4gfxHpP9kXGp69c6hFafaUn8uORY8DehIOCCOx4zgZoA9CooooAKKKKAOb+I/wDySzxX/wBgW8/9EPXSVzfxH/5JZ4r/AOwLef8Aoh66SgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDzb9oP/khPiH/t2/8ASmKub/ZU/wCSWal/2Gpf/REFdJ+0H/yQnxD/ANu3/pTFXN/sqf8AJLNS/wCw1L/6IgoA9J8B/wDIu3X/AGGtV/8AThcV0lc34D/5F26/7DWq/wDpwuK6SgAoorI8QaxJplvFb2EIudUvX8qzt88Fu7t6Ig+Zj6DAySAQCtaH+0/HF3dgZg0q3+xRsGPzTSFZJRjocKsIB55ZxxznoKoaJpSaLo8FikrTsgLSzuAGmkYlnkbHGWYknHHNX6ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorG1nxXpeg39tZah9ta5u43lhitNPnumZUKhziJGIALr1/vCqn/AAnmkf8APn4g/wDCc1D/AOMUAdJRVHStXttZtWuLOO8jRXKEXllNavnAPCSqrEc9QMdRng1aubhLW1luJRIyQoXYRRtI5AGTtRQWY+gAJPQCgCSiub/4TzSP+fPxB/4Tmof/ABiruleJbHWbprezg1SN1QuTeaTdWqYyBw8saqTz0Bz1OODQBr0UVz9z400u1upbeW11xnhcoxi0C+kQkHB2usJVh6EEg9QaAOgorn7bxppd1dRW8VrrivM4RTLoF9GgJOBudoQqj1JIA6k10FABRWRqviWx0a6W3vINUkdkDg2ek3V0mMkcvFGyg8dCc9DjkVS/4TzSP+fPxB/4Tmof/GKAPm39qv8A5Knpv/YFi/8AR89ebfDj/kqfhT/sNWf/AKPSuy/aJ8T6X4q+JFtc6LLNLHa6etpN51tJAySpNLuUrIqtkZAPHXI7Vxvw4/5Kn4U/7DVn/wCj0oA+/wCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDm7H/AJKnrv8A2BdN/wDR99XiP/N9n+f+gZXt1j/yVPXf+wLpv/o++rxH/m+z/P8A0DKAPd/D/wDyy/7Blp/7UrbrE8P/APLL/sGWn/tStugCjL/yH7T/AK9Z/wD0KKr1UZf+Q/af9es//oUVXqACiiigAooooAKKKKACsTS/+Rs17/t3/wDQDW3WJpf/ACNmvf8Abv8A+gGgDbooooAKKKKACvknwH/yeTdf9hrVf/QLivravknwH/yeTdf9hrVf/QLigD62ooooAKKKKACub+I//JLPFf8A2Bbz/wBEPXSVzfxH/wCSWeK/+wLef+iHoAx9F0/xvptxcX99o2gX+qXXE922tzJhQfljRfsh2IOy5POSSSc10uo3PiOLy/7I0rS7rOfM+1anJBt6YxtgfPf0xgdc8a9FAHKXjeL9Qs5bS98MeHZoJl2vG+uzkMP/AADrk5PB3j6fWJJr0aNd6fc2kFrc2jarMkkscMk7IjzC2O9SJ/m+VS20A9y3q9FAGNZS+IE0txPpGk29xGCsFvBqUjxEBflBcwKV544U4HPPSqn27xv/ANC94f8A/B9P/wDIddJRQBwWr+HPEniIXsd7p+laUmoWb2d49nqskxuYnGwqVa2UBgrMVfkg8EEEiu5dpxEpjjjaTjcrSEAfQ4OfyqSigCt5l9/z72//AIEN/wDEVLun+z58uPzv7nmHb1/vY9PapKKAK3mX3/Pvb/8AgQ3/AMRUsLTtn7RHGnpskLZ/MCpKKAK3mX3/AD72/wD4EN/8RTo3ujIBLDCqdysxYj8No/nU9FAEEj3QkIihhZOxaYqT+G0/zpvmX3/Pvb/+BDf/ABFWaKAOb+InPw28SLJ8tu2k3YmkXl0XyWyVXgMcZ4JX6jrXSVzfxH/5JZ4r/wCwLef+iHrpKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPNv2g/+SE+If8At2/9KYq5v9lT/klmpf8AYal/9EQV0n7Qf/JCfEP/AG7f+lMVc3+yp/ySzUv+w1L/AOiIKAPSfAf/ACLt1/2GtV/9OFxXSVy1hoHiLSoZbXTdY02O2kv7m7zPp0kkm2ad5imRMoBHmEbsHp0q43huW8Y/2zrN/eRkg/Z43FvF+UYDEezMR7UAGoeJkW6k03QYP7V1VQcwo22KA/8ATaUAiPqOOWI6KcGrGj6M9lJJe6jOLzVLgATXATaqqOkca5O1B6ZJJ5JJq9ZWNrptolrp9tDa28YwkUKBFX6AVPQAUUVFc3UNpCZbmQRpnGT3PoB3PsKAJaK5+/8AEskTOlnZuzKMneMsoxnJQcgf7xWo7K21XWLaO6n1Ka1hkBISNQrYz24GM++7tzQB0lFZ8WkeUDnUL6Qnu82f6U/+y4+9zdn3+0v/AI0AXaKpf2XH/wA/F3/4Ev8A41layRaFLa0a/uLiUHIiuZC0S/3yBnv7UAbV9dizt94QyyMwSKIHBdj0H9c9gCag064vJri7jvPI/csqgQqeCRuIJJ54K84FYGm3U8uoQSNG80tsGWSBrw7yxAAdUkxxjPH+17Va0+O4uYZbkW90DNPIzAXmzHzEAEA8EAAfhQB0lFYv2KUdbO9P01OTP/oVJ9lfI/0DUv8AwZN/8coA26K5+4sLiRV8iDUoSOp+3ls/nJVSS1urYbpjrCq5EYxcKcMxwOfOPcigDq6K5mwnaW3gjkt9WkuDFlyt0oBKna5GZB/FVvyzwTa6uD0x9p/+zoA5rxys0Xj/AMPanbbzLpWmaheeWhb94iy2ayLgfeJjd8A5+baccV30UqTQpLEweN1DKynIYHoa5afTrmTxPZX0dtfC2hsriCRmlDTBneEqFJYjaRG273Ce9Xoo1ghWGFNVjSNAqKAMKBwBx6YoA3aK5KG41J55bdL+7eSDAk/0T7uRkZGT2qeAXAvLKCXUNQZpnZZBJGYxgIzAqdo9Bxz1oA6aiqP9l/8AT9e/9/vf6Uf2fMPuaneL/wB+z/NDQBeoqj9kvlPyakzcf8tYVP8A6DimTSavbRF0itr0j+BMwk/TJYfrQBo0VkW3iGGS5+zXsEtlNkDEo+XJ4HP9eh9a16ACszxDqUml6HPPaqJLt9sNrGejzOQqA+24jJ7DJ7Vp0140kKmRFYo25dwztPqPfmgDgPAOnR6R4/8AGFhCzOtvHpyb3+858g5Y+5OSfc16DXFeGP8Akq3jr/uH/wDog12tABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBzdj/yVPXf+wLpv/o++rxH/m+z/P8A0DK9usf+Sp67/wBgXTf/AEffV4j/AM32f5/6BlAHu+lWl1/Z9lc2lzDH5ljBGyywF/ugkEEMP7/6Vd8rVf8An8s//ARv/jlZukW63cdtHNJcBI9NtWVY7h4wCd+ThSM9B+VaX9kW3/PS8/8AA2b/AOKoAhRLpdftvtc0Mv8Aos23yoSmPmiznLNn9K1Ky0tI7XX7bymmbdazZ82d5P4oum4nH4VqUAFFFFABRRRQAUUUUAFYml/8jZr3/bv/AOgGtusTS/8AkbNe/wC3f/0A0AbdFFFABRRRQAV8k+A/+Tybr/sNar/6BcV9bV8k+A/+Tybr/sNar/6BcUAfW1FFFABRRRQAVR1vSoNe0DUNIvGkS31C1ktZWiIDqrqVJUkEZweMg1eooA5v/hF9X/6HvxB/340//wCRaP8AhF9X/wCh78Qf9+NP/wDkWukooA5v/hF9X/6HvxB/340//wCRaP8AhF9X/wCh78Qf9+NP/wDkWukooA5v/hF9X/6HvxB/340//wCRaP8AhF9X/wCh78Qf9+NP/wDkWukooA5v/hF9X/6HvxB/340//wCRaP8AhF9X/wCh78Qf9+NP/wDkWukooA5v/hF9X/6HvxB/340//wCRaP8AhF9X/wCh78Qf9+NP/wDkWukooA5v/hF9X/6HvxB/340//wCRaP8AhF9X/wCh78Qf9+NP/wDkWukooA5v/hF9X/6HvxB/340//wCRaP8AhF9X/wCh78Qf9+NP/wDkWukooA5v/hF9X/6HvxB/340//wCRaP8AhF9X/wCh78Qf9+NP/wDkWukooA5LUvA97q+lXem6h428QTWl5C8E8flWC70dSrDItgRkE8g5rraKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPNv2g/+SE+If8At2/9KYq5v9lT/klmpf8AYal/9EQV0n7Qf/JCfEP/AG7f+lMVc3+yp/ySzUv+w1L/AOiIKAPbaKKKACiiigAJwMngVz483VL+ORWZGmUtG/e3gzjI9Hf17D6c6WrkvaJaoSGu5BDkf3Ty3/joas6w1ITXl4LCH7RctJgrvCpFGvyrk++C2AD96gCa7sophFo1n+4hx5s5QAnbngHOcliO+chTnrVo6SrlTNe3z49Lgpn/AL4xUtjayQLLJcuslxO2+RkGAOMBR7AD+Z71aoAo/wBkWnf7Qx9WuZD/ADag6Lp7IUa3yrAgguxzn8avVFdTi2s5p26RRs5/AZoA5K+ggm1KXyIz5MJwsWW2yyBti7uecyNj6IfWt208PWdnCqwGaOXA3yxSsm8+pAOPwxWdYQYvreF8l1mVXOMbvLi3E/8AfySumoAzJ9MuJU2NdR3SZ+5eW6v+RXb+fNVEsLmy3G3tpYdxyfsVyGBPrskGB+Fb1FAGH/atzAT50sQUf8/cDwf+P8qfwq1Fq0kiFlsnmUfx200ci/8AoQP6VpVj6bplhdadFcT2cEjzFpt7Rjd8zFhz9CKALR1RBnda3gI/6d2OfyzUV1fWt3aS28sd4okUqSLKbKn1Hy9qk/sWwC4SJk6cpK6kfQg5HSl/si2/56Xn/gbN/wDFUAYljdzxX8Ustnd8uxci1kAG9fnx8vTein/gfsa3P7UjwcW14fb7M/P6Un9kW3/PS8/8DZv/AIqj+yLb/npef+Bs3/xVAC/2kxxtsLxs/wDTMDH5kVT1HXbjT4Ypn0uZIWmSJ3lkQbd52qflLcbioJ7Ak9qzbu0iT4g6Pp43m1m0u+mkjaRjveOa0CMSTnIEj/8AfRrZufD2mXVrNA9qiiZChdRhhkEZB6g88H1oApG3uotUubyS8tNP+0oquN/mN8vAOWwAcH0NTW1zpNvMZorh724ZSDMoadiM9BtBAHsMCoPCiQzaJGt1a2y6hZs1rdtHAqZlQ4LAc4DcOBnowrS0z9ybm0xgQSnZ/uN8w/AZI/4DQAv9oSv/AKjT7px/eYKg/wDHiD+lIZdTfPl2ttEMcGSck/kF/rV6igDKuZtVt5IN0tmI5ZBGx8ljtJHHO/ucD8RVgf2ouc/Y5OePvLn+dSajA1zps8acOUJQ+jDlT+YFSW063NpDOn3ZUVx9CM0AY+pR3csls19a23leb5MjRzsSUk+XGCo7lT16gVpaVK82mRecxaVAY5GPUspKk/mKZrOP7HuHPSNRJx/skN/SjTxsutQj7C53AZ7Min+eaAJtQvrfTNNub68fy7e2iaWVvRVGT/KjT5ri5022nvbf7LcSRK8sAfd5TEZK5wM4PGcVka+P7T1bTdDXJjeT7bd4JGIomBVcj+9Js4PBVXHPNb9AHFeGP+SreOv+4f8A+iDXa1xXhj/kq3jr/uH/APog12tABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB5b8TvGV98K9Vl8Xf2Tb6rp+pQ2mmeV9taCWOWNrqXOPLYFSsmM5BBHTnNfO/8Awtz/AIvt/wALH/sT/uHfa/8Ap28j/WbP+Bfd9vevbf2q/wDklmm/9hqL/wBET18k0Affngm+/tTRdM1Dy/K+16JYT+Xu3bNyu2M8ZxnrXT1xvwz/AORL8P8A/Yuab/6LauyoAoy/8h+0/wCvWf8A9Ciq9VGX/kP2n/XrP/6FFV6gAooooAKKKKACiiigArE0v/kbNe/7d/8A0A1t1iaX/wAjZr3/AG7/APoBoA26KKKACiiigAr5J8B/8nk3X/Ya1X/0C4r62r5J8B/8nk3X/Ya1X/0C4oA+tqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA82/aD/5IT4h/wC3b/0pirm/2VP+SWal/wBhqX/0RBXSftB/8kJ8Q/8Abt/6UxVzf7Kn/JLNS/7DUv8A6IgoA9tooooAKKKKAMjW7g2s0MyYLQwzSoGPBYKAP/QqbomnxWF3dRwqoEKRwkj+JsFyT7nf/Ko/ELpHPC0p2p9ncFvTMsIz+tWtFuob37dcWzb0e6PJBGcIg6HkdKANOiiigAqjrPOlSJ/z1ZIumfvOF/rV6qWqjNtCvrdQ5/CRT/SgCjp2ZNVVz0/0pvzmCg/ktbdYmjAm7UlicW5Jz3LSsf6Vt0AFFFFAEN3J5NlPJ02Rs35CksYvJ062iAxsiVcfQCodZJXQb8g4ItpCD/wE1dAAAA4A6UAFFFFABRRRQBz95bTt8SdGulhkNvHpN/G8oQ7FZprMqpPQEhGIHfafQ10FFFACBVUsVUAscsQOpxj+QFUv9Vr4/wCni2Ofqjf/AGyrF206WU7WcaS3CxsYkdtqs+OAT2GazbTUYtVTR9StgwjukYhW4ZcpkqR2IK4I9RQBsUUUUAFUtH40uJB0iLRfTaxX+lXapaUMW8wHQXM2PxkY/wBaAF1dd+iXy/3reQf+Omo7M51W7PQvFC5H1DD+lWb4btOuVPeJh+hrBm1SWx1S1it4luLq+js4URmIG3dK0jkgH7qK5HqcDIzmgDpNo3FsDcRgnHOKWiigDivDH/JVvHX/AHD/AP0Qa7WuK8Mf8lW8df8AcP8A/RBrtaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDxL9qv8A5JZpv/Yai/8ARE9fJNfW37Vf/JLNN/7DUX/oievkmgD7x+Gf/Il+H/8AsXNN/wDRbV2VeV+BvHPhzTvBXh4HxN4cWVdDsbeaG51iOGSJ44/mUrzg/NjBwQQa6L/hZnhz/oZfCf8A4P4//iaAN7UbuKx1iynufMEbRSxBkjZ/nZoyF+UHk7T+VWoNRt7m4EEfnLIVLhZYHjyAQCRuAz1H51yF54/8L6jbi2uPFHhVIWkjaQrrsbHarhiMYHUDHUVD/wALI8H6frEH2rxhos9vHBKkc8d/HI3LRkKwUnkbTz3+tAHf0Vxv/C3fh/8A9Dbpf/f8Uf8AC3fh/wD9Dbpf/f8AFAHZUVxv/C3fh/8A9Dbpf/f8Uf8AC3fh/wD9Dbpf/f8AFAHZUVxv/C3fh/8A9Dbpf/f8Uf8AC3fh/wD9Dbpf/f8AFAHZViaX/wAjZr3/AG7/APoBrI/4W78P/wDobdL/AO/4qjo/xG8FyeIdZuf+Es0VIZvI8tpb+OPdhCDgMQeDQB6BRXN/8LH8Ef8AQ5eH/wDwaQf/ABVH/Cx/BH/Q5eH/APwaQf8AxVAHSUVzf/Cx/BH/AEOXh/8A8GkH/wAVR/wsfwR/0OXh/wD8GkH/AMVQB0lfJPgP/k8m6/7DWq/+gXFfSX/Cx/BH/Q5eH/8AwaQf/FV80fDq5gvP2v5bqzmjnt5tW1OSKWJwySKY5yGUjggg5BFAH13RRRQAUUUUAFFFFABRRRQAUUUUAFFFUE1q0ljWSNbp0YBlZbOYgg9wdtAF+iqP9r23/PO8/wDAKb/4mp7W8hvFcwF/3bbHDxshU4BxhgD0IP40AT0UUUAFFFFABRRRQAUUUUAFFFFABRRRQBTn1BorxraGzuLh1jWRjGUAAYsB95h/dNN+33P/AECbz/vuH/45ULvdLr9z9khhl/0WHd5sxTHzS4xhWz+lLDe6lNLPGtlagwSCNs3bcnarcfu/RhQBL9vuf+gTef8AfcP/AMco+33P/QJvP++4f/jlHm6r/wA+Vn/4Ft/8bo83Vf8Anys//Atv/jdAB9vuf+gTef8AfcP/AMcqazvPtYmBhkgeGTy3STbkHaG/hJHRh3qHzdV/58rP/wAC2/8AjdM0oytcaibhEST7UMqjlgP3MfcgfyoA0aKKKACiiigAooooAKKKKACiiigDzb9oP/khPiH/ALdv/SmKub/ZU/5JZqX/AGGpf/REFdJ+0H/yQnxD/wBu3/pTFXN/sqf8ks1L/sNS/wDoiCgD22iiigAooooA5/xNCtxJHFIdqNbuHP8As+bBn9Ks+H7P7DHfQ+Y0rfa2ZnbGWJVSTxTNfieWSNYhmRradYwDyWwrAfmtWNMuEnvLxojlJvKuFOeoZAv/ALJQBpUUUUAFUdVx9ngJGQLqH8P3gFXqo6xxppfBPlyxScf7Mit/SgCjomwXS7R1tsDj0lfP863KxNMJTUlQ91uR/wB8z8fowrboAKKKKAKOt/8AIA1D/r1k/wDQTV6oL6PzdOuYx/HEy/mDTrR/NsoJB0aNW/MUAS0UUUAFFFFAGRc6rPD4003SFSM291p93dOxB3hopLdVAOcYxM2eOw6c5165u+/5KnoX/YF1L/0fY10lABXK2Mb6b4wk0vYwtpJW1G2bjaPMVhKg75Enzn/rsPSuqqi/7zXoQP8AljbuSPdmUD/0FqAL1FFFABVLS/8AUT/9fMv/AKGau1S0jnTVcdJJJZB/wKRm/rQBNe4/s+4zyPKbP5Vzmgta6r4oub1YWD6Zax2UUh+6wb5nI+jLt+qsK39VbZo16x4xbyH/AMdNRWS7dUueMFYIUOO2N5x/49+tAGhRRRQBxXhj/kq3jr/uH/8Aog12tcV4Y/5Kt46/7h//AKINdrQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAeJftV/8ks03/sNRf+iJ6+Sa+4/iz4UsfG9r4Z8ParLcQ2l5rR8x7ZlWQbLO6cYLAjqo7dK5L/hlTwR/0FfEH/gRB/8AGaAPkmivrb/hlTwR/wBBXxB/4EQf/GaP+GVPBH/QV8Qf+BEH/wAZoA+SaK+tv+GVPBH/AEFfEH/gRB/8Zo/4ZU8Ef9BXxB/4EQf/ABmgD5Jor62/4ZU8Ef8AQV8Qf+BEH/xmj/hlTwR/0FfEH/gRB/8AGaAPkmivrb/hlTwR/wBBXxB/4EQf/GaP+GVPBH/QV8Qf+BEH/wAZoA+SaK+tv+GVPBH/AEFfEH/gRB/8Zo/4ZU8Ef9BXxB/4EQf/ABmgD5Jor62/4ZU8Ef8AQV8Qf+BEH/xmj/hlTwR/0FfEH/gRB/8AGaAPkmivrb/hlTwR/wBBXxB/4EQf/GaP+GVPBH/QV8Qf+BEH/wAZoA+SaK+tv+GVPBH/AEFfEH/gRB/8Zo/4ZU8Ef9BXxB/4EQf/ABmgD5Jr0n9nz/ku3h7/ALef/SaWu/j/AGYbHV/EGu2+leJ7ixtNMvUtI0ubNbiR820MxYsrIOsxGNvQV13w+/Z0/wCEE8d6f4k/4Sj7f9i83/R/7P8AK374mj+95rYxvz0PSgD22iiigAooooAKKKKACiiigAooqvqNw9ppd1cxhS8MLyKG6EhSeaALFYukaXbyaHYu0l0C1vGTtvJVH3R0AbA+lXPK1X/n8s//AAEb/wCOVFa2WpWlnDbR3tqUhjWNS1o2SAMc/vKAJf7Itv8Anpef+Bs3/wAVTNKhWC41GNC5VboYLuzn/Ux9ySTT/K1X/n8s/wDwEb/45UUNlqUMs8i3tqTPIJGzaNwdqrx+89FFAGnRVCKW9i1SK2u5beVJIZJAY4WQgqyDuxz9/wDSr9ABRRRQAUUUUAFFFFABRRRQAUUUUAUYv+Q/d/8AXrB/6FLRYf8AH7qf/X0v/omOiL/kP3f/AF6wf+hS0WH/AB+6n/19L/6JjoAvUUUUAFUbD/j91P8A6+l/9Ex1eqjYf8fup/8AX0v/AKJjoAvUUUUAFFFFABRRRQAUUUUAV7+5e0tfNjjWRzIkaqzbQSzheTg46+lQ+bqv/PlZ/wDgW3/xujV/+PKP/r6t/wD0clXqAPLPj7JqDfA/XxcW1skf+jZZLlmI/wBJi7FB/OsX9lT/AJJZqX/Yal/9EQV0n7Qf/JCfEP8A27f+lMVc3+yp/wAks1L/ALDUv/oiCgD22iiigAooooAo6pmJba6HS3nVm/3WBRvyDZ/CsjSNOn0y5umsAs2yQxSW8jldq5LKUPI5DA4I655ropYknheKVQyOpVlPcHrWHBcvp94TdtkxKIbpieSuf3c30IJDHsfYUAbFpdreQl1R42RijxuMMjDsfzHT1qesu5mTTdRW8ZsW10BHKQMhXH3G49R8uf8AdqdNZ0x8BdQts/3TKoP5ZoAu1Xv4DdadcwA4MsTICOxIqRLiGQApLGwboQwOakoA52xuN+pW8+flllJAx0EkIbn/AIEhFdFXJXSPZarJboBvbEtuMfeKuZFA/EyJ+K+tdINRtPsqXL3EccUihlaRwvH40AWaKo/2vbyEi1Se5I/55REqf+BHC/rVabWJkk2NHbWzZ+7POGk/74TOfzoA1yMjBqlo/Gj26dTEvlH6odp/lVAS6jc9Gu3U94YFt1/8iEt+VMTRJWzutbZMkt++nkn5JyTjgcnnigDfJAGScD1NM86P/non/fQrHHh4f889LBHQrpw/q5pZdHSGKSaaS1VEUsxFkgAA5J70Aa/nR/8APRP++hR50f8Az0T/AL6FcrZwz3F3HG0dmu5trK1mp2fIXPTHTcg+pNa39iuBwdPJ97AY/wDQqANI28D3Ud0YY2njRo45ioLKjFSyhuoBKKSO+0egqWuTnt1g8TWWjmx0mR7u0uLoS/YNoURPCpXG45z54Of9k+taH9kSLz/Zunv0/wBXK8Z6/wC6aANyqNh++u7266hpBCh/2U4/9CL1lJLaR3cltNa39tLEu9zb3EjooJ44Vs/+O1esrMfZV/svVZWhXgA7JFz3zxnP40AP0vUpLu81Gzuo1juLK424UHDxMN0bjPqDg/7StWlXLalFqGleILPV98M4nA0+YLGY1IZsxM5+Y/K+VBH/AD1OR3G39qv0/wBbp27/AK4Tq3/oW2gCe9uPstjPP/zzjZgMZyQKLC3Npp1vbscmKJUJ9SBjNZ19dzXJt4f7Pu1Qyh5fkU8LyBkNjlsd+mamn1d7e3lnl027WKJS7uxjAAAyT9/PT2oAo6vqck95f6XAqmCKxzcSnORJK22NB26Bye/KetaViA1/qMmOfOVM+oEan+ZNc9pqXUdijX9r5U+q34u53d1BABDBceixRqvP93tmuh0cZ01JyPmuWac5/wBs5H5AgfhQBeooooA4rwx/yVbx1/3D/wD0Qa7WuK8Mf8lW8df9w/8A9EGu1oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOb8Uf8jF4M/7DUn/AKb7yukrm/FH/IxeDP8AsNSf+m+8rpKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA5vwv/AMjF4z/7DUf/AKb7Oukrm/C//IxeM/8AsNR/+m+zrpKACiiigAooooAKKKKACiiigDMvNTuIdUjsra1jlLhfnkmKYLCQ9lPaI/mKg1eXUjod8JLS1VPs8m4rdMSBtPQeWM/nSXX/ACNlv/2y/wDQLmrut/8AIA1D/r1k/wDQTQBeooooAKKKKAMy9a4XXLM2kUcr/Z5siSQoMbou4U/youL3UraISSWVqQZEj+W7bqzBR/yz9TUsv/IftP8Ar1n/APQoqNX/AOPKP/r6t/8A0clAE9lc/bNPt7nbs86JZNuc7cjOM/jU9UdE/wCQBp//AF6x/wDoIq9QAUUUUAFFFFABRRRQAUUUUAUYv+Q/d/8AXrB/6FLRYf8AH7qf/X0v/omOiL/kP3f/AF6wf+hS1Xg1GytNR1KO7vLeBzcKwWSVVJHkx84JoA1qKo/23pX/AEE7P/wIX/Gj+29K/wCgnZ/+BC/40AXqo2H/AB+6n/19L/6Jjo/tvSv+gnZ/+BC/40zSp4rm41GW3lSWNroYdGDA/uYx1FAGjRRRQAUUUUAFFFFABRRRQBR1f/jyj/6+rf8A9HJWZ4yvJrHS7WaCWSIi7TcUYjcNrHBx1HHStPV/+PKP/r6t/wD0clYvjJmmutHsDtEdxdAs2OQQQo/9DP6UAc9+0H/yQnxD/wBu3/pTFXN/sqf8ks1L/sNS/wDoiCtL4w30upfs1avdThRI4gBCDA4u4x/Ss39lT/klmpf9hqX/ANEQUAe20UUUAFFFFABVW90+O82vvaGdAQkqdRnsexHsatUUAcve6VqtvavDaFJrdusKj5T9FJymOvyt9BS2uu2kdrFa+IlBnUbWlli+Vjn+6fm9OcY7109FAGQknhyYYRtLbI6fu+n0o8jw3/zy0r/vmOtZlVhhlDfUU3yY/wDnmn/fIoAyjb+HCuNmm4yDxsGKzr5LPTpReaFPp8RAxMrOpGBk7gBzu+h9ODXTeTH/AM80/wC+RQYYj1jT/vkUAcnaXN3qFxHFcmO7kuFZ1ia+2JGoxwyovJOe+f0q1o08lnayRRW+mpKsriYG7KHcGI+6I+Bxx7YrYvrNnjSayWNbmB98eeA3GCpPoQSPyPaoLC2aS4u3u9P8lZJBIgl2NyVAYDBPGVzzjrQAf2ld/wDPPTf/AAPP/wAbo/tC64+bTRn/AKej/wDE1e+x23/PtD/37FH2K1/59of+/YoAzLjWJrZQZTZEHp5cjufyVDVG61n7bB5LywxxlgzgwzAFRyQSVAwcYrofsdt/z7Q/9+xQbK1IwbaEj/rmKAOd02eQLb3b3unLI0bsyvKQQ0jBmzz1GAPbFaJ1KU9NS0tfbcW/9mFaggiAAESADoAoo8mL/nmn/fIoA4+9vcePtJuJL+y3Jpl6gnHESBpbUlW+b7x2grz0V+D22Dq/UjXdHHttz/7VFaR061OpQ3/lYuYYpIUcMQAjlCwxnB5jTkjIxxjJzZoA4631Qw311eQ3sMr3W3efsw2jaMAD99UkGrWTaxZ3LajbLI7Ms4CCL5djY3HcQfmC4+tdbRQBR/tvSv8AoJ2f/gQv+NH9tab/AA3sLc4+Rt2fyq9WXcanLaeJrSwnRfst9A/ky9CJk+YoeedyEsMD/lm+T0oAn/ta2JxGtxJ/uW0hH57cVFLqF5JEfsOmTl+gacqij6/Nn9K0qy9B1GfVra5vJAgtXuXWz2qQWhXC7myedzK7AjHysvHcgFZdJ1G+ufN1i4iEe3b5NvnBUnlcnoDgZ6k9AQOu6BgYHAoooAKKKKAOK8Mf8lW8df8AcP8A/RBrta4rwx/yVbx1/wBw/wD9EGu1oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOb8Uf8jF4M/7DUn/pvvK6Sub8Uf8AIxeDP+w1J/6b7yukoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDjbHVYNBf4h6veJI9vp+ofapViALsqabasQoJAzgcZIroNA1qPxBpC38VrcWn76aB4LnZ5kbxSvE4OxmX7yNyCRiuI1//kTvi7/28f8Apptq6XwH/wAi7df9hrVf/ThcUAdJRRRQAUUUUAFFFFABRRRQBhX7ND4lgmaG4aJRGS8cDuBhZwfug93Xj3qXVNQiudHvIIYbxpJIHRF+xTDJKkAfdrYrnfFd9qUF5odlpN4tm+oXzQSTGESYUQyPwD7oKAOiorh77xJrGkw6tp93PBPe2LWcsVykOwSQzy7MMmSAw2uMjjocCqNh461STRfEgvhFHfWUl1Jp8gT5ZYI5mjHHdlK4P+8p700rg9Fdno1FcF4m8Ua5Y2uv/wBj+Q91Z39jbWiSr8p83y9wJ99557VJf+O5cWM+mIrLfWf7qCZcFLlp44Qr9xtZ2DD2NJXe39aXB6K7/rodReyi21i1nkjmaMQTIWiheTBLRkA7QcdD+VQajqEU9qiRQ3jMJ4XI+xTDhZFYn7voDUWnrrVprEcF9qltqVvJGxkHlLDJDIMEbQCcqRng8jjk1u0AU9IR4tDsY5FZHW3jVlYYIIUcEVcoooAKKKKACiiigAooooAKKKKAKMX/ACH7v/r1g/8AQpaLD/j91P8A6+l/9Ex0Rf8AIfu/+vWD/wBClosP+P3U/wDr6X/0THQBeorFutUuYvHOnaWhX7NcWFxPINvJZHiC8/R2rI8R+ItS0vxDIlsyfYrS2t7q4QoMmNp2SQ59l+b/AIDR28/+D/kD0TfY7Gqdkjpd6iWVlD3AZSR94eVGMj8QR+Fc34k8RahZ3l8NNdVhsY7VZCUDbpJp1GPwTn/gYqCy8X348a+INJ1BY1tYnKabMq4y6QJI8bep+fcPUBvSlfS/r+A7XO3orh9F1rWvFFkZ7bU4NMitIYElla3VzNO8SSNnJACDeowOSc8jFdbpc11PpVvJqCwrdMg84QNuTd32n0qnFp2ZKaaui3RRRSGFFFFABRRRQBR1f/jyj/6+rf8A9HJWJ4r/AOQ/4d/6+v8A2aOtvV/+PKP/AK+rf/0clYniv/kP+Hf+vr/2aOgDhPil/wAmu6p/2x/9LUqt+yp/ySzUv+w1L/6Igqz8Uv8Ak13VP+2P/palVv2VP+SWal/2Gpf/AERBQB7bRRRQAUUUUAFFFFABRRRQBHPPDbQtNcypDEoyzyMFUfUmiC4huoFmtpY5omGVeNgyn6EVzetxx3vj3RLHUI1lsxa3NxHDIMq86GMKSDwSFZyPz7Vjz63Bouk+KBYaRcaXfqImFsSjq80w8uMosZPJIGQOSaOl/wCt7D62O5a+tEtPtT3MK2//AD2MgCdcdenXiltr21vUL2dzDcKOC0UgYD8q8o84WXhHU/D+nWUzCy1Cwmsra/je381JJ4+DuUkAyrJk4PXpWxpF7JZeJNb1jW9MsNBn0rTsTWdnOZvtEZO9Zi3lpkDayqMEglqem/8AW1/+AKzaPQo5o5t3lSK+xirbWB2kdQfeoor+znuZLeG7gkni/wBZEkgLJ9R1FeUabql5omh67DBDe2t7faO+p7p7aSI/awD55TcPmxujIx6V1F9b6Pon9gm10NjbrJEltqFq0a7XkBXDc72DZyeDnOetJ3X9f11+8V1a/wDXT/P5HVQ6zplxMsNvqNpLKxwqJOrMfwBq7XnHwytNU/sHQ5bjw5ocNl9kUrfxXRa5Py8MU8kAE9/n4z1Nej02rOw3vYKKKKQBRRRQBWk1C1i1WDTXlxd3EMk8Ue0/MkbIrnOMDBlTgnJ3cdDizXN33/JU9C/7Aupf+j7GukoAKKKKACsjxPY3F7ocjacobULRlurMFtoaVDkKTg4DDKE46Ma16KAMPWb64vPC8R0gTJcaoscUD7CGgEg5kIPQou5sHuuO9a1paw2NlBaWkaxQQRrHGijhVUYAH4CpqKACiiigAooooA4rwx/yVbx1/wBw/wD9EGu1rivDH/JVvHX/AHD/AP0Qa7WgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA5vxR/yMXgz/sNSf+m+8rpK5vxR/wAjF4M/7DUn/pvvK6SgAooooAKKKzor3ULkO9vZ2xjWV4wXumUna5XOBGcdPWgCidFt9R1XUZpmwyzqv+pifjyoz1dCe/ripP8AhFbP+/8A+Stv/wDGqnt01WCa6k+y2bfaJRJj7Uw2/Iq4/wBXz93P41N5uq/8+Vn/AOBbf/G6AM4aLb6dqunTQtlmnZf9TEnHlSHqiA9vXFb9ZdwmqzzWsn2WzX7PKZMfamO75GXH+r4+9n8Km83Vf+fKz/8AAtv/AI3QAa3/AMgDUP8Ar1k/9BNUv+EVs/7/AP5K2/8A8aqe9TVbzT7i2+y2aedE0e77Ux25GM48v3qbzdV/58rP/wAC2/8AjdAFL/hFbP8Av/8Akrb/APxqrWhRCDSvJTlY551HAHAlcdAAB+AxT/N1X/nys/8AwLb/AON1DaJqtrC0f2WzfdLJJn7Uw+85bH+r7ZxQBqUVVsbqW5NwlxCkUkEvlkJIXB+RWzkgf3vSrVABRRRQB5tr/wDyJ3xd/wC3j/0021dL4D/5F26/7DWq/wDpwuK5rX/+RO+Lv/bx/wCmm2rpfAf/ACLt1/2GtV/9OFxQB0lFFFABRRRQAUUUUAFFFFABXOeLdL1i+m0e88Px2Mtzpt6bgxX07wo6mGSPG5Uc5+cHp2p+o2tvc+K7cXMEcwxEuJEDcbLk459wD+Aq7f2tvp2h6hJp8Edq/wBndt0CBDkKcHI9KBnP3HhTVtTs9SutSksk1TUGtR5cLuYYYoZA+0OVBYklznaOoGBjNU9T+H99feD3sYLq3g1NL65uIZwWKGKaZmaNuM4KNg8cMAecV39FO4t1Y5HUvCd9eXOpyRS24F3qVjdx7mbhIGjLg8dTsOPwyRVPUfh7PdeJ76+tL5Le0uIRLBHtJNveCVJPMA6FCYlJGRzu9c13VFJaWt0/yt+gPVWZx9l4f1e98XWmta3p+jWEllvxJYO00t2WTYNzMibQBzj5u3PFdhVOV3GuW0YZgjW8zFc8Eho8HH4n8zVHVNI02O0Qx6faqTcQLlYFHBlQEdO4OKBG1RVHRP8AkAaf/wBesf8A6CKvUDCiiigAooooAKKKKACiiigCjF/yH7v/AK9YP/QpaLD/AI/dT/6+l/8ARMdEX/Ifu/8Ar1g/9ClosP8Aj91P/r6X/wBEx0AYviLTfEB8UabrHhyDTbk21rPbSxX91JB/rGjYFSkb5/1Z6461ImgXmoapcXmtx2ipe6StlcQQStIA+5y2CVXK4brgH2rpKKOlv61v/mO7/r+vI4yDwjqn/CEzafe3VtNqtzdRTzzgsEby3THbP+rjUdOv507UPBlzf2fiNRcxQXN9ere6fOpJMEiwRopbj1RgQM5U++K7Gqdk7vd6iGZmCXAVQT90eVGcD8ST+ND1v5/8D/JBF8uxyFv4V1vRNO+y6daaPq0F5FALy11CZ440mjjWMupEb71IRflIHIznnjpfC+inw94btdMeSORodxYxJsQFnLEKMnAG7A9hWtRTbb1ZKilbyCiiikMKKKKACiiigCjq/wDx5R/9fVv/AOjkrG8ckRabZXCqDLFdrsYD5hwTgH8B+QrZ1f8A48o/+vq3/wDRyUzWtIGsW8ELTeUIp1mPybt2ARjqPWgDgvjxbR2n7P8ArsEKLGiLbAKgwP8Aj5iz+tYH7Kn/ACSzUv8AsNS/+iIK6T9oP/khPiH/ALdv/SmKub/ZU/5JZqX/AGGpf/REFAHttFFFABRRRQAUUUUAFFFVZ9UsLVylxeQRuOqtIAfyoAi1fRbDXLQW+pQs6q2+N45GjkibGNyOpDKcEjII61UsfCOi6fDHHb2rsUnW4Ms08kskkijCs7sxZ8Z43EgfhVtNc0uTOy/gbHXDinf2xp3/AD+Q/wDfdGwbkV/4f0zU76O7vbbzJ41VVcSMvCyLIuQCAcOinn37E5TUvDmlavdLcaha+bKsRh3CR03IWDFW2kbhlQcHPf1NTf2xp3/P5D/33SPremohZr2EADJ+agCS60y0vbu1ubmHfNaMzQtuI27lKtwDyCD0OR09BWTaeBtAstQS7gtJS0Z3QwyXUskMB9Y4mYoh/wB1RjtVu51SO7aKy0+fE87bS4UgxqBlmGR1xwPciodPu7W0u75XuZiqyiNRLI8n3VGTznHzE9PSgCppfw+8P6NdQT6dHqMRtzmKM6vdvEvt5bSlMe2MV01U/wC17L/nv/443+FIdYsQQPP6/wCw3+FAdbl2iqR1iwHW4A+qn/CmtrenKpY3KgAZPyn/AAoAv0VSGsWLKCs+QRkEK3P6Uf2xp4OGuo1PXDcfzoAin0jzvFVjrPn7fsllc2nk7Pv+c8D7t2eMeRjGOd3bHOlVL+2NO/5/Yf8AvukGt6X31K0Hs0yg/qaAL1FUf7b0r/oJ2f8A4EL/AI0f23pX/QSs/wDv+v8AjQBeqhrmqLo2h3V+YzM0Kfu4VIBlkJwiDJAyzFVGT1NL/bel5x/aNrnv++Xj688Vj6hfW2q+JdNtlurc2Fpm8mk81dryj5Yox2OCWc85BRPWgC3quo32h+GrfULySGRrTy31Jwu1fL6SuP7oXJf6KRW2DkZHIqImC7heMmOaORSrLkEMDwRWV4W+0QaS+m3ay+ZpkzWiySBv30agGNwx+9mNkyRkbgwzkGgDaooooAKKKKAOK8Mf8lW8df8AcP8A/RBrta4rwx/yVbx1/wBw/wD9EGu1oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOb8Uf8jF4M/7DUn/pvvK6Sub8Uf8AIxeDP+w1J/6b7yukoAKp6lqUel26zSxSSgkjEYGRhWYnkjspq5WJ4q/5Bqf9tv8A0nloAu/b7n/oE3n/AH3D/wDHKTRWL6czMjITcTkq2Mr++fg4yKv1hTammi+E9S1KQZFq91IF/vESvgficCk3ZXGtXY3aK85i1vVLTwq1ldak0+p2Gr2VvNcqRmWOaaI9u212T/gJrX+IWpNp0Gi5u7+1t7jUhFcNp0byTMnkyNgKisx5VegPSqasr+dvy/zBa/j+F/8AI6+ivMtR1uw0+60cz6z4mXTLqC7kZja3X2gujRAbkEXmKoBbkqBz15FQXev3q+G9Kup9S1j+y7zWiltcwW7/AGue0MDsuURN5+ccfLnaAT60W/r52C39el3+h6pRXBS3c8nhmK40S48R3Fn9uAvmntpUvFhCHPlJIitjdsztBON2OaZa61LdwWOm6Tr09zDqOpNALiWIpdWcSwmVonDqCHyuAWUEK3qAaLNiPQKK5DVhqvhrSbhbXVJLlLy5traze6HmS2rSyCNmLH74GdwBzzkE46S7brw54m0i2GpXl9aao0kEiXbiRkkWMyB1OBgEKwI6cjAFCVxPQ1ILmWHUdSWOxuLgG4U7o2jAH7mPj5mBp8mteTcQw3Gn3UJmICljGQMsq5OHPd1/OpbD/j91P/r6X/0THVLXP+QlYfh/6UW9IZt0UUUAeJfFv/klnxT/AOw1Zf8AojTq9J8B/wDIu3X/AGGtV/8AThcV5t8W/wDklnxT/wCw1Zf+iNOr0nwH/wAi7df9hrVf/ThcUAdJRRRQAUUUUAFFFFABRRRQBiXX/I2W/wD2y/8AQLmrut/8gDUP+vWT/wBBNJdaStzfpdrdXEEqBQPL2Y4DgH5lPaRh+NVNXsrhNDvmbU7pwLeQlWWLDfKeDhAaANqiiigAooooAoy/8h+0/wCvWf8A9Cio1f8A48o/+vq3/wDRyVFewvNrlmsdxJbkW8x3RhST80XHzAinTaVLOgSXVLxlDK4G2EcqQwP+r9QKAH6J/wAgDT/+vWP/ANBFXqitbdLSzhtoyxSGNY1LdSAMc1LQAUUUUAFFFFABRRRQAUUUUAUYv+Q/d/8AXrB/6FLVeCxiudR1J5HuFIuFH7u4kjH+pj7KwH41Yi/5D93/ANesH/oUtFh/x+6n/wBfS/8AomOgA/si2/56Xn/gbN/8VR/ZFt/z0vP/AANm/wDiqvUUAUf7Itv+el5/4Gzf/FVTstLt2u9RBkusLcADF5KP+WUZ5+bnr1P9K2qo2H/H7qf/AF9L/wCiY6AD+yLb/npef+Bs3/xVH9kW3/PS8/8AA2b/AOKq9RQBR/si2/56Xn/gbN/8VSaYvlTX8IeR0juAqeZIzkAxRnGWJPUn86v1RsP+P3U/+vpf/RMdAF6iiigAooooAo6v/wAeUf8A19W//o5KvUyaCK5haK4iSWNuqOoYHv0NVP7E0r/oGWf/AIDr/hQBwn7Qf/JCfEP/AG7f+lMVc3+yp/ySzUv+w1L/AOiIK2vj7pen23wP1+W3sbaKRfs2HSFVI/0mIdQKxf2VP+SWal/2Gpf/AERBQB7bRRRQAUUUUAFZ+oaoLQmOFVklC7nLvtSJf7znt7Dqat3Nwlrayzy52RqWOOpxWRZWjXF8RdctERNcjs0zcqvuEXGPqDQBn6i2qXGntcz3BtoOgBUoXJ6BYwc8nj52/AU7Tl0OxtITqE9pcXWCX8o+YgPsoyAenOK2HRNS1YrIqvb2XZhkNKR/7Kp/NvatEAKAFAAHQCgCiusWZVfLFwwIyNlpKePwWlOr2+OIbwn0+xS/1Wr1FAGZLr9lDKsUq3CyvjZGbd9zc444rMv9T/tXYkE72FmBuae4iYJNnI29AMepz36Gq8m6/v5pt2WnIiiIB+VXYqCPpGrt/wADrrERY41SNQqKAFA7AUActaWd3FskF1cXCW4ZYZbGaOXajYypVhz0Hr29Km0uVFg8mfVrq0uPMfcsqpH5hLE7gHTvnOO1bcul2M0nmSWsXmf89FXa3/fQ5qFtKIUrDe3CoeqSkTKf++wT+tADhY3BGRq94R/uQ/8Axul+wXI6atdn6pDj/wBAqh/Y9xbtugitz/17SyW3/joJUn61FDeXhQtE+oBQzJl4I5lBVtp+7hiMg9aANCbSpLgAXF40oXoHgibH5rVG+0n7FatcxSJiMgyYtYs7P4iML2GT+FP/ALSvQP8AWknsG0mf+YJFDaldMpVjlSMEHTLjmgCHTDextb2P24BY0eIfulODGVA/NSDWqbW+7ajj/tgtYFtHcW00TpPIfLIIzptwc4Qpzx/d2/8AfIrR/tO8P/LXb/3Cbhv6igDOvI7ofEfRo2uI2uG0m/KS+UQFUTWe5du7kklTnPG09c8b5t9ROQb6Egjp9m/+yrm7lr6Xxlpt9idkhsLqFrlNOlURl5LchNjZJLeWTu6DyyD94Vq+dcsTvudTYZ6R2ioOv+0uaAKcFrPLqd7ZvJaw/ZQjCQRyjerDOeJRjHSprON5tUsvs7QXMNu7s9xDCygZVl272dt3JHA9KeljC05mk0e8upWGDJdyIR144L4/IVbtbzUb23WSC2tbdOV+eUsVIOCMBQOCCOtAGpTHhjkzvjVs9cqDmsDUrrU49W0zTYr+IXN47SOIoQpjgjA3vhi2fmaNfq4PtWr/AGYrj9/d3kv/AG3KZ/74xQA6TStPlbMljbMfUxLn88VDLosHlFbOSe0f+FoZWAH/AAHOD+VVtR0y1t1hulRiIpB5u6RjlG4PU9sg/hVifRYXt5FtpbmCVkIR1uZflOODjdzigCi1xqukXQW7mF9AwLKdgViByQMfxAc4OcgHkd96N1ljWSNgyMAysOhB71y+nyfbPD9jqcks6XMFwi3MLTM6xyrJ5cq/N2BLj3FbmkfJZG36fZpGhA9FB+X/AMdK0AXqKKKAOK8Mf8lW8df9w/8A9EGu1rivDH/JVvHX/cP/APRBrtaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDm/FH/IxeDP+w1J/wCm+8rpK5vxR/yMXgz/ALDUn/pvvK6SgArE8Vf8g1P+23/pPLW3UVxa293GI7uCOdAdwWRAwB9cGgCWueuNFTX9FWzuHUWw1KSaeJk3CZUuHbYeehIGevAIxzWn/Ymlf9Ayz/8AAdf8KTRUSLTmjjVURbidVVRgACZ+AKAOb1v4ex3U0kvh25tdEMiwFkSxDxtJDOssblVZM9GU+oYc8Vej8PazdSadLr+tWt5Np999qQ2unmBWXynTYQZX5y+c57Yx3rpaKabSsH9foZ8+led4is9V87H2W2mg8rZnd5jRnOc8Y8vpjnPtXO3fge+S3ii0TWorMWmptqFmtxZGdYAyOrRYEi5XMjEcjGcc12VFL+vxuO7/AK+45htB8Sz2aNeeJLVtRt5vNtZ7fTWiiA2lSkkZmYuDnsy4wKiHg27lhe8u9WRtdN0l2l7Da7Io3WPywoiLElCpYEFsnceRxjrKKBHML4Sur6yvv+Eh1X7VfXgj2zWkJgjtjG26Mxxsz4Ib5iSTk+3FT6doOptq0Oo+JNUt9QltFdbRLWzNuibhguwLuWfHGQQACeOa6CimBRsP+P3U/wDr6X/0THVLXP8AkJWH4f8ApRb1LBp1ld6jqUl3Z287i4VQ0kSsQPJj4yRVpNI02KRZI9PtUdSGVlgUEEdwcUgLlFFFAHiXxb/5JZ8U/wDsNWX/AKI06vSfAf8AyLt1/wBhrVf/AE4XFebfFv8A5JZ8U/8AsNWX/ojTq9S8I6XfaR4fNvqq263ct7eXciW0rSRp51zJMFDMqlsCQDO0cigDbooooAKKKKACiiigAooooAKgvbb7Zp9xbbtnnRNHuxnbkYzj8anooAo+Vqv/AD+Wf/gI3/xyobJ9VvNPt7n7VZp50SybfsrHbkZxnzPetSsXSNUt49DsUaO6JW3jB22crD7o6ELg/WgC55Wq/wDP5Z/+Ajf/AByobd9Vnmuo/tVmv2eUR5+ysd3yK2f9Zx97H4VN/a9t/wA87z/wCm/+JpmlTLPcajIgcK10MB0ZD/qY+xAIoAfDaXX9oJc3dzDJ5cTxqsUBT7xUkklj/c/Wr1FFABRRRQAUUUUAFFFFABRRRQAUUUUAUYv+Q/d/9esH/oUtFh/x+6n/ANfS/wDomOiL/kP3f/XrB/6FLRYf8fup/wDX0v8A6JjoAvUUUUAFUbD/AI/dT/6+l/8ARMdXqo2H/H7qf/X0v/omOgC9RRRQAVRsP+P3U/8Ar6X/ANEx1eqjYf8AH7qf/X0v/omOgC9RRRQAUUUUAFFFFAHm37Qf/JCfEP8A27f+lMVc3+yp/wAks1L/ALDUv/oiCuk/aD/5IT4h/wC3b/0pirm/2VP+SWal/wBhqX/0RBQB7bRRRQAUUUUAUdSIkls7Y/dmnBf/AHUBf+aqPxrG0We71aWdGMlnAx+0bkADzBmYDn+EYXAwMkDrVvxC5BVVJBNrPg5xgnYuf/HquafGq31+UG1UdIVGeAFjU8f99GgC3bWsNpCIrdNiZJ6kkk9SSeSfc1LRRQAVV1OZrfS7qVPvpExX3OOP1q1VHWOdP2no80KHn1lUf1oAzLGAJqsMS4KRyuV9hHGsQ/Vj+ddDWJpQDair5ydlw3/fU+f/AGUVt0AFFFFACEhVJPAAyap6OCNGtWYYZ4xIw92+Y/qak1GTytLupM42Qu2T7Kalt08q1ijAxtQLj6CgCSiiigAooooAKKxLvULqLx9pWmpLi0uNMvZ5Y9o+Z45bVUOcZGBK/AODu56DG3QAVRs/3Oo3tv0BZZ1Hswwf/HlJ/Gr1Upfk1y3YdJIJEP1BUj/2agClpNvPca9qeq3kbx5YWdqjgjEMZOWwem5yxz3VUNbVFFAEVzAtzaTQP92VCh+hGKj02drnS7WZ/vvErN9cc/rVmqWkH/iXlf8AnnNKn4CRgP0FAGJe28+m6hrXlxO1lfWpvQ4HyxzxgK4J7blEZA9Vc1tWXy6jqKc8ypJ09Y1H/stSamu/SLxQM7oHGP8AgJqCxbOqT45zbQNn1yXH9KANGiiigDivDH/JVvHX/cP/APRBrta4rwx/yVbx1/3D/wD0Qa7WgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA5vxR/yMXgz/sNSf8ApvvK6Sub8Uf8jF4M/wCw1J/6b7yukoAKKKKACqJ0i13MVNym9mchLuVRknJOA2BySavUUAY9pp8Ut1fI814VinCIPts3A8tGx971Y1a/si2/56Xn/gbN/wDFVSl/ta21K9Npb7oZpVdW8pHz+7RT1lQjlemPxo+1a9/z6/8Aksn/AMkUAPu9PiiurFEmvAss5Rx9tm5Hlu2PveqirX9kW3/PS8/8DZv/AIqqUX9rXOpWRu7fbDDKzs3lImP3bqOkrk8t0x+NbdAGPqmnxW2j3k8M14skcDujfbZjghSQfvVa/si2/wCel5/4Gzf/ABVSapDJc6PeQQrukkgdEXOMkqQBWd9q17/n1/8AJZP/AJIoAu/2Rbf89Lz/AMDZv/iqq6dp8U9q7yzXjMJ5kB+2zDhZGUD73oBTPtWvf8+v/ksn/wAkVd0eKeHTQLtNkzSyuy8fxSMw6EgcHpk/WgCe1s4bNXEAf9429y8jOWOAM5Yk9AB+FT0UUAFFFFAHiXxb/wCSWfFP/sNWX/ojTq9trxL4t/8AJLPin/2GrL/0Rp1e20AFFFFABRRRQAUUUUAFFFFABRRRQAVR/sTSv+gZZ/8AgOv+FXqKAKP9iaV/0DLP/wAB1/wqzb2tvaRmO0gjgQncVjQKCfXAqWigAooooAKKKKACiiigAooooAKKKKACiiigDLd7pdfufskMMv8AosO7zZimPmlxjCtn9KLdNVgmupPstm32iUSY+1MNvyKuP9Xz93P41NNaXX9oPc2lzDH5kSRsssBf7pYgghh/f/SjytV/5/LP/wABG/8AjlAB5uq/8+Vn/wCBbf8AxujzdV/58rP/AMC2/wDjdHlar/z+Wf8A4CN/8co8rVf+fyz/APARv/jlAB5uq/8APlZ/+Bbf/G6p2UupC71HbaWpJuBuBumGD5UfT93zxj0/rVzytV/5/LP/AMBG/wDjlRQ2WpQyzyLe2pM8gkbNo3B2qvH7z0UUAS+bqv8Az5Wf/gW3/wAbo83Vf+fKz/8AAtv/AI3R5Wq/8/ln/wCAjf8AxyjytV/5/LP/AMBG/wDjlAB5uq/8+Vn/AOBbf/G6ZpRla41E3CIkn2oZVHLAfuY+5A/lT/K1X/n8s/8AwEb/AOOVJY2stsbh7iZJZJ5fMJSMoB8irjBJ/u+tAFqiiigAooooAKKKKAPNv2g/+SE+If8At2/9KYq5v9lT/klmpf8AYal/9EQV0n7Qf/JCfEP/AG7f+lMVc3+yp/ySzUv+w1L/AOiIKAPbaKKKACiiigDn/E85tmjmC7tlu5K/3h5sGR+NTeGbyS+tbyaYIJPtbK3lnKkhVGR7UzxDtFxCZACot5DhumRJC39Ku6VFHbyX8MMaxolzwijAGY0PA/GgDQooooAKo6rjyIM5/wCPqHp/vir1UdW4tYWHa6g/WVR/WgClomDdLhcYtRjjpmR/8K26xNH3C7UHH+oZTg91lYf1rboAKKKKAKOt/wDIA1D/AK9ZP/QTV6qesKX0O/UdWtpAP++TVtWDKGHQjNAC0UUUAFFFFAHP3ltO3xJ0a6WGQ28ek38byhDsVmmsyqk9ASEYgd9p9DXQUUUAFc59vnvfG4ihbFlYfuHwP9ZO8Zdhn/ZTy+ndznpW7eTvbWM88UL3DxRs6wx/ekIGQo9z0rE0bTZNMg0u2un8y7YzXV04JO6Z+ZCMk/LukIA7DA6CgDoaKKKACqWl/wCpn/6+Zf8A0M1dqlpRzbTN2NzN+kjD+lAE17j+z7jIyPKbj8Kw/Dpu49Yv4b+RWUwQNadAxhwx5AA+6zMv0Az1rbv226bct6ROf0Nc3c2lzH4l0/UbONpZrWC3t541PLQSs6v3x8rCN/ohA60AdZRRRQBxXhj/AJKt46/7h/8A6INdrXFeGP8Akq3jr/uH/wDog12tABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBzfij/AJGLwZ/2GpP/AE33ldJXN+KP+Ri8Gf8AYak/9N95XSUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB87/GXxjoVl4e+I/hS5vtmt32p2c9va+S53oILEk7wu0f6t+CQePcV6l4e+MXgTxVr1vo2g679r1C53eVD9jnTdtUufmZAB8qk8ntXy3+0H/yXbxD/ANu3/pNFR+z5/wAl28Pf9vP/AKTS0AfbVFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAebftB/8AJCfEP/bt/wClMVc3+yp/ySzUv+w1L/6IgrpP2g/+SE+If+3b/wBKYq5v9lT/AJJZqX/Yal/9EQUAe20UUUAFFFFAGVrFv9puLaEkqJ0mgDehZM/+y/pVfw/qiajeXTDcrmONpUIxsflWH/joP41o6qjtYmWJd0tuwmQDqdpyQPqMj8azrOytri4nELvDJkTQ3EL4Zo3+YexAbcMEHHFAG7RVOwnmLzWt4ytPAR86jHmIfutj8CD7g1coAKo6zxpE7g48oCXp/dIb+lXqZNEs9vJC/wB2RSp+hGKAMewHl6wqZ73S/iZVcfo1bdctYzFLuCSQDes0ZlPoWQwt/wCPov5+9dTQAUUUUAR3MfnWssX99Cv5iotOl8/S7WXr5kKN+aipJ7q3tV3XM8cK+sjhf51l6ZqkEdgsKR3EpiZkHlQOwIDEA7sY6YPWgDZoqj/absMpp16x9Nir/wChMKPt9z/0Cbz/AL7h/wDjlAF6iqP2+5/6BN5/33D/APHKPt9z/wBAm8/77h/+OUAVrnVZ4fGmm6QqRm3utPu7p2IO8NFJbqoBzjGJmzx2HTnOvXJ3l0x+I2jXL2s6FNKv4/JIUu26azO4AEjA28nP8S9c1uvq8USM81vdxqoyxNuxAHrxmgC/VFf3uvOe1vbhc+7tkj8kH51m6FrRmsZLrVJpEa5neWJHiYLFDnEYDbQDlQGJyeWPOKt6NeWtys86XETyXMzPsEgJCj5VGO3ABx70AatFFFABVLR+dIgcdJQZf++iW/rS6rK0WmTeX/rZB5Uf++x2j9TVmGJYII4YxhY1CqPYDFAFbWG2aHfN/dtpD/46aZZjGqXg67Eijz64BP8AWl1k/wDEplXBPmFY8DvuYL/WjTjvmv5ucPckA+yqqfzU0AXqKx9QvLjT/EWnM7k2F6GtXXb/AKub70bZ7AgOp9ylbFAHFeGP+SreOv8AuH/+iDXa1xXhj/kq3jr/ALh//og12tABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQByXji6mstU8I3FtYXGoSprT7ba2aNZHzYXY4MjKvGc8sOB3PFWG8Vaqiln8Da+qqMkm408AD/wACqPFTBPEHg5nIVV1mQkk4AH9n3lc1bW3/AAtT/hIwPFGrQ6HFqKW1vbWcVukU0S28EhJMkLM6M7seSUdCOCp5ANXRfibZ6zqGkW39h6tYprMksdlcXTW2yXy0d2YBJmcphDhwpU5XBwwNdrXmOhQtPpfw11q+ma61PVbmK4urmRVBbdpd0wRQoCqi7jhVAHJPUkn06gAooooAKKKKACiiigAooooAKKKKACiiigAooooA+Jf2g/8Aku3iH/t2/wDSaKj9nz/ku3h7/t5/9JpaP2g/+S7eIf8At2/9Joq4jw94h1Twrr1vrOg3P2TULbd5U3lq+3cpQ/KwIPysRyO9AH6I0V8S/wDDQfxO/wChm/8AJC2/+N0f8NB/E7/oZv8AyQtv/jdAH21RXxL/AMNB/E7/AKGb/wAkLb/43R/w0H8Tv+hm/wDJC2/+N0AfbVFfEv8Aw0H8Tv8AoZv/ACQtv/jde2/8Lb8Ef9Fh8Qf+CmD/AOQaAPbaK8S/4W34I/6LD4g/8FMH/wAg0f8AC2/BH/RYfEH/AIKYP/kGgD22ivEv+Ft+CP8AosPiD/wUwf8AyDR/wtvwR/0WHxB/4KYP/kGgD22ivEv+Ft+CP+iw+IP/AAUwf/INH/C2/BH/AEWHxB/4KYP/AJBoA9torxL/AIW34I/6LD4g/wDBTB/8g0f8Lb8Ef9Fh8Qf+CmD/AOQaAPbaK8S/4W34I/6LD4g/8FMH/wAg0f8AC2/BH/RYfEH/AIKYP/kGgD22ivEv+Ft+CP8AosPiD/wUwf8AyDR/wtvwR/0WHxB/4KYP/kGgD22ivlv4i/G+703+zv8AhW3xE1DV/M837b9t0y3XysbPL25tk65fPXoOnfif+Gg/id/0M3/khbf/ABugD7aor4l/4aD+J3/Qzf8Akhbf/G6P+Gg/id/0M3/khbf/ABugD7aor4l/4aD+J3/Qzf8Akhbf/G6P+Gg/id/0M3/khbf/ABugD7aorxL/AIW34I/6LD4g/wDBTB/8g0f8Lb8Ef9Fh8Qf+CmD/AOQaAPbaK8S/4W34I/6LD4g/8FMH/wAg0f8AC2/BH/RYfEH/AIKYP/kGgD22ivEv+Ft+CP8AosPiD/wUwf8AyDR/wtvwR/0WHxB/4KYP/kGgD22ivEv+Ft+CP+iw+IP/AAUwf/INH/C2/BH/AEWHxB/4KYP/AJBoA9torxL/AIW34I/6LD4g/wDBTB/8g0f8Lb8Ef9Fh8Qf+CmD/AOQaAPbaK8S/4W34I/6LD4g/8FMH/wAg0f8AC2/BH/RYfEH/AIKYP/kGgD22ivEv+Ft+CP8AosPiD/wUwf8AyDXEfEX433em/wBnf8K2+Imoav5nm/bftumW6+VjZ5e3NsnXL569B07gH1JRXxL/AMNB/E7/AKGb/wAkLb/43R/w0H8Tv+hm/wDJC2/+N0AfbVFfEv8Aw0H8Tv8AoZv/ACQtv/jdH/DQfxO/6Gb/AMkLb/43QB9I/tB/8kJ8Q/8Abt/6UxVzf7Kn/JLNS/7DUv8A6Igr5/8AEPxi8d+KtBuNG17Xften3O3zYfscCbtrBx8yoCPmUHg9q+gP2VP+SWal/wBhqX/0RBQB7bRXMafrfiHVrO5vNN0/THjjvbq1jiuLuSInyLiSHJYRt97y89OM96st4ivLEE63oV5bRqMtcWmLuMfgn7z8dmPegDeoqtYajZ6pai5066huoSSPMhcMMjqOO49Ks0AFc/cpJpd2jIVVVY/ZmdsIysQWhY9ueVP4fXoKR0WRGSRQ6MMMrDIIoAw7zUldVvrDH2q2BE9tLlX8s9cr14ODkZ6HGc1bGoX5VHTTROjjcHt7lWGO2N23NV77wxZ3iBULRBfupncin2HVf+AkVXtbPW9IiSCzS2ubZCcRltvU544GOfUt1oA1f7QmzhtLvF/GM/yc0h1NlRidPvcjPyiMEn8jimQ3upPuE2kmIjoftKEN9P8A69S/ab3/AKB//kZaAOev4J21KWS3sLoW04IkYRcxs38QXOThlVunBz61qWeuTXJEH9nTrdqgZ0kKxj/eGTuIz7Vc+1Xo66cT/uzLn9azdZs5dWgTfpk/mwktFiWLBOOhyTxQBLJqlwZGjNxaROOsVur3Mg/AYx+IqCE3WohjELuZVcoWuJxAmR1AEYyce/0qtZ6dLZ3dpBP9st4Zi4lZZ1QSS7QR9w5AwrD8hU9jbzwrPbQx3zLbzvGNlwoAGdy/eOfusKALcGiyRuXEsFsx6m2t13fi77ifyFWjpMEgP2iW5nyMHfcPg/8AAQQP0qn9nn/59dR/8DR/8XQbefI/0TUv/A4f/F0AXP7F00/esoXz13ruz9c1BfadpVpZSTDS7NmUYRfIT5mPCjp3JAqrPa3ZAMFlfFs/MZNQYfykFVnsdRf/AFmnTyBfmUf2hJncOh5k4oAj0/RrJtQgje2gkCs+SYlw4jGwkjHd3J/4CPSt/wDsXTAMLYW6j0WMAfpWVZ6YYLaETaZdvOsYV3+29T3x8/AJ5qc2hJA/su7+pveP/Q6ALZ0PTjIji2CugIRkdlKg9QCDwOBx7Cs7XtDe6sYrKw+0mO7mWK6LXLsiQEEyZVm5yoKDHdwcYBpkksEWs2+lyabI11c28txGGuiwKRNGrck8czJx7n0qz9gY8rpKKxHO+6P9M0AR2z6kNYvLOzu1khtEQbbmMYJYZwCuMYHsauCWC7uFtdV09EnbOzzFEiSY67Wx6DoQD7Vkrod+HLmzsNzfePJP65qe306+iuLSb+zbWNrd2Zmjl+aTKsuPugAfN+lAGr/ZFmP9SskGOnkTPGPyBApDp86j9xqV0nHAYI4/Vc/rSfadTB506Iqem265HPcFQPyJpfO1Q/dsrUD/AGrph/KM0ARTaffTSws+oRkQvvUG36nBAzhu2TUwtL4/f1Jv+AQqP55pD/arHg2cQ+jSf/E0ybTry7hMdzqUiKTz9ljERPtkliPzoAz9Tf7NdW6T6hcXHluJpIiIx937o+VQcl9oAz6+lbGnQPbadDFLjzQuZMdN55b9SagstDsLCXzYYi0uc+ZIxY59fQH3FaFAGfr2ljWdEuLIMqSsA8ErLu8qVCGjfHqrqrfhVjT5ri4022mvbc21xJErSwFgfLYjlcgkHB4qxRQBxXhj/kq3jr/uH/8Aog12tcV4Y/5Kt46/7h//AKINdrQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAcV8TdFu9Z03R/smiS66lnqJuJ7CK5SDzU+zToFZnZQULugYZOVLDBGRWNBoVlO8t3r/AMKbvWNTuWD3N3dW+lvuIUKFUNcnaiqqqFz0HJJyT6dRQB5/qF1q8t34a/s3wBrFtaaNemYwrNp6KsX2SeBURRc4GDKvHAAB9gdz/hKNX/6ETxB/3/0//wCSq6SigDm/+Eo1f/oRPEH/AH/0/wD+SqP+Eo1f/oRPEH/f/T//AJKrpKKAOb/4SjV/+hE8Qf8Af/T/AP5Ko/4SjV/+hE8Qf9/9P/8AkqukooA5v/hKNX/6ETxB/wB/9P8A/kqj/hKNX/6ETxB/3/0//wCSq6SigDm/+Eo1f/oRPEH/AH/0/wD+SqP+Eo1f/oRPEH/f/T//AJKrpKKAOb/4SjV/+hE8Qf8Af/T/AP5Ko/4SjV/+hE8Qf9/9P/8AkqukooA5v/hKNX/6ETxB/wB/9P8A/kqj/hKNX/6ETxB/3/0//wCSq6SigDm/+Eo1f/oRPEH/AH/0/wD+SqP+Eo1f/oRPEH/f/T//AJKrpKKAPlL4pfCf4g+N/iVqniHSvClxDaXnk+Wlze2iyDZCiHIWYjqp79K5L/hnz4nf9Cz/AOT9t/8AHK+2qKAPiX/hnz4nf9Cz/wCT9t/8co/4Z8+J3/Qs/wDk/bf/AByvtqigD4l/4Z8+J3/Qs/8Ak/bf/HKP+GfPid/0LP8A5P23/wAcr7aooA+G9S+BvxF0jSrvUtQ8PeTaWcLzzyfbbdtiIpZjgSEnAB4AzX2B/wAK48Ef9Cb4f/8ABXB/8TXQXNtBeWstreQxz28yGOWKVAySKRgqwPBBBwQa5/8A4Vx4I/6E3w//AOCuD/4mgDN1n4U+Gb+KJdK0XQ9KdWJd00O1l3j0w6HH4Vjaf8FbK11y3u7yfR76ySQmWwk8MWCLIpUgLvWMMuCVOcnpjvXV/wDCuPBH/Qm+H/8AwVwf/E0f8K48Ef8AQm+H/wDwVwf/ABNAB/wrjwR/0Jvh/wD8FcH/AMTR/wAK48Ef9Cb4f/8ABXB/8TR/wrjwR/0Jvh//AMFcH/xNH/CuPBH/AEJvh/8A8FcH/wATQAf8K48Ef9Cb4f8A/BXB/wDE0f8ACuPBH/Qm+H//AAVwf/E0f8K48Ef9Cb4f/wDBXB/8TR/wrjwR/wBCb4f/APBXB/8AE0AH/CuPBH/Qm+H/APwVwf8AxNH/AArjwR/0Jvh//wAFcH/xNH/CuPBH/Qm+H/8AwVwf/E0f8K48Ef8AQm+H/wDwVwf/ABNAB/wrjwR/0Jvh/wD8FcH/AMTWdrvwr8Majos1rouh6DpF45TZerodtMYwHBbCOu05UFeemc9q0f8AhXHgj/oTfD//AIK4P/iaP+FceCP+hN8P/wDgrg/+JoA5C1+CNrChE97pNyc5DN4X09SPbiIV1w+HHgjH/IneHz/3C4P/AIml/wCFceCP+hN8P/8Agrg/+Jo/4Vx4I/6E3w//AOCuD/4mgDxv47/CttX1Xw3pvw58MafDdtDeT3EdlHBa70RrdQWJ2hsGTgZz8x968t/4Z8+J3/Qs/wDk/bf/AByvsPSvCfhzQbprrQ9A0vTbh0MbS2dlHC7KSCVJUA4yAcewrXoA+Jf+GfPid/0LP/k/bf8Axyj/AIZ8+J3/AELP/k/bf/HK+2qKAPiX/hnz4nf9Cz/5P23/AMcqrqXwN+IukaVd6lqHh7ybSzheeeT7bbtsRFLMcCQk4APAGa+5KjubaC8tZbW8hjnt5kMcsUqBkkUjBVgeCCDgg0Ac/wD8K48Ef9Cb4f8A/BXB/wDE1maz8KfDV+kQ0rR9D0ooTvKaHay+Z0x99DjHt61p/wDCuPBH/Qm+H/8AwVwf/E0f8K48Ef8AQm+H/wDwVwf/ABNAHKaZ8FbGz1yC7v7jR9QskdjLYSeGLCNZFKsAA6RhlwxU5yc7cd66v/hXHgj/AKE3w/8A+CuD/wCJo/4Vx4I/6E3w/wD+CuD/AOJo/wCFceCP+hN8P/8Agrg/+JoAP+FceCP+hN8P/wDgrg/+Jo/4Vx4I/wChN8P/APgrg/8AiaP+FceCP+hN8P8A/grg/wDiaP8AhXHgj/oTfD//AIK4P/iaAD/hXHgj/oTfD/8A4K4P/iaP+FceCP8AoTfD/wD4K4P/AImj/hXHgj/oTfD/AP4K4P8A4mj/AIVx4I/6E3w//wCCuD/4mgA/4Vx4I/6E3w//AOCuD/4mj/hXHgj/AKE3w/8A+CuD/wCJo/4Vx4I/6E3w/wD+CuD/AOJo/wCFceCP+hN8P/8Agrg/+JoAztd+FfhjUdGmtdG0LQdIvHZNl6uiW0xjAcFgEdNpyoK89M57VhWfwSs4Bi5vNJuvmzlvDGnqcenyxCuu/wCFceCP+hN8P/8Agrg/+Jo/4Vx4I/6E3w//AOCuD/4mgA/4Vx4I/wChN8P/APgrg/8Aia8b+O/wrbV9V8N6b8OfDGnw3bQ3k9xHZRwWu9Ea3UFidobBk4Gc/MfevZP+FceCP+hN8P8A/grg/wDiau6V4T8OaDdNdaHoGl6bcOhjaWzso4XZSQSpKgHGQDj2FAHx5/wz58Tv+hZ/8n7b/wCOUf8ADPnxO/6Fn/yftv8A45X21RQB8S/8M+fE7/oWf/J+2/8AjlH/AAz58Tv+hZ/8n7b/AOOV9tUUAfm5X1t+yp/ySzUv+w1L/wCiIK+Sa+tv2VP+SWal/wBhqX/0RBQB6T4D/wCRduv+w1qv/pwuK6Sub8B/8i7df9hrVf8A04XFdJQBjal4djuLltQ0qY6ZqmP+PqFciXHRZU6SL9eRzgqeafpGsSXU8mn6rCtpqkC7pIVbckqdPMjJ+8v6qeD2J1qyte0h9TtElspVt9StG82zuCMhHx91vVGHysO4PqAQAatFUNE1VNZ0mK8WJoJCWjmgc5aGVSVdD7hgRnv171foAKKKKACiiigAooooAhurWO8t2hmztOCCpwVIOQQexB5qGxsXtJZ5JLuW4aYgkyKoxgY/hA7Y/KrlFABRRRQAUUUUAFFFFAHDeMdQn0/xxo7WIBvZ9H1C3tARkea9xYqpI9ATuPsprtbaE29rFC0jymNAhkc5Z8DGSfU1zXiXwrf6v4q0XXdMv7C1uNIhuEiF7YPcjdNsBYbZY8EKhHU8Mal+w+N/+hh8P/8Aghn/APkygDpKKo6VFqsNqy65eWd5cbyVks7RrdAuBgFWkkJOc85HUccZNq5WdrWVbOSOK4KERSSxl0VscFlBUsAeoBGfUdaAJKK5v7D43/6GHw//AOCGf/5Mq7pVt4jhumbXNV0u8t9hCx2emSW7hsjBLNPICMZ4wOo54wQDXoorn7mz8YtdStZ67ocVuXJijl0WZ3Vc8BmF0oYgdSAM+g6UAdBRXP21n4xW6ia813Q5bcODLHFosyOy55CsbpgpI6Eg49D0roKACsnxK97Bocl3phb7RZutx5SjPnIhy8eMjlk3AehIPak1W28RzXStoeq6XZ2+wBo7zTJLhy2TkhlnjAGMcYPQ884FL7D43/6GHw//AOCGf/5MoAyvB9xFd/Ezxrc20iyQzJp0kbqchlNuSCPwrua+S/iNr/jb4OeO5bHRvE0JOqWkV07QabGiKoeRI4wsnmEBFXA56YzkjNVPBXxy+Iur+PvD+m6h4h860vNTtoJ4/sVuu9HlVWGRGCMgnkHNAH1/RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfm5X1t+yp/ySzUv+w1L/6Igr5Jr62/ZU/5JZqX/Yal/wDREFAHpPgP/kXbr/sNar/6cLiukrm/Af8AyLt1/wBhrVf/AE4XFdJQAUUUUAc/bD+zPHVzbrkQavbfa0UIcLNEVjkJPT5leHA/2GPPOOgrD14SJrXh2eJ9u3UGjkGPvo1vNx/30EP/AAGtygAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA+Sf2q/8Akqem/wDYFi/9Hz15t8OP+Sp+FP8AsNWf/o9K9J/ar/5Knpv/AGBYv/R89ebfDj/kqfhT/sNWf/o9KAPv+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/Nyivrb/hlTwR/wBBXxB/4EQf/GaP+GVPBH/QV8Qf+BEH/wAZoA9E+HVtBZ+EpbWzhjgt4dW1OOKKJAqRqL+cBVA4AAGABXU1yVh4HvdMtngsfG3iCKJ5pZ2XyrBsvLI0jnm27u7HHQZwMCrP/CL6v/0PfiD/AL8af/8AItAHSUVzf/CL6v8A9D34g/78af8A/ItH/CL6v/0PfiD/AL8af/8AItAHLfHa2guvBVtHdQxzIr3sgWRAwDJpd6ytg9wygg9iAe1fFNfduufDZ/EdmtrrXjHxBcwr5mF2WKY8yGSF+VtgeY5ZF/4FkcgEcR/wyp4I/wCgr4g/8CIP/jNAHyTRX1t/wyp4I/6CviD/AMCIP/jNH/DKngj/AKCviD/wIg/+M0AfJNFfW3/DKngj/oK+IP8AwIg/+M0f8MqeCP8AoK+IP/AiD/4zQB8k0V9bf8MqeCP+gr4g/wDAiD/4zR/wyp4I/wCgr4g/8CIP/jNAHyTRX1t/wyp4I/6CviD/AMCIP/jNH/DKngj/AKCviD/wIg/+M0AfJNFfW3/DKngj/oK+IP8AwIg/+M0f8MqeCP8AoK+IP/AiD/4zQB8k0V9bf8MqeCP+gr4g/wDAiD/4zR/wyp4I/wCgr4g/8CIP/jNAHyTRX1t/wyp4I/6CviD/AMCIP/jNH/DKngj/AKCviD/wIg/+M0AfJNFfW3/DKngj/oK+IP8AwIg/+M0f8MqeCP8AoK+IP/AiD/4zQB8k0V9bf8MqeCP+gr4g/wDAiD/4zR/wyp4I/wCgr4g/8CIP/jNAHyTRX1t/wyp4I/6CviD/AMCIP/jNH/DKngj/AKCviD/wIg/+M0AfJNFfW3/DKngj/oK+IP8AwIg/+M0f8MqeCP8AoK+IP/AiD/4zQB8k0V9bf8MqeCP+gr4g/wDAiD/4zR/wyp4I/wCgr4g/8CIP/jNAHyTRX1t/wyp4I/6CviD/AMCIP/jNH/DKngj/AKCviD/wIg/+M0AfJNdJ8OP+Sp+FP+w1Z/8Ao9K+kv8AhlTwR/0FfEH/AIEQf/GavaJ+zV4P0HX9P1ez1LXHuNPuo7qJZZ4SjMjBgGAiBxkc4IoA9fooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//2Q==";

const _hoisted_1$1 = ["src"];
const _hoisted_2$1 = { class: "p-2" };
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "p-4" };
const _hoisted_5 = { class: "flex justify-between" };
const _hoisted_6 = { class: "text-2xl" };
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("div", { class: "flex justify-center" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    class: "rounded-xl max-w-2xl",
    src: _imports_0,
    alt: ""
  })
], -1);
const _hoisted_8 = { class: "flex justify-end" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  props: {
    item: {}
  },
  setup(__props) {
    const dialog = ref(false);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", {
          class: "max-w-sm bg-white rounded-xl shadow w-full",
          onClick: _cache[0] || (_cache[0] = ($event) => dialog.value = true)
        }, [
          createBaseVNode("img", {
            class: "rounded-xl shadow",
            src: `/src/assets/img/${_ctx.item.img}`,
            alt: ""
          }, null, 8, _hoisted_1$1),
          createBaseVNode("div", _hoisted_2$1, [
            createBaseVNode("div", null, toDisplayString(_ctx.item.title), 1),
            createBaseVNode("div", null, toDisplayString(_ctx.item.bathrooms) + " " + toDisplayString(_ctx.item.bedrooms) + " " + toDisplayString(_ctx.item.garage) + " " + toDisplayString(_ctx.item.size), 1)
          ])
        ]),
        dialog.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8 z-40",
          onClick: _cache[3] || (_cache[3] = ($event) => dialog.value = false)
        }, [
          createBaseVNode("div", {
            class: "bg-white self-start mt-32 max-w-screen-md rounded-xl overflow-x-hidden overflow-y-auto z-50",
            style: { "max-height": "60vh" },
            onClick: _cache[2] || (_cache[2] = withModifiers(() => {
            }, ["stop"]))
          }, [
            createBaseVNode("img", {
              class: "rounded-xl shadow",
              src: `/src/assets/img/${_ctx.item.img}`,
              alt: ""
            }, null, 8, _hoisted_3),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("h4", _hoisted_6, toDisplayString(_ctx.item.title), 1),
                createBaseVNode("div", null, toDisplayString(_ctx.item.bathrooms) + " " + toDisplayString(_ctx.item.bedrooms) + " " + toDisplayString(_ctx.item.garage) + " " + toDisplayString(_ctx.item.size), 1)
              ]),
              _hoisted_7,
              createBaseVNode("div", _hoisted_8, [
                createBaseVNode("button", {
                  class: "text-white mt-8 bg-amber-100 py-2 px-6 rounded-xl",
                  onClick: _cache[1] || (_cache[1] = ($event) => dialog.value = false)
                }, " Close ")
              ])
            ])
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

const _hoisted_1 = { class: "main container mx-auto" };
const _hoisted_2 = { class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4 justify-items-center" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FloorplanList.ce",
  props: {
    test: {}
  },
  setup(__props) {
    const props = __props;
    console.log(props);
    const items = [
      {
        title: "Waldorf",
        img: "HW-BoxHill-Waldorf-thumb.jpg",
        bedrooms: "4",
        bathrooms: "4.5",
        garage: "2",
        size: "13.8"
      },
      {
        title: "Glenburn",
        img: "Chisholm-Glenburn-thumb.jpg",
        bedrooms: "4",
        bathrooms: "2",
        garage: "2",
        size: "12.2"
      },
      {
        title: "Bristol",
        img: "HW-Leppington-Bristol-thumb.jpg",
        bedrooms: "4-5",
        bathrooms: "2.5-3",
        garage: "2",
        size: "10.0"
      },
      {
        title: "Hendooz",
        img: "BSX_SERIES_73_R1.png",
        bedrooms: "4-5",
        bathrooms: "2.5-3",
        garage: "2",
        size: "10.0"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          (openBlock(), createElementBlock(Fragment, null, renderList(items, (item) => {
            return createVNode(_sfc_main$1, {
              key: item.title,
              item
            }, null, 8, ["item"]);
          }), 64))
        ])
      ]);
    };
  }
});

const _style_0 = "/*\n! tailwindcss v3.3.5 | MIT License | https://tailwindcss.com\n*//*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n5. Use the user's configured `sans` font-feature-settings by default.\n6. Use the user's configured `sans` font-variation-settings by default.\n*/\nhtml {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4; /* 3 */\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 4 */\n  font-feature-settings: normal; /* 5 */\n  font-variation-settings: normal; /* 6 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-feature-settings: inherit; /* 1 */\n  font-variation-settings: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\nfieldset {\n  margin: 0;\n  padding: 0;\n}\nlegend {\n  padding: 0;\n}\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nReset default styling for dialogs.\n*/\ndialog {\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n[hidden] {\n  display: none;\n}\n*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n.container {\n  width: 100%;\n}\n@media (min-width: 640px) {\n.container {\n    max-width: 640px;\n}\n}\n@media (min-width: 768px) {\n.container {\n    max-width: 768px;\n}\n}\n@media (min-width: 1024px) {\n.container {\n    max-width: 1024px;\n}\n}\n@media (min-width: 1280px) {\n.container {\n    max-width: 1280px;\n}\n}\n@media (min-width: 1536px) {\n.container {\n    max-width: 1536px;\n}\n}\n.fixed {\n  position: fixed;\n}\n.absolute {\n  position: absolute;\n}\n.relative {\n  position: relative;\n}\n.inset-0 {\n  inset: 0px;\n}\n.left-0 {\n  left: 0px;\n}\n.top-0 {\n  top: 0px;\n}\n.z-40 {\n  z-index: 40;\n}\n.z-50 {\n  z-index: 50;\n}\n.m-4 {\n  margin: 1rem;\n}\n.mx-auto {\n  margin-left: auto;\n  margin-right: auto;\n}\n.mt-32 {\n  margin-top: 8rem;\n}\n.mt-8 {\n  margin-top: 2rem;\n}\n.flex {\n  display: flex;\n}\n.grid {\n  display: grid;\n}\n.h-screen {\n  height: 100vh;\n}\n.w-auto {\n  width: auto;\n}\n.w-full {\n  width: 100%;\n}\n.max-w-2xl {\n  max-width: 42rem;\n}\n.max-w-screen-md {\n  max-width: 768px;\n}\n.max-w-sm {\n  max-width: 24rem;\n}\n.grid-cols-1 {\n  grid-template-columns: repeat(1, minmax(0, 1fr));\n}\n.items-center {\n  align-items: center;\n}\n.justify-end {\n  justify-content: flex-end;\n}\n.justify-center {\n  justify-content: center;\n}\n.justify-between {\n  justify-content: space-between;\n}\n.justify-items-center {\n  justify-items: center;\n}\n.gap-4 {\n  gap: 1rem;\n}\n.self-start {\n  align-self: flex-start;\n}\n.overflow-y-auto {\n  overflow-y: auto;\n}\n.overflow-x-hidden {\n  overflow-x: hidden;\n}\n.rounded {\n  border-radius: 0.25rem;\n}\n.rounded-xl {\n  border-radius: 0.75rem;\n}\n.bg-amber-100 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 243 199 / var(--tw-bg-opacity));\n}\n.bg-amber-200 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(253 230 138 / var(--tw-bg-opacity));\n}\n.bg-black {\n  --tw-bg-opacity: 1;\n  background-color: rgb(0 0 0 / var(--tw-bg-opacity));\n}\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity));\n}\n.bg-opacity-30 {\n  --tw-bg-opacity: 0.3;\n}\n.p-2 {\n  padding: 0.5rem;\n}\n.p-4 {\n  padding: 1rem;\n}\n.px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n.px-8 {\n  padding-left: 2rem;\n  padding-right: 2rem;\n}\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.text-2xl {\n  font-size: 1.5rem;\n  line-height: 2rem;\n}\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.antialiased {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.opacity-25 {\n  opacity: 0.25;\n}\n.shadow {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.grayscale {\n  --tw-grayscale: grayscale(100%);\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n.transition {\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.main {\n  transition: color 0.5s, background-color 0.5s;\n  line-height: 1.6;\n  font-family: Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  font-size: 15px;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n@media (min-width: 640px) {\n.sm\\:grid-cols-2 {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n}\n@media (min-width: 768px) {\n.md\\:grid-cols-3 {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n}\n@media (min-width: 1024px) {\n.lg\\:grid-cols-4 {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n}";

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const VueFloorplanList = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]]]);

// import '../index.css'

const FloorplanList = defineCustomElement(VueFloorplanList);

customElements.define('floorplan-list', FloorplanList);
// export function initFloorplans(tagName = 'floorplan-list') {
//   customElements.define(tagName, FloorplanList)
// }
//# sourceMappingURL=index.cjs.map
