let arr = []
// AXIOS
function renderSanPham(result) {
    let htmlContent = '';
    for (let i = 0; i < result.length; i++) {
        let sp = result[i]
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
                    style=" width: 100%;"
                    class='btn btn-danger' 
                    onclick="deleteSanPham(${sp.id})"
                >
                    Delete
                </button>
                <button 
                    class='btn btn-success ml-3' 
                    style="margin-top: 5px;
                    width: 100%;display=none"
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
        url: 'https://64959f59b08e17c91792691c.mockapi.io/Products',
        method: 'GET',
    })

    promise
        .then(function (result) {
            renderSanPham(result.data)
            arr = result.data
        })

        .catch(function (err) {
            console.log(err)
        })
}

getSPList()

getElement("#addPrd").onclick = () => {
    getElement(".masp").style.display = "inline-block"
    clearInput()
    clearSpan()
    getElement("#btnSave").style.display = 'inline-block';  
    getElement("#updatePrd").innerHTML = ""  
}

// hàm get element
function getElement(selector) {
    return document.querySelector(selector)
}

// lấy thông tin từ user
function layThongTinSP(isEdit) {
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

    isValid &= vlSpace(sanPham.name, 'tbName')
    isValid &= checkNumber(sanPham.price,"tbGia")
    isValid &= vlSpace(sanPham.screen, 'tbScreen')
    isValid &= vlSpace(sanPham.backCamera, 'tbBcam')
    isValid &= vlSpace(sanPham.frontCamera, 'tbFcam')
    isValid &= vlSpace(sanPham.image, 'tbImage')
    isValid &= vlSpace(sanPham.desc, 'tbDesc')
    isValid &= vlSpace(sanPham.type, 'tbType')
    isValid &= vlSpace(sanPham.maSP, 'tbMaSP') 
    isValid &= checkAccount(sanPham.maSP,"#tbMaSP","Mã sản phẩm đã tồn tại",arr,isEdit)
    return isValid ? sanPham : undefined
}


// thêm sản phẩm
getElement('#btnSave').onclick = function () {
    let sanPham = layThongTinSP(false)
    if (sanPham) {
        let promise = axios({
            url: 'https://64959f59b08e17c91792691c.mockapi.io/Products',
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
        url: `https://64959f59b08e17c91792691c.mockapi.io/Products/${idSanPham}`,
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


// update sản phẩm
function updateSanPham(idSanPham) {
    getElement("#btnSave").style.display = "none"
    getElement(".masp").style.display = "none"
    clearSpan()
    let promise = axios({
        url: `https://64959f59b08e17c91792691c.mockapi.io/Products/${idSanPham}`,
        method: 'GET'
    })

    promise.then(function (result) {
        let sp = result.data
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
        // getElement("#btnEdit").click = editSP(sp.id)
        getElement("#updatePrd").innerHTML = `
        <button id="btnEdit" type="button" class="btn btn-primary" onclick=editSP(${sp.id})>
            Update
        </button>
                            `
    })
    .catch((err) => {
        console.log(err);
    })
}

function editSP(id) {
    let sanPhamEdit = layThongTinSP(true)
    let promise = axios({
        url: `https://64959f59b08e17c91792691c.mockapi.io/Products/${id}`,
        method: 'PUT',
        data: sanPhamEdit,
    })

    promise.then(function () {
        if(sanPhamEdit === undefined){
            return false
        } else{
            getElement('.btn-close').click()
            getSPList()
            clearInput()
            clearSpan()
            getElement("#updatePrd").innerHTML = ""
        }
    })
}

function clearInput() {
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
function clearSpan(){
    getElement("#tbName").style.display = "none"
    getElement("#tbGia").style.display = "none"
    getElement("#tbScreen").style.display = "none"
    getElement("#tbBcam").style.display = "none"
    getElement("#tbFcam").style.display = "none"
    getElement("#tbImage").style.display = "none"
    getElement("#tbDesc").style.display = "none"
    getElement("#tbType").style.display = "none"
    getElement("#tbMaSP").style.display = "none"
}
sort = () => {
    const select = getElement("#select").value
    const promise = axios({
        url: "https://64959f59b08e17c91792691c.mockapi.io/Products",
        method: "GET",
    })
    promise
        .then((result)=>{
            if(select === "full"){
                renderSanPham(result.data)
            } else if (select === "tangDan"){
                let arrSort = (result.data).sort((a,b) => Number(a.price)-Number(b.price))
                    
                renderSanPham(arrSort)
            } else if (select === "giamDan"){
                let arrSort = result.data.sort((a,b)=>Number(b.price)-Number(a.price))
                renderSanPham(arrSort)
            }
        })
        .catch((err)=>{
            console.log(err);
        }) 
}
getElement("#select").onchange = sort
// Search Loại sản phẩm
getElement("#searchName").addEventListener("keyup", function () {
    let valueSearch = getElement("#searchName").value.toLowerCase()
    valueSearch = valueSearch.replace(/\s/g, "");
    let arrSearch = []
    const promise = axios({
        url: "https://64959f59b08e17c91792691c.mockapi.io/Products",
        method: "GET",
    })
    promise
        .then((result)=>{
            for (let i = 0; i < result.data.length; i++) {
                const typeNV = result.data[i].name.toLowerCase().replace(/\s/g, "")
                if (typeNV.indexOf(valueSearch) !== -1) {
                    arrSearch.push(result.data[i])
                }
            }
            arrSearch1 = arrSearch.map((v)=>v)
            renderSanPham(arrSearch)
        })
})