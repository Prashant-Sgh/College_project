import {connect} from "mongoose";
import {MONGO_URI} from "../config.js"
import { loadSampleData } from "./samples.js";


export const connectDB = async () => {
    try {
        const connectionIn = await connect(MONGO_URI)
        loadSampleData()
        console.log("[+] Connected to database : ",connectionIn.connection.host)
    } catch (error) {
        console.log("[!] MongoDB Failed",error?.message)
        process.exit(1)
    }
}

