
export const JWT_SECRET=process.env.JWT_SECRET || "nsia7o38gogsfsdfaSDf54" //hardcoded for testing purpose!!
export const SALT_KEY=process.env.SALT_KEY || "fnlasu7254aHrtsx" //hardcoded for testing purpose!!
// export const MONGO_URI=process.env.MONGO_URI || "mongodb://localhost:27017"; //hardcoded for testing purpose!!
export const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://PRASHANT_SINGH:NO_PASSWORD@foodzone-cluster01.cmwi258.mongodb.net/?retryWrites=true&w=majority&appName=FoodZone-Cluster01";
export const PORT=3001; //hardcoded for testing purpose!!


export const cspOptions = { 
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'","'unsafe-inline'", "https://*.cashfree.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["https://lh3.googleusercontent.com/", "https://randomuser.me/", "'self'", "data:", ],
        connectSrc: ["'self'", "https://discord.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com/"],
        objectSrc: ["'none'"],
        mediaSrc: ["'none'"],
        frameSrc: ["https://*.cashfree.com"],
        formAction: ["https://*.cashfree.com"],
    }
}