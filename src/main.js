/* let div = dom.create('<div>11</div>')
console.log(div);

dom.before(test,div)

console.log(dom.index(test));  */

// dom.empty(empty)

JQuery('.test')
    .addClass('red')
    .addClass('gray')
    .addClass('blue') // 链式操作

JQuery('.test1')
    .find('.child')
    .addClass('green')
    .end()
    .addClass('white')

JQuery('.child').parent().print();

JQuery('.test').children().print();