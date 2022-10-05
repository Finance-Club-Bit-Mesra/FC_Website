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

module.exports = router;
