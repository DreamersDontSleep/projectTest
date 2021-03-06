import Vue from 'vue';

//防抖
const debounce = (fn) => {
    let timeout = null; // 创建一个标记用来存放定时器的返回值
    return function () {
        clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
            fn.apply(this, arguments);
        }, 500);
    };
}

const calcHeight = (element, offset) => {
    return window.innerHeight - element.getBoundingClientRect().top - offset.topOffset - offset.bottomOffset
}


const doTableResize = (el, binding, vnode) => {
    const {componentInstance: $table} = vnode
    const {value} = binding
    if (!$table.height) {
        throw new Error(`el-table must set the height. Such as height='100px' or height='0'`)
    }
    const offset = {
        topOffset: (value && value.topOffset) || 30,
        bottomOffset: (value && value.bottomOffset) || 30,
    }

    if (!$table) return
    const height = calcHeight(el, offset);
    $table.layout.setHeight(height)
    $table.doLayout()
}


const checkTag = (el, binding, vnode) => {
    if (el.tagName === 'TABLE' || el.className.includes('el-table')) {
        doTableResize(el, binding, vnode)
    } else {
        const {value} = binding
        const offset = {
            topOffset: (value && value.topOffset) || 10,
            bottomOffset: (value && value.bottomOffset) || 10,
        }
        el.style.height = calcHeight(el, offset) - offset.topOffset - offset.bottomOffset + 'px';
    }

}


Vue.directive("height-adaptive", {
    bind(el, binding, vnode) {
        el.resizeListener = () => {
            checkTag(el, binding, vnode)
        }

        //addResizeListener(el, el.resizeListener)
        window.addEventListener('resize', debounce(el.resizeListener))
    },
    update(el, binding, vnode) {
        checkTag(el, binding, vnode)
    },
    unbind(el) {
        window.removeEventListener('resize', el.resizeListener)
    }
})
