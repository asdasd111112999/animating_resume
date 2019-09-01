/*把code写到#code和style标签里*/
function writeCss(prefix, code, fn) {
  let domCode = document.querySelector('#code')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    styleTag.innerHTML = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 30)
}
function writeMarkdown(markdown, fn) {
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 30)
}

var css1 = `
/* 
 * 面试官你好，我是刘小五
 * 这是一份动态简历
 * 现在开始写样式
 */

/*一点准备工作*/

*{
  transition: all 1s;
}

/*背景调个色*/

html{
  background: #eee;
}

/*加个边框*/

#code{
  border: 1px solid #aaa;
  padding: 16px;
}

/* 代码高亮 */

.token.selector{ color: #690; }
.token.property{ color: #905; }

/* 阴影 */

#code{
  box-shadow: 0 0 10px rgba(0,0,0,0.2)
}

/* 现在开始写简历
*
*先创建一张纸 
*/

#code-wrapper{
  width: 50%; 
  left: 0; 
  position: fixed; 
  height: 100%;
}

#paper > .content {
 display: block;
}

/* Loading。。简历创建中。。。*/
`

var css2 = `
/* 
 * 接下来用一个优秀的库 marked.js
 *
 * 把 Markdown 变成 HTML
 */



`
var md = `
### 自我介绍

我叫 刘小五
1996 年 2 月出生
自学前端半年
希望应聘前端开发岗位

---

### 技能介绍

- 熟悉 JavaScript CSS3 H5等前端基础
- 能用 jQuery Vue做开发

---

### 项目介绍

1. [键盘导航](https://liuxiaowu.top)
2. [canvas画板](https://asdasd111112999.github.io/canvas/index.html)
3. [键盘导航](https://asdasd111112999.github.io/Carousel3/index.html)


`
let css3 = `
/*
 * Over
 */
`

writeCss('', css1, () => { // writeCss call the function
  createPaper(() => {
    writeMarkdown(md, () => {
      writeCss(css1, css2, () => {
        convertMarkdownToHtml(() => {
          writeCss(css1 + css2, css3, () => {
            console.log('完成')
          })
        })
      })
    })
  })
})




function createPaper(fn) {
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function convertMarkdownToHtml(fn) {
  var div = document.createElement('div')
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}

