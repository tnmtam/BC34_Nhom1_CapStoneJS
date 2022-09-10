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
  var i = 0;
  cart.forEach(function (cartItemData) {
    i++;
    var quality = cartItemData.quality * 1;
    var price =  cartItemData.product.price * 1;
    total = 0 + parseInt(total + quality * price);
    content += `
    
    <tr>
      <td>${cartItemData.product.id}</td>
      <td>${cartItemData.product.name}</td>
      <td>${cartItemData.product.price}</td>
      <td><img width="50px" src="${cartItemData.product.img}"/></td>
      <td>
      <button style="border:0; font-weight:bold;" onclick="deleteProductToCart(${cartItemData.product.id}, 1)">- </button>
        ${cartItemData.quality}
        <button style="border:0; font-weight:bold;" onclick="addToCart(${cartItemData.product.id})"> +</button>
      </td>
      <td>
          <button class="btn btn-danger" onclick="deleteProductToCart(${cartItemData.product.id}, 0)">Xóa</button>
          
          
      </td>
    </tr>
    `;
    if (i === cart.length) {
      getEle("bodyAddToCart").innerHTML = content;
      getEle("totalPay").innerHTML = "Tổng thanh toán: " + total + " $ ";
    }
  });
  if (cart.length === 0) {
    getEle("bodyAddToCart").innerHTML = content;
    getEle("totalPay").innerHTML = "Tổng thanh toán: " + total + " $ ";
  }

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
  var newCart = [];
  var totalQuality = 0;
  var alreadyAdd = false;
  


  service
    .getProductById(productId)
    .then(function (result) {
      cart.forEach(function (cartItemOld){
          if (parseInt(cartItemOld.product.id) === productId) {
            cartItemOld.quality += 1;
            alreadyAdd = true;
          }
          newCart.push(cartItemOld);
      });
      if (!alreadyAdd) {
        var cartItem = new CartItem(result.data, 1);
        newCart.push(cartItem);
      }
      cart = newCart;
      
      cart.forEach(function (cartItem) {
        totalQuality += cartItem.quality;
      });
      getEle("total-qty").innerHTML = totalQuality;
      renderPay();
      setLocalStorage();
    })
    
    .catch(function (error) {
      console.log(error);
    });
    

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
function deleteProductToCart(productId, numberQuality) {
  var totalQuality = $("#total-qty").text()*1;
  var newCart = [];
  for(var i = 0; i < cart.length; i++) {
    var cartItem = cart[i];
    if(parseInt(cartItem.product.id) === productId ) {
      if (numberQuality > 0 && cartItem.quality > 0 && cartItem.quality > numberQuality) {
        totalQuality -= numberQuality;
        cartItem.quality -= numberQuality;
        newCart.push(cartItem);
      } else {
        totalQuality -= cartItem.quality;
      }
    } else {
      newCart.push(cartItem)
    }
  };
  cart = newCart;
  
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


