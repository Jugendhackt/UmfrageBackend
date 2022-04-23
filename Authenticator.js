const express = require("express")
const router = express.Router()

router.all("/admin*", (req, res, next) => {
    if (req.cookies.loggedIn) {
        next()
    } else {
        if (req.path !== "/adminlogin")
            res.redirect("/adminlogin")
        else
            next()
    }
})

module.exports = router;