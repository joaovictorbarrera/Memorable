const probe = require('probe-image-size');

const minHeight = 200
const minWidth = 200

module.exports = {
    async checkPFP(url) {
        try {
            const imageProperties = await probe(url)
            if (imageProperties.height < minHeight || imageProperties.width < minWidth ) {
                return {success: false, error: "Image is too small"}
            }
            
            return {success: true}
        } 
        catch (err) {
            return {success: false, error: "Invalid URL"}
        }
    }
}