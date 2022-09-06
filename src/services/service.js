function Service() {
  this.getListProduct = function () {
    /**Promise
     *    -Pending (chờ)
     *        -Resolve(Thành công)
     *    or  -Reject(Thất hứa)
     */

    //request
    return axios({
      url: "https://6308314546372013f577d298.mockapi.io/Products",
      method: "GET",
    });
  };
}
