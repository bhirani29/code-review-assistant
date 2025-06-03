class OptimizerAgent:
    def suggest_optimizations(self, code, filename):
        suggestions = []
        lines = code.splitlines()
        
        # Example rule: Suggest list comprehension over for loops
        for i, line in enumerate(lines, 1):
            if "for" in line and "append(" in line:
                suggestions.append({
                    "file": filename,
                    "line": i,
                    "suggestion": "Consider using list comprehension for better performance."
                })
        return suggestions