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

function vlSpace(id,idThongbao){
    if(id === ""){
        document.getElementById(idThongbao).innerHTML = "Vui lòng điền thông tin"
        document.getElementById(idThongbao).style.display ="inline-block"
        return false
    }else{
        document.getElementById(idThongbao).style.display ="none"
        return true
    } 
}

function checkNumber (id,idThongbao) {
    const regex = /^[0-9]+$/
    if(id === ""){
        document.getElementById(idThongbao).innerHTML = "Vui lòng định dạng không có kí tự chữ kèm kí tự đặc biệt và không được để trống. Đặc biệt xin vui lòng không nhập kí tự e"
        document.getElementById(idThongbao).style.display ="inline-block"
        return false
    }else if (regex.test(id) === false){
        document.getElementById(idThongbao).innerHTML = "Giá tiền không được có kí tự chữ"
        document.getElementById(idThongbao).style.display ="inline-block"
        return false
    }else{
        document.getElementById(idThongbao).style.display ="none"
        return true
    } 
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


function checkAccount(maSP,selector, messErr,isEdit) {
    if(isEdit) return true
    let isFlag = true
    const promise = axios({
        url: 'https://649a5a07bf7c145d0238becd.mockapi.io/Products',
        method: 'GET',
    })
    promise
    .then((result)=>{
        for (let i = 0; i < result.data.length; i++) {
            console.log(result.data[i].maSP);
            console.log(maSP);
            if (result.data[i].maSP === maSP) {
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
    })
    .catch((err)=>{
        console.log("check thất bại");
    })
    
}



  

