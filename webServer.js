import express from "express"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import congress from "./congressAPI.js"
const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(join(__dirname, "static")))

app.get("/", (_, res) => res.sendFile(`${__dirname}/home.html`))

app.get("/members", (_, res) => res.sendFile(`${__dirname}/members.html`))

app.get("/members/:chamber/all", (req, res) => {
    if(req.params.chamber === "house") {
        res.sendFile(`${__dirname}/allMembersHouse.html`)
    }
    else if(req.params.chamber === "senate") {
        res.sendFile(`${__dirname}/allMembersSenate.html`)
    }
})

app.get("/members/latest", (_, res) => res.sendFile(`${__dirname}/newMembers.html`))

app.get("/bills/latest", (_, res) => res.sendFile(`${__dirname}/newBills.html`))

app.get("/member", (_, res) =>  res.sendFile(`${__dirname}/specificMember.html`))

app.get("/bill", (_, res) =>  res.sendFile(`${__dirname}/specificBill.html`))

app.get("/api/latest/members", (req, res) => {
    congress.getLatestMembers()
        .then(response => response.results[0])
        .then(response => res.json(response))
})

app.get("/api/latest/bills", (req, res) => {
    congress.getLatestBills()
        .then(response => response.results[0])
        .then(response => res.json(response))
})

app.get("/api/members/:chamber/:state", (req, res) => {
    if(req.params.chamber === "house") {
        congress.getStateReps(req.params.state)
            .then(response => res.json(response))
    }
    else if(req.params.chamber === "senate") {
        congress.getStateSenators(req.params.state)
            .then(response => res.json(response))
    }
    else {
        res.redirect("/404")
    }
})

app.get("/api/members/:chamber", (req, res) => {
    if(req.params.chamber === "house" || req.params.chamber === "senate") {
        congress.getAllMembers(req.params.chamber)
            .then(response => res.json(response))
    }
    else {
        res.redirect("/404")
    }
})

app.get("/api/member/:memberID", (req, res) => {
    congress.getCongressMember(req.params.memberID)
        .then(response => res.json(response))
})

app.get("/api/bill/:billID", (req, res) => {
    congress.getBill(req.params.billID)
        .then(response => res.json(response))
})

app.listen(80)