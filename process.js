const addButtons = document.querySelectorAll('.add-btn');
    const cartList = document.getElementById('cart-list');

    addButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('div');
        const name = card.querySelector('h3').textContent;
        const price = card.querySelector('p.font-bold').textContent;

        const item = document.createElement('div');
        item.className = 'bg-blue-500 p-3 rounded-xl shadow flex justify-between items-center';
        item.innerHTML = `
          <div>
            <p class="font-semibold">${name}</p>
            <p class="text-sm">${price}</p>
          </div>
          <button class="delete bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
        `;

        if (cartList.children.length === 1 && cartList.children[0].textContent.includes("Cart is empty")) {
          cartList.innerHTML = "";
        }

        cartList.appendChild(item);
      });
    });

    // 🔴 DELETE ITEM
    cartList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        e.target.closest('div').remove();
        if (cartList.children.length === 0) {
          cartList.innerHTML = <p class="text-blue-100">Cart is empty</p>;
        }
      }
    });