function CartList(){
    this.arrSP = []
    this.addCart=(item)=>{
       return this.arrSP.push(item)
    }
    this.removeItem = (index) => {
        this.arrSP.splice(index,1)
    }
}