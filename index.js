const OpenAI  = require('openai');
const express=require('express')
const bodyParser=require('body-parser')
require('dotenv').config();
const cors=require('cors')
// Initialize the OpenAI client with your organization ID (if you have one)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

  //create a simple express api that calls the fn above

  const app=express()
app.use(bodyParser.json())
app.use(cors())

  const port=3080

  app.post('/',async (req,res)=>{
    const {message,currentModel}=req.body;
    console.log(message,"message")
    console.log(currentModel,"currenModel")
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `${message}` }],
        model: `${currentModel}`
      });
          res.json({
        message: completion.choices[0].message.content,
      })
  });
  app.get('/models',async (req,res)=>{
    const response=await openai.models.list();
    console.log(response.data)
    res.json({
      models: response.data
    })
    
  });
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});