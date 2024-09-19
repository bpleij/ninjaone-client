import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from './App';

// Mocking the child components
jest.mock('./components/Header', () => () => <div>Mock Header</div>);
jest.mock('./components/DataTable/DevicesHeader', () => () => <div>Mock DevicesHeader</div>);
jest.mock('./components/DataTable/DataTable', () => () => <div>Mock DataTable</div>);

describe('App Component', () => {
  it('renders correctly', () => {
    const testRenderer = TestRenderer.create(<App />);
    const testInstance = testRenderer.root;

    // Find components by the text inside the mocked components
    const headerInstance = testInstance.findByProps({ children: 'Mock Header' });
    const devicesHeaderInstance = testInstance.findByProps({ children: 'Mock DevicesHeader' });
    const dataTableInstance = testInstance.findByProps({ children: 'Mock DataTable' });

    // Ensure that each mocked component is rendered
    expect(headerInstance).toBeTruthy();
    expect(devicesHeaderInstance).toBeTruthy();
    expect(dataTableInstance).toBeTruthy();
  });
});
