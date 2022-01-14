const faker = require("faker");
const boom = require("@hapi/boom");

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
            image: faker.image.imageUrl(),
            departament: faker.commerce.department(),
            isBlock: faker.datatype.boolean()
            })
        }
    }

    async create(data) {
        const newProduct = {
            id: faker.datatype.uuid(),
            //los valores que nos de el usuario:
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }

    async find () {
      return new Promise((resolve, reject) => {
        setTimeout( ()=> {
          resolve(this.products)
        }, 2500);
      })
    }

    async findOne (id){
     const product = this.products.find(item => item.id === id);
     if (!product) {
       throw boom.notFound("product not found")
     }
     if (product.isBlock) {
       throw boom.conflict("product is block")
     }
     return product;
    }

   async update (id, changes) {
      //aqui necesito saber la posicion
        const index = this.products.findIndex( item => item.id === id);
        //si el index no existe entonces nos devolvera un -1
        if (index === -1){
            throw boom.notFound("product not found");
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        }
        return this.products[index];
    }

    async delete (id) {
        const index = this.products.findIndex( item => item.id === id);
        //si el index no existe entonces nos devolvera un -1
        if (index === -1){
            throw boom.notFound("product not found");
        }
        this.products.splice(index, 1);
        return { id };
    }

}

module.exports = ProductsServices
