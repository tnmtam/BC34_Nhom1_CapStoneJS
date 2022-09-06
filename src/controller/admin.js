var service = new Service();

function getEle(id) {
    return document.getElementById(id);
}

function fetchData() {
    //pending
    //show loading
    getEle("loading").style.display = "block";
  
    service
      .getListProduct()
  
      .then(function (result) {
        //response
        // console.log(result.data);
        renderHTML(result.data);
        getEle("loading").style.display = "none";
      })
  
      .catch(function (error) {
        //response
        console.log(error);
        getEle("loading").style.display = "none";
      });
}

fetchData();

function renderHTML(data) {
    var content = "";
  
    data.forEach(function (product) {
      content += `
      <td>a</td>
      <td>a</td>
      <td>a</td>
      <td>a</td>
      <td>a</td>
      <td>a</td>
      <td>
        <button>Sửa</button>
        <button>Xóa</button>
      </td>
      `;
    });
    getEle("tblDanhSachSanPham").innerHTML = content;
}