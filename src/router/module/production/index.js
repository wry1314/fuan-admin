const productionList = resolve => require(['@/view/production/productionList'], resolve);
export var productionRouter = [
  {
    path: '/production-list',
    name: 'productionList',
    component: productionList
  }
]
