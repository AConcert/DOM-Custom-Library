// 对象风格
window.dom = {
    create(string){
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },

    after(node, newNode){
        node.parentNode.insertBefore(newNode, node.nextSibling)
    },

    before(node, newNode){
        node.parentNode.insertBefore(newNode, node)
    },

    append(parent,child){
        parent.appendChild(child)
    },

    wrap(node, parent){
        dom.before(parent,node)
        dom.append(parent,node)
    },

    remove(node){
        node.parentNode.removeChild(node);
        return node;
    },

    empty(node){
        // const childNodes = node.childNodes
        // const {childNodes} = node
        const arr = [];
        let firstChild = node.firstChild;
        while(firstChild){
            arr.push(dom.remove(firstChild));
            firstChild=node.firstChild;
        }
        console.log(arr);
        return arr;
    },
    
    attr(node, name, value){
        if(arguments.length === 3){
            node.setAttribute(name,value)
        }else if(arguments.length === 2){
            return node.getAttribute(name)
        }
    },

    text(node, string){
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText(string) //IE
            } else {
                node.textContent(string) 
            }
        } else if(arguments.length === 1){
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },

    html(node, string){
        if (arguments.length === 2) {
            node.innerHTML(string) 
        } else if(arguments.length === 1){
            return node.innerHTML
        }
    },

    style(node, object, value){
        if (arguments.length === 3) {
            node.style[object] = value;
        } else if(arguments.length === 2) {
            if(typeof arguments[1] === 'string'){
                return node.style[object];
            } else if(arguments[1] instanceof Object){
                for (const key in object) {
                    node.style[key] = object[key];
                }
            }
        }
    },

    class: {
        add(node, className){
            node.classList.add(className);
        },
        remove(node, className){
            node.classList.remove(className);
        },
        has(node, className){
            return node.classList.contains(className);
        }
    },

    on(node,eventName,fn){
        node.addEventListener(eventName, fn)
    },

    off(node,eventName,fn){
        node.removeEventListener(eventName, fn)
    },

    find(selector, scope){
        return (scope || document).querySelectorAll(selector);
    },

    parent(node){
        return node.parentNode
    },

    children(node){
        return node.children
    },

    siblings(node){
        return Array.from(node.parentNode.children)
            .filter(n=>n!==node)
    },

    next(node){
        let next = node.nextSibling
        while(next && next.nodeType!==1){
            next = node.nextSibling
        }
        return next
    },

    previous(node){
        let previous = node.previousSibling
        while(previous && previous.nodeType!==1){
            previous = node.previousSibling
        }
        return previous
    },

    each(nodeList,fn){
        for (let index = 0; index < nodeList.length; index++) {
            fn.call(null, nodeList[i])
        }
    },

    index(node){
        return (Array.from(node.parentNode.children).indexOf(node))+1
    }
}