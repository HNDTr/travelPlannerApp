const mongoose = require('mongoose')


const itinerarySchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: 'User'
    },
    title: {
        type: String,
        require:['Please add a title']
    },
    travelDate: {
        type: Date,
        require:['Please add a date']
    },
    returnDate: {
        type: String,
    },
    time:{
        type: String,
        require:['Please add a time']
    },
    description: {
        type: String,
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Itinerary', itinerarySchema)