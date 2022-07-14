const { connect } = require("./src/database");
const express = require("express");
const product = require("./src/product")
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

var router = express.Router();



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());
app.use("/api/product", product);
app.use('/api',router);

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1;


router.use((request,response,next)=>{
    next();
});

app.get("/", (req,res)=>{
    res.send("EXPRESS")
})

router.route("/getPets").get(async (request,response)=> {
    console.log("getPets")
    const db = await connect();
    const result = await db.collection("pet").aggregate([
        {
            $lookup: 
            {
                from: "owner",
                localField: "nrodocument",
                foreignField: "nrodocument",
                as: "owner"
            }
        }
    ]).toArray().then(data => data)
    response.json(result)
})

router.route("/getOwners").get(async (request,response)=> {
    const db = await connect();
    const result = await db.collection("owner").find({}).toArray();
    response.json(result)
})
 
app.listen(3000)
console.log("Server on port 3000")


module.exports = app;