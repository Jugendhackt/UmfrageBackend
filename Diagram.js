const express = require("express")
const router = express.Router()

router.get("/diagram", (req, res) => {
    let diagram = `
    <svg>
        <line x1="10" y1="" />
    </svg>
    `
})