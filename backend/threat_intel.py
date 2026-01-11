"""
Threat Intelligence Integration
Enriches IPs, domains, and hashes with threat data.
"""

from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum


class ThreatLevel(Enum):
    BENIGN = "benign"
    SUSPICIOUS = "suspicious"
    MALICIOUS = "malicious"
    CRITICAL = "critical"


@dataclass
class IOCData:
    """Indicator of Compromise enrichment data"""
    ioc: str  # IP, domain, hash
    ioc_type: str  # ip, domain, hash
    threat_level: ThreatLevel
    reputation_score: float  # 0.0-1.0
    source: str  # Feed name
    description: str
    last_seen: str
    associated_malware: List[str]


class ThreatIntelligenceEngine:
    """Enrich indicators with threat data"""

    def __init__(self):
        # Mock threat feed data
        self.threat_database: Dict[str, IOCData] = {
            # Malicious IPs
            "192.168.1.100": IOCData(
                ioc="192.168.1.100",
                ioc_type="ip",
                threat_level=ThreatLevel.CRITICAL,
                reputation_score=0.95,
                source="AbuseIPDB",
                description="Known C2 command and control server",
                last_seen="2024-01-11T12:00:00Z",
                associated_malware=["Emotet", "Trickbot"],
            ),
            "10.0.0.50": IOCData(
                ioc="10.0.0.50",
                ioc_type="ip",
                threat_level=ThreatLevel.MALICIOUS,
                reputation_score=0.85,
                source="Shodan",
                description="Known brute force attacker",
                last_seen="2024-01-11T10:30:00Z",
                associated_malware=["Hydra", "Medusa"],
            ),
            # Malicious domains
            "evil.malware.com": IOCData(
                ioc="evil.malware.com",
                ioc_type="domain",
                threat_level=ThreatLevel.CRITICAL,
                reputation_score=0.98,
                source="VirusTotal",
                description="Malware distribution domain",
                last_seen="2024-01-10T15:00:00Z",
                associated_malware=["Emotet"],
            ),
            # Malware hashes
            "d41d8cd98f00b204e9800998ecf8427e": IOCData(
                ioc="d41d8cd98f00b204e9800998ecf8427e",
                ioc_type="hash",
                threat_level=ThreatLevel.CRITICAL,
                reputation_score=0.99,
                source="AlienVault OTX",
                description="Ransomware executable",
                last_seen="2024-01-09T08:00:00Z",
                associated_malware=["LockBit", "REvil"],
            ),
        }

    def enrich_ip(self, ip: str) -> Optional[IOCData]:
        """Enrich IP with threat data"""
        return self.threat_database.get(ip)

    def enrich_domain(self, domain: str) -> Optional[IOCData]:
        """Enrich domain with threat data"""
        return self.threat_database.get(domain)

    def enrich_hash(self, hash_value: str) -> Optional[IOCData]:
        """Enrich hash with threat data"""
        return self.threat_database.get(hash_value)

    def get_reputation_score(self, ioc: str) -> Optional[float]:
        """Get reputation score for IOC"""
        data = self.threat_database.get(ioc)
        return data.reputation_score if data else None

    def is_malicious(self, ioc: str, threshold: float = 0.5) -> bool:
        """Check if IOC is malicious"""
        score = self.get_reputation_score(ioc)
        return score >= threshold if score else False

    def search_by_threat_level(self, level: ThreatLevel) -> List[IOCData]:
        """Search IOCs by threat level"""
        return [ioc for ioc in self.threat_database.values() if ioc.threat_level == level]

    def add_ioc(self, ioc_data: IOCData):
        """Add custom IOC to database"""
        self.threat_database[ioc_data.ioc] = ioc_data

    def get_all_iocs(self) -> List[IOCData]:
        """Get all IOCs"""
        return list(self.threat_database.values())
