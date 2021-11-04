class Watcher {
  constructor(vm, expOrFn, cb) {
    // vm可以看做是new Vue的实例???
    this.vm = vm;
    // 执行this.getter()就可以获取data.a.b.c的内容
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }

  get () {
    // 先将watcher实例添加到window.target
    window.target = this;
    /** 
     * 1、获取某个vm.a.b.c的值，触发这个值的getter
     * 2、之后在defineReactive中触发dep.depend方法，将此watch实例(也就是window.target)添加到dep.subs中
     */
    let value = this.getter.call(this.vm, this.vm);
    // 之后释放window.target
    window.target = undefined;
    return value;
  }

  update () {
    // 首先保存旧的值
    const oldValue = this.value;
    // 获取新的值
    this.value = this.get();
    // 调用回调函数
    this.cb.call(this.vm, this.value, oldValue);
  }
}

const bailRE = /[^\w.$]/;

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split('.');
  // obj大概率是一个vm，所以此方法大概率是获取一个vm.a.b.c
  return function (obj) {
    for (let key of segments) {
      obj = obj[key];
    }
    return obj;
  };
}

export default Watcher;
