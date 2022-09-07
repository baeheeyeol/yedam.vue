//1.
import empHeader from'./components/empHeader.js'
import router from './router/router.js'


let template = `<div>
                  <emp-header></emp-header>
                </div>`
let app =new Vue({
  el : '#app',
  template,
  components : {
    empHeader
  },
  router
})