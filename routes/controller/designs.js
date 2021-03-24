const cloudinary = require('cloudinary');
const Design = require('../../models/Design');
const { uploadMultipleDesigns } = require('../../config/multer');
require('../../config/cloudinary');

module.exports = {
    getAllDesigns: async (req,res) => {
        const designs = await Design.find({});
        res.status(200).json(designs);
    },
    AddDesign: (req, res) => {
        try {
            uploadMultipleDesigns(req,res, async (err) => {
                if(err) {
                    return res.status(400).json({ err });
                }

                const { name, tags, price } = req.body;
                console.log('files', req.files);

                if(req.files.length == 0) return res.status(400).json({ err: 'Files attached are not of valid type' });

                // req.files => [ file ];
                let promises = req.files.map((file) => {
                    return cloudinary.v2.uploader.upload(file.path, { resource_type: "auto", use_filename: true })
                })  

                const assets = (await Promise.all(promises)).map(asset => asset.secure_url);

                console.log('assets', assets);
                
                const design = new Design({
                    name: name,
                    tags,
                    price,
                    designer: req.user._id,
                    assets
                });

                await design.save();
                res.status(200).json({ design: design }); 
            })     
        } catch (err) {
            res.status(500).json({ err: err });
        }
    }
}