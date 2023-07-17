const progressColors = require('./resources/progressColors.json');

export default function calculeProgressColorBiggerThen(progressPercentage) {
  try {
    console.log('calculeProgressColorBiggerThen | progressPercentage: ', progressPercentage);
    if (progressPercentage < 25) {
      return progressColors[0];
    }
    if (progressPercentage >= 25 && progressPercentage < 50) {
      return progressColors[1];
    }
    if (progressPercentage >= 50 && progressPercentage < 75) {
      return progressColors[2];
    }
    if (progressPercentage >= 75 && progressPercentage < 100) {
      return progressColors[3];
    }
    if (progressPercentage >= 100) {
      return progressColors[4];
    }

    return progressColors[0];
  } catch (error) {
    console.log('calculeProgressColorBiggerThen | error: ', error);
    return progressColors[0];
  }
}
