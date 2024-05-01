
import mongoose from "mongoose";



const documentSchema = new mongoose.Schema({
    documentName: {
        type: String,
        required: [true, "Please enter a document name"]

    }}
);

const DocumnetList = mongoose.model('Document', documentSchema);

module.exports = DocumnetList;
