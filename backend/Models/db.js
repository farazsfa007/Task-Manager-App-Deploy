import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('MongoDb Connected Successfully👍')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB