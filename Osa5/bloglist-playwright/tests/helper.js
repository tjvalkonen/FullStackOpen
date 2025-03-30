const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)  
    await page.getByRole('button', { name: 'login' }).click() 
  }

  const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'create new blog' }).click()

    await page.getByTestId('title-input').fill(title)
    await page.getByTestId('author-input').fill(author)
    await page.getByTestId('url-input').fill(url)

    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('heading', { name: title }).waitFor()
}

const addLike = async (page, title) => {

      const selectedBlogText = await page.getByText(title)
      const selectedBlogElement = await selectedBlogText.locator('..')
      await selectedBlogElement.getByRole('button', { name: 'view' }).click()
      
      // try to wait response from api/blogs
      const addLikeResponsePromise = page.waitForResponse('http://localhost:5173/api/blogs')
      await page.getByRole('button', { name: 'Like' }).click()
      const addLikeResponse = await addLikeResponsePromise

      // close detailed view
      await selectedBlogElement.getByRole('button', { name: 'hide' }).click()
      await selectedBlogElement.getByRole('button', { name: 'view' }).waitFor()

}
  
  export { loginWith , createBlog, addLike}