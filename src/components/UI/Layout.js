import React from 'react';
import { Container } from 'react-bootstrap'

const Layout = (props) => (
  // <Container style={{ maxWidth:'100%', width: '100%', marginLeft:'0px', marginRight:'0px'}}>
  <Container>
    {props.children}
  </Container>
)

export default Layout;