import empSelect from '../components/empSelect.js'
import empRead from '../components/empRead.js'
import empWrite from '../components/empWrite.js'




export default new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'empSelect',
      component: empSelect
    },
    {
      path:'/empRead/:empId',
      name : 'empRead',
      component : empRead,
      props : true
    },
    {
      path:'/empWrite/:empId',
      name : 'empWrite',
      component : empWrite,
      props : true
    },
    {
      path: '*',
      redirect: '/',
    }    
  ]
})