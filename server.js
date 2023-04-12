const express = require('express');
const bodyParser = require('body-parser')
require("dotenv").config();
const cors = require('cors');

const { Configuration, OpenAIApi } = require("openai");
const { url } = require('inspector');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}); 
const openai = new OpenAIApi(configuration);

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
  origin: '*'
}));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Set up the API route to generate a story
app.post('/continue-story',async (req, res) => {
  /*
  const story = req.body.story;
  const genre = req.body.genre;
  const style = req.body.style;
  const characters = req.body.characters;
  */
  
  prompt = `Rédige moi une suite a l'histoire mais fait moi qui un paragraphe
  T'a réponse devras être formaté avec le model suivant : {"paragraph":””}
  Tu devras générer un paragaphe à la fois mais tu peut en rajouter à l”objet.`;

  promptImage = `Fait moi une image pour suive l'histoire`;

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }
  const result = await generateStory(prompt,promptImage)
  res.status(200).json(result);

  }
);
app.post('/generate-story', async (req, res)  =>  { 
  const story = req.body.story;
  const genre = req.body.genre;
  const style = req.body.style;
  const characters = req.body.characters;

  prompt = `Rédige moi un paragraphe d'une histoire avec information suivante : 
  Sujet : ${story}
  Genre d'histoire : ${genre}
  Personnage : [${characters}]
  Si il s'agit du premier paragraphe il me faut le titre, et si le champ personnage est null il faudras que tu les crées toi même.
  T'a réponse devras être formaté avec le model suivant : {"title":””,"paragraph":””}
  Tu devras générer un paragaphe à la fois mais tu peut en rajouter à l”objet.`;

  promptImage = `Fait moi une image pour un livre de genre ${genre}, avec comme sujet :${story} et comme personnage : [${characters}], avec un style d'image ${style}`;




  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }
  const result = await generateStory(prompt,promptImage)
  res.status(200).json(result);
  
});

async function generateImage(prompt){
  return openai.createImage({
    prompt: prompt,
    n: 1,
    size: "256x256",
  }).then((responseImage)=>{
    return responseImage.data.data[0].url;
  })
}

async function generateStory(prompt, promptImage) {

  try {

    const url_image = await generateImage(promptImage)
    
      return openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 1000, 
      }).then(async (response) => {
        //res.send(response.data.choices[0]);
        const completion = JSON.parse(response.data.choices[0].text.trim());

        const returnBody = await {
          title:completion.title,
          story : [{
            paragraph : completion.paragraph,
            image: url_image,
          }]
        };

        return returnBody;
      })

      
    
  }catch(error){
    if (error.response) {
      //console.error(error.response.status, error.response.data);
      return error.response.data;
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return {
        error: {
          message: 'An error occurred during your request.',
        }
      };
    }
  }
}

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
