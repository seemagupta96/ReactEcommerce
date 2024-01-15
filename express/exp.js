const express = require("express");
const app = express();

const mongoose = require("mongoose");
const myflip = require('./expmodules');
const check = mongoose.connect("mongodb://127.0.0.1:27017/final");
const cors = require('cors');
const catModel = require("./model/modeldash");
const subcatModel = require("./model/subcatemodel");
const multer = require("multer");
const ProductModel = require("./model/ProductModel");
const AdminModel = require("./model/AdminModel");
app.use(cors());
app.use(express.static("pimg"));


check.then(() => {
    console.log("Good Successfully")

});
check.catch(() => {
    console.log("Sorry Filed")
});

app.use(express());
app.use(express.json())

// api
app.post("/project2", async (req, res) => {
    console.log(req.body);
    const so = await new myflip({
        firstname: req.body.firstnam,
        lastname: req.body.lastnam,
        email: req.body.emi,
        passward: req.body.pass,
        confirmpassward: req.body.confirmpass
    });
    // await so.save();
    // res.json({ msg: "This is Recored Saved bbb" })
    await so.save();
    res.json({ msg: "save" })
});

app.post("/Cat", async (req, res) => {
    const re = await new catModel({
        Category: req.body.category

    });
    await re.save();
    res.json({ msg: "Data uploaded Successfully" })
});


app.get("/project2", async (a, b) => {
    const re = await myflip.find();
    b.json(re);
})

app.get("/Cat", async (req, res) => {
    const come = await catModel.find();
    res.json(come);
})
// subcate api

app.post("/subcate", async (req, res) => {
    const re = new subcatModel({
        Subcategory: req.body.subcatname,
        Categoryid: req.body.catid

    });
    if (await re.save()) {
        res.json({ msg: "Subcategory Saved Successfully!" })
    }
    else {
        res.json({ msg: "Something went Wrong" })
    }
});
// subcate get api
app.get("/subcate", async (req, res) => {
    const so = await subcatModel.find();
    res.json(so);
})

app.get("/Cat", async (req, res) => {
    const re = await catModel.findOne(_id, req.params.id);
    res.json(re)
})
app.get("/subcate", async (req, res) => {
    const re = await subcatModel.findOne(_id, req.params.id);
    res.json(re)
})

app.post("/subcatbycat", async (req, res) => {
    const re = await subcatModel.find({ Categoryid: req.body.cid });
    res.json(re)
})


// category delete api
app.delete("/Cat", async (req, res) => {
    const re = await catModel.findOneAndDelete({ _id: req.body.del })
    res.json({ msg: "delete" });
});


app.delete("/project2", async (req, res) => {
    const re = await myflip.findOneAndDelete({ _id: req.body.p })
    res.json({ msg: "Record Delelted" });
});
app.delete("/subcate", async (req, res) => {
    const delet = await subcatModel.findOneAndDelete({ _id: req.body.subdel })
    res.json({ msg: "Record Delelted successfully" });

});

//product storage
const mystorage = multer.diskStorage({
    destination: (req, File, cb) => {
        cb(null, "./pimg")
    },
    filename: (req, File, cb) => {
        const ext = File.mimetype.split("/")[1];
        cb(null, "pic_" + Date.now() + "." + ext)
    }
});

// filter check  file extention
const myfilter = (req, File, cb) => {
    const seem = File.mimetype.split("/")[1];
    if (seem === "jpg" || seem === "png" || seem === "jpeg" || seem === "gif") {
        cb(null, true)
    } else {
        cb("Invalid Pic", false)
    }
}

const uploaded = multer({
    storage: mystorage,
    fileFilter: myfilter
})

// appi\
app.post("/product", uploaded.single("pimg"), async (req, res) => {
    const data = new ProductModel({
        SubCatId: req.body.SubCatId,
        PName: req.body.PName,
        Price: req.body.Price,
        Offer: req.body.Offer,
        Pic: req.file.filename,
        Des: req.body.Des
    })

    await data.save();

    res.json({ message: "Product data saved" })
})


app.get("/product", async (req, res) => {
    const re = await ProductModel.find();
    res.json(re);
})

//login Api

app.post("/adlogin", async (req, res) => {
    console.log(req.body);
    const re = await AdminModel.findOne({ UserName: req.body.uname, Password: req.body.psw })
    if (re) {
        res.json({ message: "valid user" })
    }
    else {
        res.json({ message: "Invalid User" })
    }

})



app.listen(7000, () => {
    console.log("server started");
});
