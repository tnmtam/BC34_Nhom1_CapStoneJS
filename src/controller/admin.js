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
        renderHTML(result.data);
        getEle("loading").style.display = "none";
      })
  
      .catch(function (error) {
        console.log(error);
        getEle("loading").style.display = "none";
      });
}

fetchData();

function renderHTML(data) {
    var content = "";
  
    data.forEach(function (product) {
      content += `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><img width="50px" src="${product.img}"/></td>
        <td>${product.desc}</td>
        <td>${product.type}</td>
        <td>
            <button class="btn btn-success" data-toggle="modal"
            data-target="#myModal">Sửa</button>
            <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Xóa</button>
        </td>
      </tr>
      `;
    });
    getEle("tblDanhSachSanPham").innerHTML = content;
}

/**
 * Delete
 */
function deleteProduct(id) {
    service
        .deleteProductApi(id)
        .then(function () {
        //render list data
        fetchData();
        })
        .catch(function (error) {
        console.log(error);
        });
}









