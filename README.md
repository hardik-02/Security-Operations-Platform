# Security Operations & Threat Detection Platform (SOAR-Lite)

A professional Security Operations Center platform demonstrating automated threat detection, incident response, and security analytics.

## Features

- **Real-time Threat Detection**: Log analysis with Sigma-style detection rules
- **Automated Incident Response**: Auto-generate and escalate security incidents
- **Security Dashboard**: Real-time visualization of threats and incidents
- **MITRE ATT&CK Mapping**: Techniques and TTPs tracking
- **Threat Intelligence Integration**: IOC enrichment and correlation
- **CLI Tools**: Command-line security operations interface

## Project Structure

```
├── app/                    # Next.js dashboard
├── components/            # React components
├── backend/              # Python security services
│   ├── log_parser.py     # Security log parsing
│   ├── detector.py       # Threat detection engine
│   └── responder.py      # Incident response automation
├── scripts/              # Utility scripts
└── data/                # Local data storage
```

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Architecture

### Detection Pipeline
1. **Log Collection**: Parse logs from auth, network, and system sources
2. **Normalization**: Convert to standard SecurityLog format
3. **Detection**: Run against Sigma-style rules
4. **Incident Creation**: Generate incidents from detections
5. **Response**: Execute automated mitigation actions

### Detections Available
- **Brute Force Attacks**: Multiple failed login attempts (Rule-001)
- **Lateral Movement**: Suspicious port access (Rule-002)
- Custom rules can be added easily

## Key Components

### Backend Services
- `LogParser`: Parses and normalizes security logs
- `ThreatDetectionEngine`: Runs detection rules against logs
- `IncidentResponder`: Creates and responds to incidents

### Frontend Dashboard
- Real-time incident monitoring
- Detection metrics and trends
- Severity-based alerts
- MITRE ATT&CK mapping visualization

## Resume Impact Points

✓ Designed automated Security Operations platform  
✓ Implemented detection engine with MITRE ATT&CK mapping  
✓ Built automated incident response playbooks  
✓ Created security analytics dashboard  
✓ Integrated threat intelligence enrichment  

## Next Features (Post-MVP)

- [ ] Red/Purple team simulation module
- [ ] Advanced threat intelligence feeds
- [ ] Power BI dashboard integration
- [ ] Azure Sentinel integration
- [ ] Real-time log streaming from ELK
- [ ] Custom rule builder UI
- [ ] Automated remediation playbooks

## Microsoft Interview Alignment

This project directly addresses the Security Operations Engineering Intern JD:
- **Security Research**: Log analysis and threat pattern recognition
- **Process Automation**: Incident response playbooks
- **Incident Response**: Automated alert handling
- **Data Analytics**: Real-time security dashboards
- **Threat Intelligence**: IOC correlation and enrichment

---

Built for demonstration and educational purposes. For production use, integrate with actual SIEM/SOAR solutions.
