import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('a test can be passed after rendering', () => {
  render(<App/>)
  expect(1 + 1).toBe(2)
})
