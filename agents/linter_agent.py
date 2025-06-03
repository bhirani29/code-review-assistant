import subprocess
import tempfile
import os

class LinterAgent:
    def __init__(self):
        self.rules = ["E501", "F401"]  # Error Codes

    def run_linter(self, code, filename):
        with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as temp:
            temp.write(code)
            temp_path = temp.name

        try:
            result = subprocess.run(
                ["flake8", "--select", ",".join(self.rules), temp_path],
                capture_output=True, text=True
            )
            issues = result.stdout.splitlines()
            return [{"file": filename, "issue": issue} for issue in issues]
        finally:
            os.unlink(temp_path) # Delete temp file