const express = require('express')
const { route } = require('.')
const router = express.Router()
const Author = require('../models/author')

//all authors route
router.get('/', async (req, res) => {
    //search option
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i') //'i' means case insensitive
    }
    //render display
    try {
        const authors = await Author.find(searchOptions) //put conditions in place of {}
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//new author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

//creating new authors route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save() //wait for mongoose to save data then assign to var
        //res.redirect(`authors/${newAuthor.id`)
        res.redirect('authors')
    } catch {
        let locals = {errorMessage: 'Error creating Author'}
        res.render('authors/new', {
            author: author,
            errorMessage: locals.errorMessage
        })
    }
})

module.exports = router

