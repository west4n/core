import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
	await page.goto('http://localhost:3000/')
	await page.getByPlaceholder('Название').click()
	await page.getByPlaceholder('Название').fill('Test name')
	await page.getByPlaceholder('Описание').click()
	await page.getByPlaceholder('Описание').fill('Test descr')
	await page.getByRole('button', { name: 'Добавить' }).click()
	await expect(page.getByText('Test nameTest descrУдалить')).toBeVisible()
	await page.getByRole('button', { name: 'Удалить' }).click()
	await expect(page.getByText('Test nameTest descrУдалить')).not.toBeVisible()
})
