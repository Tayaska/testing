import { getProductsList } from "../../utils/requests";
import { test, expect } from '@playwright/test';

test("should return product list from getProductsList", async () => {
  const mockText = async () => JSON.stringify([{ id: 1, name: "Product 1" }]);
  const mockCtx = {
    get: async () => ({ text: mockText })
  };

  const { data } = await getProductsList(mockCtx);

  expect(data).toEqual([{ id: 1, name: "Product 1" }]);
});
test('2. Повертає порожній список, якщо немає продуктів', async () => {
    const mockText = async () => JSON.stringify([]);
    const mockCtx = {
      get: async () => ({ text: mockText })
    };

    const { data } = await getProductsList(mockCtx);
    expect(data).toEqual([]);
  });

  test('3. Кидає помилку при невалідному JSON', async () => {
    const mockText = async () => "not valid json";
    const mockCtx = {
      get: async () => ({ text: mockText })
    };

    await expect(getProductsList(mockCtx)).rejects.toThrow(SyntaxError);
  });

  test('4. Обробляє HTTP-помилку (імітація 404)', async () => {
    const mockCtx = {
      get: async () => {
        throw new Error('404 Not Found');
      }
    };

    await expect(getProductsList(mockCtx)).rejects.toThrow('404 Not Found');
  });

  test('5. Кидає помилку, якщо відповідь порожня', async () => {
    const mockText = async () => "";
    const mockCtx = {
      get: async () => ({ text: mockText })
    };

    await expect(getProductsList(mockCtx)).rejects.toThrow();
  });

