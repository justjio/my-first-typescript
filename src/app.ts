//Setting up app config
import * as express from "express"
import { Routes } from "./routes/all-routes" // Ensure this has been created first
import * as mongoose from "mongoose"
import * as helmet from "helmet"
import * as compression from "compression"

//Create the App class
class App {
    public app: express.Application
    public mongoLocalUrl: string = "mongodb://localhost/contact"
    public mongoCloudUrl: string = "mongodb+srv://jiobiagbaDB:obidudu9293@cluster0-ywgnl.azure.mongodb.net/typescript?retryWrites=true&w=majority"
    public router: Routes = new Routes() //Ensure this has been set up in routes folder

    constructor() {
        this.app = express()
        this.config()
        this.router.routes(this.app) //Ensure this has been set up in routes folder
        this.mongoSetup()
    }

    private config(): void {
        this.app.use(express.json()) //This will ensure support for post data in json format
        this.app.use(express.urlencoded({ extended: false })) //This will ensure support for x-www-form-urlencoded post data
        this.app.use(compression())
        this.app.use(helmet())
    }

    private mongoSetup(): void {
        // mongoose.Promise = global.Promise
        mongoose.connect(this.mongoCloudUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
}

//Export an instance of the App class. Notice that it's only the public part that has been exported!
export default new App().app