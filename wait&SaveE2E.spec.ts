import { test, expect } from '@playwright/test';
import config from '../config';

test(`Lyft Wait & Save`, async ({ page }) => {
    /**
     * Validates the page looks correctly to previous snapshot
     */
    // Go to URL
    await page.goto(`${config.baseurl}/rider`)
    // Wait for the selector
    const element = await page.waitForSelector('a', { timeout: 5000});
    await element.getAttribute('Get a ride');
    // Click Wait & Save
    await page.getByRole('button', { name : 'Wait & Save'}).click();
    // Click Book this ride 
    await page.getByRole('button', { name: 'Book this ride'}).click();
    // Wait for a element on the next page
    const header = await page.waitForSelector('h1');
    await header.getAttribute('Let’s start with your number');
    // Fill in Phone number
    await page.getByTestId('phone').fill('8675309');
    // Set the wait for the response 
    let responsePromise: any;
    await page.getByRole('button', { name: 'Submit'}).click();
    responsePromise = page.waitForResponse(`${config.baseapi}/api/app`, {timeout: 30000});
    // TODO Finish 
        }
    );
