let template = `<div id="myDIV" class="header">
<h2>My To Do List</h2>
<input type="text" v-model="title" placeholder="Title...">
<span @click="addItem" class="addBtn">Add</span>
</div>
`
export default{
  template,
  data : function(){
    return {
      title : '',
        }
  },
  methods : {
    addItem :function(){
      const component =this;
      $.ajax({
        url : 'http://192.168.0.83:8088/myserver/todoInsert',
        data : { id : 192168043 , contents : component.title},
        dataType :'json',
        success : function(data){
          if(data !=null){
            console.log(1)
            alert('TodoList add!!');
            component.$router.go(0);
          }
        },
        error : function(reject){
          console.log(reject)
        }
      })
    }
  }
 }