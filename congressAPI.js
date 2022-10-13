import fetch from "node-fetch"
import { readFileSync } from "fs"

const config = JSON.parse(readFileSync("./config.json"))
const apiKey = config.apiKey
const baseUrl = "https://api.propublica.org/congress/v1"

const getStateSenators = state => {
    return fetch(`${baseUrl}/members/senate/${state}/current.json`, {headers:{"X-API-Key":apiKey}})
        .then(res => res.json())
}

const getStateReps = state => {
    return fetch(`${baseUrl}/members/house/${state}/current.json`, {headers:{"X-API-Key":apiKey}})
        .then(res => res.json())
}

const getCongressMember = id => {
    return fetch(`${baseUrl}/members/${id}.json`, {headers:{"X-API-Key":apiKey}})
        .then(res => res.json())
}

const getCongressMembers = chamber => {
    return fetch(`${baseUrl}/116/${chamber}/members.json`, {headers:{"X-API-Key":apiKey}})
        .then(res => res.json())
}

const getLatestMembers = () => {
    return fetch(`${baseUrl}/members/new.json`, {headers:{"X-API-Key":apiKey}})
        .then(res => res.json())
}

const getLatestBills = () => {
    return fetch(`${baseUrl}/116/both/bills/introduced.json`, {headers:{"X-API-Key":apiKey}})
        .then(res => res.json())
}

const getAllMembers = chamber => {
    return fetch(`${baseUrl}/116/${chamber}/members.json`, {headers:{"X-API-Key":apiKey}})
        .then(res => res.json())
}

const getBill = (id) => {
    return fetch(`${baseUrl}/116/bills/${id}.json`, {headers:{"X-API-Key":apiKey}})
        .then(res => res.json())
}

export default { getStateSenators, getStateReps, getCongressMember, getCongressMembers, getLatestMembers, getLatestBills, getAllMembers, getBill }