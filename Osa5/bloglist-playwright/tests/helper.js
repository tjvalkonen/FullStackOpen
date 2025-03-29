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

    // locator('div').filter({ hasText: /^TitleTestBlog003 Author Third view$/ }).locator('#ShowMore')
    
    
    // await page.getByTestId('test-blog').waitFor()
    // await page.getByRole('button', { name: 'create new blog' }).waitFor()
    // not working -- getByText('TitleTestBlog001') resolved to 3 elements
    // await page.getByText(title).waitFor()
    await page.getByRole('heading', { name: title }).waitFor()
}

/*
async function getFulfilledResponse(page, responseTitle){

  return page.waitForResponse(async(res) => {
    console.log("Is monitoring")
    if(!res.url().includes("/api/blogs")) {
      return false
    }

    const responseBody = await res.json()
    console.log(responseBody)
    return responseBody.title === responseTitle
  })
}
*/

const addLike = async (page, title) => {

      const selectedBlogText = await page.getByText(title)
      const selectedBlogElement = await selectedBlogText.locator('..')
      await selectedBlogElement.getByRole('button', { name: 'view' }).click()

      // await expect(selectedBlogElement.getByText('Like')).toBeVisible()
      // await page.waitFor(1000)

      // await page.locator('div').filter({ hasText: /^TitleTestBlog003 Author Third view$/ }).locator('#ShowMore').click()

      // await page.locator('div').filter({ hasText: title }).locator('..').getByRole('button', { name: 'view' }).click()

      await selectedBlogElement.getByRole('button', { name: 'Like' }).click()
      

      // Wait
      // const responsePromise =  getFulfilledResponse(page, title)
      // const response = await responsePromise
      // const responseBody = await response.json()
      // console.log(responsePromise)

      // close detailed view
      await selectedBlogElement.getByRole('button', { name: 'hide' }).click()
      // await selectedBlogElement.getByRole('button', { name: 'view' }).waitFor()

}
  
  export { loginWith , createBlog, addLike}