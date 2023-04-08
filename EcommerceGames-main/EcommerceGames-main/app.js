const stockProductos = [
  {
    id: 1,
    nombre: "Crash Bandicoot",
    cantidad: 1,
    desc: "trò chơi nền tảng, mức độ khó khăn",
    precio: 1200,
    img: "img/Crash.jpg",
  },
  {
    id: 2,
    nombre: "Mortal Kombat X",
    cantidad: 1,
    desc: "battle với đồ họa tốt nhất",
    precio: 1500,
    img: "img/mortal.jpg",
  },
  {
    id: 3,
    nombre: "Pac Man",
    cantidad: 1,
    desc: "Trò chơi nền tảng, cấp độ cơ bản",
    precio: 1570,
    img: "img/pacman.jpg",
  },
  {
    id: 4,
    nombre: "Dragon Ball Xenoverse",
    cantidad: 1,
    desc: "trải nghiệm ngọc rồng",
    precio: 1000,
    img: "img/dragonball.jpg",
  },
  {
    id: 5,
    nombre: "Naruto Ninja Storm 4",
    cantidad: 1,
    desc: "naruto phiêu lưu ký",
    precio: 1200,
    img: "img/naruto.jpg",
  },
  {
    id: 6,
    nombre: "Shingeki Final Attack",
    cantidad: 1,
    desc: "Eren Jaeger trở lại...",
    precio: 1200,
    img: "img/shingeki.jpg",
  },
  {
    id: 7,
    nombre: "League of Legends",
    cantidad: 1,
    desc: "Đừng mua cái này vì lợi ích của chính bạn",
    precio: 1400,
    img: "img/league.jpg",
  },
  {
    id: 8,
    nombre: "Call Of Duty Warzone",
    cantidad: 1,
    desc: "bắn hơn bao giờ hết",
    precio: 1200,
    img: "img/callduty.jpg",
  },
  {
    id: 9,
    nombre: "Fifa 2019",
    cantidad: 1,
    desc: "Trò chơi bóng đá",
    precio: 1400,
    img: "img/fifa.jpg",
  },
  {
    id: 10,
    nombre: "Fornite",
    cantidad: 1,
    desc: "Battle Royale",
    precio: 1200,
    img: "img/fornite.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "Your cart is empty!",
        text: "Buy something to continue shopping",
        icon: "error",
        confirmButtonText: "Accept",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Price: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Amount: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Buy Product</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Product: ${nombre}</p>
      <p>Price: ${precio}</p>
      <p>Amount :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">delete product</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">You haven't added anything yet!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "You must complete your email and name!",
       text: "fill the form",
       icon: "error",
       confirmButtonText: "Accept",
   })
 } else {

  const btn = document.getElementById('button');

// document.getElementById('procesar-pago')
//  .addEventListener('submit', function(event) {
//    event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_qxwi0jn';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Buy';
      alert('Email sent!');
    }, (err) => {
      btn.value = 'checkout';
      alert(JSON.stringify(err));
    });
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Purchase made successfully'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }