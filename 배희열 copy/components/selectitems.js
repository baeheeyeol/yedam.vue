let template = `
<div>
  <ul id="myUL">
    <template v-for="item in itemList">
      <li :key="item.no"
      :class="{ checked : item.yn)}"
      @click="checkedItem(item.no)">
      {{item.contents}}
      <span class="close" @click.self.stop="deleteItem(item.no)">x</span> </li>
    </template>
  </ul>
</div>`

export default {
  template,
  data: function () {
    return {
      items: [], // 서버에서 가져오는 원본 데이터
      updateItem: [],
    }
  },
  watch : {
    updateItem : function(){
      const component = this;
      $.ajax({
        url : 'http://192.168.0.83:8088/myserver/todoUpdate',
        data : component.updateItem,
        dataType :'json',
        success : function(data){
          if(data!=null){
            alert("todoList update");
          }
        },
        error: function (reject) {
          console.log(reject)
      }})
    }
  },
  computed: {
    itemList: function () {
      return $.map(this.items, function (item) {
        item.yn = item.todoyn == 1 ? true : false;
        return item;
      })
    }
  },
  created: function () {
    this.loadDate();
  },
  method: {
    loadData: function () {
      const component = this;
      $.ajax({
        url: 'http://192.168.0.83:8088/myserver/todoSelect',
        data: {
          id: 192168043
        },
        dataType: 'json',
        success: function (data) {
          component.items = data;
        },
        error: function (reject) {
          console.log(reject);
        }
      })
    },
    checkedItem: function (no) {
      const component = this;
      $(this.items).each(function (item) {
        if (item.no == no) {
          item.todoyn = item.todoyn == 1 ? 0 : 1;
          component.updateItem = item;
        }
      })
    },
    deleteItem :  function(no){
      const component =this;
      $.ajax({
        url:'http://192.168.0.83:8088/myserver/todoDelete',
        data:{
          id : 192168043,no:no
        },
        dataType:'json',
        success :function(data){
          if(data!=null){
            alert("todoList Delete");
            component.items = $.grep(component.items, function(item){
              return !(item.no==no);
            })
          }
          console.log(reject)
        },
        error: function(reject){
          console.log(reject)
        }
      })

    }
  }

}