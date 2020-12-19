import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom'
import { getQueriesForElement } from '@testing-library/dom';


describe('counter testing', () => {
  test('Render the title of the counter', () => {
    const wrapper = document.createElement('div')
    ReactDOM.render(<App />, wrapper)
    const { getByText, getByLabelText } = getQueriesForElement(wrapper)

    expect(getByText('this is a counter!')).not.toBeNull()
    expect(getByLabelText('todo')).not.toBeNull()
  });
})

