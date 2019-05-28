class Svue {
    constructor(options){
        this._data = options.data;
        this.watchData(options.data);
        // this.listenData(options.data);
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
                    let regM = /\{\{\s*(\S*\.\S*)\s*\}\}/;
                    if (regM.test(nodeContent)) {
                        let dataTemp = this.jsonPlat(this._data);
                        for(let key in dataTemp){
                            if (key === RegExp.$1){
                                node.innerText = dataTemp[key]; // RegExp.$1 非标准用法，正则匹配到的第一个对象
                                new Subscribe(this, RegExp.$1.split('.')[1], (newVal) => {
                                    child.textContent = newVal;
                                });
                            }
                        }
                    } else if (reg.test(nodeContent)) {
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

    jsonPlat(json) {
        let jsonTemp = {};
        for(let key1 in json) {
            for (let key2 in json[key1]) {
                const k = `${key1}.${key2}`;
                jsonTemp[k] = json[key1][key2];
            }
        }
        return jsonTemp;
    }

    listenData(data) {
        let json = this.jsonPlat(data);
        Object.keys(json).forEach(key => {
            let val = data[key];
            let p = new Publish();
            Object.defineProperty(data, key , {
                enumerable: true,
                configurable: true,
                get() {
                    console.log('get', key);
                    if (Publish.target) {
                        p.addSub(Publish.target);
                    }
                    return val;
                },
                set(newVal) {
                    if (newVal !== val) {
                        console.log('set', newVal);
                        val = newVal;
                        p.notice(newVal);
                    }
                }
            })
        })
    }

    watchData(data) {
        Object.keys(data).forEach(key => {
            let val = data[key];
            if (typeof val === 'object') {
                this.watchData(val);
            } else {
                this.observer(data, key, val);
            }
        })
    }

    observer(data, key, val) {
        let p = new Publish();
        Object.defineProperty(data, key , {
            enumerable: true,
            configurable: true,
            get() {
                console.log('get', key);
                if (Publish.target) {
                    p.addSub(Publish.target);
                }
                return val;
            },
            set(newVal) {
                if (newVal !== val) {
                    console.log('set', newVal);
                    val = newVal;
                    p.notice(newVal);
                }
            }
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

