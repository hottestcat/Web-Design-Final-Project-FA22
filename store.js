let cartContents = [];

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
}

let addButtons = document.getElementsByClassName("addcart");
for (let i = 0; i < addButtons.length; i++)
{
    addButtons[i].addEventListener(
        "click",
        (event) =>
        {
            let parent = event.target.parentNode;
            let titleObj = parent.getElementsByClassName("imageTitle")[0];
            let title = titleObj.innerText.replace(/ \$\d+/gi, "");
            let price = titleObj.innerText.replace(/.* (?=\$\d+)/gi, "");
            let image = parent.getElementsByTagName("img")[0].attributes["src"].value;
            let alt = parent.getElementsByTagName("img")[0].attributes["alt"].value;
            cartContents.push({
                title: title,
                alt: alt,
                price: price,
                image: image
            });
            document.cookie = "cartContents=" + JSON.stringify(cartContents) + "; path=/; SameSite=Lax";
        }
    );
}

getCartContents();
