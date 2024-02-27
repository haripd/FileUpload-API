const {StatusCodes} = require('http-status-codes')
// upload - post
const uploadFile = async (req, res)=>{
    try {
        res.status(StatusCodes.CREATED).json({msg:'Upload file'})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error})
    }
}

//read all files - get method
const readAllFiles = async (req, res)=>{
    try {
        res.status(StatusCodes.ACCEPTED).json({msg:'read all file'})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error})
    }
}

//read single file -get(id)
const readSingleFile = async (req, res)=>{
    try {
        res.status(StatusCodes.ACCEPTED).json({msg:'read single file'})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error})
    }
}

//delete file - get(id) method
const deleteFile = async (req, res)=>{
    try {
        res.status(StatusCodes.ACCEPTED).json({msg:'delete file'})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error})
    }
}

module.exports = {uploadFile, readAllFiles, readSingleFile, deleteFile}