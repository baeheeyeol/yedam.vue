let template =`<div>
<div>
  <template v-for="info in infos">
  <div>
    <span>{{info}}</span>
    <span>{{empInfo[info]}}</span>
  </div>
  </template>

</div>
<div>
  <router-link tag="button" :to="{name : 'empWrite',params :{empId : empInfo.employee_id}}">수정</router-link>
  <button @click="deleteData">삭제</button>
</div>
</div>`


export default {
  template,
  props: ['empId'],
  data: function () {
    return {
      empInfo: {},
      infos: ['employee_id', 'first_name', 'last_name', 'email', 'job_id']
    }
  },
  created: function () {
    const component = this;
    $.ajax({
      url: 'http://192.168.0.83:8088/myserver/empFind',
      type: 'get',
      data: {employee_id : component.empId},
      dataType : 'json',
      success: function (data) {
        if(data != null){
          console.log(data)
          component.empInfo = data;
        }
      },
      error: function (reject) {
        console.log(reject)
      }
    })
  },
  methods:{
    deleteData:function(){
      const component = this;
      $.ajax({
        url : 'http://192.168.0.83:8088/myserver/empDelete',
        type : 'post',
        data :{ employee_id : component.empId},
        dataType : 'json',
        success :function(data){
          alert('삭제완료')
          component.$router.push({name : 'empSelect'});
         
        if(data != null){
          console.log('삭제완료')
        }
        },
        error: function(reject){
          console.log('reject')
        }
      })

    }
  }
}