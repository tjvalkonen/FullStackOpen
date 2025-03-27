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

    
    // await page.getByTestId('test-blog').waitFor()
    // await page.getByRole('button', { name: 'create new blog' }).waitFor()
    // not working -- getByText('TitleTestBlog001') resolved to 3 elements
    // await page.getByText(title).waitFor()
    await page.getByRole('heading', { name: title }).waitFor()
    // await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
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


      await selectedBlogElement.getByRole('button', { name: 'Like' }).click()
      // close detailed view

      // Wait
      // const responsePromise =  getFulfilledResponse(page, title)
      // const response = await responsePromise
      // const responseBody = await response.json()
      // console.log(responsePromise)

      await selectedBlogElement.getByRole('button', { name: 'hide' }).click()

}
  
  export { loginWith , createBlog, addLike}