import * as tf from '@tensorflow/tfjs-node';
import pkg from 'natural';
const { PorterStemmer } = pkg;

const labels = ['cinta', 'marah', 'netral', 'sedih', 'senang'];
const wordDict = {}; 

function tokenizeWords(words) {
  return words.map(word => wordDict[word] || 0); // 0 jika kata tidak ditemukan
}

async function load(text) {
  const model = await tf.loadLayersModel('file://./model_text/model.json');
  const stopwords = ["is", "the", "a", "an"]; // Tambahkan stopword yang relevan

  let cleanedText = text
    .replace(/[^a-zA-Z]/g, " ")
    .toLowerCase()
    .split(" ")
    .filter(word => word && !stopwords.includes(word))
    .map(word => PorterStemmer.stem(word));

  cleanedText = tokenizeWords(cleanedText);

  const maxLength = 500;
  if (cleanedText.length > maxLength) {
    cleanedText = cleanedText.slice(0, maxLength);
  } else {
    cleanedText = cleanedText.concat(Array(maxLength - cleanedText.length).fill(0));
  }

  
  const inputTensor = tf.tensor2d([cleanedText], [1, maxLength]); // Bentuk tensor [1, 500]

  
  const predictions = model.predict(inputTensor);

  predictions.data().then(data => {
    const maxIndex = data.indexOf(Math.max(...data));
    const predictedLabel = labels[maxIndex];
    console.log(`Prediksi: ${predictedLabel}`);
  });

  predictions.print();
}


load('marah')