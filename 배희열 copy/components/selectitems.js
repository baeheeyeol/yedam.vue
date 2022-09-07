let template = `
<div>
<ul id="myUL">
<template v-for="item in items">
<li :key="item.no"
    :class="{ checked : parseInt(item.todoyn)}"
    @click="checkedItem(item.no,item.todoyn)">
    {{item.contents}}
 
    <span class="close" 
          @click="deleteItem(item.no,$event)">x</span> </li>
</template>
</ul>
</div>`

export default {

  template: template,
  data: function () {
    return {
      items: [{
      }],
       }
  },
 
  created: function () {
    const component = this;

    $.ajax({
      url: 'http://192.168.0.83:8088/myserver/todoSelect',
      data: {
        id: 192168043
      },
      dataType: 'json',
      success: function (data) {
        if (data != null) {
          component.items = data;
          console.log(component.items)
        }
      },
      error: function (reject) {
        console.log(reject)
      }
    })
  },
  methods: {
    loadData: function () {},
    checkedItem: function (num, yn) {
      let component = this;
      console.log(num)
      if (yn == 0) {
        $.ajax({
          url: 'http://192.168.0.83:8088/myserver/todoUpdate',
          data: {
            id: 192168043,
            no: num,
            todoyn: 1
          },
          type: 'get',
          dataType: 'json',
          success: function (data) {
            if (data != null) {
              console.log(1)
              component.$router.go(0);
            }
          },
          error: function (reject) {
            console.log(reject)
          }
        })
      }
      else {
        $.ajax({
          url: 'http://192.168.0.83:8088/myserver/todoUpdate',
          data: {
            id: 192168043,
            no: num,
            todoyn: 0
          },
          type: 'get',
          dataType: 'json',
          success: function (data) {
            if (data != null) {
              console.log(1)
              component.$router.go(0);
            }
          },
          error: function (reject) {
            console.log(reject)
          }
        })
      }
    },
    deleteItem: function (num,e) {
      e.stopPropagation()
      let component = this;
      $.ajax({
        url: 'http://192.168.0.83:8088/myserver/todoDelete',
        data: {
          id: 192168043,
          no: num,
        },
        type: 'get',
        dataType: 'json',
        success: function (data) {
          if (data != null) {
            console.log(133333)
            component.$router.go(0);
          }
        },
        error: function (reject) {
          console.log(reject)
        }
      })
      return false;
    }
  }
}