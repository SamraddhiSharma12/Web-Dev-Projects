const express=require("express");
const app=express();

app.get("/",(req, res)=>{
    res.send("backend setup");
});
app.listen(5000, ()=>{
    console.log("server running on port ");
})