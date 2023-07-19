/**
 *
 * @param  value Giá trị chuỗi cần kiểm tra
 * @param  minLength Chiều dài tối thiểu của chuỗi cần kiểm tra
 * @param  maxLength Chiều dài tối đa của chuỗi (nếu maxLength = undefined và minLength = 1 => kiểm tra rỗng)
 * @param selector selector của thẻ cần hiển thị lỗi
 * @param messErr Lỗi cần hiển thị lên UI nếu `value` không thỏa mãn điều kiện
 */

function kiemTraChuoi(value, minLength, maxLength, selector, messErr) {
    // Nếu như kiểm tra false
    if (value.trim().length < minLength || value.trim().length > Number(maxLength)) {
        getElement(selector).innerHTML = messErr
        return false
    }

    // Nếu như kiểm tra true
    getElement(selector).innerHTML = ''
    return true
}

function vl(id,idThongbao){
    if(id === ""){
        document.getElementById(idThongbao).innerHTML = "Không được đê trống"
        document.getElementById(idThongbao).style.display ="inline-block"
        return false
    }else{
        document.getElementById(idThongbao).style.display ="none"
        return true
    } 
}

function kiemTraSo(value, min, max, selector, messErr) {
    // Nếu như kiểm tra false
    if (value < min || value > max) {
        getElement(selector).innerHTML = messErr
        return false
    }

    // Nếu như kiểm tra true
    getElement(selector).innerHTML = ''
    return true
}

/**
 *
 * @param value chuỗi cần kiểm tra
 * @param selector Thẻ hiển thị lỗi
 * @param pattern chuỗi pattern để kiểm tra chuỗi
 * @param messErr Mess err cần hiển thị
 */

function kiemTraPattern(value, selector, pattern, messErr) {
    // Nếu chuỗi ko thỏa mãn pattern
    if (!pattern.test(value)) {
        getElement(selector).innerHTML = messErr
        return false
    }

    // Nếu chuỗi đúng
    getElement(selector).innerHTML = ''
    return true
}


function checkAccount(account, dsnv, isEdit, selector, messErr) {
    if (isEdit) return true
    var isFlag = true
    for (var i = 0; i < dsnv.length; i++) {
        if (dsnv[i].account === account) {
            isFlag = false
            break
        }
    }
    if (!isFlag) {
        getElement(selector).innerHTML = messErr
        getElement(selector).style.display = "inline-block"
        return false
    } else {
        getElement(selector).style.display = "none"
        return true
    }
}

function checkMaSP(maSP, isEdit, selector, messErr) {
    let url = 'https://649a5a07bf7c145d0238becd.mockapi.io/Products?maSP=' + maSP;
    return axios.get(url)
      .then(function(response) {
        let isExist = false;
        if (response.data && response.data.length > 0) {
          if (isEdit) {
            let sanPham = response.data[0];
            if (sanPham.id !== sanPham.id) {
              isExist = true;
              getElement(selector).innerHTML = ''
              getElement(selector).innerHTML = messErr
                // getElement(selector).style.display = 'none'
            }
          } else {
            isExist = false;
            // getElement(selector).innerHTML = messErr
            getElement(selector).innerHTML = ''
          }
        }
        return isExist;
      })
      .catch(function(error) {
        console.log('error: ',error)
      });
  }


  

