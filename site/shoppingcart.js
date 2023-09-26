if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}else {
    ready()
}

var totalAmount = "0,00"

function ready() {
    updateTotal()

    const removeProductButtons = document.getElementsByClassName("remove-product-button")
    for (var i=0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click", removeProduct)
    }

    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for (var i =0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", checkIfInputIsNull)
    }

    const addToCartButtons = document.getElementsByClassName("btn-success")
    for (var i=0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductToCart)
    }

    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)
}
function makePurchase() {
    if (totalAmount == "0,00") {
        alert(" Your shopping cart is empty! \nAdd something before completing your purchase.")
    }
    else {
        alert(
           `
           Final order value: ₹{totalAmount}
            Now just fill in the delivery details.
            Thank you for your purchase, Come back again :)
           ` 
        )
    }

    document.querySelector(".card-table tbody").innerHTML = ""
    updateTotal()
}

function checkIfInputIsNull(event) {
    if (event.target.value == "0") {
        event.target.parentElement.parentElement.remove()
    }
    updateTotal()
}


function addProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("card-img-top")[0].src
    const productName = productInfos.getElementsByClassName("card-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("price")[0].innerText

    const productCartName = document.getElementsByClassName("cart-product-title")
    for (var i=0; i < productCartName.length; i++) {
        if (productCartName[i].innerText == productName) {
            productCartName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            return
        }
    }
    
    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")

    newCartProduct.innerHTML = 
    `
        <td class="product-identification">
            <img class="cart-product-image" src="${productImage}" alt="${productName}">
            <strong class="cart-product-title">${productName}</strong>
        </td>
        <td>
            <span class="cart-product-price">${productPrice}</span>
        </td>
        <td>
            <input class="product-qtd-input" type="number" value="1" min="0">
            <button class="remove-product-button" type="button">Remover</button>
        </td>
    `
    const tableBody = document.querySelector(".card-table tbody")
    tableBody.append(newCartProduct)

    updateTotal()

    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
}


function removeProduct(event) {
 
    event.target.parentElement.parentElement.remove()
    updateTotal()
}

function updateTotal(){
    totalAmount = 0
    const cartProducts = document.getElementsByClassName("cart-product")
    for (var i = 0; i < cartProducts.length; i++) {
        
        const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("₹", "").replace(".", "").replace(",", ".")

        
        const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value

        totalAmount += productPrice * productQuantity
    }
    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".cart-total-container span").innerText = "₹" + totalAmount
}
