export default {
  template: `<div>
                <table id="list">
                  <tr>
                    <th style="width:50px;">글번호</th>
                    <th>글제목</th>
                    <th style="width:50px;">조회수</th>
                    <th style="width:70px;"></th>
                  </tr>
                  <tr v-for="item in object" :key ="item.no">
                    <td>{{item.no}}</td>
                    <!--<td @click="boardRead(item)">{{item.title}}</td>-->
                    
                    <router-link tag="td"
                                  :to="{ name : 'boardRead',params : {data : item }}">
                                    {{ item.title}}</router-link>

                    <td>{{item.view}}</td>
                    <td><button @click="boardDelete(item.no)">삭제</button></td>
                  </tr>
                </table>
                <!--<button style="float:right;" @click="boardWrite">글쓰기</button>-->
                <router-link tag="button"
                            style ="float:right;"
                            :to="{name : 'boardWrite'}">글쓰기</router-link>
              </div>`,
    data :function(){
      return {
        object : []
      }
    },
    created :function(){
      //서버에서 데이터를 가져오는 경우 //parent : 라우터제외 현ㅈ시점에서 상위
      this.object = this.$parent.getParentData();
      // -> this.object = this.dataArray['board']
      
    },
    methods: {
    boardDelete: function (no){
      for(let i=0;i<this.object.length; i++){
        if(this.object[i].no ==no){
          this.object.splice(i,1);
        }
      }
      // object dataArray배열이라서 주소 참조중
      //this.$parent.setParentData(this.object); 생략가능
    }
  }
}