"""
Threat Detection Engine
Detects security threats using pattern matching and Sigma-style rules.
"""

from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum
from log_parser import SecurityLog


class ThreatLevel(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class MitreAttackTechnique(Enum):
    """MITRE ATT&CK Framework Techniques"""
    BRUTE_FORCE = "T1110"
    PRIVILEGE_ESCALATION = "T1548"
    DATA_EXFILTRATION = "T1567"
    CREDENTIAL_DUMPING = "T1003"
    LATERAL_MOVEMENT = "T1570"


@dataclass
class Detection:
    """Detected threat"""
    rule_id: str
    rule_name: str
    severity: ThreatLevel
    mitre_technique: MitreAttackTechnique
    source_ip: str
    description: str
    matched_logs: List[SecurityLog]


class DetectionRule:
    """Sigma-style detection rule"""

    def __init__(
        self,
        rule_id: str,
        name: str,
        severity: ThreatLevel,
        mitre_technique: MitreAttackTechnique,
        condition: callable,
    ):
        self.rule_id = rule_id
        self.name = name
        self.severity = severity
        self.mitre_technique = mitre_technique
        self.condition = condition

    def matches(self, logs: List[SecurityLog]) -> Optional[Detection]:
        """Check if logs match this rule"""
        if self.condition(logs):
            return Detection(
                rule_id=self.rule_id,
                rule_name=self.name,
                severity=self.severity,
                mitre_technique=self.mitre_technique,
                source_ip=logs[0].source_ip if logs else "unknown",
                description=f"Detected by rule: {self.name}",
                matched_logs=logs,
            )
        return None


class ThreatDetectionEngine:
    """Detect threats in logs"""

    def __init__(self):
        self.rules: List[DetectionRule] = []
        self._load_default_rules()

    def _load_default_rules(self):
        """Load default detection rules"""

        # Brute Force Detection
        def brute_force_condition(logs: List[SecurityLog]) -> bool:
            """Detect multiple failed login attempts from same IP"""
            if not logs:
                return False
            failed_attempts = [l for l in logs if l.result == "failed" and l.log_type == "auth"]
            return len(failed_attempts) >= 5

        self.rules.append(
            DetectionRule(
                rule_id="RULE-001",
                name="Brute Force Attack",
                severity=ThreatLevel.HIGH,
                mitre_technique=MitreAttackTechnique.BRUTE_FORCE,
                condition=brute_force_condition,
            )
        )

        # Suspicious Port Access
        def suspicious_port_condition(logs: List[SecurityLog]) -> bool:
            """Detect access to suspicious ports"""
            suspicious_ports = ["23", "135", "139", "445"]
            return any(
                port in log.resource for log in logs for port in suspicious_ports
            )

        self.rules.append(
            DetectionRule(
                rule_id="RULE-002",
                name="Suspicious Port Access",
                severity=ThreatLevel.MEDIUM,
                mitre_technique=MitreAttackTechnique.LATERAL_MOVEMENT,
                condition=suspicious_port_condition,
            )
        )

    def detect(self, logs: List[SecurityLog]) -> List[Detection]:
        """Detect threats in logs"""
        detections = []
        for rule in self.rules:
            detection = rule.matches(logs)
            if detection:
                detections.append(detection)
        return detections

    def add_rule(self, rule: DetectionRule):
        """Add custom detection rule"""
        self.rules.append(rule)
