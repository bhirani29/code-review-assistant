class ReportAgent:
    def generate_report(self, linter_results, optimizer_results):
        report = ["# Code Review Report\n"]
        
        report.append("## Linter Issues\n")
        if linter_results:
            for issue in linter_results:
                report.append(f"- {issue['file']}: {issue['issue']}")
        else:
            report.append("- No linter issues found.")

        report.append("\n## Optimization Suggestions\n")
        if optimizer_results:
            for suggestion in optimizer_results:
                report.append(f"- {suggestion['file']} (Line {suggestion['line']}): {suggestion['suggestion']}")
        else:
            report.append("- No optimization suggestions.")

        return "\n".join(report)