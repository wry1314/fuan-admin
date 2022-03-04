const login = resolve => require(['@/view/login/login'], resolve);
export var loginRouter = [
  {
    path: '/login',
    name: 'login',
    component: login
  }
]
