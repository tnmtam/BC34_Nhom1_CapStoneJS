function Service() {
  this.getListProduct = function () {
    return axios({
      url: "https://6308314546372013f577d298.mockapi.io/Products",
      method: "GET",
    });
  };
  this.deleteProductApi = function (id) {
    return axios({
        url: `https://6308314546372013f577d298.mockapi.io/Products/${id}`,
        method: "DELETE",
    });
  };

  this.addProductApi = function (product) {
      return axios({
          url: "https://6308314546372013f577d298.mockapi.io/Products",
          method: "POST",
          data: product,
      });
  };

  this.getProductById = function (id) {
      return axios({
          url: `https://6308314546372013f577d298.mockapi.io/Products/${id}`,
          method: "GET",
      });
  };

  this.updateProductApi = function (product) {
      return axios({
          url: `https://6308314546372013f577d298.mockapi.io/Products/${product.id}`,
          method: "PUT",
          data: product,
      });
  };
}
