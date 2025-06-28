import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

// blog, username, updateLike, removeBlog, isCurrentUser

const blog = {
  title: 'Title-testblog',
  author: 'Author-testblog',
  url: 'url-testblog',
  likes: 1234567890,
}
const username = 'Username-testblog'

test('renders blog content', () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  // screen.debug(div)
  expect(div).toHaveTextContent('Title-testblog')
})

test('lessInfoDiv has title and author', () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('#lessInfoDiv')
  // screen.debug(div)
  expect(div).toHaveTextContent('Title-testblog')
  expect(div).toHaveTextContent('Author-testblog')
})

test('moreInfoDiv has url, likes and user', () => {
  const { container } = render(<Blog blog={blog} username={username} />)
  const div = container.querySelector('#moreInfoDiv')
  // screen.debug(div)
  expect(div).toHaveTextContent('url-testblog')
  expect(div).toHaveTextContent('likes')
  // Added Check likes value
  const count = blog.likes
  // console.log('likes: ' , count)
  // 1234567890
  expect(count).toBe(1234567890)
  expect(div).toHaveTextContent('Username-testblog')
})

test('lessInfoDiv is visible att start', () => {
  const { container } = render(
    <Blog blog={blog} username={username} isCurrentUser={false} />
  )
  const div = container.querySelector('#lessInfoDiv')
  // screen.debug(div)
  expect(div).toBeVisible()
})

test('moreInfoDiv is not visible att start', () => {
  const { container } = render(
    <Blog blog={blog} username={username} isCurrentUser={false} />
  )
  const div = container.querySelector('#moreInfoDiv')
  // screen.debug(div)
  expect(div).not.toBeVisible()
})

// Button tests

test('clicking the view button hides lessInfoDiv and shows moreInfoDiv', async () => {
  const mockHandler = vi.fn()
  const { container } = render(
    <Blog
      blog={blog}
      username={username}
      isCurrentUser={false}
      toggleVisibility={mockHandler}
    />
  )
  const user = userEvent.setup()
  const button = container.querySelector('#ShowMore')
  // screen.debug(button)
  await user.click(button)
  // expect(mockHandler.mock.calls).toHaveLength(1)

  // Less info div
  const div1 = container.querySelector('#lessInfoDiv')
  // screen.debug(div1)
  expect(div1).not.toBeVisible()

  // More info div
  const div2 = container.querySelector('#moreInfoDiv')
  // screen.debug(div2)
  expect(div2).toBeVisible()
})

test('clicking the like button twice calls event handler twice', async () => {
  const mockHandler = vi.fn()
  const { container } = render(
    <Blog
      blog={blog}
      username={username}
      isCurrentUser={false}
      updateLike={mockHandler}
    />
  )
  const user = userEvent.setup()
  const button = container.querySelector('#likeButton')
  // screen.debug(button)
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
