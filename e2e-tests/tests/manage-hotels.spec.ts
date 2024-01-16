import {test, expect} from "@playwright/test"
import path from "path";

const UI_URL = 'http://localhost:5173/' // frontend 

test.beforeEach(async({ page })=> {
    await page.goto(UI_URL)

    // get sign in button, тоесть производится поиск по странице элемента указанный в коде
    await page.getByRole('link',{name: 'Sign in'}).click(); 
    // ожидает что найденный элемент отображается на странице
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  
    // Заполнение данных в поля при входе
    await page.locator('[name=email]').fill('admin@admin.com');
    await page.locator('[name=password]').fill('admin!');
  
    await page.getByRole("button", { name: "Log in" }).click();
    // Проверка всплываещего toast(увдеомление о регистрации), проверка наличия в хедере элементов My Bookings ...
    await expect(page.getByText('Sign-in Successful')).toBeVisible();
})

test('проверка добавления отеля', async({page})=>{
    await page.goto(`${UI_URL}add-hotel`)

    await page.locator('[name=name]').fill('Test Hotel')
    await page.locator('[name=city]').fill('Test City')
    await page.locator('[name=country]').fill('Test Country')
    await page.locator('[name=description]').fill('Test description')
    await page.locator('[name=pricePerNight]').fill('100')
    await page.selectOption('select[name="starRating"]', "3" )
    await page.getByText("Budget").click();
    await page.getByLabel('Free Wi-fi').check();
    await page.getByLabel('Parking').check();

    await page.locator('[name="adultCount"]').fill('2')
    await page.locator('[name="childCount"]').fill('2')

    await page.setInputFiles('[name="imageFiles"]', [path.join(__dirname, 'files', '1234.jpg')])

    await page.getByRole('button', { name: 'Save' }).click()
    await expect(page.getByText('Hotel Saved')).toBeVisible()
})

test('проверка наличия отелей', async ({page})=> {
    await page.goto(`${UI_URL}my-hotels`)

    await expect(page.getByText('Hotel in Hell')).toBeVisible()
    await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible()
    await expect(page.getByText('Hell, Hellish')).toBeVisible()
    await expect(page.getByText('Budget')).toBeVisible()
    await expect(page.getByText('£666 per night')).toBeVisible()
    await expect(page.getByText('1 adults, 1 children')).toBeVisible()
    await expect(page.getByText('5 Star Rating')).toBeVisible()

    await expect(page.getByRole('link', { name: 'View more details' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Add Hotel' })).toBeVisible()
})

test('проверка редактирования отеля', async({page}) => {
    await page.goto(`${UI_URL}my-hotels`)

    await page.getByRole('link', {name: 'View more details'}).click()

    await page.waitForSelector('[name="name"]', {state: 'attached'})
    await expect(page.locator('[name="name"]')).toHaveValue('Hotel in Hell')
    await page.locator('[name="name"]').fill('Hotel in Hell1')
    await page.getByRole('button', {name: 'Save'}).click()
    await expect(page.getByText('Hotel Saved')).toBeVisible();

    page.reload();

    await expect(page.locator('[name="name"]')).toHaveValue('Hotel in Hell1')
    await page.locator('[name="name"]').fill('Hotel on Hell')
    await page.getByRole('button', {name: 'Save'}).click()
    await expect(page.getByText('Hotel Saved')).toBeVisible();
})