function getElement(selector) {
    return document.querySelector(selector)
}
let num = 0
let number = 1
const dsSP = new DSSP()
const cartList = new CartList()
getLocalCart()


// Truncate 
function truncateString(str, num) {
    if (str.length > num && num > 3) {
        return str.slice(0, (num - 3)) + '…';
    } else if (str.length > num && num < 3) {
        return str.slice(0, num) + '…';
    } else {
        return str;
    }
}
// Hover Product
function hoverPrd(a,b,c,d,e){
    htmlHover = `
        <div class="cart__title">
        ${a}
        </div>
        <p class="cart__text">
        <span style="font-weight:700; color:#CC99FF">Màn hình: </span>${b}</br>
        <span style="font-weight:700; color:#CC99FF">Camera sau: </span>${c}</br>
        <span style="font-weight:700; color:#CC99FF">Camera trước: </span>${d}</br>
        <span style="font-weight:700; color:#CC99FF">Thông tin thêm: </span>${e}</br>
        </p>
        <image src="/asset/img/faker.jpeg" style="width:100%; border-radius:15px;max-height: 50%"/>
        `
        getElement("#hoverPrd").innerHTML = htmlHover
}   
//Render Giao diện chính
function renderSP(result, resultdata) {
    // let promise = axios({
    //     url: "https://649a5a07bf7c145d0238becd.mockapi.io/Products",
    //     method: "GET",
    // })
    // promise
    //     .then(function (result) {
        let htmlImg = ""
        for (let index = 0; index < result; index++) {
            let prd = resultdata[index]
        // <img src="${prd.image}" alt="">
        htmlImg += `<div class="col-3" style="
        margin-top: 10px;
        padding-bottom: 15px;
        border-radius: 10px;gap:10px">
        <div class="product__img" style="max-height: 700px;
        margin-bottom: 10px;
        margin-top: 15px;">
        <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="hoverPrd('${prd.name}','${prd.screen}','${prd.backCamera}','${prd.frontCamera}','${prd.desc}')">
        <image src="${prd.image}" style="width:100%; border-radius:15px;max-height: 50%"/>
        </button>
        </div>
        <div class="product__text">
        <div class="product__title">
        ${truncateString(prd.name, 25)}
        </div>
        <div>
        <span style="color:red;font-size:20px">${Number(prd.price).toLocaleString()} VNĐ</span>
        </div>
        </div>
        <button id="btnThemGioHang" class="btn btn-success" style="width:60%;margin-top:10px" onclick="buyItem(${prd.id})" >Thêm vào giỏ hàng</button>
        </div>
        `
    }
    document.getElementById("product__content").innerHTML = htmlImg
}
function getProDuct() {
    const promise = axios({
        url: "https://649a5a07bf7c145d0238becd.mockapi.io/Products",
        method: "GET",
    })
    promise
        .then(function (result) {
            if (result.data.length <= 7) {
                renderSP(result.data.length, result.data)
            } else if (result.data.length > 7) {
                renderSP(8, result.data)
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}

getProDuct()
// Render SP đúng lựa chọn
function select() {
    const select = getElement("#select1").value
    const promise = axios({
        url: "https://649a5a07bf7c145d0238becd.mockapi.io/Products",
        method: "GET",
    })
    promise
        .then(function (result) {
            if (select === "Ipad") {
                if (result.data.length <= 7) {
                    renderSP(result.data.length, result.data)
                } else if (result.data.length > 7) {
                    renderSP(8, result.data)
                }
            } else if (select === "Ipad Gen") {
                let select1 = result.data.filter((v) => v.type === "Ipad Gen")
                renderSP(select1.length, select1)
            } else if (select === "Ipad Mini") {
                let select2 = result.data.filter((v) => v.type === "Ipad Mini")
                renderSP(select2.length, select2)
            } else if (select === "Ipad Pro") {
                let select3 = result.data.filter((v) => v.type === "Ipad Pro")
                renderSP(select3.length, select3)
            } else if (select === "Ipad Air") {
                let select4 = result.data.filter((v) => v.type === "Ipad Air")
                renderSP(select4.length, select4)
            }
        })
        .catch(function () {
            alert("Lỗi")
        })
}
getElement("#select1").onchange = select;

const buyItem = (id) => {
    getElement('#btnThemGioHang').setAttribute('data-id', id)
    const promise = axios({
        url: `https://649a5a07bf7c145d0238becd.mockapi.io/Products/${id}`,
        method: "GET",
    })
    promise
        .then((result) => {
            dsSP.themSP(result.data)
            const maSP = result.data.maSP
            setLocal(dsSP.arrSP, "dssp")
            totalPrice()
            let trung = false
            let index = -1
            let price = Number(result.data.price)
            // if(cartList.arrSP.length === 0){
            //     const a = result.data
            //     let itemcart = new ItemCart(a.image, a.name, a.screen, a.backCamera, a.frontCamera, 1, a.price,a.maSP)
            //     cartList.addCart(itemcart)
            //     setLocal(cartList.arrSP,"itemcart")
            //     renderCart(cartList.arrSP)
            // } else {
            // console.log(maSP);
            for (let i = 0; i < cartList.arrSP.length; i++) {
                let maSPCart = cartList.arrSP[i]
                if (maSP === maSPCart.maSP) {
                    trung = true
                    index = i
                    break
                }
            }
            if (trung === false) {
                const a = result.data
                const itemcart = new ItemCart(a.image, a.name, a.screen, a.backCamera, a.frontCamera, a.quantity = 1, a.price, a.maSP)
                cartList.addCart(itemcart)
                setLocal(cartList.arrSP, "itemcart")
                renderCart()
            } else {
                cartList.arrSP[index].quantity += 1
                setLocal(cartList.arrSP, "itemcart")
                renderCart()
            }
            num++
            getElement(".number").innerHTML = num
        })
        .catch((err) => {
            alert(err)
        })
}


// Set Local
const setLocal = (a, b) => {
    const data = JSON.stringify(a)
    localStorage.setItem(b, data)
}


// Get Local
const getLocal = () => {
    const data = localStorage.getItem("dssp")
    if (data) {
        const parseData = JSON.parse(data)
        num = parseData.length
        const arr = []
        for (let i = 0; i < parseData.length; i++) {
            const sp = parseData[i]
            const sanPham = new Products(sp.name, sp.price, sp.screen, sp.backCamera, sp.frontCamera, sp.image, sp.desc, sp.type, sp.maSP, sp.quantity)
            arr.push(sanPham)
        }
        dsSP.arrSP = arr
        getElement(".number").innerHTML = num
    }
}
getLocal()


// Get Local Cart Item
function getLocalCart() {
    const data = localStorage.getItem("itemcart")
    if (data) {
        const parseData = JSON.parse(data)
        const arr = []
        for (let i = 0; i < parseData.length; i++) {
            const item = parseData[i]
            const itemcart = new ItemCart(item.image, item.name, item.screen, item.backCamera, item.frontCamera, item.quantity, item.price, item.maSP)
            arr.push(itemcart)
        }
        cartList.arrSP = arr
    }
}


// Render Cart
function renderCart() {
    let htmlContent = ""
    for (let i = 0; i < cartList.arrSP.length; i++) {
        let b = cartList.arrSP[i]
        htmlContent += `<div class="col-4" style="margin-bottom: 20px;max-height: 100%;">
        <div class="product__img" style="height: 100%">
        <image src="${b.image}" style="width:100%; border-radius:5px;height: auto"/>
        </div>
        </div>
        <div class="col-8">
        <div class="cart__title">
        ${b.name}
        </div>
        <p class="cart__text">
        <span style="font-weight:700; color:#CC99FF">Màn hình: </span>${b.screen}</br>
        <span style="font-weight:700; color:#CC99FF">Camera sau: </span>${b.backCamera}</br>
        <span style="font-weight:700; color:#CC99FF">Camera trước: </span>${b.frontCamera}</br>
        </p> 
        </div>
        <div class="col-8">
        <p class="cart__title">Quantity
        <span class="bg" onclick="giamSL(${b.maSP})">-</span> <span class="numberCart">${b.quantity}</span> <span class="bg" onclick="tangSL(${b.maSP})">+</span>
        </p>
        </div>
        <div class="col-4 price">
        ${(b.price * b.quantity).toLocaleString()}
        </div>
        <div class="col-12">
        <button class="btn btn-danger" style="
        max-width: 150px;margin-bottom:15px;" onclick="removeItem(${b.maSP})">Remove</button>
        </div>
        `
    }
    getElement(".body").innerHTML = htmlContent
}
renderCart()

// Tổng tiền
function totalPrice() {
    let totalPrice = 0
    for (let i = 0; i < dsSP.arrSP.length; i++) {
        const price = Number(dsSP.arrSP[i].price)
        totalPrice += price
    }
    getElement(".totalPrice").innerHTML = totalPrice.toLocaleString() + "đ"
}
totalPrice()

// Thanh toán
getElement(".pay").onclick = () => {
    const data = localStorage.getItem("itemcart")
    const data1 = localStorage.getItem("dssp")
    if (data) {
        if (data1) {
            localStorage.removeItem("itemcart")
            localStorage.removeItem("dssp")
            alert("Thanh toán thành công")
            location.reload()
        }
    } else {
        alert("Không có sản phẩm để thanh toán")
    }
}

// Giảm Số lượng
const giamSL = (a) => {
    for (let i = 0; i < cartList.arrSP.length; i++) {

        if (a == cartList.arrSP[i].maSP) {
            if (cartList.arrSP[i].quantity > 0) {
                cartList.arrSP[i].quantity -= 1
            }
        }
    }
    setLocal(cartList.arrSP, "itemcart")
    renderCart()
}


// Tăng Số lượng 
const tangSL = (b) => {
    for (let i = 0; i < cartList.arrSP.length; i++) {

        if (b == cartList.arrSP[i].maSP) {
            cartList.arrSP[i].quantity += 1
        }
    }
    setLocal(cartList.arrSP, "itemcart")
    renderCart()
}

// Remove sản phẩm 
const removeItem = (c) => {
    // debugger
    for (let j = dsSP.arrSP.length - 1; j >= 0; j--) {
        // let a = dsSP.arrSP[j].maSP 
        if (c == dsSP.arrSP[j].maSP) {
            dsSP.removeItem(j)
            for (let i = 0; i < cartList.arrSP.length; i++) {
                if (c == cartList.arrSP[i].maSP) {
                    cartList.removeItem(i)
                }
            }
        }
    }
    setLocal(cartList.arrSP, "itemcart")
    setLocal(dsSP.arrSP, "dssp")
    renderCart()
    location.reload()
}
