import app from "./app"
const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
    console.log(`Express server now running ... Listen on port ${PORT}.`)
})