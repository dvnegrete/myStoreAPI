const faker = require("faker");

class ProductsServices {

    constructor(){
        this.products = [];
        this.generate();
    }

    generate() {
        const limit = 100;
        for (let i = 0; i < limit; i++) {
        this.products.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price()),            
            departament: faker.commerce.department()
            })        
        }
    }

    create(data) {
        const newProduct = {
            id: faker.datatype.uuid(),
            //los valores que nos de el usuario:
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }

    find () {

    }

    findOne (id){
        return this.products.find(item => item.id === id)
    }

    update (id, changes) {//aqui necesito saber la posicion
        const index = this.products.findIndex( item => item.id === id);
        //si el index no existe entonces nos devolvera un -1
        if (index === -1){
            throw new Error("Producto no encontrado");
        }
        const product = this.products[index];
        this.products[index]= {
            ...product,
            ...changes
        }
        return this.products[index];
    }

    delete (id) {
        const index = this.products.findIndex( item => item.id === id);
        //si el index no existe entonces nos devolvera un -1
        if (index === -1){
            throw new Error("Producto no encontrado");
        }
        this.products.splice(index, 1);
        return { id };
    }

}

module.exports = ProductsServices