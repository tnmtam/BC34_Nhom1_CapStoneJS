var service = new Service();
var cart = [];


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
//Render pay
function renderPay() {
  var content = "";
  var total = 0;
  cart.forEach(function (cartItem) {
    total = 0 + parseInt(total + cartItem.product.price*1);
    content += `
    
    <tr>
      <td>${cartItem.product.id}</td>
      <td>${cartItem.product.name}</td>
      <td>${cartItem.product.price}</td>
      <td><img width="50px" src="${cartItem.product.img}"/></td>
      <td>${cartItem.quality}</td>
      <td>
          <button class="btn btn-danger" onclick="deleteProductToCart(${cartItem.product.id})">Xóa</button>
      </td>
    </tr>
    `;
  });
  getEle("bodyAddToCart").innerHTML = content;
  getEle("totalPay").innerHTML = "Total: " + total;

}

//render HTMl

function renderHTML(data) {
  var content = "";

  data.forEach(function (product) {
    content += `
      <div class="col-12 col-md-6 col-lg-4">
      <div class="card cardPhone">
      <img src="${product.img}" class="card-img-top" alt="..." />
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <h3 class="cardPhone__title">${product.name}</h3>
              <p class="cardPhone__text">${product.desc}</p>
              <p class="cardPhone__text"> ${product.screen} inch</p>
              <p class="cardPhone__text">Camera sau : ${product.backCamera}</p>
              <p class="cardPhone__text">Camera trước : ${product.frontCamera}</p>
              <p class="cardPhone__text">Loại : ${product.type}</p>


            </div>
            <div>
              <h3 class="cardPhone__title">$${product.price}</h3>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="cardPhone__rating">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </div>
            <div>
              <button class="btnPhone-shadow" onclick="addToCart(${product.id})">
                <i class="fa fa-shopping-cart"></i> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>    
      `;
  });
  getEle("product__content").innerHTML = content;
}
//Add to carrt
function addToCart(productId) {
  var totalQuality =1;
  service
    .getProductById(productId)
    .then(function (result) {
      var cartItem = new CartItem(result.data, 1);

      cart.push(cartItem);
      totalQuality += 1;
    })

    .catch(function (error) {
      console.log(error);
    });
    
    cart.forEach(function (cartItem) {
      totalQuality += cartItem.quality;
    });
  getEle("total-qty").innerHTML = totalQuality;

}
//Clear
function clearData() {
  cart = [];
  getEle("total-qty").innerHTML = 0;
  renderPay();
  
};
function payAll() {
  alert("Thanh cong");
  cart = [];
  getEle("total-qty").innerHTML = 0;
  renderPay();

}

//Delete Pay
function deleteProductToCart(productId) {
  var totalQuality = $("#total-qty").text()*1;
  cart.forEach(function (cartItem) {
    if(parseInt(cartItem.product.id) === productId ) {
      var index= cart.indexOf(cartItem);
      if (cart.length > 1) {
        cart = cart.slice(index, index + 1);
        totalQuality -= cartItem.quality;
      } else {
        cart = [];
        totalQuality = 0;
      }
      
    }
  });

getEle("total-qty").innerHTML = totalQuality;
renderPay();

}

//4. Select product
function phoneChange() {
  var phone = getEle("myChoice").value;

  service
    .getListProduct()
    .then(function (result) {
      var newArray = result.data.filter(function (product) {
        if (phone == "Apple") {
          return product.type == "Apple";
        } else if (phone == "SamSung") {
          return product.type == "SamSung";
        } else {
          return result.data;
        }
      });
      renderHTML(newArray);
    })
    .catch(function (error) {
      console.log(error);
    });
}
