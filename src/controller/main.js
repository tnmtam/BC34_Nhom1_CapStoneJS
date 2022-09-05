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
              <button class="btnPhone-shadow">
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
