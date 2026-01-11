"""
Log Parser Module
Parses security logs from various sources and normalizes them into a common format.
"""

import json
import re
from datetime import datetime
from typing import Dict, List, Optional
from dataclasses import dataclass, asdict


@dataclass
class SecurityLog:
    """Normalized security log format"""
    timestamp: str
    source_ip: str
    destination_ip: str
    username: Optional[str]
    action: str
    resource: str
    result: str  # success, failed, error
    log_type: str  # auth, network, system
    severity: str  # low, medium, high, critical
    raw_log: str


class LogParser:
    """Parse and normalize security logs"""

    def __init__(self):
        self.parsed_logs: List[SecurityLog] = []

    def parse_auth_log(self, log_line: str) -> Optional[SecurityLog]:
        """Parse authentication logs"""
        # Example: Jan 11 14:23:45 server sshd[1234]: Failed password for invalid user admin from 192.168.1.100 port 22 ssh2
        auth_pattern = r"(\w+ \d+ [\d:]+).*sshd\[(\d+)\]:\s*(.*?)\s+(?:for|from)\s+(\S+).*from\s+([\d.]+)"

        match = re.search(auth_pattern, log_line)
        if match:
            timestamp, pid, action, user, source_ip = match.groups()
            result = "failed" if "failed" in action.lower() else "success"

            return SecurityLog(
                timestamp=timestamp,
                source_ip=source_ip,
                destination_ip="internal",
                username=user if user != "invalid" else None,
                action=action,
                resource="ssh",
                result=result,
                log_type="auth",
                severity="high" if result == "failed" else "low",
                raw_log=log_line,
            )
        return None

    def parse_network_log(self, log_line: str) -> Optional[SecurityLog]:
        """Parse network logs"""
        # Example: 2024-01-11T14:23:45Z BLOCK TCP 192.168.1.50:12345 -> 10.0.0.5:443
        net_pattern = r"(\d+-\d+-\d+T[\d:]+Z)\s+(\w+)\s+(\w+)\s+([\d.]+):\d+\s+->\s+([\d.]+):(\d+)"

        match = re.search(net_pattern, log_line)
        if match:
            timestamp, action, protocol, src_ip, dst_ip, port = match.groups()
            result = "blocked" if action == "BLOCK" else "allowed"

            return SecurityLog(
                timestamp=timestamp,
                source_ip=src_ip,
                destination_ip=dst_ip,
                username=None,
                action=f"{protocol} to port {port}",
                resource=f"port-{port}",
                result=result,
                log_type="network",
                severity="high" if action == "BLOCK" else "low",
                raw_log=log_line,
            )
        return None

    def parse(self, log_line: str) -> Optional[SecurityLog]:
        """Parse any security log"""
        parsed = self.parse_auth_log(log_line)
        if parsed:
            self.parsed_logs.append(parsed)
            return parsed

        parsed = self.parse_network_log(log_line)
        if parsed:
            self.parsed_logs.append(parsed)
            return parsed

        return None

    def parse_batch(self, log_lines: List[str]) -> List[SecurityLog]:
        """Parse multiple logs"""
        results = []
        for line in log_lines:
            parsed = self.parse(line)
            if parsed:
                results.append(parsed)
        return results

    def to_json(self, log: SecurityLog) -> str:
        """Convert log to JSON"""
        return json.dumps(asdict(log))
