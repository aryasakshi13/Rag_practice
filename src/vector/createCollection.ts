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
            console.log(`Collection "${COLLECTION_NAME}" already exists.`);
            return;
        }

        await qdrant.recreateCollection(COLLECTION_NAME, {
             vectors: {
               size: 3072,
               distance:"Cosine",
             },
        });

        console.log(
          `Collection "${COLLECTION_NAME}" created successfully!`
        );
    } catch (error){
        console.error("Error creating collection:", error);
    }
};

createCOllection();
