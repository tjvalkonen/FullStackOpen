import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  // render(<BlogForm createBlog={createBlog} />)
  const { container } = render(<BlogForm createBlog={createBlog}  />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const submitButton = container.querySelector('#submit-button')

  await user.type(titleInput, 'title-test')
  await user.type(authorInput, 'author-test')
  await user.type(urlInput, 'www.testurl.test')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title-test')
  expect(createBlog.mock.calls[0][0].author).toBe('author-test')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testurl.test')
})