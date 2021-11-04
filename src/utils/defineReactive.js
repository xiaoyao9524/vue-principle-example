import Dep from './Dep';
import Observer from './Observer';

function defineReactive (data, key, val) {
  if (typeof data === 'object') {
    // 如果某个key也是对象或数组，那么也会将该值转化为getter/setter形式
    new Observer(data);
  }
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
