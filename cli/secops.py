"""
Security Operations CLI
Command-line interface for security operations automation.
"""

import argparse
import json
import sys
from typing import Optional
from datetime import datetime
import sys
sys.path.insert(0, '../backend')

from log_parser import LogParser, SecurityLog
from detector import ThreatDetectionEngine
from responder import IncidentResponder
from threat_intel import ThreatIntelligenceEngine, ThreatLevel


class SecurityOpseCLI:
    """CLI interface for security operations"""

    def __init__(self):
        self.parser = LogParser()
        self.detector = ThreatDetectionEngine()
        self.responder = IncidentResponder()
        self.threat_intel = ThreatIntelligenceEngine()

    def parse_logs(self, log_file: str) -> None:
        """Parse security logs from file"""
        try:
            with open(log_file, 'r') as f:
                lines = f.readlines()
            
            parsed = self.parser.parse_batch(lines)
            print(f"[+] Parsed {len(parsed)} security logs")
            
            for log in parsed[:5]:  # Show first 5
                print(f"    - {log.timestamp}: {log.action} from {log.source_ip}")
            
            return parsed
        except FileNotFoundError:
            print(f"[-] File not found: {log_file}")
            return []

    def detect_threats(self, logs) -> None:
        """Run threat detection on logs"""
        detections = self.detector.detect(logs)
        
        if not detections:
            print("[*] No threats detected")
            return
        
        print(f"[!] Found {len(detections)} threat(s)")
        for detection in detections:
            print(f"    Rule: {detection.rule_name}")
            print(f"    Severity: {detection.severity.value}")
            print(f"    MITRE Technique: {detection.mitre_technique.value}")
            print(f"    Source IP: {detection.source_ip}")
            print()

    def enrich_ioc(self, ioc: str) -> None:
        """Enrich indicator of compromise"""
        data = self.threat_intel.threat_database.get(ioc)
        
        if not data:
            print(f"[-] No threat data for: {ioc}")
            return
        
        print(f"[+] IOC Enrichment: {ioc}")
        print(f"    Type: {data.ioc_type}")
        print(f"    Threat Level: {data.threat_level.value}")
        print(f"    Reputation Score: {data.reputation_score * 100:.0f}%")
        print(f"    Source: {data.source}")
        print(f"    Description: {data.description}")
        if data.associated_malware:
            print(f"    Associated Malware: {', '.join(data.associated_malware)}")

    def create_incident(self, title: str, severity: str, description: str) -> None:
        """Create manual incident"""
        from detector import Detection, MitreAttackTechnique
        
        # Create mock detection
        mock_detection = Detection(
            rule_id="MANUAL",
            rule_name=title,
            severity=severity,
            mitre_technique=MitreAttackTechnique.LATERAL_MOVEMENT,
            source_ip="0.0.0.0",
            description=description,
            matched_logs=[],
        )
        
        incident = self.responder.create_incident(mock_detection)
        actions = self.responder.auto_respond(incident)
        
        print(f"[+] Incident Created: {incident.id}")
        print(f"    Title: {incident.title}")
        print(f"    Status: {incident.status.value}")
        print(f"    Severity: {incident.severity}")
        print(f"    Actions Taken:")
        for action in actions:
            print(f"      - {action}")

    def list_incidents(self) -> None:
        """List all incidents"""
        incidents = self.responder.get_incidents()
        
        if not incidents:
            print("[*] No incidents")
            return
        
        print(f"[+] {len(incidents)} Incident(s)")
        for incident in incidents:
            print(f"    {incident.id}: {incident.title} ({incident.severity})")

    def list_iocs(self, threat_level: Optional[str] = None) -> None:
        """List threat indicators"""
        iocs = self.threat_intel.get_all_iocs()
        
        if threat_level:
            level = ThreatLevel[threat_level.upper()]
            iocs = [ioc for ioc in iocs if ioc.threat_level == level]
        
        print(f"[+] {len(iocs)} IOC(s)")
        for ioc in iocs:
            print(f"    {ioc.ioc} ({ioc.ioc_type}) - {ioc.threat_level.value}")

    def run(self, args) -> None:
        """Execute CLI command"""
        if args.command == "parse":
            self.parse_logs(args.file)
        
        elif args.command == "detect":
            logs = self.parse_logs(args.file)
            self.detect_threats(logs)
        
        elif args.command == "enrich":
            self.enrich_ioc(args.ioc)
        
        elif args.command == "incident":
            self.create_incident(args.title, args.severity, args.description)
        
        elif args.command == "incidents":
            self.list_incidents()
        
        elif args.command == "iocs":
            self.list_iocs(args.threat_level)
        
        elif args.command == "analyze":
            logs = self.parse_logs(args.file)
            self.detect_threats(logs)
            # Enrich top IOCs
            top_iocs = set(log.source_ip for log in logs[:5])
            for ioc in top_iocs:
                self.enrich_ioc(ioc)


def main():
    cli = SecurityOpseCLI()
    
    parser = argparse.ArgumentParser(
        description="Security Operations CLI - Automated threat detection and response"
    )
    subparsers = parser.add_subparsers(dest="command", help="Commands")
    
    # Parse logs
    parse_cmd = subparsers.add_parser("parse", help="Parse security logs")
    parse_cmd.add_argument("file", help="Log file path")
    
    # Detect threats
    detect_cmd = subparsers.add_parser("detect", help="Detect threats in logs")
    detect_cmd.add_argument("file", help="Log file path")
    
    # Enrich IOC
    enrich_cmd = subparsers.add_parser("enrich", help="Enrich indicator of compromise")
    enrich_cmd.add_argument("ioc", help="IOC to enrich (IP, domain, hash)")
    
    # Create incident
    incident_cmd = subparsers.add_parser("incident", help="Create incident")
    incident_cmd.add_argument("--title", required=True, help="Incident title")
    incident_cmd.add_argument("--severity", required=True, choices=["low", "medium", "high", "critical"])
    incident_cmd.add_argument("--description", required=True, help="Incident description")
    
    # List incidents
    subparsers.add_parser("incidents", help="List all incidents")
    
    # List IOCs
    iocs_cmd = subparsers.add_parser("iocs", help="List threat indicators")
    iocs_cmd.add_argument("--threat-level", help="Filter by threat level")
    
    # Analyze (comprehensive)
    analyze_cmd = subparsers.add_parser("analyze", help="Full analysis pipeline")
    analyze_cmd.add_argument("file", help="Log file path")
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        sys.exit(1)
    
    cli.run(args)


if __name__ == "__main__":
    main()
