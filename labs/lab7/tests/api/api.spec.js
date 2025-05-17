import { test, expect } from "@playwright/test";
import { createProduct, getBrands, getProductsList, searchProducts, updateBrand } from "../../utils/requests";

test.describe("Api tests", () => {
    let ctx;

    test.beforeAll(async ({ playwright }) => {
        const baseURL =  "https://automationexercise.com/api/";
        ctx = await playwright.request.newContext({ baseURL });
        //(await ctx.get()).text().
    });

    test.afterAll(async () => {
        await ctx.dispose();
    });

    test("should get productlist correctly", async () => {
        const { data } = await getProductsList(ctx);
        expect(data.products[0]).toEqual(expect.objectContaining({brand:expect.any(String)}))
    })

    test("should not allow create product", async () => {
        const { data } = await createProduct(ctx);
        expect(data.responseCode).toBe(405)
    })

    test("should get brandslist correctly", async () => {
        const { data } = await getBrands(ctx);
        expect(data.brands[0]).toEqual(expect.objectContaining({brand:expect.any(String)}))
    })

    test("should not allow update brand", async () => {
        const { data } = await updateBrand(ctx);
        expect(data.responseCode).toBe(405)
    })

    test("should get searchproduct correctly", async () => {
        const { data } = await searchProducts(ctx, "top");
        expect(data.products[0]).toEqual(expect.objectContaining({brand:expect.any(String)}))
    })
})