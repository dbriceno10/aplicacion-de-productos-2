// vamos a definir una clase para nuestra interfaz y una para el producto, objeto producto y objeto interfaz
class Product {
    constructor(name, price, year) {
        this.name = name
        this.price = price
        this.year = year
    }
    //Luego debemos crear un método que se encargue de agregar o eliminar los productos
    // addProduct() {

    // }
    // deleteProduct(){

    // }
}

//objeto que va a interactuar con la interfaz (UI)
class Interface {
    //este método lo estamos declarando aquí en la interfaz, porque será la que va a interactuar con el DOM
    addProduct(product) {
        const product_List = document.getElementById("product-list")
        //vamos a crear un elemento que vamos a mandar al html
        const element_Product = document.createElement("div")
        element_Product.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
            <b>Nombre del Producto</b>: ${product.name}
            <b>Precio del Producto</b>: ${product.price}$
            <b>Año del Producto</b>: ${product.year}
            <a href="#" class="btn btn-danger" name="delete">Delete</a>
            </div>
        </div>`
        //Hemos agregado un enlace que hemos estilizado como un botón con las clases que ya contiene bootstrap
        //vamos a insertar el producto en el html
        product_List.appendChild(element_Product)
        //luego de agregar el producto resetea el formulario, puede hacerse desde aqyí utilizando el this
        // this.clearForm()
        // const saveName = localStorage.getItem("card text-center mb-4",product.name);
        // console.log(saveName);
    }



    deleteProduct(element_HTML){
        if(element_HTML.name === "delete") {//si el elemento capturado tiene la priedad (name) "delete", este caso en nuestro enlace (etiqueta "a")
            // console.log(element_HTML.parentElement.parentElement.parentElement)
            element_HTML.parentElement.parentElement.parentElement.remove()
            this.showMeessage("Producto Eliminado","info")
        }
    }

    showMeessage(message, cssClass) {//va a mostrar un mensaje en la interfaz
        const div = document.createElement("div")
        // div.className = "alert alert-" + cssClass
        div.className = `alert alert-${cssClass} mt-2`
        div.appendChild(document.createTextNode(message))
        //mostrando en el DOM
        const container = document.querySelector(".app-container")
        const app = document.querySelector("#app")
        container.insertBefore(div,app)//antes de estos elementos
        setTimeout(() => {
            document.querySelector(".alert").remove()
        }, 3000);
    }

    //vamos a crear un método que resetee o limpie el formulario luego de que los datos sean enviados
    clearForm() {
        document.getElementById("product-form").reset()
        //el método ".reset()" que estamos llamando se va a encargar de resetear el formulario
    }
}


//Ahora vamos a interactuar con los eventos de la aplicación (del DOM)
//capturando los datos del formulario
// document.getElementById("product-form")
// .addEventListener("submit", function() {
//     alert("Enviando formulario")
// })
document.getElementById("product-form").addEventListener("submit", function (ev) {
    //vamos a agregar un evento que evita que se refresque la página
    ev.preventDefault(ev)
    // alert("Enviando formulario")
    const form_Name = document.getElementById("name").value
    const form_Price = document.getElementById("price").value
    const form_Year = document.getElementById("year").value
    // console.log(`${form_Name} ${form_Price}$ ${form_Year}`)
    const saveN = localStorage.setItem("name",form_Name)
    console.log(`Nombre ${saveN}`)
    const saveP = localStorage.setItem("price",form_Price)
    
    const saveY = localStorage.setItem("year",form_Year)
    

    //vamos a crear un nuevo objeto producto con los datos obtenidos
    console.log(new Product(form_Name, form_Price, form_Year))
    
    const new_Product = new Product(form_Name, form_Price, form_Year)
    //creando un nuevo objeto desde la interfaz
    const interface = new Interface()
    interface.addProduct(new_Product)
    if (form_Name === "" || form_Price === "" || form_Year === "") {
        return interface.showMeessage("completa los campos", "danger")
    }
    //tambien podemos invocarlo desde fuera del constructor de Interface
    interface.clearForm()
    interface.showMeessage("Producto Agregado", "success")
})

//capturar el evento para borrar elementos (productos) en lalista
document.getElementById("product-list").addEventListener("click", function(ev) {
    //nota relacionado a este alert, cuando damos click en cualquier parte del elemento agregado, se esta disparando debido a que todos los elemetntos del product-list estan compartiendo el evento de click
    // alert("eliminando")
    // console.log(ev.target)
    const interface = new Interface()
    interface.deleteProduct(ev.target)
})