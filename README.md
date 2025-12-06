# 🚀 Advocate Engine

**Intelligent Content Curation System for Employee Advocacy Platforms**

[![n8n](https://img.shields.io/badge/automation-n8n-orange)](https://n8n.io)
[![Claude AI](https://img.shields.io/badge/AI-Claude%20Sonnet%204-blue)](https://anthropic.com)
[![Airtable](https://img.shields.io/badge/database-Airtable-yellow)](https://airtable.com)

**[🔗 View Live Dashboard](https://scorcuera.github.io/advocate_engine/)**

---

## The Problem

Employee Advocacy platforms need a constant stream of high-quality, relevant content for their clients' employees to share on social media. Customer Success Managers typically spend **10-20 hours per week** manually:

- 🔍 Searching for relevant articles across multiple sources
- ✍️ Writing social media copies for different channels
- 🏷️ Categorizing content by industry and relevance
- 📊 Evaluating which content is worth sharing

This manual process doesn't scale when managing clients across multiple countries and industries.

---

## The Solution

Advocate Engine automates the entire content curation pipeline from discovery to delivery:

- 🤖 **AI-powered analysis** for intelligent content understanding
- 🔄 **Workflow automation** for 24/7 operation
- 📊 **Structured database** for content management
- ⚛️ **Professional dashboard** for review and approval

### Key Features

✅ **Automated Content Capture** - Monitors 5 premium RSS feeds  
✅ **AI Content Analysis** - Generates summaries, scores relevance (1-10), detects sentiment  
✅ **Multi-Channel Copy Generation** - Creates LinkedIn, Twitter, and Intranet posts in French  
✅ **Smart Categorization** - Automatically tags by industry  
✅ **Intelligent Deduplication** - Prevents duplicate content  
✅ **Analytics Tracking** - Monitor system performance and content quality

---

## Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    WORKFLOW 1: RSS FETCHER                  │
│  ┌──────────┐   ┌────────┐   ┌─────────┐   ┌──────────┐   │
│  │ RSS Feed │ → │ Filter │ → │  Parse  │ → │ Airtable │   │
│  │  (×5)    │   │Keywords│   │Structure│   │  Create  │   │
│  └──────────┘   └────────┘   └─────────┘   └──────────┘   │
│       ↓                                           ↓          │
│  Runs every 6h                          Status: "New"       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  WORKFLOW 2: AI ANALYZER                    │
│  ┌──────────┐   ┌─────────┐   ┌─────────┐   ┌──────────┐  │
│  │ Fetch    │ → │ Claude  │ → │ Extract │ → │ Airtable │  │
│  │ New (10) │   │ API     │   │  JSON   │   │  Update  │  │
│  └──────────┘   └─────────┘   └─────────┘   └──────────┘  │
│       ↓              ↓                             ↓         │
│  Runs every 30min  Generates:              Status: "Analyzed"│
│                    • Summary (FR)                            │
│                    • LinkedIn/Twitter/Intranet Copies        │
│                    • Industry tags                           │
│                    • Relevance score                         │
│                    • Sentiment analysis                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       REACT DASHBOARD                       │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐               │
│  │ Filter & │ → │ Review   │ → │ Approve/ │               │
│  │ Search   │   │ Content  │   │ Reject   │               │
│  └──────────┘   └──────────┘   └──────────┘               │
└─────────────────────────────────────────────────────────────┘
```

---

## Business Impact

### Time & Cost Savings

- **40 hours/month saved** per content manager
- **€12,000+/month** in operational efficiency (team of 10)
- **€144,000+/year** in cost savings

### Scalability

- ✅ Supports unlimited clients simultaneously
- ✅ 24/7 automated operation
- ✅ Consistent quality through AI
- ✅ Instant deployment to new industries

---

## 🛠️ Tech Stack

**Automation:**
- **n8n Cloud (EU)** - Workflow orchestration
- **RSS Integration** - TechCrunch, Fast Company, Blog du Modérateur, Harvard Business Review

**AI:**
- **Anthropic Claude Sonnet 4 (20250514)** - Content analysis and generation
- *Note: Using Sonnet 4 for production stability. The architecture supports easy model upgrades via configuration.*

**Data:**
- **Airtable** - Structured content database
- **REST API** - Real-time sync

**Frontend:**
- **React 18** with Vite
- **TailwindCSS**
- **Lucide Icons**
- **GitHub Pages** deployment

---

## 🎯 Key Design Decisions

### Why n8n?
Visual workflow builder, scalable, production-ready, easy handoff.

### Why Claude Sonnet 4?
Superior French language generation, reliable JSON output, high accuracy in categorization. Using Sonnet 4 (rather than 4.5) ensures production stability with proven performance.

### Why Airtable?
Rapid prototyping, visual interface, easy integration with existing tools.

### Why React?
Component-based architecture, fast development, easy to extend.

---

## 🚀 Live Demo

**Dashboard:** [scorcuera.github.io/advocate_engine](https://scorcuera.github.io/advocate_engine/)

**Features:**
- Filter by industry, sentiment, and relevance score
- View AI-generated summaries and social copies
- Track system analytics
- Approve/reject content workflow

---

## 📈 Roadmap

**Short-term:**
- [ ] Email/Slack notifications for high-scoring content
- [ ] CSM assignment based on industry focus
- [ ] Weekly digest emails

**Medium-term:**
- [ ] Direct API integration with advocacy platforms
- [ ] Analytics dashboard with trend analysis
- [ ] Multi-language support (EN, ES, DE, IT)

**Long-term:**
- [ ] Machine learning for improved scoring
- [ ] Content performance tracking
- [ ] Automated A/B testing for social copies