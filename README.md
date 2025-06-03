# Automated Code Review Assistant
The Automated Code Review Assistant is a multi-agent system designed to streamline code reviews for Python projects. It integrates with the GitHub API to fetch repository files, performs linting with Flake8, suggests optimizations, and generates a summary report. Built with Flask, it exposes an API endpoint for easy integration into development workflows.

## Features
Linter Agent: Uses Flake8 to detect syntax errors and style violations (e.g., unused imports, long lines).
Optimizer Agent: Suggests code improvements, such as replacing loops with list comprehensions.
Report Agent: Compiles results into a concise Markdown report.
GitHub Integration: Fetches .py files from public or private repositories using the GitHub API.
Extensible: Easily add custom linting rules or optimization heuristics.

## Prerequisites
Python 3.8 or higher
Git
A GitHub Personal Access Token (PAT) with repo scope
VS Code (recommended) or another IDE
curl or Postman for API testing

## Setup Instructions
### Clone the Repository:
git clone https://github.com/bhirani29/code-review-assistant.git
cd code-review-assistant

### Create a Virtual Environment:
python -m venv venv

#### Activate it:
Windows: .\venv\Scripts\activate
macOS/Linux: source venv/bin/activate

### Install Dependencies:
pip install -r requirements.txt

### Set Up GitHub Token:
Create a .env file in the project root:
echo GITHUB_TOKEN=your_token_here > .env

Generate a PAT at github.com/settings/tokens with repo scope.
Note: Do not commit .env (it’s ignored by .gitignore).

### Run the Flask Server:
python api/server.py
The server will run at http://localhost:5000.

## Usage
API Endpoint: Send a POST request to /review with a JSON payload containing the GitHub repository URL.
Example Request:
Invoke-WebRequest -Uri http://localhost:5000/review -Method POST -Headers @{ "Content-Type"="application/json" } -Body '{"repo_url":"https://github.com/bhirani29/supply_chain_resilience"}'

Example Request (curl):
curl -X POST -H "Content-Type: application/json" -d '{"repo_url":"https://github.com/bhirani29/supply_chain_resilience"}' http://localhost:5000/review
Response: A JSON object with a report field containing a Markdown-formatted code review summary.

## Project Structure
code-review-assistant/
├── agents/                 # Agent modules for linting, optimization, and reporting
│   ├── linter_agent.py
│   ├── optimizer_agent.py
│   ├── report_agent.py
├── api/                    # Flask API and GitHub integration
│   ├── github_api.py
│   ├── server.py
├── tests/                  # Unit tests
│   ├── test_linter.py
├── .env                   # GitHub token (not committed)
├── .gitignore             # Ignores venv, .env, etc.
├── requirements.txt        # Python dependencies
├── README.md              # Project documentation

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Future Improvements
Add support for custom Flake8 plugins.
Enhance optimizer with advanced heuristics (e.g., detecting redundant computations).
Deploy to Google Cloud Run with a Dockerfile.
Add GitHub Actions for CI/CD.

Built with ❤️ by bhirani29