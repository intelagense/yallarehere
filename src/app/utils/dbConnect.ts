import mongoose from 'mongoose'

export default async function connectDB() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI
        if (!MONGODB_URI) throw 'MongoDB connection string: "MONGODB_URI" not provided'

        const conn = await mongoose.connect(MONGODB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)

    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}