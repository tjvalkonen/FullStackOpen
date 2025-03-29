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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Toinen Tunnus',
        username: 'toinentunnus',
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
      // await createBlog(page, 'TitleTestBlog001', 'Author First', 'www.firsturl.com')
      await createBlog(page, 'TitleTestBlog002', 'Author Second', 'www.secondurl.com')
      // await createBlog(page, 'TitleTestBlog003', 'Author Third', 'www.thirdurl.com')
      // await createBlog(page, 'TitleTestBlog004', 'Author Fourth', 'www.fourthurl.com')

      await expect(page.getByRole('heading', { name: 'TitleTestBlog002' })).toBeVisible();
    })
    test('a new blog can be liked', async ({ page }) => {
      // ...
      await createBlog(page, 'TitleTestBlog001', 'Author First', 'www.firsturl.com')
      await createBlog(page, 'TitleTestBlog002', 'Author Second', 'www.secondurl.com')
      await createBlog(page, 'TitleTestBlog003', 'Author Third', 'www.thirdurl.com')
      await createBlog(page, 'TitleTestBlog004', 'Author Fourth', 'www.fourthurl.com')

      // How to make multiple likes and check like count?
      // if clicked two times in a row, it does not work.

      await addLike(page, 'TitleTestBlog002')
      
      await addLike(page, 'TitleTestBlog001')
      
      await addLike(page, 'TitleTestBlog002')
  
      await addLike(page, 'TitleTestBlog003')

      // last one doesn't work. cannot find the view button?
      // await addLike(page, 'TitleTestBlog004')
      
      const selectedBlogText = await page.getByText('TitleTestBlog002')
      const selectedBlogElement = await selectedBlogText.locator('..')
      await selectedBlogElement.getByRole('button', { name: 'view' }).click()

      await expect(page.getByText('likes 2')).toBeVisible()
    })

    test('a blog can be removed by the user', async ({ page }) => {
      // ...
      await createBlog(page, 'TitleTestBlog001', 'Author First', 'www.firsturl.com')
      await createBlog(page, 'TitleTestBlog002', 'Author Second', 'www.secondurl.com')
      await createBlog(page, 'TitleTestBlog003', 'Author Third', 'www.thirdurl.com')
      await createBlog(page, 'TitleTestBlog004', 'Author Fourth', 'www.fourthurl.com')
      
      const selectedBlogText = await page.getByText('TitleTestBlog002')
      const selectedBlogElement = await selectedBlogText.locator('..')
      await selectedBlogElement.getByRole('button', { name: 'view' }).click()

      await page.on("dialog", async (alert) => {
        const text = alert.message();
        console.log(text);;
        await alert.accept();
        })

      await page.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByRole('heading', { name: 'TitleTestBlog002' })).not.toBeVisible();
    })

    test('only the user that added a blog can see remove button', async ({ page }) => {
      await createBlog(page, 'TitleTestBlog001', 'Author First', 'www.firsturl.com')
      await createBlog(page, 'TitleTestBlog002', 'Author Second', 'www.secondurl.com')
      // await createBlog(page, 'TitleTestBlog003', 'Author Third', 'www.thirdurl.com')
      // await createBlog(page, 'TitleTestBlog004', 'Author Fourth', 'www.fourthurl.com')

      await page.getByRole('button', { name: 'logout' }).click()

      await loginWith(page, 'toinentunnus', 'salainen')

      const selectedBlogText = await page.getByText('TitleTestBlog001')
      const selectedBlogElement = await selectedBlogText.locator('..')
      await selectedBlogElement.getByRole('button', { name: 'view' }).click()

      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()

      const selected2BlogText = await page.getByText('TitleTestBlog002')
      const selected2BlogElement = await selected2BlogText.locator('..')
      await selected2BlogElement.getByRole('button', { name: 'view' }).click()

      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })
  describe('Blogs are sorted by number of likes', () => {
    beforeEach(async ({ page }) => {
      // ...
      await loginWith(page, 'mluukkai', 'salainen')

      await createBlog(page, 'TitleTestBlog001', 'Author First', 'www.firsturl.com')
      await createBlog(page, 'TitleTestBlog002', 'Author Second', 'www.secondurl.com')
      await createBlog(page, 'TitleTestBlog003', 'Author Third', 'www.thirdurl.com')
      await createBlog(page, 'TitleTestBlog004', 'Author Fourth', 'www.fourthurl.com')
      await createBlog(page, 'TitleTestBlog005', 'Author Fifth', 'www.fifthurl.com')
      await createBlog(page, 'TitleTestBlog006', 'Author Sixth', 'www.sixthurl.com')
      await createBlog(page, 'TitleTestBlog007', 'Author Seventh', 'www.Seventhurl.com')
    })

    test('blogs are in order with out likes', async ({ page }) => {
      // ...
      // How to make multiple likes and check like count?
      // if clicked two times in a row, it does not work.
/*
      await addLike(page, 'TitleTestBlog001') // <  
      await addLike(page, 'TitleTestBlog002')     
      await addLike(page, 'TitleTestBlog003')
      await addLike(page, 'TitleTestBlog004')
      await addLike(page, 'TitleTestBlog005')   
      await addLike(page, 'TitleTestBlog006')     
      */
      // Error: strict mode violation:
      // getByText('TitleTestBlog007').locator('..').getByRole('button', { name: 'view' }) resolved to 7
      // await addLike(page, 'TitleTestBlog007')

      /*
      const selectedBlogText = await page.getByText('TitleTestBlog001')
      const selectedBlogElement = await selectedBlogText.locator('..')
      await selectedBlogElement.getByRole('button', { name: 'view' }).click()

      // Change .. likes "NUMBER" for the test
      await expect(page.getByText('TitleTestBlog001 Author First hidewww.firsturl.comlikes 2 LikeMatti')).toBeVisible()
      // await expect(page.getByText('likes 1')).toBeVisible()
      */
      // const newPage = await browser.newPage()
      const nameList = await page.getByRole('heading')
      const expectedNamesAscending = [
        "blogs",
        'TitleTestBlog001',
        'TitleTestBlog002',
        'TitleTestBlog003',
        'TitleTestBlog004',
        'TitleTestBlog005',
        'TitleTestBlog006',
        'TitleTestBlog007'
      ]
      await expect(nameList).toHaveText(expectedNamesAscending)

    })

    test('blogs are in reverse order by likes (exept TestBlog007)', async ({ page }) => {
      // ...
      // How to make multiple likes and check like count?
      // if clicked two times in a row, it does not work.
      // addLike is unreliable. The order affects the success of the action.
      await addLike(page, 'TitleTestBlog001')  
      
      await addLike(page, 'TitleTestBlog002') // < 
      await addLike(page, 'TitleTestBlog002') // < 
    
      await addLike(page, 'TitleTestBlog003')
      await addLike(page, 'TitleTestBlog003')
      await addLike(page, 'TitleTestBlog003')

      await addLike(page, 'TitleTestBlog004')
      await addLike(page, 'TitleTestBlog004')
      await addLike(page, 'TitleTestBlog004')
      await addLike(page, 'TitleTestBlog004')
      await addLike(page, 'TitleTestBlog004')

      await addLike(page, 'TitleTestBlog005')
      await addLike(page, 'TitleTestBlog005')
      await addLike(page, 'TitleTestBlog005')
      await addLike(page, 'TitleTestBlog005')
      await addLike(page, 'TitleTestBlog005')
      await addLike(page, 'TitleTestBlog005')

      await addLike(page, 'TitleTestBlog006')
      await addLike(page, 'TitleTestBlog006')
      await addLike(page, 'TitleTestBlog006')
      await addLike(page, 'TitleTestBlog006')
      await addLike(page, 'TitleTestBlog006')
      await addLike(page, 'TitleTestBlog006')
       
      await addLike(page, 'TitleTestBlog007') // 7
      await addLike(page, 'TitleTestBlog007') // 7
      await addLike(page, 'TitleTestBlog007') // 7
      await addLike(page, 'TitleTestBlog007') // 7
      await addLike(page, 'TitleTestBlog007') // 7
      await addLike(page, 'TitleTestBlog007') // 7
      await addLike(page, 'TitleTestBlog007') // 7
      await addLike(page, 'TitleTestBlog007') // 7



      // Error: strict mode violation:
      // getByText('TitleTestBlog007').locator('..').getByRole('button', { name: 'view' }) resolved to 7
      // await addLike(page, 'TitleTestBlog007')


      const nameList = await page.getByRole('heading')
      const expectedNamesAscending = [
        "blogs",
        'TitleTestBlog007',
        'TitleTestBlog006',
        'TitleTestBlog005',
        'TitleTestBlog004',
        'TitleTestBlog003',
        'TitleTestBlog002',
        'TitleTestBlog001'
      ]
      await expect(nameList).toHaveText(expectedNamesAscending)

    })


  })
})