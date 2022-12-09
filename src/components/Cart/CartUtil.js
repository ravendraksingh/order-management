
const getCartcount = () => {
    let count = 0;
    const cart = sessionStorage.getItem("cart");
    if (cart !== null) {
      count = (JSON.parse(cart)).items.length;
      //console.log('in getCartcount, count:' + count);
    }
    return count;
}

const CartUtil = {
    getCartcount
}  

export default CartUtil;