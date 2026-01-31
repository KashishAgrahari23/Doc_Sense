# 📄 DocSense — Chat with Your Documents (RAG System)

DocSense is a **Retrieval-Augmented Generation (RAG)** application that allows users to upload PDF or DOCX documents and ask natural-language questions, with answers grounded **strictly in the uploaded document content**.

The system is designed to avoid hallucinations by retrieving relevant document chunks before generating responses using an LLM.

---

## 🚀 Features

* 📂 Upload **PDF / DOCX** documents
* 🧠 Semantic search over document content using embeddings
* 💬 Ask natural-language questions grounded in your documents
* 🔐 Secure authentication with **Clerk**
* 🧩 Modular RAG pipeline built using **LangChain**
* 📦 Vector storage using **Chroma DB**
* 🚫 No hallucinations — answers are document-grounded

---

## 🏗️ Architecture Overview

```
User → Upload Document
     → Document Loader (PDF / DOCX)
     → Text Splitter (RecursiveCharacterTextSplitter)
     → Embeddings Generation
     → Vector Store (Chroma)
     → Query → Relevant Chunks
     → LLM → Answer
```

---

## 🛠️ Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS

### Backend

* Next.js API Routes (Node.js runtime)

### RAG / AI

* LangChain
* Chroma Vector Database (Docker)
* Hugging Face / Groq (LLM & embeddings)
* RecursiveCharacterTextSplitter

### Auth

* Clerk

---

## 📂 Project Structure (Simplified)

```
src/
 ├─ app/
 │   ├─ api/
 │   │   ├─ upload/route.js
 │   │   └─ chat/route.js
 │   └─ page.jsx
 ├─ lib/
 │   ├─ loadDocument.js
 │   ├─ textSplitters.js
 │   ├─ vectorStore.js
 │   ├─ embeddings.js
 │   └─ documentStore.js
 └─ components/
     ├─ UploadFile.jsx
     └─ ChatPanel.jsx
```

---

## ⚙️ How It Works (Step-by-Step)

1. **Document Upload**

   * User uploads a PDF or DOCX
   * File is processed using LangChain document loaders

2. **Text Splitting**

   * Documents are split into overlapping chunks using
     `RecursiveCharacterTextSplitter`
   * Improves retrieval accuracy and context preservation

3. **Embeddings**

   * Each chunk is converted into vector embeddings
   * Enables semantic similarity search (not keyword-based)

4. **Vector Storage**

   * Chunks + embeddings stored in **Chroma DB**

5. **Question Answering**

   * User question is embedded
   * Relevant chunks retrieved from Chroma
   * LLM generates answer using retrieved context only

---

## 🧪 Example API Response

```json
{
  "success": true,
  "answer": "The document reports a 15.2% year-over-year revenue growth.",
  "source": {
    "chunkIndex": 0,
    "preview": "The quarterly business performance analysis for Q3 2024..."
  }
}
```

---

## 🚧 Challenges Faced & Learnings

This project involved **real-world RAG challenges**, not just happy-path code.

### 1️⃣ PDF Parsing Issues

* Popular libraries like `pdf-parse` failed in server environments due to:

  * Worker dependencies
  * DOM APIs not available in Node
* **Solution:** Switched to `pdf2json` for reliable server-side PDF extraction

---

### 2️⃣ LangChain Version & Import Conflicts

* Faced multiple `Module not found` and export errors due to:

  * Rapid LangChain API changes
  * Package split across `@langchain/core`, `community`, `textsplitters`
* **Learning:** Always align LangChain sub-packages with the same major version

---

### 3️⃣ In-Memory Vector Store Limitations

* Initial attempt used memory-based vector stores
* Caused persistence issues and reload problems
* **Solution:** Migrated to **Chroma DB** for reliable, persistent storage

---

### 4️⃣ Chroma Setup & Networking

* Chroma does not expose a UI at `/`
* Initial confusion about whether the DB was running
* **Learning:** Verified Chroma using `/api/v1/heartbeat` and Docker logs

---

### 5️⃣ Embedding Provider Constraints

* Hugging Face inference APIs introduced latency and token limits
* Errors surfaced only after long processing times
* **Learning:** Embeddings are often the slowest part of RAG pipelines

---

### 6️⃣ Debugging Async Pipelines

* Silent failures during upload and vector insertion
* **Solution:** Added explicit backend logging at every pipeline stage
  (upload → load → split → embed → store)

---

## 🔐 Authentication & Security

* Authentication handled via **Clerk**
* Users can only upload and query their own documents
* No document data is shared across users

---

## 🧠 Key Takeaways

* RAG systems are **data pipelines**, not just LLM calls
* Chunking strategy matters as much as the model
* Vector databases introduce real infra concerns
* Debugging AI systems requires strong backend fundamentals

---

## 📌 Future Improvements

* Persistent per-user collections in Chroma
* Streaming chat responses
* Source highlighting in UI
* Caching embeddings for faster uploads
* Multi-document support

---

## 👤 Author

**Kashish Agrahari**

* LinkedIn: [https://www.linkedin.com/in/kashish-agrahari-0149862a8/]
* GitHub: [https://github.com/KashishAgrahari23/Doc_Sense/]