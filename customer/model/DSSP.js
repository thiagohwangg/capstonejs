function DSSP(){
    this.arrSP = []
    this.themSP = (a)=>{
        return this.arrSP.push(a)
    }
    this.removeItem = (index) => {
        this.arrSP.splice(index,1)
    }
}