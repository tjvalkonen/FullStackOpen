const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, addLike } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // ...
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // ...
      /*
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')  
      await page.getByRole('button', { name: 'login' }).click() 
      */
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // ...
      /*
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('wrong')  
      await page.getByRole('button', { name: 'login' }).click() 
      */
      await loginWith(page, 'mluukkai', 'wrong')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // ...
      await loginWith(page, 'mluukkai', 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
      // ...
      await createBlog(page, 'TitleTestBlog001', 'Author First', 'www.firsturl.com')
      await createBlog(page, 'TitleTestBlog002', 'Author Second', 'www.secondurl.com')
      await createBlog(page, 'TitleTestBlog003', 'Author Third', 'www.thirdurl.com')
      // test-blog
      // not working -- getByText('TitleTestBlog001') resolved to 3 elements
      // await expect(page.getByText('TitleTestBlog001')).toBeVisible()

      // await expect(page.getByTestId('test-blog')).toBeVisible()
      // const locator = await page.getByTestId('test-blog')
      // await expect(locator).toBeVisible()

      await expect(page.getByRole('heading', { name: 'TitleTestBlog002' })).toBeVisible();
    })
    test('a new blog can be liked', async ({ page }) => {
      // ...
      await createBlog(page, 'TitleTestBlog001', 'Author First', 'www.firsturl.com')
      await createBlog(page, 'TitleTestBlog002', 'Author Second', 'www.secondurl.com')
      await createBlog(page, 'TitleTestBlog003', 'Author Third', 'www.thirdurl.com')


      // How to make multiple likes and check like count?
      await addLike(page, 'TitleTestBlog002')

      /*
      await addLike(page, 'TitleTestBlog002')

      await addLike(page, 'TitleTestBlog002')

      await addLike(page, 'TitleTestBlog002')
      */

      /*
      const secondBlogText = await page.getByText('TitleTestBlog002')
      const secondBlogElement = await secondBlogText.locator('..')
      await secondBlogElement.getByRole('button', { name: 'view' }).click()
      await expect(secondBlogElement.getByText('Like')).toBeVisible()
      await secondBlogElement.getByRole('button', { name: 'Like' }).click()
      await secondBlogElement.getByRole('button', { name: 'Like' }).click()
      await secondBlogElement.getByRole('button', { name: 'Like' }).click()
      */
    })
  })
})