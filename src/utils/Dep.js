/**
 * Dep类用来管理依赖
 * 当某个值被修改时，可以通知所有依赖并更新值
 */
class Dep {
  constructor () {
    this.subs = [];
  }

  // 添加一个依赖
  addSub (sub) {
    this.subs.push(sub);
  }

  // 删除一个依赖
  removeSub (sub) {
    remove(this.subs, sub);
  }

  depend () {
    /**
     * window.target可以看做是一个依赖，
     * 每当有某个依赖需要被添加到this.subs时，会临时将这个依赖赋值给window.target
     * 这个方法的作用是将依赖添加到this.subs中
     */
    if (window.target) {
      this.addSub(window.target);
    }
  }

  // 某个值被更新后，通知所有依赖更新视图
  notify () {
    const subs = this.subs.slice();

    for (const sub of subs) {
      sub.update();
    }
  }
}

function remove (arr, item) {
  if (!arr.length) {
    return
  }

  const index = arr.indexOf(item);

  if (index > -1) {
    return arr.splice(index, 1);
  }
}

export default Dep;