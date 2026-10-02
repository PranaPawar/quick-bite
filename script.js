/* =========================
   FOOD DATA
========================= */

const foods = [

    {
        id: 1,
        name: "Veg Thali",
        price: 80,
        category: "Canteen",
        image:"images/Veg Thali.jpg"
    },

    {
        id: 2,
        name: "Masala Dosa",
        price: 60,
        category: "Canteen",
        image: "images/img2.jpg"
    },

    {
        id: 3,
        name: "Vada Pav",
        price: 25,
        category: "Canteen",
        image: "images/vada pav.jpg"
    },

    {
        id: 4,
        name: "Samosa",
        price: 20,
        category: "Canteen",
        image: "images/somosa.jpg"
    },
    {
        id: 5,
        name: "Veg Puff",
        price: 30,
        category: "Bakery",
        image: "images/veg puff.jpg"
    },

    {
        id: 6,
        name: "Sandwich",
        price: 50,
        category: "Bakery",
        image: "images/sadwich.jpg"
    },

    {
        id: 7,
        name: "Tea",
        price: 15,
        category: "Drinks",
        image: "images/tea.jpg"
    },
    {
        id: 8,
        name: "Cold Coffee",
        price: 45,
        category: "Drinks",
        image: "images/cold coffee.jpg"
    },

    {
        id: 9,
        name: "Mango juice",
        price: 30,
        category: "Drinks",
        image: "images/mangojuice.jpg"

    },

    {
        id: 10,
        name: "hot chocolate",
        price: 30,
        category: "Drinks",
        image: "images/hotchocolate.jpg"
    },

    {
        id: 11,
        name: "Oreo shake",
        price: 30,
        category: "Drinks",
        image: "images/oreoshake.jpg"
    },

    {
        id: 12,
        name: "Fruit Smoothies",
        price: 30,
        category: "Drinks",
        image: "images/fruitsmoothies.jpg"
    },

    {
         id: 13,
        name: "Dry cake slices",
        price: 50,
        category: "Bakery",
        image: "images/drycakeslices.jpg"
    },

    {
        id: 14,
        name: "Donut rings ",
        price: 50,
        category: "Bakery",
        image: "images/donutrings.jpg"
    },
    {
        id: 15,
        name: "ice-cream",
        price: 50,
        category: "Bakery",
        image: "images/icecream.jpg"
    },
    {
        id: 16,
        name:"chocolate",
        price: 50,
        category: "Bakery",
        image: "images/chocolates.jpg"
    },
    {
        id: 17,
        name:"coca-cola",
        price: 40,
        category: "Drinks",
        image:"images/coco-cola.jpg"
    },
    {
        id: 18,
        name:"hot coffee",
        price: 40,
        category: "Drinks",
        image: "images/hot coffee.jpg"
    },
    {
        id: 19,
        name:"chocolate drink",
        price: 40,
        category: "Drinks",
        image: "images/chocolate drink.jpg"
    },
    {
        id: 20,
        name: "Pav bhaji",
        price: 80,
        category: "Canteen",
        image:"images/pav bhaji.jpg"
    },
    {
        id: 21,
        name: "Shev bhaji",
        price: 80,
        category: "Canteen",
        image: "images/shev bhaji.jpg"
    },
    {
        id: 22,
        name: "onion pakoda",
        price: 40,
        category: "Canteen",
        image: "images/onionpakoda.jpg"
    }
   
];

/* =========================
   ADMIN MENU CONNECTION
========================= */

const adminMenu =
    JSON.parse(localStorage.getItem("quickBiteMenu")) || [];


adminMenu.forEach((adminFood, index) => {

    const existingFood = foods.find(
        food => food.name.toLowerCase() ===
                adminFood.name.toLowerCase()
    );


    // Existing food
    if (existingFood) {

        existingFood.price =
            Number(adminFood.price);

        existingFood.category =
            adminFood.category === "Food"
                ? "Canteen"
                : adminFood.category === "Beverage"
                    ? "Drinks"
                    : adminFood.category;

    }


    // New food
    else {

        foods.push({

            id: 1000 + index,

            name: adminFood.name,

            price: Number(adminFood.price),

            category:
                adminFood.category === "Food"
                    ? "Canteen"
                    : adminFood.category === "Beverage"
                        ? "Drinks"
                        : adminFood.category,

            image: adminFood.image || ""

        });

    }

});

/* =========================
   CART
========================= */

let cart =
    JSON.parse(localStorage.getItem("quickBiteCart")) || [];



/* SHOW MENU */

function showMenu() {

    document.getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* HOME */

function goHome() {

    document.getElementById("home")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* DISPLAY FOOD */

function displayFood(foodArray = foods) {

    const foodList =
        document.getElementById("foodList");
     if ( ! foodList) return;
    foodList.innerHTML = "";


    foodArray.forEach(food => {

        foodList.innerHTML += `

        <div class="food-card">

            <div class="food-image">
                <img src="${food.image}" alt="${food.name}">
            </div>

            <div class="food-info">

                <h3>${food.name}</h3>

                <p class="price">
                    ₹${food.price}
                </p>

                <button
                    class="main-btn"
                    onclick="addToCart(${food.id})">

                    🛒 Add to Cart

                </button>

            </div>

        </div>

        `;

    });

}


/* =========================
   SEARCH
========================= */

function searchFood() {

    const text =
        document
        .getElementById("search")
        .value
        .toLowerCase();


    const result = foods.filter(food =>
        food.name.toLowerCase().includes(text)
    );


    displayFood(result);

}


/* =========================
   CATEGORY
========================= */

function filterFood(category) {

    if (category === "All") {

        displayFood(foods);

    } else {

        const result =
            foods.filter(food =>
                food.category === category
            );

        displayFood(result);

    }

}


/* =========================
   ADD CART
========================= */

function addToCart(id) {

    const food =
        foods.find(item => item.id === id);


    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...food,

            quantity: 1

        });

    }


    updateCart();

showMessage("🛒 " + food.name + " added to cart!");
  

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    localStorage.setItem(
        "quickBiteCart",
        JSON.stringify(cart)
    );

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = totalItems;
    }

    if (document.getElementById("cartBox")) {
        displayCart();
    }

}


/* =========================
   DISPLAY CART
========================= */

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");
        
        if (!cartItems) return;

    cartItems.innerHTML = "";


    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }


    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;


        total += subtotal;


        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <b>
                    ${item.image}
                    ${item.name}
                </b>

                <br>

                ₹${item.price}

            </div>


            <div class="qty">

                <button
                    onclick="changeQuantity(
                        ${item.id}, -1
                    )">

                    −

                </button>


                ${item.quantity}


                <button
                    onclick="changeQuantity(
                        ${item.id}, 1
                    )">

                    +

                </button>

            </div>

        </div>

        `;

    });
const cartTotal =
    document.getElementById("cartTotal");

if (cartTotal) {
    cartTotal.innerText = total;
}


const paymentTotal =
    document.getElementById("paymentTotal");

if (paymentTotal) {
    paymentTotal.innerText = total;
}

 
}



function displayCartPage() {

    const cartItems =
        document.getElementById("cartItems");

    const cartPageTotal =
        document.getElementById("cartPageTotal");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        if (cartPageTotal) {
            cartPageTotal.innerText = "0";
        }

        return;
    }

    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `

            <div class="service-card">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Price: ₹${item.price}
                </p>

                <p>
                    Quantity: ${item.quantity}
                </p>

                <p>
                    Item Total: ₹${itemTotal}
                </p>

            </div>

        `;

    });

    if (cartPageTotal) {
        cartPageTotal.innerText = total;
    }

}


/* =========================
   QUANTITY
========================= */

function changeQuantity(id, change) {

    const item =
        cart.find(item => item.id === id);


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item =>
                item.id !== id
            );

    }


    updateCart();

}


/* =========================
   OPEN CART
========================= */

function openCart() {

    document.getElementById(
        "cartBox"
    ).style.display = "flex";

}


/* CLOSE CART */

function closeCart() {

    document.getElementById(
        "cartBox"
    ).style.display = "none";

}


/* =========================
   DELIVERY
========================= */

function goDelivery() {

    if (cart.length === 0) {

        showMessage("⚠️ Please add food to cart first.");


        window.location.href ="home.html";

        return;

    }

    window.location.href = "delivery.html";

}


/* =========================
   LOCATION CHECK
========================= */

function checkLocation() {

    const department =
        document.getElementById("department").value;

    const room =
        document.getElementById("room").value;

    const message =
        document.getElementById("locationMessage");


    if (
        department === "" ||
        room === ""
    ) {

        message.innerText =
            "❌ Please select department and enter room.";

        message.style.background =
            "#ffe1e1";

        message.style.color =
            "#a02020";

        return;

    }


    // Save delivery details

    localStorage.setItem(
        "quickBiteDepartment",
        department
    );

    localStorage.setItem(
        "quickBiteRoom",
        room
    );


    message.innerText =
        "✅ Location verified. Within 1 KM. Order allowed.";

    message.style.background =
        "#e0f4dc";

    message.style.color =
        "#287239";


    setTimeout(function () {

        window.location.href =
            "payment.html";

    }, 1000);

}

/* =========================
   LOCATION PAGE
========================= */

function showLocationDetails() {

    const department =
        localStorage.getItem("quickBiteDepartment");

    const room =
        localStorage.getItem("quickBiteRoom");


    const showDepartment =
        document.getElementById("showDepartment");

    const showRoom =
        document.getElementById("showRoom");


    if (showDepartment) {
        showDepartment.innerText =
            department || "-";
    }

    if (showRoom) {
        showRoom.innerText =
            room || "-";
    }

}


function verifyLocation() {

    const message =
        document.getElementById("locationMessage");


    message.innerText =
        "✅ Location verified. Within 1 KM. Order allowed.";

    message.style.background =
        "#e0f4dc";

    message.style.color =
        "#287239";


    setTimeout(function () {

        window.location.href =
            "payment.html";

    }, 1000);

}



/* =========================
   PLACE ORDER
========================= */
function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    const department =
        localStorage.getItem("quickBiteDepartment");

    const room =
        localStorage.getItem("quickBiteRoom");





    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    let total = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });


    const orderId =
        "QB" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    const order = {

        id: orderId,

        total: total,

        department: department,

        room: room,

        payment: payment,

        status: "Accepted",

        date: new Date().toLocaleString()

    };


    let oldOrders =
        JSON.parse(
            localStorage.getItem(
                "quickBiteOrders"
            )
        ) || [];


    oldOrders.push(order);


    localStorage.setItem(
        "quickBiteOrders",
        JSON.stringify(oldOrders)
    );

showMessage(
    "✅ Order Confirmed! Order ID: " + orderId
);
   

    cart = [];


    localStorage.removeItem("quickBiteCart");


    updateCart();


    window.location.href = "orders.html";

}



/* =========================
   MY ORDERS
========================= */

function showOrders() {

    const orderList =
        document.getElementById(
            "orderList"
        );


    const orders =
        JSON.parse(
            localStorage.getItem(
                "quickBiteOrders"
            )
        ) || [];


    orderList.innerHTML = "";


    if (orders.length === 0) {

        orderList.innerHTML =
            "<p>No orders found.</p>";

        return;

    }


    orders.forEach(order => {

        orderList.innerHTML += `

        <div class="order-card">

            <h3>
                Order ID:
                ${order.id}
            </h3>

            <p>
                Date:
                ${order.date}
            </p>

            <p>
                Delivery:
                ${order.department},
                ${order.room}
            </p>

            <p>
                Payment:
                ${order.payment}
            </p>

            <p>
                Total:
                <b>₹${order.total}</b>
            </p>

            <span class="status">
                🚚 ${order.status}
            </span>

        </div>

        `;

    });

}


function showPaymentTotal() {

    let total = 0;

    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });


    const paymentTotal =
        document.getElementById("paymentTotal");


    if (paymentTotal) {

        paymentTotal.innerText = total;

    }

}
function submitFeedback() {

    const rating =
        document.getElementById("rating").value;

    const feedback =
        document.getElementById("feedbackText").value.trim();

    const message =
        document.getElementById("feedbackMessage");


    if (rating === "" || feedback === "") {

        message.innerText =
            "❌ Please select rating and enter feedback.";

        message.style.color = "#a02020";

        return;

    }


    const feedbackData = {

        rating: rating,

        feedback: feedback,

        date: new Date().toLocaleString()

    };


    let oldFeedback =
        JSON.parse(
            localStorage.getItem("quickBiteFeedback")
        ) || [];


    oldFeedback.push(feedbackData);


    localStorage.setItem(
        "quickBiteFeedback",
        JSON.stringify(oldFeedback)
    );


    message.innerText =
        "✅ Thank you! Your feedback has been submitted.";

    message.style.color = "#287239";


    document.getElementById("rating").value = "";

    document.getElementById("feedbackText").value = "";

}

function showUPIFields() {
    const upiFields =
        document.getElementById("upiFields");

    if (upiFields) {
        upiFields.style.display = "block";
    }
}

function hideUPIFields() {
    const upiFields =
        document.getElementById("upiFields");

    if (upiFields) {
        upiFields.style.display = "none";
    }
}

function logout() {

    sessionStorage.removeItem("adminLoggedIn");

    window.location.href = "index.html";

}


/* =========================
   QUICK BITE MESSAGE
========================= */

function showMessage(text) {

    let message = document.getElementById("quickBiteMessage");

    if (!message) {

        message = document.createElement("div");

        message.id = "quickBiteMessage";

        message.style.position = "fixed";
        message.style.top = "80px";
        message.style.right = "20px";
        message.style.background = "#800000";
        message.style.color = "white";
        message.style.padding = "15px 25px";
        message.style.borderRadius = "8px";
        message.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
        message.style.zIndex = "9999";
        message.style.fontSize = "16px";
        message.style.fontWeight = "500";

        document.body.appendChild(message);
    }

    message.innerText = text;
    message.style.display = "block";

    setTimeout(function () {
        message.style.display = "none";
    }, 2000);
}


/* =========================
   START PROGRAM
========================= */

displayFood();

updateCart();

showPaymentTotal();

