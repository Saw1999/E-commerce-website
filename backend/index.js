const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const port = 8888;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://username_placeholder:password_placeholder@host:port/database");

// API creation
app.get("/", (req, res) => {
    res.send("Express App is running.")
})

// Image storage 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage : storage});

//Upload file
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


// Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

// Add new product
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else {
        id = 1;
    }
    try {
        const product = new Product ({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        console.log(product);
        await product.save();
        console.log("Saved!");
        res.json({
            success: true,
            name: req.body.name,
    });
    } 
    catch (err) {
        console.log(err);
    }
});

//Delete product
app.post("/removeproduct", async (req, res) =>{
    try {
        await Product.findOneAndDelete({id:req.body.id});
        console.log("Deleted!")
        res.json({
            success: true,
            name:req.body.name,
        })
    } 
    catch (err) {
        res.json ({
            success: false,
            error: err,
        })
    }
});

// Get all products
app.get("/allproducts", async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All products have been successfully fetched!");
        res.send(products);
    }
    catch (err) {
        console.log(err);
    }
})

//Schema for User Model
const User = mongoose.model('User', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

//Register user
app.post("/signup", async(req,res) => {
    let check = await User.findOne({email:req.body.email});
    
    if (check) {
        return res.status(400).json({
            success:false,
            error:"Email address already existed!",
        })
    };

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    };

    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();

    const userData = {
        user:{
            id: user.id
        }
    };
    const token = jwt.sign(userData, 'secret_ecom');
    res.json({success:true, token});
})

//User login
app.post('/signin', async(req,res) => {
    let user = await User.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const userData = {
                user:{
                    id:user.id
                }
            };
            const token = jwt.sign(userData, 'secret_ecom');
            res.json({success:true, token});
        }
        else {
            res.json({
                success: false,
                error: "Incorrect password!",
            })
        }
    }
    else {
        res.json({
            success: false,
            error: "Incorrect email address!"
        })
    }
})

//Get product for new collection
app.get('/newcollection', async(req,res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection fetched");
    res.send(newcollection);
})

//Get product for popular items in woman category
app.get('/popularwomenitems', async(req,res) => {
    let products = await Product.find({category:"women"});
    let popular = products.slice(0,4);
    console.log("Popular women items fetched");
    res.send(popular);
})

//Creat middleware to fetch user
    const fetchUser = async (req, res, next) => {
        const token = req.headers['auth-token'];
        if (!token) {
            res.status(401).send({errors:"Please sign in or sign up!"})
        }
        else {
            try{
                const data = jwt.verify(token, 'secret_ecom');
                req.user = data.user;
                next();
            }
            catch (err) {
                res.status(401).send({errors:"User authentication failed!"})
            }
        }
    }


//Add product in cartData
app.post('/addtocart', fetchUser, async(req, res) =>{
    console.log("Item to add : ", req.body.itemId);

    let userData = await User.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added to your cart!");
})

//Remove product from cart
app.post('/removefromcart', fetchUser, async(req, res) => {
    console.log("Item to remove : ", req.body.itemId);

    let userData = await User.findOne({_id: req.user.id});
    if (userData.cartData[req.body.itemId] > 0){
        userData.cartData[req.body.itemId] -= 1;
        await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
        res.send("Removed from your cart!");
    }
    
})

//Get cart data
app.post('/cart', fetchUser, async (req, res) => {
    console.log("Get Cart");
    let userData = await User.findOne({_id: req.user.id});
    res.json(userData.cartData);
})


app.listen(port, (err) => {
    if (!err) {
        console.log("Server is running on Port 8888.");
    }
    else {
        console.log("Error : "+ err);
    }
})
