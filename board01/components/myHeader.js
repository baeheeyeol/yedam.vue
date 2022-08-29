export default{
  name : 'my-header',
  template : `<div>
                <h2>간단한 게시판</h2>
                <div id="app">
                  <p>게시판 데이터 json 파일 읽기</p>
                  <input type="file" v-on:change="loadData($event)">
                  <button @click="saveBoardList">게시판 저장하기</button>
                </div>
              </div>`,
  props :['parentData'],
  methods : {
    loadData: function (event) {
      let file = '/yedam.vue/board01/'+event.target.files[0].name; 
      console.log(file)
      // 등록된 파일명
      if (file) {
        fetch(file)
          .then(response => response.json()) // json 파싱 단계
          .then(data => { // data : object 타입 or array 타입
            this.parentData.dataArray = data; 

            //.sync > this.$emit('update : 프로퍼티', this.프로퍼티)
            this.$emit('update:parentData', this.parentData);

            this.$router.push({name : 'boardList'});

          }).catch(err => console.log(err));
      }
    },
    saveBoardList: function(){
      let data =this.parentData.dataArray;
      if(data.length=0){
        alert('저장할 게사판 내용이 없습니다.')
        return;
      }
      if(typeof data == 'object'){
        data = JSON.stringify(data,undefined,4);
      }
      let blob = new Blob([data],{type : 'text/json'});
      let a = document.createElement('a');
      a.download ='board.json';
      a.href = window.URL.createObjectURL(blob);
      a.click();
    },
  }
}