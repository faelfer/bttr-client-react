import progressColors from "../resources/colors_progress.json";

export default function colorFromPercentage(
  progressPercentage: number,
): string {
  // console.log('colorFromPercentage | progressPercentage: ', progressPercentage);
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
}
