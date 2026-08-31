import "dotenv" ; 
import qdrant from "../config/quadrant.js";

const COLLECTION_NAME = "document_chunks";

const createCOllection = async ()=> {
    try{
        const collections = await qdrant.getCollections();

        const exists = collections.collections.some(
            (collection) => collection.name === COLLECTION_NAME
        );

        if(exists){
            console.log("Deleting old collection...");

            await qdrant.deleteCollection(COLLECTION_NAME);

            console.log("Old collection deleted."); 
        }

         console.log("Creating new collection...");

        await qdrant.recreateCollection(COLLECTION_NAME, {
             vectors: {
               size: 1024,
               distance:"Cosine",
             },
        });

        console.log(
          `Collection "${COLLECTION_NAME}" created  with 1024 dimension successfully!`
        );
    } catch (error){
        console.error("Error creating collection:", error);
    }
};

createCOllection();
