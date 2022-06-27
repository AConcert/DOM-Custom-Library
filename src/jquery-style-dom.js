// JQuery 提供一个函数， 接受一个选择器 selector，获取元素 elements，
// 用闭包维持元素 elements，
// 返回对象来操作元素 elements
window.$ = window.JQuery = function(selector){
    let elements;

    if(typeof selector === 'string'){
        elements = document.querySelectorAll(selector);
    } else if(selector instanceof Array){
        elements = selector;
    }

    // api 可以操作 elements
    const api = Object.create(jQuery.prototype) // 创建一个对象，这个对象的 __proto__ 为 jQuery.prototype
    // const api = {__proto__: jQuery.prototype}
    Object.assign(api, {
        elements: elements,
        oldApi: selector.oldApi
    })
    // api.elements = elements
    // api.oldApi = selectorOrArrayOrTemplate.oldApi
    return api;
}

JQuery.fn = JQuery.prototype ={
    constructor: jQuery,
    jquery: true,

    addClass(className){
        // 闭包，函数访问外部变量 elements
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add(className);
        }
        return this; // 就是这个对象
    },
    find(selector){
        let arr = []
        for(let i = 0; i < elements.length; i++){
            // arr = arr.concat(Array.from(elements[i].querySelectorAll(selector)))
            arr.push(...elements[i].querySelectorAll(selector))
        }
        arr.oldApi = this;
        return JQuery(arr);
    },
    end(){
        return this.oldApi;
    },
    each(fn){
        for(let i = 0; i< elements.length; i++){
            fn.call(null, elements[i],i)
        }
        return this;
    },
    parent(){
        const arr = [];
        this.each((node)=>{
            if(arr.indexOf(node.parentNode)<0){
                arr.push(node.parentNode)
            }
        })
        return JQuery(arr);
    },
    print(){
        console.log(elements);
    },
    children(){
        const arr = [];
        this.each((node)=>{
            if(arr.indexOf(node.children)<0){
                arr.push(...node.children)
            }
        })
        return JQuery(arr);
    },
    on(element, eventType, selector, fn){
        element.addEventListener(eventType, (e)=>{
          let el = e.target;
          while(!el.matches(selector)){
            if(element === el){
              el = null;
              break;
            }
            el = el.parentNode;
          }
          el && fn.call(el, e, el)
        })
        return JQuery(element);
    }
}