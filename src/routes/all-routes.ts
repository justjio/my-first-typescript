import { Application } from "express"
import { ContactController } from "../controller/controller"

//Notice here that all routes can be set up as a method in the Routes class
//I'm thinking we can seaprate each into different methods if need be!

//Import this in the app.ts file
export class Routes {
    public contactController: ContactController = new ContactController()
    public routes(app: Application): void {
        //General GET
        app.route('/')
            .get(this.contactController.welcome)

        //Contact GET and POST
        app.route('/contact')
            .get(this.contactController.getContacts)
            .post(this.contactController.addNewContact)


        //Single contact GET, PUT and DELETE
        app.route('/contact/:contactId')
            .get(this.contactController.oneContact)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact)
    }
}