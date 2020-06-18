const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk") 

nunjucks.configure("views", {
    express:server,
    autoescape: false
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://avatars2.githubusercontent.com/u/63472652?s=400&u=1bdea1bcf5ca1551a2fff9c606bbe16271494cb9&v=4",
        name: "Lucas de Andrade Nogueira",
        role: "Aluno - Rocketseat",
        description: 'Estudante de programação no projeto Launchbase da <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>, focado no desenvolvimento Front-End e essas são minhas aulas preferidas do conteúdo liberado no canal.',
        links: [
            { name: "Github", url: "https://github.com/lucasandrade52", icon_url: "https://www.flaticon.com/br/premium-icon/icons/svg/2504/2504911.svg" },
            { name: "Instagram", url: "https://www.instagram.com/lucasandrade52/", icon_url: "https://image.flaticon.com/icons/svg/2111/2111463.svg" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/lucas-de-andrade-772212a4/", icon_url: "https://www.flaticon.com/br/premium-icon/icons/svg/3015/3015805.svg" },
        ]
    }

    return res.render("about", { about: about })
})

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function(req,res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        if (video.id == id) {
            return true
        }
    })

        if (!video) {
            return res.send("Video not found!")
        }

    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("server is running")
})