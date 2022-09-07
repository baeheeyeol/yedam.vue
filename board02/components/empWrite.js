let template = `
<div>
  <form id="info" onsubmit="return false">
    <template v-for = "info in infos">
      <!-- 사원이 가지고 있는 정보 중 하나 -->
      <div>
        <label :for="info">{{info}}
          <input type="text" :id="info" :name = "info" v-model="empInfo[info]">
        </label>
      </div>
    </template>
  </form>
  <div>
    <button @click ="updateMode ? updateContent() : uploadContent()">저장</button>
    <router-link tag="button":to="{name : 'empSelect'}">취소</router-link>
  </div>
</div>
`;
export default {
  template,
  props: ['empId'],
  data: function () {
    return {
      infos: ['employee_id', 'first_name', 'last_name', 'email', 'job_id'],
      // 수정시 필요한 정보
      empInfo: {
        employee_id: '',
        first_name: '',
        last_name: '',
        email: '',
        job_id: ''
      },
      // 모드 전환용
      updateMode: false
    }
  },
  created: function () {
    if (this.empId > 0) {
      this.empId = Number(this.empId);
      const component = this;
      $.ajax({
        url: 'http://192.168.0.83:8088/myserver/empFind',
        type: 'get',
        data: {
          employee_id: component.empId
        },
        dataType: 'json',
        success: function (data) {
          if (data != null) {
            console.log(data)
            component.empInfo = data;
            component.updateMode = true;
          }
        },
        error: function (reject) {
          console.log(reject)
        }
      })
    }
  },
  methods: {
    uploadContent: function () {
      let component=this
     
      $.ajax({
        url: "http://192.168.0.83:8088/myserver/empInsert",
        type: 'post',
        data: component.empInfo,
        success: function (data) {
          console.log(data);
          component.$router.push({name:'empSelect'});
        },
        error: function (reject) {
          console.log(reject);
        }
      })
    },
    updateContent: function () {
      let component=this
      $.ajax({
        url: 'http://192.168.0.83:8088/myserver/empUpdate',
        type: 'post',
        data: component.empInfo,
        dataType: 'json',
        success: function (data) {
          alert('수정완료')
          if (data != null) {
            console.log('수정완료')
            component.$router.push({name:'empSelect'});
          }
        },
        error: function (reject) {
          console.log('수정실패');
        },
      })
    }
  },
}