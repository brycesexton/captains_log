require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')
const Log = require('./models/logs')
const PORT = process.env.PORT || 3003
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

//view engine
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

//mongo
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('connected to mongo')
})

//port
app.listen(PORT, () => {
    console.log(`${PORT} is poppin`)
})


//index
app.get('/logs', async (req, res) => {
    try {
        const foundLogs = await Log.find({})
        res.render('logs/Index', {
            logs: foundLogs
        })
    }
    catch(error) {
        res.status(400).send({message: error.message})
    }
    res.render('index')
})

//new
app.get('/logs/new', (req, res) => {
    res.render('logs/New')
})

//delete
app.delete('/logs/:id', async (req, res) => {
    try {
        await Log.findOneAndDelete({'_id': req.params.id})
            .then(() => {
            res.redirect('/logs')
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

//update
app.put('/logs/:id', async (req, res) => {
    try {
        const logId = req.params.id;
        const updatedLogData = req.body;

        if (updatedLogData.shipIsBroken === 'on') {
            updatedLogData.shipIsBroken = true;
        } 
        else {
            updatedLogData.shipIsBroken = false;
        }
        const updatedLog = await Log.findOneAndUpdate({ _id: logId }, updatedLogData, { new: true });

        if (!updatedLog) {
            return res.status(404).send({ message: 'Log not found' });
        }
        res.redirect(`/logs/${logId}`);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


//create
app.post('/logs', async (req, res) => {
    if(req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true
    } 
    else {
        req.body.shipIsBroken = false
    }
    try {
        const createdLog = await Log.create(req.body)
         res.redirect(`/logs/${createdLog._id}`)
    } 
    catch(error) {
        res.status(400).send({message: error.message})
    }
  
    console.log(req.body)
  })

//edit
app.get('/logs/:id/edit', async (req, res) => {
    try {
        const foundLog = await Log.findOne({'_id': req.params.id})
        res.render('logs/Edit', {
            log: foundLog
        })
    } catch (error) {
        res.status(400).send({ message: error.message})
    }
})

//show
app.get('/logs/:id', async (req, res) => {
    try {
        const foundLog = await Log.findOne({_id: req.params.id})
        res.render('logs/Show', {
        log: foundLog
        })
    }
    catch(error) {
        res.status(400).send({ message: error.message })
    }
})

