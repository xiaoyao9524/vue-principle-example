import defineReactive from './defineReactive';

/**
 * Observer类会附加到每一个被侦测的object上
 * 一旦被附加上，Observer会将该object所有属性转化为getter/setter的形式
 * 来收集属性的依赖，并且当属性变化时会通知这些依赖
 */
class Observer {
  constructor(value) {
    this.value = value;

    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }

  /**
   * walk会将每一个属性都转化成为getter/setter的形式来侦测变化
   * 这个方法只会在数据类型为Object时被调用
   */
  walk(obj) {
    const keys = Object.keys(obj);

    for (const key of keys) {
      defineReactive(obj, key, obj[key]);
    }
  }
}

export default Observer;
