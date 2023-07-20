// AXIOS
function renderSanPham(result) {
    let htmlContent = '';
    let resultLength = (result.data).length;
    for (let i = 0; i < resultLength; i++) {
        let sp = result.data[i]
        htmlContent += `
        <tr>
            <td>${i + 1}</td>
            <td>${sp.name}</td>
            <td>${sp.price}</td>
            <td>${sp.screen}</td>
            <td>${sp.backCamera}</td>
            <td>${sp.frontCamera}</td>
            <td>
            <image
                src=${sp.image} 
                style='width: 100px; height: 100px; object-fit: cover; object-position: center'/>
            </td>
            <td>${sp.desc}</td>
            <td>${sp.type}</td>
            <td>${sp.maSP}</td>
            <td>
                <button 
                    class='btn btn-danger' 
                    onclick="deleteSanPham(${sp.id})"
                >
                    Delete
                </button>
                <button 
                    class='btn btn-success ml-3' 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onclick="updateSanPham(${sp.id})"
                >
                    Edit
                </button>
            </td>
        </tr>
    `
    }
    document.getElementById('tbody').innerHTML = htmlContent
}

// Get SP
function getSPList() {
    let promise = axios({
        url: 'https://649a5a07bf7c145d0238becd.mockapi.io/Products',
        method: 'GET',
    })

    promise
        .then(function (result) {
            renderSanPham(result)
        })

        .catch(function (err) {
            console.log(err)
        })
}

getSPList()

getElement("#addPrd").onclick = () => {
    clearSpan()
    getElement("#btnSave").style.display = 'inline-block';
    
}

// hàm get element
function getElement(selector) {
    return document.querySelector(selector)
}

// lấy thông tin từ user
function layThongTinSP() {
    let name = getElement('#name').value
    let price = getElement('#price').value
    let screen = getElement('#screen').value
    let backCamera = getElement('#bcam').value
    let frontCamera = getElement('#fcam').value
    let image = getElement('#image').value
    let desc = getElement('#desc').value
    let type = getElement('#type').value
    let maSP = getElement('#maSP').value
    let id = getElement('#idProductUpdate').value

    let sanPham = new SanPham(id || '', name, price, screen, backCamera, frontCamera, image, desc, type, maSP)

    let isValid = true;

    isValid &= vl(sanPham.name, 'tbName')
    isValid &= vl(sanPham.price, 'tbGia')
    isValid &= vl(sanPham.screen, 'tbScreen')
    isValid &= vl(sanPham.backCamera, 'tbBcam')
    isValid &= vl(sanPham.frontCamera, 'tbFcam')
    isValid &= vl(sanPham.image, 'tbImage')
    isValid &= vl(sanPham.desc, 'tbDesc')
    isValid &= vl(sanPham.type, 'tbType')
    isValid &= vl(sanPham.maSP, 'tbMaSP')
    // isValid &= checkMaSP(sanPham.maSP, isEdit, '#tbMaSP', 'Mã SP đã tồn tại')
    return isValid ? sanPham : undefined
    // return sanPham
}


// thêm sản phẩm
getElement('#btnSave').onclick = function () {

    let sanPham = layThongTinSP()
    if (sanPham) {
        let promise = axios({
            url: 'https://649a5a07bf7c145d0238becd.mockapi.io/Products',
            method: 'POST',
            data: sanPham,
        })

        promise
            .then(function () {
                getElement('.btn-close').click()
                getSPList()
            })

            .catch(function () {
                alert('Tạo sản phẩm thất bại')
            })
    }

}

// xóa sản phẩm
function deleteSanPham(idSanPham) {
    let promise = axios({
        url: `https://649a5a07bf7c145d0238becd.mockapi.io/Products/${idSanPham}`,
        method: 'DELETE',
    })

    promise
        .then(function () {
            getSPList()
        })

        .catch(function () {
            alert('Xóa sản phẩm thất bại')
        })


}

let idSanPhamUpdate = ''

// update sản phẩm
function updateSanPham(idSanPham) {
    getElement("#btnSave").style.display = "none"
    let promise = axios({
        url: `https://649a5a07bf7c145d0238becd.mockapi.io/Products/${idSanPham}`,
        method: 'GET'
    })

    promise.then(function (result) {
        let sp = result.data
        idSanPhamUpdate = sp.id

        getElement('#name').value = sp.name
        getElement('#price').value = sp.price
        getElement('#screen').value = sp.screen
        getElement('#bcam').value = sp.backCamera
        getElement('#fcam').value = sp.frontCamera
        getElement('#image').value = sp.image
        getElement('#desc').value = sp.desc
        getElement('#type').value = sp.type
        getElement('#maSP').value = sp.maSP
        getElement('#idProductUpdate').value = sp.id
        getElement('#updatePrd').innerHTML = `
        <button id="btnEdit" type="button" class="btn btn-primary" onclick="editSP(${sp.id})"=>
                Update
            </button>`
    })
}

function editSP(id) {
    let sanPhamEdit = layThongTinSP()
    let promise = axios({
        url: `https://649a5a07bf7c145d0238becd.mockapi.io/Products/${id}`,
        method: 'PUT',
        data: sanPhamEdit,
    })

    promise.then(function () {
        getElement('.btn-close').click()
        getSPList()
        clearSpan()
    })
}

function clearSpan() {
    getElement("#name").value = ""
    getElement("#price").value = ""
    getElement("#screen").value = ""
    getElement("#bcam").value = ""
    getElement("#fcam").value = ""
    getElement("#image").value = ""
    getElement("#desc").value = ""
    getElement("#type").value = ""
    getElement("#maSP").value = ""
    getElement("#idProductUpdate").value = ""
}

// sort = () => {
//     const select = getElement("#select2").value
//     const promise = axios({
//         url: "https://649a5a07bf7c145d0238becd.mockapi.io/Products",
//         method: "GET",
//     })
//     promise
//         .then((result)=>{
//             if(select === "full"){
//                 renderSP((result.data).length, result.data)
//             } else if (select === "tangDan"){
//                 let arrSort = (result.data).sort((a,b) => Number(a.price)-Number(b.price))
                    
//                 renderSanPham(arrSort.length,arrSort)
//                 console.log(arrSort);
//             } else if (select === "giamDan"){
//                 let arrSort = result.data.sort((a,b)=>Number(b.price)-Number(a.price))
//                 renderSanPham(arrSort.length,arrSort)
//             }
//         })
//         .catch((err)=>{
//             console.log(err);
//         }) 
// }
// getElement("#select2").onchange = sort