
import main from '../components/main.js';
import myBoardList from '../components/myBoardList.js';
import myBoardRead from '../components/myBoardRead.js';
import myBoardWrite from '../components/myBoardWrite.js';

export default new VueRouter({
  mode : 'history', // default : hash ->'#'/path
  routes : [
    //main
    {
      path : '/',
      name : 'main',
      component : main,
      props :true
    },
    //boardList
    {
      path : '/boardList',
      name : 'boardList',
      component : myBoardList,
      props : true
    },
    //boardRead
    {
      path : '/boardRead/:data',
      name :'boardRead',
      component : myBoardRead,
      props : true
    },
    //boardWrite
    {
      path : '/boardWrite',
      name : 'boardWrite',
      component : myBoardWrite,
    },
    {
      path  : '*',
      redirect : '/'
    }
  ]
})