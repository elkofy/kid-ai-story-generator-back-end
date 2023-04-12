//const db = require("../models");
//const Tutorial = db.tutorials;
//const Op = db.Sequelize.Op;
const axios = require("axios");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}); 
const openai = new OpenAIApi(configuration);
const cors = require('cors');


// generate story with text en picture
exports.newStory = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

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


};

// generate story with text en picture
exports.continueStory = async (req, res) => {
  /*if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }*/
  const story = req.body.story;

  prompt = `Rédige la suite de l'histoire avec les même personnages
  T'a réponse devras être formaté avec le model suivant : {"paragraph":””}
  Tu devras générer un paragaphe à la fois.`;

  promptImage = `Fait moi une image pour : ${story}`;

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
  //continue a story
};

// generate story with text en picture
exports.remakeLastParagraph = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  //remake the last paragraph
};

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

    return openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt}],
      max_tokens: 200,  
      temperature: 0.7,
      stop: ["#end#"],
    }).then(async (response) => {
    /*return openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1000, 
    }).then(async (response) => {*/
      //res.send(response.data.choices[0]);
      console.log(response.data.choices[0].message.content);
      const completion = JSON.parse(response.data.choices[0].message.content.trim());
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

