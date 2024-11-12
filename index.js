import express from "express"
import { predictPattern } from "./service.js"
import fs from "fs"

// const main = async() => {
//     try {
//         const image = fs.readFile('./img.jpg', (err, result) => {
//             return result
//         })
//         const options = {
//             color_mode: "grayscale",
//             resize_shape: [48, 48],
//             normalize: true,
//             scaling_factor: 200
//         }
//         const result = predictPattern(image, options)
//         res.status(200).json(result)
//     } catch(err) {
//         console.error(err)
//     }
// }
const main = async() => {
    try {
        const result = predictPattern(image)
        res.status(200).json(result)
    } catch(err) {
        console.error(err)
    }
}

main()