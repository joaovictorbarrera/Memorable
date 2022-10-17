import probe from 'probe-image-size'
import DefaultResponse from '../../interfaces/DefaultResponse'

const minHeight = 200
const minWidth = 200

export default async function checkPFP(url: string): Promise<DefaultResponse> {
    try {
        const imageProperties: {height: number, width: number, [index: string]: any} = await probe(url)
        if (imageProperties.height < minHeight || imageProperties.width < minWidth ) {
            return {success: false, error: "Image is too small"}
        }
        
        return {success: true, error:null}
    } 
    catch (err) {
        return {success: false, error: "Invalid URL"}
    }
}