import Dep from './Dep';

function defineReactive (data, key, val) {
  // dep用来帮助我们管理依赖
  let dep = new Dep();

  Object.defineProperties({
    enumerable: true,
    configurable: true,
    get () {
      // 在get时收集依赖，添加到dep中
      dep.depend();
      return val;
    },
    set (newVal) {
      if (val === newVal) {
        return
      }
      val = newVal;
      // 在setter时触发依赖
      dep.notify();
    }
  })
}

export default defineReactive;
