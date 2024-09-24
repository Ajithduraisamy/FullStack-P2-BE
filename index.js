const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.use(cors({
    origin: "https://startling-banoffee-3ad241.netlify.app"
}))

dotenv.config();

const URL = process.env.URL;
const PORT = 3007;
let db;

async function connectToDatabase() {
    if (!db) {
        let client = await new MongoClient(URL).connect();
        db = client.db('Project2');
        console.log("Connected to MongoDB!");
    }
    return db;
}

function authenticate(req, res, next) {

    const authheader = req.headers.authorization;

    if (!authheader) {
        return res.status(401).json({ Message: 'User Not Authorised' })
    }

    const token = authheader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ Message: 'Token has Expired' });
            }
            return res.status(401).json({ Message: 'Not a valid Token' });
        }
        req.payload = decoded;
        next();
    })
}

app.post('/register', async (req, res) => {
    try {
        await connectToDatabase();
        const collection = db.collection('Todolist_Users');

        //Hashing the password using the bycryptjs
        const salt = bcryptjs.genSaltSync(9);
        const hash = bcryptjs.hashSync(req.body.password, salt);
        req.body.password = hash;

        await collection.insertOne(req.body);
        res.json({ Message: "User Created!" })
    } catch (error) {
        res.status(500).json({ Message: 'Someting went wrong', error: error.Message });
    }

})

app.post('/login', async (req, res) => {
    try {
        await connectToDatabase();
        const collection = db.collection('Todolist_Users');

        const user = await collection.findOne({ email: req.body.email });

        if (user) {
            const isPassword = bcryptjs.compareSync(req.body.password, user.password);
            if (isPassword) {
                //Generate the token
                const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' })
                res.json({ token })
            }
        }
        else {
            res.status(404).json({ Message: 'Invalid user credentials' });
        }

    } catch (error) {
        res.status(500).json({ Message: 'Someting went wrong', error: error.Message });
    }
})

app.post('/tasks', authenticate, async (req, res) => {
    try {
        await connectToDatabase();
        const collection = db.collection('Todolist_Tasks');

        // Add userId to the task
        const taskWithUserId = {
            ...req.body,
            userId: req.payload.id  // Use the ID from the JWT payload
        };

        await collection.insertOne(taskWithUserId);
        res.json({ Message: "Task Created!" });
    } catch (error) {
        res.status(500).json({ Message: 'Something went wrong', error: error.Message });
    }
});


app.get('/viewtasks', authenticate, async (req, res) => {
    try {
        await connectToDatabase();
        const collection = db.collection('Todolist_Tasks');

        // Find tasks for the authenticated user only
        const tasks = await collection.find({ userId: req.payload.id }).toArray();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ Message: 'Something went wrong', error: error.Message });
    }
});


app.get('/tasks/:id', authenticate, async (req, res) => {
    try {
        await connectToDatabase();
        const collection = db.collection('Todolist_Tasks');
        const task = await collection.findOne({ _id: new ObjectId(req.params.id) });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Send task data along with the success message
        res.json({ task, message: 'Task received successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});


app.put('/tasks/:id', authenticate, async (req, res) => {
    try {
        await connectToDatabase();
        const collection = db.collection('Todolist_Tasks');
        await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
        res.json({ Message: 'Task Updated sucessfully' })
    } catch (error) {
        res.status(500).json({ Message: 'Someting went wrong', error: error.Message });
    }

})

app.delete('/tasks/:id', authenticate, async (req, res) => {
    try {
        await connectToDatabase();
        const collection = db.collection('Todolist_Tasks');
        await collection.deleteOne({ _id: new ObjectId(req.params.id) })
        res.json({ Message: 'Task deleted sucessfully' })
    } catch (error) {
        res.status(500).json({ Message: 'Someting went wrong', error: error.Message });
    }

})

app.listen(PORT, () => { console.log(`This server is running in the PORT ${PORT}`) });