export default {
  data:[
    {
      'name':"首页",
      'index':'1',
      'path':'/'
    },
    {
      'name':"生产管理",
      'index':'2',
      'path':'/production-list',
      //  二级
      'childMenu':[
        {
          'name':'生成计划表',
          'index':'2-1',
          "path":'/production-list'
        }
      ]
    },
    {
      'name':"技术品质管理",
      'index':'3',
      'path':'',
      //  二级
      'childMenu':[]
    },
    {
      'name':"大数据",
      'index':'4',
      'path':'',
      //  二级
      'childMenu':[]
    },


  ]
}
