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

    
    await page.getByTestId('test-blog').waitFor()
    // not working -- getByText('TitleTestBlog001') resolved to 3 elements
    // await page.getByText(title).waitFor()
}
  
  export { loginWith , createBlog}