import unittest
from agents.linter_agent import LinterAgent

class TestLinterAgent(unittest.TestCase):
    def test_linter(self):
        linter = LinterAgent()
        code = "import os\nunused_variable = 42\n"  # F401: unused variable
        results = linter.run_linter(code, "test.py")
        self.assertTrue(any("F401" in issue["issue"] for issue in results))

if __name__ == "__main__":
    unittest.main()