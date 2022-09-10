<<<<<<< HEAD
var service = new Service();
var validation = new Validation();

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
            data-target="#myModal" onclick="editProduct(${product.id})">Sửa</button>
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

getEle("btnThemSanPham").addEventListener("click", function () {
  //Tạo nút "Add"
  var btnAdd = `<button class="btn btn-success" onclick="addProduct()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

/**
 * Add Product
 */
function addProduct() {
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var img = getEle("img").value;
  var desc = getEle("desc").value;
  var type = getEle("type").value;
    
  //Validation
  var isValid = true;
  //Name
  isValid = validation.kiemTraRong(name, "tbnName", "Vui lòng không để trống!");
  //Price
  isValid &=
    validation.kiemTraRong(price, "tbPrice", "Vui lòng không để trống!") &&
    validation.kiemTraDoDaiKiTu(
      price,
      "tbPrice",
      "Vui lòng nhập lớn hơn đơn vị hàng trăm !",
      3,
      10
    );
  //Screen
  isValid = validation.kiemTraRong(
    screen,
    "tbScreen",
    "Vui lòng không để trống!"
  );
  //BackCamera
  isValid = validation.kiemTraRong(
    backCamera,
    "tbBackCamera",
    "Vui lòng không để trống!"
  );
  //FrontCamera
  isValid = validation.kiemTraRong(
    frontCamera,
    "tbFrontCamera",
    "Vui lòng không để trống!"
  );
  //Img
  isValid = validation.kiemTraRong(img, "tbImage", "Vui lòng không để trống!");
  //Desc
  isValid = validation.kiemTraRong(desc, "tbDesc", "Vui lòng không để trống!");
  //Type
  isValid = validation.kiemTraRong(type, "tbType", "Vui lòng không để trống!");

  if (!isValid) return null;

  //End validation

  var product = new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  service
    .addProductApi(product)
    .then(function () {
      fetchData();
      //Tắt hộp thoại modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Edit product
 */

function editProduct(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Update Sản Phẩm";

  var btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  service
    .getProductById(id)
    .then(function (result) {
      //showw thông tin ra các thẻ input
      getEle("name").value = result.data.name;
      getEle("price").value = result.data.price;
      getEle("screen").value = result.data.screen;
      getEle("backCamera").value = result.data.backCamera;
      getEle("frontCamera").value = result.data.frontCamera;
      getEle("img").value = result.data.img;
      getEle("desc").value = result.data.desc;
      getEle("type").value = result.data.type;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Update Product
 */

function updateProduct(id) {
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var img = getEle("img").value;
  var desc = getEle("desc").value;
  var type = getEle("type").value;

  var product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  service
    .updateProductApi(product)
    .then(function () {
      fetchData();
      //Tắt hộp thoại modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
=======
var service = new Service();
var validation = new Validation();

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
            data-target="#myModal" onclick="editProduct(${product.id})">Sửa</button>
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

getEle("btnThemSanPham").addEventListener("click", function () {
  //Tạo nút "Add"
  var btnAdd = `<button class="btn btn-success" onclick="addProduct()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

/**
 * Add Product
 */
function addProduct() {
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var img = getEle("img").value;
  var desc = getEle("desc").value;
  var type = getEle("type").value;
    
  //Validation
  var isValid = true;
  //Name
  isValid = validation.kiemTraRong(name, "tbnName", "Vui lòng không để trống!");
  //Price
  isValid &=
    validation.kiemTraRong(price, "tbPrice", "Vui lòng không để trống!") &&
    validation.kiemTraDoDaiKiTu(
      price,
      "tbPrice",
      "Vui lòng nhập lớn hơn đơn vị hàng trăm !",
      3,
      10
    );
  //Screen
  isValid = validation.kiemTraRong(
    screen,
    "tbScreen",
    "Vui lòng không để trống!"
  );
  //BackCamera
  isValid = validation.kiemTraRong(
    backCamera,
    "tbBackCamera",
    "Vui lòng không để trống!"
  );
  //FrontCamera
  isValid = validation.kiemTraRong(
    frontCamera,
    "tbFrontCamera",
    "Vui lòng không để trống!"
  );
  //Img
  isValid = validation.kiemTraRong(img, "tbImage", "Vui lòng không để trống!");
  //Desc
  isValid = validation.kiemTraRong(desc, "tbDesc", "Vui lòng không để trống!");
  //Type
  isValid = validation.kiemTraRong(type, "tbType", "Vui lòng không để trống!");

  if (!isValid) return null;

  //End validation

  var product = new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  service
    .addProductApi(product)
    .then(function () {
      fetchData();
      //Tắt hộp thoại modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Edit product
 */

function editProduct(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Update Sản Phẩm";

  var btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  service
    .getProductById(id)
    .then(function (result) {
      //showw thông tin ra các thẻ input
      getEle("name").value = result.data.name;
      getEle("price").value = result.data.price;
      getEle("screen").value = result.data.screen;
      getEle("backCamera").value = result.data.backCamera;
      getEle("frontCamera").value = result.data.frontCamera;
      getEle("img").value = result.data.img;
      getEle("desc").value = result.data.desc;
      getEle("type").value = result.data.type;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Update Product
 */

function updateProduct(id) {
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var img = getEle("img").value;
  var desc = getEle("desc").value;
  var type = getEle("type").value;

  var product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  service
    .updateProductApi(product)
    .then(function () {
      fetchData();
      //Tắt hộp thoại modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
>>>>>>> 47d0f6d6281fc64773ed8bdee0a98ddea19c7207
