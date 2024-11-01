import * as tf from '@tensorflow/tfjs-node';
import fs from 'fs';

const path = 'img.jpg';
const buf = fs.readFileSync(path);
const input = tf.node.decodeImage(buf, 1)
                 .resizeNearestNeighbor([48, 48])
                 .div(255.0)
                 .expandDims(0);

await load(input);

async function load(img) {
  const model = await tf.loadLayersModel('file://./model/model.json');
  const predictions = model.predict(img);

  const config = {
    "preprocess_image": {
      "color_mode": "grayscale",
      "resize_shape": [48, 48],
      "normalize": true,
      "scaling_factor": 255.0
    },
    "class_labels": [
      "Marah",
      "Senang",
      "Netral",
      "Sedih"
    ]
  };

  const processedPredictions = await predictions.array();
  const scores = processedPredictions[0];

  const maxScoreIndex = scores.indexOf(Math.max(...scores));
  const predictedLabel = config.class_labels[maxScoreIndex];

  console.clear()
  console.log(`Predicted Label: ${predictedLabel}`);
}
