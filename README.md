# SponsorForce Chatbot

The **SponsorForce Chatbot** is an intelligent conversational AI designed to provide detailed, actionable insights into sponsorship strategies, marketing, and business development. Built with cutting-edge AI technologies, this chatbot leverages natural language processing (NLP) and semantic search to deliver accurate, data-driven responses tailored to user queries. Whether you're looking for live sports scores, upcoming fixtures, or in-depth information about SponsorForce's services, this chatbot has you covered.

## Features

### 1. Real-Time Sports Data
- **Live Scores:** Fetch real-time soccer scores from The Sports DB API.
- **Upcoming Fixtures:** Retrieve upcoming matches for any team using The Sports DB API.

### 2. Semantic Search
- **Database Integration:** Query a vector database (Astra DB) for detailed, context-aware responses.
- **Web Search:** Perform web searches using SerpAPI to provide up-to-date information.

### 3. AI-Powered Workflow
- **Multi-Agent System:** Uses a workflow of specialized agents (ResearchAgent, WriteAgent, ReviewAgent) to handle complex queries.
- **Contextual Responses:** Generates detailed, structured responses with examples, case studies, and actionable recommendations.

### 4. Customizable Prompts
- **Role and Mission Prompt:** A centralized prompt ensures consistent, high-quality responses aligned with SponsorForce's mission.
- **Dynamic Query Handling:** Tailors responses based on user queries, including temporal expressions and specific requests.

### 5. FastAPI Backend
- **RESTful API:** Exposes endpoints for query handling and integration with frontend applications.
- **CORS Support:** Allows seamless integration with web and mobile applications.

## Technologies Used

### Backend
- **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python.
- **LlamaIndex:** For semantic search and workflow management.
- **Astra DB:** A serverless vector database for storing and querying embeddings.
- **OpenAI GPT-3.5:** Powers the conversational AI for generating detailed responses.

### APIs
- **The Sports DB API:** Provides live scores and fixture data.
- **SerpAPI:** Enables web search functionality.

### Frontend (Optional)
- **React:** A JavaScript library for building user interfaces (can be integrated with the FastAPI backend).


## Getting Started


### Prerequisites
- **Python 3.8+:** Ensure Python is installed on your system.
- **API Keys:**
  - OpenAI API Key
  - SerpAPI Key
  - The Sports DB API Key
  - Astra DB: Set up a vector store in Astra DB and obtain your API endpoint and token.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sponsorforce-chatbot.git
   cd sponsorforce-chatbot


2. **Install dependencies:**

pip install -r requirements.txt


3. **Set up environment variables:**

OPENAI_API_KEY=your_openai_api_key
SERPAPI_KEY=your_serpapi_key
ASTRA_DB_TOKEN=your_astra_db_token
ASTRA_DB_API_ENDPOINT=your_astra_db_api_endpoint
SPORTS_DB_API_KEY=your_sports_db_api_key


### Running the Application
Start the FastAPI server with:

uvicorn app:app --reload


### Testing the Chatbot
Use the /query endpoint to send user queries. For example:

curl -X POST "http://127.0.0.1:8000/query" -H "Content-Type: application/json" -d '{"query": "Can you tell me about SponsorForce?"}'


**Example response:**

{
  "response": "SponsorForce is a leading company specializing in sponsorship strategies, marketing, and business development..."
}








