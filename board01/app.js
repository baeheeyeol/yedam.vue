import myHeader from './components/myHeader.js';
import router from './router/router.js';

let template = `<div>
                <my-header :parentData.sync="this.$data"></my-header>
                <router-view></router-view>
              </div>`;
              //$data vue가 가진 속성값(data)전체
// sync : 양방향 통신 

let app = new Vue({
  el: '#app',
  template: template,
  components: {
    myHeader //myHeader : myHeader //값이 같을때는 한번만 써도됨
  },
  data: {
    dataArray: {}
  },
  methods: {
    getParentData: function () {
      return this.dataArray['board'];
    },
    setParentData: function (dataArray) {
      this.dataArray['board'] = dataArray
    }
  },
  router // router : router
})