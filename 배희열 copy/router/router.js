import selectitems from '../components/selectitems.js'

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'selectitems',
      component: selectitems
    },{
      path:'*',
      redirect :'/'
    }
  ]
})