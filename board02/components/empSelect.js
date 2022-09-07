let template =`
          <!-- 사원정보 목록조회 -->
                <div>
                  <table id="list">
                    <thead>
                      <th v-for="info in headerInfo">{{ info }}</th>
                    </thead>
                    <tbody>
                      <!-- empList : array of object / empInfo : object -->
                      <template v-for="empInfo in currentData">
                        <router-link tag="tr" :to="{name : 'empRead', params : {empId : empInfo.employee_id }}">
                          <td v-for="info in headerInfo">{{ empInfo[info] }}</td>
                        </router-link>
                      </template>
                    </tbody>
                  </table>
                  <!-- 페이지네이션 -->
                  <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <template v-for="page in pagingInfo.totalPage">
                    <li class="page-item">
                      <a class="page-link" href="#" @click.prevent ="currentPage=page">{{page}}</a>
                    </li>
                  </template>
                  </ul>
                </nav>
                  <router-link tag="button" :to="{ name : 'empWrite'}">직원등록</router-link>
                </div>`;

export default {
  template : template,
  data : function(){
    return {
      headerInfo : ['employee_id', 'first_name', 'last_name', 'email', 'job_id'],
      empList : [],
      currentPage : 1,
    }
  },
  computed : {
    // data 속성을 필요에 따라 연산해서 만드는 또 다른 프로퍼티 -> 읽기 전용

    // 페이징 관련 데이터 : 한 페이지당 출력할 데이터 수, 전체 페이지 수
    pagingInfo : function(){
      let perData =10;
      let totalPage =Math.ceil(this.empList.length/perData);
      
      return {
      perData : perData,
      totalPage : totalPage, 
      }
    },

    // 사용자가 선택한 현제 페이지에 따라 출력될 데이터
    currentData : function(){
      let firstIndex =(this.currentPage -1) * this.pagingInfo.perData;
      let lastIndex = firstIndex +this.pagingInfo.perData -1;
      return this.empList.filter((empInfo,index)=>{
        return index >= firstIndex ? (index <=lastIndex ? true : false) :false;
      })
    }
  },
  // 아작스 이용
  created : function(){
    const component = this;
    $.ajax({
      url : 'http://192.168.0.83:8088/myserver/empSelect',
      dataType : 'json',
      success : function(data){
        if(data != null){
          component.empList = data;
        }
      },
      error : function(reject){
        console.logg(reject)
      }
    })
  }
}