const cors = require('cors')
const express = require('express')
const emailService = require('./services/emailService.js')
const app = express()
require('dotenv/config');
const port = process.env.PORT;
app.use(express.json());
app.use(cors())

app.post('/', emailService.sendEmail)

app.get('/', (req,res)=> {
    res.json({status: 'SUCCESS', message: 'API-CONTACT-US'})
})

app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}!`)
});