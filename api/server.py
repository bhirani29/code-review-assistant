import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from flask import Flask, request, jsonify
from agents.linter_agent import LinterAgent
from agents.optimizer_agent import OptimizerAgent
from agents.report_agent import ReportAgent
from api.github_api import GitHubAPI
import os

app = Flask(__name__)

@app.route("/review", methods=["POST"])
def review_code():
    data = request.json
    repo_url = data.get("repo_url")
    github_token = os.getenv("GITHUB_TOKEN")  # Set in .env

    try:
        # Initialize agents
        github_api = GitHubAPI(github_token)
        linter = LinterAgent()
        optimizer = OptimizerAgent()
        reporter = ReportAgent()

        # Get code from GitHub
        files = github_api.get_repo_files(repo_url)

        # Run linter and optimizer
        linter_results = []
        optimizer_results = []
        for file in files:
            linter_results.extend(linter.run_linter(file["content"], file["name"]))
            optimizer_results.extend(optimizer.suggest_optimizations(file["content"], file["name"]))

        # Generate report
        report = reporter.generate_report(linter_results, optimizer_results)
        return jsonify({"report": report})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)