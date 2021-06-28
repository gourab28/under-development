import React, {Fragment} from 'react';
import Tippy from '@tippy.js/react';
 
export default function Login (props) {
  return (
    <Fragment>
      <h1>Login</h1>
      <Tippy content="Hello">
        <a>My button</a>
      </Tippy>
    </Fragment>
    )
}