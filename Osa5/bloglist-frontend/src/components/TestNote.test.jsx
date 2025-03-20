import { render, screen } from '@testing-library/react'
import Note from './TestNote'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library'
  }

  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})