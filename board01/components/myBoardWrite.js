export default {
  template: `<div>
              <table id="list">
                <tr>
                  <td>글제목</td>
                  <td><input type="text" style="width:90%;" v-model="title"></td>
                </tr>
                <tr>
                  <td colspan="2">
                    <textarea style="width:100%;" v-model="content"></textarea>
                  </td>
                </tr>
              </table>
              <rounter-link tag="button" style ="float:right;" :to="{name :'boardList'}">목록</router/link>
              <button style ="float:right;" @click="boardSave">저장</button>
            </div>`,
            //to => 라우터한테 넘겨주는 정보
  data: function () {
    return {
      title : '',
      content:'',
    }
  },
  methods: {
    
    boardSave: function () {
      let dataArray = this.$parent.getParentData(); //this.$parent.dataArray
      let no = 1;
      if (dataArray.length != 0) {
        let index = dataArray.length - 1;
        no = parseInt(dataArray[index].no) + 1;
      }
      let board_info = {
        no: no,
        title: this.title,
        content: this.content,
        view: '0',
      }
      dataArray.push(board_info);
      this.$parent.setParentData(dataArray);
      this.$router.push({name:'boardList'});
    },
  }
}