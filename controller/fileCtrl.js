const {StatusCodes} = require('http-status-codes')
const File = require('../model/file')
const fs = require('fs')
// upload - post
const uploadFile = async (req, res)=>{
    try {
        // to read file data -> req.file
        let data = req.file
        let extFile = await File.findOne({originalname: data.originalname})
        if(extFile)
            return res.status(StatusCodes.CONFLICT).json({msg : "file already exists"})
        let newFile = await File.create(data)

        res.status(StatusCodes.CREATED).json({status: true, msg: "file uploaded", file: newFile})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error})
    }
}

//read all files - get method
const readAllFiles = async (req, res)=>{
    try {
        let data = await File.find({})
        res.status(StatusCodes.ACCEPTED).json({status: true, length:data.length, files:data})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error})
    }
}

//read single file -get(id)
const readSingleFile = async (req, res)=>{
    try {
        let id = req.params.id
        let extFile = await File.findById(id)
        if(!extFile)
            return res.status(StatusCodes.NOT_FOUND).json({status:false, msg:"Requested id not found"})

        res.status(StatusCodes.ACCEPTED).json({status: true, file: extFile})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error})
    }
}

//delete file - get(id) method
const deleteFile = async (req, res)=>{
    try {
        let id = req.params.id
        let extFile = await File.findById(id)
        if(!extFile)
            return res.status(StatusCodes.NOT_FOUND).json({status:false, msg:"Requested id not found"})

        await fs.unlinkSync(extFile.path)  //delete from location  
        await File.findByIdAndDelete(id)    
        res.status(StatusCodes.ACCEPTED).json({status:true, msg:"File deleted successfully"})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error})
    }
}

module.exports = {uploadFile, readAllFiles, readSingleFile, deleteFile}