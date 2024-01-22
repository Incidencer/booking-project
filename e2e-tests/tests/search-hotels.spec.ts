import {test, expect} from "@playwright/test"

const UI_URL = 'http://localhost:5173/'; // frontend 

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

test("Результат поиска отеля, работа поиска", async({page}) => {
    await page.goto(UI_URL)

    await page.getByPlaceholder("Where are you going?").fill("testSearch")
    await page.getByRole("button", {name: "Search"}).click()

    await expect(page.getByText("Hotels found in testSearch")).toBeVisible()
    await expect(page.getByText("testSearch")).toBeVisible()
}
)

test("show should hotel details in SEARCH", async({page})=> {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("testSearch")
    await page.getByRole("button", {name: "Search"}).click()

    await page.getByText("testSearch")

    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", {name: "Book now"})).toBeVisible();
})