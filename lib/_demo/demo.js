import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; 
import DemoApp from './DemoApp';

document.addEventListener('DOMContentLoaded', function() { 
  render(<BrowserRouter><DemoApp /></BrowserRouter>, document.getElementById('root'));
});

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./DemoApp', () => {
    render(DemoApp);
  });
}