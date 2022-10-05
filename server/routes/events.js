const express = require("express") ;
const router = express.Router() ;
const Event = require("../models/Event") ;

//Route for creating a new event
router.post("/createEvent", 
    async (req,res) => {
        try{
            const {title, content} = req.body ;
            const event = new Event({title,content});

            const eventSaved = await event.save() ;
            res.json(eventSaved) ;
        }
        catch(err){
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
});

//Route for updating an event
router.get("/fetchEvents",
    async(req,res) => {
        try{
            const allEvents = await Event.find({});
            res.json(allEvents);
        }
        catch(err){
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//Route for updating an event
router.put("/updateEvent/:id",
    async(req,res) =>{
        try{
            const{title,content} = req.body ;
            
            //creating a new object for storing values to be changed
            const newEvent = {} ;
            if(title) newEvent.title = title ;
            if(content) newEvent.content = content ;

            //Checking whether event to be updated exists in database or not
            const event = await Event.findById(req.params.id);
            if(!event) {
                return res.status(404).json("Not Found");
            }

            //Updation
            const UpdatedEvent = await Event.findByIdAndUpdate(req.params.id, {$set:newEvent}, {new:true});
            res.json({UpdatedEvent});
        }
        catch(err){
            console.error(err.message);
            res.status(500).send("Internal Server Error") ;
        }
    }
);

//Route for deleting an event
router.delete("/deleteEvent/:id",
    async(req,res) => {
        try{
            //Checking whether event to be updated exists in database or not
            const event = await Event.findById(req.params.id);
            if(!event) {
                return res.status(404).json("Not Found");
            }

            //Deletion
            const deletedEvent = await Event.findByIdAndDelete(req.params.id) ;
            res.json({deletedEvent}) ;
        }
        catch(err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

module.exports = router;
