import requests
import os

class GitHubAPI:
    def __init__(self, token):
        self.token = token
        self.headers = {"Authorization": f"token {token}"}

    def get_repo_files(self, repo_url):
        parts = repo_url.rstrip("/").split("/")
        owner, repo = parts[-2], parts[-1]
        api_url = f"https://api.github.com/repos/{owner}/{repo}/contents"
        
        response = requests.get(api_url, headers=self.headers)
        if response.status_code != 200:
            raise Exception(f"Failed to fetch repo: {response.json().get('message')}")
        
        files = []
        for item in response.json():
            if item["type"] == "file" and item["name"].endswith(".py"):
                file_response = requests.get(item["download_url"])
                files.append({"name": item["name"], "content": file_response.text})
        return files