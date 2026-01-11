# Security Operations CLI

Command-line interface for security operations automation and threat analysis.

## Installation

\`\`\`bash
# Install Python dependencies
pip install -r ../requirements.txt
\`\`\`

## Usage

### Parse Logs
\`\`\`bash
python secops.py parse example-logs.txt
\`\`\`

### Detect Threats
\`\`\`bash
python secops.py detect example-logs.txt
\`\`\`

### Enrich IOC
\`\`\`bash
python secops.py enrich 192.168.1.100
python secops.py enrich evil.malware.com
python secops.py enrich d41d8cd98f00b204e9800998ecf8427e
\`\`\`

### Create Incident
\`\`\`bash
python secops.py incident \
  --title "SQL Injection Attempt" \
  --severity high \
  --description "Detected SQL injection in login form"
\`\`\`

### List Incidents
\`\`\`bash
python secops.py incidents
\`\`\`

### List IOCs
\`\`\`bash
# List all IOCs
python secops.py iocs

# Filter by threat level
python secops.py iocs --threat-level critical
python secops.py iocs --threat-level malicious
\`\`\`

### Full Analysis Pipeline
\`\`\`bash
python secops.py analyze example-logs.txt
\`\`\`

## Examples

\`\`\`bash
# Scenario: Detect brute force attack
$ python secops.py detect example-logs.txt
[+] Parsed 8 security logs
[!] Found 1 threat(s)
    Rule: Brute Force Attack
    Severity: high
    MITRE Technique: T1110
    Source IP: 192.168.1.100

# Scenario: Enrich attacker IP
$ python secops.py enrich 192.168.1.100
[+] IOC Enrichment: 192.168.1.100
    Type: ip
    Threat Level: critical
    Reputation Score: 95%
    Source: AbuseIPDB
    Description: Known C2 command and control server
    Associated Malware: Emotet, Trickbot

# Scenario: Analyze logs with enrichment
$ python secops.py analyze example-logs.txt
[+] Parsed 8 security logs
[!] Found 1 threat(s)
    Rule: Brute Force Attack
    ...
[+] IOC Enrichment: 192.168.1.100
    ...
\`\`\`

## Commands Reference

| Command | Description |
|---------|-------------|
| `parse <file>` | Parse security logs |
| `detect <file>` | Detect threats in logs |
| `enrich <ioc>` | Enrich indicator of compromise |
| `incident` | Create manual incident |
| `incidents` | List all incidents |
| `iocs` | List threat indicators |
| `analyze <file>` | Full analysis pipeline |

## Architecture

The CLI integrates with backend modules:
- **LogParser**: Parses and normalizes logs
- **ThreatDetectionEngine**: Runs Sigma-style detection rules
- **IncidentResponder**: Creates and manages incidents
- **ThreatIntelligenceEngine**: Enriches IOCs

Use for security operations automation, threat research, and incident response workflows.
