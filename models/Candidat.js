const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    identite: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    },
    lieu:{
        type: String,
        required: true
    },
    national:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    adresse:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    region:{
        type: String,
        required: true
    },
    etablissement1: {
        type: String,
        required: true
    },
    annee1: {
        type: Date,
        required: true
    },
    etablissement2: {
        type: String,
        required: true
    },
    annee2: {
        type: Date,
        required: true
    },
    etablissement3: {
        type: String,
        required: true
    },
    annee3: {
        type: Date,
        required: true
    },
    etablissement4: {
        type: String,
        required: true
    },
    annee4: {
        type: Date,
        required: true
    },
    etablissement5: {
        type: String,
        required: true
    },
    annee5: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Candidat', userSchema);