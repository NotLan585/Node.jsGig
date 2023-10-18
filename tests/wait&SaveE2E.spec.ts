import { test, expect } from '@playwright/test';
import config from '../config';

// Don't use any storage for this test
test.use({ storageState: { cookies: [], origins: [] } });

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
    await page.getByRole('link', { name: 'Book this ride' }).click();
    // Wait for a element on the next page
    const header = await page.waitForSelector('h1');
    await header.getAttribute('Let’s start with your number');
    // Fill in Phone number
    await page.getByLabel('Enter mobile phone number').fill('5858675309');
    // Set the wait for the response 
    let responsePromise: any;
    await page.getByRole('button', { name: 'Submit'}).click();
    // TODO Finish and expect to get a 204/200 response 
    //responsePromise = page.waitForResponse(`${config.baseapi}/api/app`, {timeout: 30000});
        }
    );
