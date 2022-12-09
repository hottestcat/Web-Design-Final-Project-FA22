

let cartContents = [];

function updateCartTotals()
{
    let subtotal = 0;
    for (let i = 0; i < cartContents.length; i++)
    {
        subtotal += parseFloat(cartContents[i].price.replace("$", ""));
    }

    document.getElementById("subtotal").innerText = "$" + subtotal.toFixed(2);
    document.getElementById("tax").innerText = "$" + (subtotal * .05).toFixed(2);
    document.getElementById("shipping").innerText = "$0.00";
    document.getElementById("total").innerText = "$" + (subtotal * 1.05).toFixed(2);
}

function getCartContents()
{
    let cookieName = "cartContents=";
    let fullCookie = document.cookie.split(';');
    for (let i = 0; i < fullCookie.length; i++)
    {
        let c = fullCookie[i].trim();
        if (c.indexOf(cookieName) == 0)
        {
            cartContents = JSON.parse(c.substring(cookieName.length, c.length));
        }
    }

    for (let i = 0; i < cartContents.length; i++)
    {
        let cartItem = cartContents[i];
        let newCard = document.getElementById("cartItemTemplate").cloneNode(true);

        newCard.attributes["style"].value = "";
        newCard.removeAttribute("id");
        newCard.getElementsByTagName("img")[0].attributes["src"].value = cartItem.image;
        newCard.getElementsByTagName("img")[0].attributes["alt"].value = cartItem.alt;
        newCard.getElementsByClassName("imageTitle")[0].innerText = cartItem.title + " " + cartItem.price;

        document.getElementById("cartItemParent").appendChild(newCard);

        newCard.getElementsByClassName("btn2")[0].addEventListener(
            "click",
            (event) =>
            {
                let parent = event.target.closest(".card");
                let index = Array.from(parent.parentNode.children).indexOf(parent);
                cartContents.splice(index - 1, 1);
                document.cookie = "cartContents=" + JSON.stringify(cartContents) + "; path=/; SameSite=Lax";
                parent.remove();
                updateCartTotals();
            }
        );
    }

    updateCartTotals();
}

function checkout()
{
    if (cartContents.length == 0)
    {
        alert("Your cart is empty.");
        return;
    }

    let cards = Array.from(document.getElementById("cartItemParent").children);
    for (let i = 1; i < cards.length; i++)
    {
        cards[i].remove();
    }
    cartContents = [];
    document.cookie = "cartContents=[]; path=/; SameSite=Lax";

    updateCartTotals();

    alert("Your items have been purchased. Please enjoy!");
}

getCartContents();
