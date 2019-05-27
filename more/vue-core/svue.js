class Svue {
    constructor(options){
        this._data = options.data;
        this.watchData(options.data);
        this.compile(options.el);
    }

    compile(el) {
        const els = document.querySelector(el);
        this.compileNode(els);
    }

    compileNode(node) {
        let childs = node.childNodes;
        Array.from(childs).forEach(child => {
            switch (child.nodeType) {
                case 1: { // 元素
                    let attrs = child.attributes;
                    Array.from(attrs).forEach(attr => {
                        let attrName = attr.name;
                        let attrVal = attr.value;
                        if (attrName.indexOf('v-') === 0) {
                            attrName = attrName.substr(2);
                            if (attrName === 'model') {
                                child.value = this._data[attrVal];
                            }
                            child.addEventListener('input', e => {
                                this._data[attrVal] = e.target.value;
                            });
                            new Subscribe(this, attrVal, (newVal) => {
                                child.value = newVal;
                            });
                        }
                    });
                    break;
                }
                case 3: { // 文本
                    let nodeContent = child.textContent;
                    let reg = /\{\{\s*(\S*)\s*\}\}/;
                    if (reg.test(nodeContent)) {
                        child.textContent = this._data[RegExp.$1]; // RegExp.$1 非标准用法，正则匹配到的第一个对象
                        new Subscribe(this, RegExp.$1, (newVal) => {
                            child.textContent = newVal;
                        });
                    }
                    break;
                }
                default: break;
            }
            child.childNodes.length > 0 ? this.compileNode(child) : '';
        })
    }

    watchData(data) {
        Object.keys(data).forEach(key => {
            let val = data[key];
            let p = new Publish();
            Object.defineProperty(data, key , {
                enumerable: true,
                configurable: true,
                get() {
                    if (Publish.target) {
                        p.addSub(Publish.target);
                    }
                    return val;
                },
                set(newVal) {
                    if (newVal !== val) {
                        val = newVal;
                        p.notice(newVal);
                    }
                }
            })
        })
    }
}

// 发布订阅模式
class Publish {
    constructor(){
        this.SubList = [];
    }

    addSub(data) {
        this.SubList.push(data);
    }

    notice(val) {
        this.SubList.forEach(item => {
            item.operation(val);
        })
    }
}

class Subscribe {
    constructor(vm, exp, cb) {
        Publish.target = this;
        vm._data[exp];
        this.cb = cb;
        Publish.target = null;
    }

    operation(val) {
        this.cb(val);
    }
}

