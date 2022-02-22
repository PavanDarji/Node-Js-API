const express = require("express");
const customer = require("./model/customer");
require('./db/config')
const app = express();
const Product = require('./model/product');
const res = require("express/lib/response");
const multer = require("multer");


app.use(express.json());

app.set('view engine', 'ejs');

app.get('/addUser', (req, res) => {
    res.render('addUser')
})

app.get('/addProduct', (req, res) => {
    res.render('addProduct')
})

app.get('/loginUser', (req, res) => {
    res.render('loginUser')
})

app.get('/upload', (req, res) => {
    res.render('fileUpload')
})




// customer add 

app.post("/create", async (req, resp) => {
    let data = await new customer(req.body);
    const result = await data.save();
    resp.send(result);
});


// login customer 


app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let customers = await Customer.findOne(req.body).select("-password");;
        if (customers) {
            res.send(customers)
        }
        else {
            res.send({ result: 'No User Found' })
        }

    }
    else {
        res.send({ result: 'No User Found' })
    }
})


// list customer 


app.get("/listCustomer", async (req, res) => {
    let customers = await Customer.find();
    if (Customer.length > 0) {
        res.send(customers);
    }
    else {
        res.send({ result: "No Customer Found" })
    }
})



// customer search 

app.get('/searchCus/:key', async (req, res) => {
    let data = await customer.find(
        {
            "$or": [
                { name: { $regex: req.params.key } }

            ]
        });
    res.send(data);
})



// add product 


app.post("/addProduct", async (req, resp) => {
    let data = await new Product(req.body);
    const result = await data.save();
    resp.send(result);
});



// product list 

app.get("/listProduct", async (req, res) => {
    let products = await Product.find();
    if (Product.length > 0) {
        res.send(products);
    }
    else {
        res.send({ result: "No Product Found" })
    }
})


// delete products

app.delete('/deleteProduct/:id', async (req, res) => {
    let data = await Product.deleteOne({ _id: req.params.id })
    res.send(data);
})


// update products 

app.put('/updateProdut/:id', async (req, res) => {
    let data = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(data);
})


//  single products  get

app.get('/singleProduct/:id', async (req, res) => {
    let data = await Product.findOne({ _id: req.params.id });
    if (data) {
        res.send(data)
    }
    else {
        res.send({ result: "No Record Found" })
    }
})


// search products 

app.get('/searchPro/:key', async (req, res) => {
    let data = await Product.find(
        {
            "$or": [
                { name: { $regex: req.params.key } },
                { category: { $regex: req.params.key } }

            ]
        });
    res.send(data);
})



// file upload 

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg", ".png")
        }
    })
}).single('file_name');

app.post("/upload", upload, (req, resp) => {
    resp.send("file upload")
});





app.listen(5000);