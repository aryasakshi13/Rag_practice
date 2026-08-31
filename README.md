# Bhagavad Gita RAG

A basic Retrieval-Augmented Generation (RAG) application that allows users to ask questions about the Bhagavad Gita using information retrieved directly from a PDF knowledge base.

The project uses Jina AI for text embeddings, Qdrant Cloud as the vector database, and Google Gemini for generating answers from the retrieved context.

This project was built as a hands-on implementation to understand the complete RAG pipeline using TypeScript and Node.js.


## Architecture

```text
                    Bhagavad Gita PDF
                           │
                           ▼
                    Extract PDF Text
                           │
                           ▼
                       Chunking
                           │
                           ▼
                  Jina AI Embeddings
                           │
                           ▼
                     Qdrant Cloud
                           │
                           │
                    User Question
                           │
                           ▼
                  Jina Query Embedding
                           │
                           ▼
                  Qdrant Similarity Search
                           │
                           ▼
                Top Relevant Chunks
                           │
                           ▼
                  Context Construction
                           │
                           ▼
                  Gemini Answer Generation
                           │
                           ▼
                     Final Answer


```

## Feature 

 Extract text from a Bhagavad Gita PDF
 Split the extracted text into smaller chunks
 Generate document embeddings using Jina AI
 Store embeddings and document chunks in Qdrant Cloud
 Generate embeddings for user questions
 Perform semantic similarity search
 Retrieve the most relevant document chunks
 Generate answers using Google Gemini
 Return retrieved chunks as sources
 Test individual components of the RAG pipeline


 ## Tech Stack
 | Technology | Purpose |
|------------|---------|
| **TypeScript** | Main programming language |
| **Node.js** | Runtime environment |
| **pdf-parse** | Extract text from the Bhagavad Gita PDF |
| **Jina AI** | Generate text embeddings |
| **Qdrant Cloud** | Store and search vector embeddings |
| **Google Gemini** | Generate answers from retrieved context |

## Project Structure 

```text
Rag_practice1/
│
├── src/
│   │
│   ├── config/
│   │   ├── qdrant.ts
│   │   └── testQdrant.ts
│   │
│   ├── pdf/
│   │   └── extractText.ts
│   │
│   ├── chunking/
│   │   └── chunkText.ts
│   │
│   ├── vector/
│   │   ├── createCollection.ts
│   │   ├── upsertChunks.ts
│   │   ├── searchVectors.ts
│   │   └── recreateCollection.ts
│   │
│   ├── llm/
│   │   └── generateAnswer.ts
│   │
│   ├── embed.ts
│   ├── index.ts
│   ├── rag.ts
│   ├── testEmbedding.ts
│   ├── testSearch.ts
│   └── testRag.ts
│
├── data/
│   └── bhagavad-gita.pdf
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json

```

## RAG PIPELINE
The application follows a basic Retrieval-Augmented Generation (RAG) pipeline.
The process is divided into two main phases:

1. **Document Ingestion**
2. **Question Answering**

### Phase 1: Document Ingestion

The Document Ingestion phase prepares the Bhagavad Gita PDF so that it can be searched semantically.
```text
        Bhagavad Gita PDF
                ↓
        Text Extraction
                ↓
        Text Chunking
                ↓
        Jina AI Embeddings
                ↓
        Qdrant Cloud

```

### 1. Text Extraction

The Bhagavad Gita PDF is processed to extract its text content.

PDF
 ↓
Extracted Text

The extracted text is then passed to the chunking stage


### 2. Text Chunking

The extracted text is divided into smaller chunks to make it suitable for embedding and retrieval.

Current configuration:

Chunk Size : 500 words
Overlap    : 50 words

The current document produces approximately 307 chunks.

The overlap between chunks helps preserve contextual information between consecutive sections.

### 3. 🧠 Generate Embeddings

Each document chunk is converted into a numerical vector using Jina AI.

Text Chunk
    ↓
Jina AI
    ↓
1024-dimensional Vector

The embedding model used is:

jina-embeddings-v3

For document chunks, the embedding task is:

retrieval.passage

These vectors represent the semantic meaning of the document chunks.

### 4. 🗄️ Store Embeddings in Qdrant

The generated embeddings are stored in Qdrant Cloud.

Document Chunk
      +
Embedding
      +
Metadata
      ↓
Qdrant Cloud

The vectors are stored in the:

document_chunks

collection.

Each vector contains metadata such as:

Document name
Chunk index
Original chunk content

This allows the system to retrieve both the vector and its original text during the search process.


### Phase 2: Question Answering

Once the document has been processed and stored in Qdrant, the system can answer user questions.
```text
        User Question
            ↓
        Query Embedding
            ↓
        Qdrant Similarity Search
            ↓
        Relevant Chunks
            ↓
        Context Construction
            ↓
        Gemini
            ↓
        Final Answer
```
### 5. User Question

The user asks a question related to the Bhagavad Gita.

Example:

What is Dharma according to Bhagavad Gita?

### 6. Query Embedding

The user question is converted into a vector using Jina AI.

For user queries, the embedding task is:

retrieval.query

The resulting query vector has:

1024 dimensions

The query vector is then sent to Qdrant for similarity search.


### 7. Semantic Search

Qdrant compares the query vector with the document vectors stored in the document_chunks collection.

The project uses Cosine Similarity to find semantically similar chunks.

Current retrieval configuration:

Top K = 5

Example:

User Question
      ↓
Query Vector
      ↓
Qdrant Search
      ↓
┌─────────────────────────┐
│ Chunk 1 → Score: 0.630 │
│ Chunk 2 → Score: 0.619 │
│ Chunk 0 → Score: 0.570 │
│ ...                     │
└─────────────────────────┘

The top relevant chunks are selected as the context for answer generation.

### 8. Context Construction

The retrieved chunks are combined to create a context for the language model.
```text
        Retrieved Chunk 1
                +
        Retrieved Chunk 2
                +
        Retrieved Chunk 3
                +
        Retrieved Chunk 4
                +
        Retrieved Chunk 5
                ↓
            Context
```

The original user question is then combined with this retrieved context.

Context
   +
User Question
   ↓
LLM Prompt

### 9.Answer Generation

The retrieved context and user question are passed to Google Gemini.

Retrieved Context
        +
User Question
        ↓
      Gemini
        ↓
   Final Answer

The prompt instructs Gemini to:

Use the provided context to answer the question
Avoid making up information
Stay grounded in the retrieved document
Indicate when the answer cannot be found in the provided context

