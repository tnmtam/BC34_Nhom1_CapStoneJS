function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (value === "") {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    };
    this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
        if (value.length >= min && value.length <= max) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //error
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
    this.kiemTraLoaiPhone = function (selectId, errorId, mess) {
        if (getEle(selectId).selectedIndex !== 0) {
            //true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
    this.kiemTraTaiKhoanTonTai = function (value, errorId, mess) {
        if (value === service.getListProduct) {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    };
}