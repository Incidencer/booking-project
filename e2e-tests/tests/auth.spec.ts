import { test, expect } from '@playwright/test';
import { platform } from 'os';

const UI_URL = 'http://localhost:5173/' // frontend 

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL)

  // get sign in button, тоесть производится поиск по странице элемента указанный в коде
  await page.getByRole('link',{name: 'Sign in'}).click(); 
  // ожидает что найденный элемент отображается на странице
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();

  // Заполнение данных в поля при входе
  await page.locator('[name=email]').fill('1@1.com');
  await page.locator('[name=password]').fill('password123');

  await page.getByRole("button", { name: "Log in" }).click();
  // Проверка всплываещего toast(увдеомление о регистрации), проверка наличия в хедере элементов My Bookings ...
  await expect(page.getByText('Sign-in Successful')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});


// Проверка компонентов регистрации
test('should allow user to register', async({page}) => {
  const testEmail = `test_register_${Math.floor(Math.random()* 90000) + 10000}@test.com` // генератор тест почты
  await page.goto(UI_URL);

  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Create account an here' }).click();

  await expect(
    page.getByRole('heading', { name: 'Create an Account' })
    ).toBeVisible();

  await page.locator('[name=firstName]').fill('test_firstName')
  await page.locator('[name=lastName]').fill('test_lastName')
  await page.locator('[name=email]').fill('test_register@test.com')
  await page.locator('[name=password]').fill('password123')
  await page.locator('[name=confirmPassword]').fill('password123')

  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page.getByText('Registration Success')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});