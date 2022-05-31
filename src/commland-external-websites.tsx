import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { App } from '@/modules/app';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary () {
    // https://reactjs.org/docs/error-boundaries.html
    // Customize the root error boundary for your microfrontend here.
    return <div>An error has ocurred</div>;
  },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const { bootstrap, mount, unmount } = lifecycles;
