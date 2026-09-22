import "dotenv/config";
import qdrant from "./quadrant.js";

const testQdrant = async () => {
  try {
    const response = await qdrant.getCollections();

    console.log("Qdrant connected successfully!");
    console.log(response);
  } catch (error) {
    console.error("Qdrant connection failed:");
    console.error(error);
  }
};

testQdrant();