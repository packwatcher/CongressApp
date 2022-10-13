import congress from "./congressAPI.js"
import express from "express"
const app = express()

app.get("/members/house/:state", (req, res) => {
    congress.getStateReps(req.params.state)
        .then(response => response.results)
        .then(response => res.json(response))
})

app.get("/members/senate/:state", (req, res) => {
    congress.getStateSenators(req.params.state)
        .then(response => response.results)
        .then(response => res.json(response))
})

app.get("/member/:id", (req, res) => {
    congress.getCongressMember(req.params.id)
        .then(response => response.results[0])
        .then(response => res.json(response))
})

app.get("/members/:chamber", (req, res) => {
    congress.getCongressMembers(req.params.chamber)
        .then(response => response.results[0].members)
        .then(response => res.json(response))
})

app.listen(81)