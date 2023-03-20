const { response } = require('express');
const express = require('express');
const router = express.Router();
const contactModel = require('../model/contact-db');

router
    .post('/create', (req, res) => {
        new contactModel(req.body)
            .save()
            .then(response => {
                res.status(200).json({
                    status: true,
                    message: "data created successfully",
                    data: response
                })
            })
            .catch(err => {
                console.log(err);
                if (err.code === 11000) {
                    res.status(500).json({
                        status: false,
                        error: "Email already in used"
                    })
                } else {
                    res.status(500).json({
                        status: false,
                        error: err.message
                    })
                }
            })
    })

.get('/get', (req, res) => {
    contactModel.find()
        .then(response => {
            res.status(200).json({
                status: true,
                data: response
            })
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                error: err.message
            })
        })
})

.get('/search', (req, res) => {
        contactModel.find({
                $or: [
                    { name: RegExp(req.query.search, 'i') },
                    { email: RegExp(req.query.search, 'i') }
                ]
            })
            .then(response => {
                res.status(200).json({
                    status: true,
                    data: response
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: false,
                    error: err.message
                })
            })
    })
    .put('/update', (req, res) => {
        contactModel.findByIdAndUpdate({ _id: req.query.id }, {
                $set: req.body
            }, { new: true })
            .then(response => {
                if (response) {
                    res.status(202).json({
                        status: true,
                        message: "contact Updated"
                    })
                } else {
                    res.status(200).json({
                        status: false,
                        message: "contact not updated"
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    status: false,
                    error: err.message
                })
            })
    })
    .delete('/delete', (req, res) => {
        contactModel.findByIdAndDelete({ _id: req.query.id })
            .then(response => {
                res.status(200).json({
                    status: true,
                    message: "contact deleted successfully"
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: false,
                    error: err.message
                })
            })
    })

module.exports = router;