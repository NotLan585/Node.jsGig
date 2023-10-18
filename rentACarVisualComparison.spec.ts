import { test, expect } from '@playwright/test';
import config from '../config';

test(`Lyft Comparison validation`, async ({ page }) => {
    /**
     * Validates the page looks correctly to previous snapshot
     */
    // Go to URL
    await page.goto(`${config.baseurl}/rider`)
    // Wait for the selector
    const element = await page.waitForSelector('a', { timeout: 5000});
    await element.getAttribute('Get a ride');
    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);     
    // Takes a new snapshot and compares it to a previous one and errors if Pixel ratio is off
    // Picture is in tests/rentACarVisualComparison.spec.ts-snapshots/Lyft-Comparison-validation-1-chromium-darwin.png
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 1 , fullPage: true});
        }
    );
