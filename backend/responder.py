"""
Incident Response Automation
Automatically responds to detected threats.
"""

from typing import Dict, List
from enum import Enum
from dataclasses import dataclass
from datetime import datetime
from detector import Detection, ThreatLevel


class IncidentStatus(Enum):
    OPEN = "open"
    INVESTIGATING = "investigating"
    RESOLVED = "resolved"
    MITIGATED = "mitigated"


@dataclass
class Incident:
    """Security incident"""
    id: str
    title: str
    severity: str
    status: IncidentStatus
    description: str
    source_ip: str
    created_at: str
    actions_taken: List[str]


class IncidentResponder:
    """Automated incident response"""

    def __init__(self):
        self.incidents: Dict[str, Incident] = {}
        self.incident_counter = 0

    def create_incident(self, detection: Detection) -> Incident:
        """Create incident from detection"""
        self.incident_counter += 1
        incident_id = f"INC-{self.incident_counter:03d}"

        incident = Incident(
            id=incident_id,
            title=detection.rule_name,
            severity=detection.severity.value,
            status=IncidentStatus.OPEN,
            description=detection.description,
            source_ip=detection.source_ip,
            created_at=datetime.now().isoformat(),
            actions_taken=[],
        )

        self.incidents[incident_id] = incident
        return incident

    def auto_respond(self, incident: Incident) -> List[str]:
        """Execute automated response actions"""
        actions = []

        if incident.severity == ThreatLevel.CRITICAL.value:
            actions.append(f"Blocking IP: {incident.source_ip}")
            actions.append("Escalating to security team")
            actions.append("Enabling enhanced logging")

        elif incident.severity == ThreatLevel.HIGH.value:
            actions.append(f"Monitoring IP: {incident.source_ip}")
            actions.append("Sending alert notification")

        else:
            actions.append("Logging incident for analysis")

        incident.actions_taken.extend(actions)
        incident.status = IncidentStatus.INVESTIGATING
        return actions

    def get_incidents(self) -> List[Incident]:
        """Get all incidents"""
        return list(self.incidents.values())

    def resolve_incident(self, incident_id: str):
        """Mark incident as resolved"""
        if incident_id in self.incidents:
            self.incidents[incident_id].status = IncidentStatus.RESOLVED
