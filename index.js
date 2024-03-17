const OpenAI  = require('openai');
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
// Initialize the OpenAI client with your organization ID (if you have one)
const openai = new OpenAI({
  apiKey: "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", // Replace with your actual API key
});


  //create a simple express api that calls the fn above

  const app=express()
app.use(bodyParser.json())
app.use(cors())

  const port=3080

  app.post('/',async (req,res)=>{
    const {message}=req.body;
    console.log(message)
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `${message}` }],
        model: "gpt-3.5-turbo",
      });
          res.json({
        message: completion.choices[0].message.content,
      })
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});