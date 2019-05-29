class Svue {
    constructor(options){
        this._data = options.data;
        this.watchData(options.data);
        this.compile(options.el);
        this.proxy(this, '_data');
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
                        let dataTemp = this.jsonPlat(this._data);
                        if (attrName.indexOf('v-') === 0) {
                            attrName = attrName.substr(2);
                            if (attrName === 'model') {
                                child.value = dataTemp[attrVal];
                            }
                            child.addEventListener('input', e => {
                                this._data[attrVal] = e.target.value;
                                console.log(e.target.value);
                                console.log(this._data[attrVal]);
                            });
                            console.log(attrVal.split('.')[1]);
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
        for (let key1 in json) {
            if (typeof json[key1] === 'object') {
                if (json[key1] instanceof Array) {
                    jsonTemp[key1] = json[key1];
                } else if (json[key1] === null) {
                    jsonTemp[key1] = json[key1];
                } else {
                    for (let key2 in json[key1]) {
                        const k = `${key1}.${key2}`;
                        jsonTemp[k] = json[key1][key2];
                    }
                }
            } else {
                jsonTemp[key1] = json[key1];
            }
        }
        return jsonTemp;
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
        console.log(data);
        console.log(key);
        Object.defineProperty(data, key , {
            enumerable: true,
            configurable: true,
            get() { // 此处要做依赖收集，未用到的data不需要加入依赖队列
                // console.log('get', key);
                if (Publish.target) {
                    p.addSub(Publish.target);
                }
                console.log(val);
                return val;
            },
            set(newVal) {
                if (newVal !== val) {
                    console.log('set', key, newVal);
                    val = newVal;
                    p.notice(newVal);
                }
            }
        })
    }

    proxy(target, sourceKey) {
        for (let key in this._data) {
            Object.defineProperty(target, key, {
                configurable: true,
                get() {
                    return target[sourceKey][key];
                },
                set(newVal) {
                    target[sourceKey][key] = newVal;
                }
            })
        }
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

    removeSub(data) {
        const index = this.SubList.indexOf(data);
        this.SubList.splice(index, 1);
    }

    notice(val) {
        console.log('-------');
        console.log(this.SubList);
        this.SubList.forEach(item => {
            console.log('==========');
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
        console.log('.........');
        this.cb(val);
    }
}

