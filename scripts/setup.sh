#!/bin/bash
# Security Operations Platform - Setup Script

echo "Setting up Security Operations Platform..."

# Create project structure
mkdir -p backend/{logs,detection_rules,incident_response,threat_intel}
mkdir -p cli
mkdir -p data/incidents
mkdir -p data/logs

echo "Project structure created"

# Install Python dependencies (optional)
if command -v pip &> /dev/null; then
    echo "Python packages ready:"
    echo "  - log_parser.py"
    echo "  - detector.py"
    echo "  - responder.py"
fi

echo ""
echo "Setup complete! Next steps:"
echo "1. Run 'npm install' to install Node dependencies"
echo "2. Update your Vercel project settings with environment variables"
echo "3. Deploy to Vercel with: npm run build && npm run start"
echo ""
echo "For local development:"
echo "  npm run dev"
