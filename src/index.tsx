import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import EditFormParent, { EditFormParentProps } from './Forms/EditFormParent';
import { Button } from '@material-ui/core';
import ProtectedRoute from './Routing/ProtectedRoute';
import Auth0ProviderWithHistory from './Routing/Auth0ProviderWithHistory';


ReactDOM.render(
  <div id="container"></div>,
  document.body
);
let destination = document.getElementById("container");

function App() : JSX.Element {
  const history = useHistory();
  console.log("render app");
  return <Button onClick={() => history.push("/edit/1", {
    firstName: "alex",
    lastName: 'gavrilov',
    email: 'ag1011@yandex.ru',
    option: "2",
    id: "1"
} as EditFormParentProps)}>Edit</Button> 
}


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Switch>
          <ProtectedRoute path={"/edit/:id"} component={EditFormParent} />
          <Route path="/" component={App} />
        </Switch>
        <App />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>,
  destination
)