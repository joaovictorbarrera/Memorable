export default function logger(req:any, res:any, next:any) {
    console.log(`\x1b[42m${req.method} on ${req.originalUrl}\x1b[0m`)
    next()
}