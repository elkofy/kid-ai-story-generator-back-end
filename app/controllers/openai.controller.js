require("dotenv").config();
const db = require("../models");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const User = db.user;
const Story = db.story;
const Chapter = db.chapter;

const modelEngine = 'text-davinci-003'; // or any other model you prefer

var genre;
var style;
// generate story with text en picture
exports.newStory = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const story = req.body.story;
  genre = req.body.genre;
  style = req.body.style;
  const characters = req.body.characters;

  promptText = `Rédige une histoire courte avec information suivante : 
  Sujet : ${story}
  Genre d'histoire : ${genre}
  Personnage : [${characters}]
  Il faut un titre, si le champ personnage est vide il faudras que tu les crées toi même.
  T'a réponse devras être formaté en JSON avec le model suivant : {"title":"","paragraph":""}
  Quoi qu'il arrive j'ai besoin que tu referme l'object json et que tu finise avec un point.`;

  promptImage = `Fait moi une image pour un livre de genre ${genre}, avec comme sujet :${story} et comme personnage : [${characters}], avec un style d'image ${style}`;

  try {
    const textJson = await generateParagraph(promptText)
    const url_image = await generateImage(textJson.title)

/*    const textJson = {
      title: "555",
      paragraph: "555"
    };
    const url_image = "MOCK url_image";*/

    if(!textJson.paragraph.endsWith(".")){
      textJson.paragraph+=".";
    }

    const returnBody = await {
      title: textJson.title,
      story: [{
        paragraph: textJson.paragraph + ".",
        image: url_image,
      }]
    };
    //save chapter in BDD
    saveStoryForUser(req.userId, returnBody).then((storyId) => {
      returnBody.storyId = storyId;
      res.status(200).json(returnBody);
    })
    //return data to frontend


  } catch (error) {
    if (error.response) {
      //console.error(error.response.status, error.response.data);
      return error.response.data;
    } else {
      console.error(`Error with OpenAI API request: ${error}`);
      return {
        error: {
          message: 'An error occurred during your request.',
        }
      };
    }
  }

};

// generate story with text en picture
exports.continueStory = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  console.log("adding paragraphe")
  const story = req.body.story[req.body.story.length-1].paragraph;

  prompt = `Rédige un paragraphe ${genre} court en relation avec l'histoire suivante `;


  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  try {
    console.log(req.body)
    console.log("Start generation paragraphe")

    const textJson = await singleParagraph(prompt,story,2)
    promptImage = `Fait moi une image style ${style},${genre} sujet :${textJson.paragraph}`;
    console.log("Start generation image")
    const url_image = await generateImage(promptImage)

    /*const textJson = {
      title: "MOCK title",
      paragraph: "MOCK paragraph"
    };
    const url_image = "MOCK url_image";
    */
    if(!textJson.paragraph.endsWith(".")){
      textJson.paragraph+=".";
    }

    const returnBody = await {
      story: [{
        paragraph: textJson.paragraph,
        image: url_image,
      }]
    };
    //const result = await generateStory(prompt,promptImage)
    res.status(200).json(returnBody);
    saveChapter(req.body.storyId, returnBody)

  } catch (error) {
    if (error.response) {
      //console.error(error.response.status, error.response.data);
      return error.response.data;
    } else {
      console.error(`${error.message}`);
      return {
        error: {
          message: 'An error occurred during your request.',
        }
      };
    }
  }

  //continue a story
};

// generate story with text en picture
exports.remakeLastParagraph = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  console.log("redo paragraphe")
  const story = req.body.story[req.body.story.length-1].paragraph;

  prompt = `Je n'ai pas, fait moi un meilleur paragraphe pour le style ${genre} remplace celui la `;


  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  try {
    console.log(req.body)
    console.log("Start generation paragraphe")

    const textJson = await singleParagraph(prompt,story,2)
    promptImage = `Fait moi une image style ${style}, ${genre} sujet :${textJson.paragraph}`;
    console.log("Start generation image")
    const url_image = await generateImage(promptImage)
    /*
    const textJson = {
      paragraph: "MOCK new2 paragraph"
    };
    const url_image = "MOCK url_image";
    */
    if(!textJson.paragraph.endsWith(".")){
      textJson.paragraph+=".";
    }

    const returnBody = await {
      story: [{
        paragraph: textJson.paragraph,
        image: url_image,
      }]
    };
    //const result = await generateStory(prompt,promptImage)
    deleteChapter(req.body.storyId)
    saveChapter(req.body.storyId, returnBody)
    res.status(200).json(returnBody);

  } catch (error) {
    if (error.response) {
      //console.error(error.response.status, error.response.data);
      return error.response.data;
    } else {
      console.error(`${error.message}`);
      return {
        error: {
          message: 'An error occurred during your request.',
        }
      };
    }
  }
  //remake the last paragraph
};

async function generateImage(prompt) {
  return openai.createImage({
    prompt: prompt,
    n: 1,
    size: "256x256",
  }).then((responseImage) => {
    return responseImage.data.data[0].url;
  })
}

async function generateParagraph(promptText) {
  return openai.createCompletion({
    model: modelEngine,
    prompt: promptText,
    max_tokens: 200,
    n: 1,
    stop: null,
    temperature: 0.7,
  }).then(async (response) => {
    var text = response.data.choices[0].text.trim()
    console.log(text)
    if (!text.endsWith("}"))
      text += "\"}"

    return (JSON.parse(text));
  });
}

async function singleParagraph(promptText, context) {
  const updatedContext = `${promptText} : ${context}`;
  //console.log("continue prompt : "+updatedContext)
  return openai.createCompletion({
    model: modelEngine,
    prompt: updatedContext,
    max_tokens: 200,
    n: 1,
    stop: null,
    temperature: 0.7,
  }).then(async (response) => {
    var text = `{"paragraph":"${response.data.choices[0].text.trim()}"}`
    console.log(text)
    if (!text.endsWith("}")) {
      console.log("ici")
      text += '"}'
      console.log(text)
    }

    return (JSON.parse(text));
  });
}

async function saveStoryForUser(currentUserId, data) {
  return User.findOne({
    where: {
      userId: currentUserId
    }
  }).then((user) => {
    return user.createStory({
      title: data.title,
    }).then((story) => {
      console.log("Create Story succeeded");
      story.createChapter({
        paragraph: data.story[0].paragraph,
        image: data.story[0].image,
      })
      console.log("Create Chapter succeeded");
      return story.storyId
    });
  })
}

async function saveChapter(currentStoryId, data) {
  Story.findOne({
    where: {
      storyId: currentStoryId
    }
  }).then((story) => {
    story.createChapter({
      paragraph: data.story[0].paragraph,
      image: data.story[0].image,
    })
    console.log("save chapter succeeded")
  })
}

async function deleteChapter(currentStoryId) {
  Chapter.findOne({
    where: { storyId: currentStoryId },
    order: [['createdAt', 'DESC']],
  }).then((chapter) => {
    chapter.destroy();
  })
}

