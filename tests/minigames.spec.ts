import { expect, test } from "@playwright/test";

test("minigames text present in homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("minigames")).toBeVisible();
});
