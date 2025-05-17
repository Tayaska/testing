export const getProductsList = async (ctx) => {
    const response = await ctx.get("productsList");
    const data = await response.text();
    return { response, data:JSON.parse (data) };
  };

  export const createProduct = async (ctx) => {
    const response = await ctx.post("productsList");
    const data = await response.text();
    return { response, data:JSON.parse (data) };
  };

  export const getBrands = async (ctx) => {
    const response = await ctx.get("brandsList");
    const data = await response.text();
    return { response, data:JSON.parse (data) };
  };

  export const updateBrand  = async (ctx) => {
    const response = await ctx.put("brandsList");
    const data = await response.text();
    return { response, data:JSON.parse (data) };
  };

  export const searchProducts = async (ctx, search) => {
    const response = await ctx.post("searchProduct",{
        form:{
            search_product:search
        }
    });
    const data = await response.text();
    return { response, data:JSON.parse (data) };
  };