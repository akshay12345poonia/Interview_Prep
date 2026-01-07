require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("../src/models/Task");
const taskData = require("./tasks.json");

const seedTasks = async () => {
    try 
    {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB for seeding.");

        await Task.deleteMany({});
        console.log("Cleared existing tasks.");

        const createdTasks = await Task.insertMany(taskData);
        console.log(`Inserted ${createdTasks.length} tasks.`);

        mongoose.connection.close();
        console.log("Database connection closed.");
    }
    catch (error) {
        console.error("Seeding error:", error);
        mongoose.connection.close();
        process.exit(1);
    }
}

seedTasks()
