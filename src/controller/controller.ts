import * as mongoose from "mongoose"
import { ContactSchema } from "../models/model"
import { Request, Response } from "express"

const Contact = mongoose.model('Contact', ContactSchema)

//Import this controller in the route and pass by method!
export class ContactController {

    //HOMEPAGE
    public welcome (req: Request, res: Response) {
        res.status(200).json({
            message: 'Welcome to the HomePage API!'
        })
    }

    //POST contact controller
    public async addNewContact (req: Request, res: Response) {
        const newContact = new Contact(req.body)
        try {
            const savedData = await newContact.save()
            res.status(200).json(savedData)
        }
        catch (err) {
            res.status(500).json({
                message: err
            })
        }
    }

    //GET all contacts conroller
    public async getContacts (req: Request, res: Response) {
        try {
            const allContacts = await Contact.find()
            res.status(200).json(allContacts)
        }
        catch (err) {
            res.status(500).json({
                message: err
            })
        }
    }

    //GET one contact controller
    public async oneContact (req: Request, res: Response) {
        try {
            const contact = await Contact.findOne({ _id: req.params.contactId })
            res.status(200).json(contact)
        }
        catch (err) {
            res.status(500).json({
                message: err
            })
        }
    }

    //UPDATE one contact controller
    public async updateContact (req: Request, res: Response) {
        try {
            const updatedContact = await Contact.findOneAndUpdate(
                { _id: req.params.contactId },
                req.body,
                { new: true }
            )

            res.status(200).json(updatedContact)
        }
        catch (err) {
            res.status(500).json({
                message: err
            })
        }
    }

    //DELETE one contact controller
    public async deleteContact (req: Request, res: Response) {
        try {
            await Contact.remove({ _id: req.params.contactId })
            res.status(200).json({
                message: 'Contact has been successfully deleted!'
            })
        }
        catch (err) {
            res.status(500).json({
                message: err
            })
        }
    }
}