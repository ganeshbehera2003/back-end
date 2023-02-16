const express = require('express');
const router = express.Router();
const { Event } = require('../models/event')
const Auth = require('../middlewares/auth');

router.get("/",async(req,res)=>{
    try{
        const events = await Event.find();
        return res.status(200).json({
            message:"Events Retrieved Successfully",
            events
        })
    }catch(err){
        return res.status(500).json({
            message:"Something Went Wrong",
            error:err.message
        })
    }
})

router.post("/add",async(req,res)=>{
    try{
        console.log("Reached the add Route");
        let error ='';
        const { event_image,event_name,event_price,event_startdate,event_enddate,event_place } = req.body;

        if(event_name=='' && error==''){
            error = 'Missing Event Name'
            res.status(400).json({
                message:error
            })
        }
        if(event_startdate=='' && error==''){
            error = 'Missing Event Date'
            res.status(400).json({
                message:error
            })
        }
        if(event_enddate=='' && error==''){
            error = 'Missing Event Date'
            res.status(400).json({
                message:error
            })
        }
        if(event_place=='' && error==''){
            error = 'Missing Event Place'
            res.status(400).json({
                message:error
            })
        }

        const eventObj = {
            event_image,
            event_name,
            event_price,
            event_startdate,
            event_enddate,
            event_place
        }

        const event = new Event(eventObj);
        await event.save();
        return res.status(200).json({
            message:"Event Saved Succesfully",
        })

    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            message:"Something Went Wrong",
            error:err.message
        })
    }
})

router.put("/update/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const {event_image,event_name,event_price,event_startdate,event_enddate,event_place} = req.body;
        await Event.findByIdAndUpdate(id,{event_image,event_name,event_price,event_startdate,event_enddate,event_place});
        return res.status(200).json({
            message:"The Event is updated Successfully"
        })
    }catch(err){
        return res.status(500).json({
            message:"Something Went Wrong",
            error:err.message
        })
    } 
})

router.get("/:name",async(req,res)=>{
    try{
        const name = req.params.name;
        const event = await Event.findOne({event_name:name});
        res.status(200).json({
            message:"Event Fetched",
            event
        })
    }catch(err){
        return res.status(500).json({
            message:"",
            error:err.message
        })
    }
})
router.get("/:email",async(req,res)=>{
    try{
        const email = req.params.email; // may be params or may not be be like body of the req

    }catch(err){

    }
})

router.delete("/delete/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        await Event.findByIdAndDelete(id);
        return res.status(200).json({
            message:"The Event get Deleted"
        })
    }catch(err){
        return res.status(500).json({
            message:"Something Went Wrong",
            error:err.message
        })
    }
})

module.exports = router;