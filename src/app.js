import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/ui/navBar'
import NotFound from './layouts/notFound'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import UserEdit from './layouts/userEdit'

const App = () => {
  return <>
    <NavBar />
    <Switch>
      <Route path='/users' exact component={Users}/>
      <Route path='/users/:userId?/edit'><UserEdit/></Route>
      <Route path='/users/:userId?' component={Users}/>
      <Route path='/login/:type?' component={ Login } />
      <Route path='/' exact component={ Main } />
      <Route path="/404" component={NotFound} />
      <Redirect to='/404' />
    </Switch>
  </>
}

export default App
