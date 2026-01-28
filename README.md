Autorentic Property Marketplace - Comprehensive Strategy Document
Executive Summary
Building a rental-only property listing platform as a separate but interconnected system to Autorentic (property management system). Primary goal: drive organic user adoption of Autorentic while helping PMs fill vacancies faster. Target: Malaysian market, expanding to SEA.

1. Market Positioning Strategy
Rental-Only Focus: VALIDATED ✅
Rationale:

Niche positioning reduces competition with PropertyGuru/iProperty
Clear value proposition for vacancy filling
Simpler product scope for MVP
Aligned with Autorentic's core PM workflow

Decision: Start rental-only, evaluate buy market later based on:

Market traction and user demand
Resource availability for expansion
Competitive landscape changes

Additional Niche Opportunities Beyond "Rental-Only":
Focus solely on rental as the primary niche. Other potential micro-niches (co-living, furnished, short-term) should be treated as filtering/tagging options within rental, not separate products.

2. Trust & Anti-Scam Strategy
Critical Problem: New marketplace = low trust
Multi-Layer Solution:
mermaidgraph TD
    A[Trust Building] --> B[Verification Layer]
    A --> C[Social Proof]
    A --> D[Transparency]
    A --> E[Platform Controls]
    
    B --> B1[Autorentic badge for verified PMs]
    B --> B2[Manual review for public listings]
    B --> B3[Photo/document verification]
    
    C --> C1[Ratings & reviews]
    C --> C2[Response rates]
    C --> C3[Listing age badges]
    
    D --> D1[Last verified dates]
    D --> D2[PM response history]
    D --> D3[Price transparency]
    
    E --> E1[Duplicate detection]
    E --> E2[Spam throttling]
    E --> E3[Report mechanisms]
Key Mechanisms:

Autorentic-verified badge for existing PMs (instant credibility)
Manual review queue for public PM listings (first 3-5 listings)
Duplicate detection via address/unit + image fingerprinting
Rate limiting on listing creation (prevent spam)
Progressive trust - more features unlock after verification
Response tracking - show PM responsiveness metrics


3. System Architecture
Two Separate Systems with Shared Authentication
mermaidgraph LR
    A[Autorentic System] -->|SSO/Token Auth| C[Auth Service]
    B[Marketplace System] -->|SSO/Token Auth| C
    C -->|user_id mapping| D[(Autorentic DB)]
    C -->|marketplace_user_id| E[(Marketplace DB)]
    D -.sync via API.- E
Database Strategy:

Separate DBs for system independence
Linked user IDs via mapping table
API-based sync for property data (not direct DB replication)

Why Separate:

Independent scaling and failure isolation
Marketplace can survive if Autorentic fails
Cleaner architecture despite messier initial setup


4. Authentication Flow
Single Sign-On (SSO) Implementation
Technical Approach (given Autorentic only has email/phone + OTP):
mermaidsequenceDiagram
    participant PM as PM User
    participant AR as Autorentic
    participant MP as Marketplace
    participant DB as User Mapping DB
    
    PM->>AR: Login via OTP
    AR->>AR: Verify OTP, create session
    AR->>DB: Store autorentic_user_id
    PM->>MP: Access Marketplace
    MP->>AR: Request auth token
    AR->>MP: Provide JWT/session token
    MP->>DB: Check mapping (autorentic_user_id → marketplace_user_id)
    alt User exists in Marketplace
        MP->>PM: Grant access
    else New user
        MP->>DB: Create marketplace_user_id + link
        MP->>PM: Auto-signup + grant access
    end
Implementation:

Token-based SSO (not traditional OAuth - use JWT or session tokens)
User mapping table stores: autorentic_user_id ↔ marketplace_user_id + email/phone
No password duplication - credentials stay in Autorentic DB only
Marketplace authenticates via token validation against Autorentic

Public PM Flow (Alternative Account):

Separate Marketplace account creation (email/OTP)
Optional: Link to Autorentic later if they adopt it
Credentials stored only in Marketplace DB until linked


5. Listing Management Strategy
Hybrid Management Model (RECOMMENDED)
mermaidgraph TD
    A[Where to Manage Listings?] --> B[Autorentic Dashboard]
    A --> C[Marketplace Dashboard]
    
    B --> B1[Full property data editing]
    B --> B2[Occupancy management]
    B --> B3[One-click publish to Marketplace]
    B --> B4[Read-only preview of live listing]
    
    C --> C1[Limited editing: photos, description, promo]
    C --> C2[Availability toggle]
    C --> C3[View inquiries/leads]
    C --> C4[Cannot edit core rental data]
Strategy:

Core rental data (price, unit number, address, occupancy): Autorentic only
Marketing content (photos, description, promotions): Both systems, synced
Availability toggle: Both systems, auto-synced

Why Hybrid:

Autorentic = source of truth for operational data
Marketplace = lightweight marketing layer
Prevents data conflicts and confusion
Encourages Autorentic adoption for full control


6. Data Synchronization
Event-Driven Sync Architecture
mermaidgraph LR
    A[Autorentic Events] --> B{Sync Trigger}
    B -->|Occupancy Change| C[Update Marketplace]
    B -->|Price Change| C
    B -->|Unit Deleted| D[Unpublish Listing]
    B -->|Tenant Moves In| D
    
    C --> E[API Call to Marketplace]
    D --> E
    E --> F[(Marketplace DB)]
    
    G[Marketplace Events] --> H{Limited Sync}
    H -->|Photo Update| I[Store in Marketplace only]
    H -->|Description Edit| I
    H -->|Promo Toggle| I
Sync Rules:

Autorentic → Marketplace (one-way for core data)

Occupancy status → auto-publish/unpublish
Rental rate → update display (if editable in Marketplace)
Unit deletion → unpublish listing


Marketplace → Autorentic (limited)

Marketing content (photos/description) → optional sync back
Lead notifications → sent to PM email/WhatsApp


Sync Mechanism Options:

MVP: Scheduled batch jobs (hourly/daily)
Future: Webhooks/event streams for real-time



No Full DB Duplication:

Only published listing data copied to Marketplace DB
Core property records stay in Autorentic
Marketplace stores: listing_id, autorentic_unit_id, marketing content, availability


7. Field Editability Matrix
FieldAutorenticMarketplaceSync DirectionNotesUnit Number✅ Edit❌ Read-onlyAR → MPSource of truthAddress✅ Edit❌ Read-onlyAR → MPSource of truthRental Price✅ Edit⚠️ Display override onlyAR → MPMP can show "special price"Photos✅ Edit✅ EditBoth ↔Synced both waysDescription✅ Edit✅ EditBoth ↔Marketing copyOccupancy Status✅ Edit❌ AutoAR → MPTriggers publish/unpublishAvailability Toggle✅ Edit✅ EditBoth ↔Manual overridePromotions/Discounts❌ N/A✅ EditMP onlyMarketing layer
Sync Trigger Logic:

Action-based: PM edits in Autorentic → API call updates Marketplace
Event-based: Tenant pays rent → occupancy = false → auto-unpublish
Manual: PM toggles "Available" in Marketplace → updates availability flag


8. Standalone Viability Analysis
Can Marketplace Survive Without Autorentic?
Short Answer: Yes, but limited.
Standalone Features for Public PMs:
mermaidgraph TD
    A[Public PM Without Autorentic] --> B[Can List Properties]
    B --> C[Upload photos]
    B --> D[Write descriptions]
    B --> E[Set rental price manually]
    B --> F[Toggle availability]
    B --> G[Add promotions]
    
    A --> H[Can Receive Leads]
    H --> I[Inquiry notifications via email]
    H --> J[WhatsApp contact display]
    H --> K[Lead dashboard in Marketplace]
    
    A --> L[Cannot Access]
    L --> M[Automated occupancy sync]
    L --> N[Payment tracking]
    L --> O[Advanced PM tools]
MVP for Public PMs: SUFFICIENT ✅
Pros:

Still valuable as lead generation tool
No dependency on Autorentic adoption
Can scale independently if needed
Lowers barrier to entry

Cons:

Ghost listings risk (no auto-unpublish)
Manual updates required
Less competitive vs PMs using Autorentic

Mitigation:

Manual verification reminders
Trust penalties for stale listings
Incentivize Autorentic adoption with badges/priority placement

If Autorentic Dies:

Marketplace continues as standalone rental listing platform
Loses automated sync advantage
Reverts to traditional listing model
Still viable business


9. User Onboarding Flows
Flow A: Existing Autorentic PM (Aware of Marketplace)
mermaidsequenceDiagram
    participant PM as PM
    participant AR as Autorentic
    participant MP as Marketplace
    
    PM->>MP: Visit Marketplace site
    MP->>PM: Show: "Use Autorentic account?"
    PM->>MP: Click "Yes"
    MP->>AR: Redirect to SSO/token auth
    AR->>MP: Return auth token
    MP->>MP: Check user mapping
    alt Account exists
        MP->>PM: Auto-login success
    else New to Marketplace
        MP->>PM: Auto-create account + link
        PM->>MP: Accept terms (one-time)
        MP->>PM: Account ready
    end
Flow B: Public PM (No Autorentic Account)
mermaidsequenceDiagram
    participant PM as Public PM
    participant MP as Marketplace
    
    PM->>MP: Visit Marketplace site
    MP->>PM: Show signup options
    PM->>MP: Enter email/phone
    MP->>PM: Send OTP
    PM->>MP: Verify OTP
    MP->>MP: Create marketplace account
    MP->>PM: Onboarding: Add first property
    PM->>MP: Upload listing details
    MP->>PM: Manual review (first 3 listings)
    MP->>PM: Listing published
Flow C: Tenant/Public User
mermaidgraph LR
    A[Visit Marketplace] --> B{Browse without login?}
    B -->|Yes| C[Search & view listings]
    C --> D[Contact PM via WhatsApp/form]
    B -->|Save favorites| E[Prompt signup]
    E --> F[Email/social login]
    F --> G[Saved search alerts]
Key UX Principles:

Browse without signup (low friction)
Signup only for: save favorites, alerts, inquiries history
Social login options (Google/Facebook) for tenants
Mobile-first, fast onboarding (<2 min)


10. Single-System Illusion Flow (Critical Innovation)
"Publish to Marketplace" from Autorentic Dashboard
Problem: PM sees vacant unit in Autorentic, wants to publish immediately without leaving system.
Solution: Embedded Modal Publish
mermaidsequenceDiagram
    participant PM as PM
    participant AR as Autorentic UI
    participant API as Autorentic Backend
    participant MP as Marketplace API
    
    PM->>AR: View vacant units list
    AR->>AR: Show "Publish to Marketplace" button
    PM->>AR: Click publish button
    AR->>API: Check marketplace_user_id exists?
    
    alt No Marketplace account
        API->>AR: Trigger in-line signup modal
        AR->>PM: Show pre-filled signup form
        PM->>AR: Confirm OTP (or skip if trusted)
        AR->>MP: Create marketplace account
        MP->>API: Return marketplace_user_id
        API->>API: Link autorentic_user_id ↔ marketplace_user_id
    end
    
    API->>MP: Fetch pre-filled listing data
    MP->>AR: Return modal with editable fields
    AR->>PM: Show publish modal (photos, description, promo)
    PM->>AR: Edit/add marketing content
    PM->>AR: Click "Publish Listing"
    AR->>MP: POST /listings/create
    MP->>MP: Create listing + link to autorentic_unit_id
    MP->>AR: Return success
    AR->>PM: Show "Published" badge on unit
    AR->>PM: Optional: "View Live Listing" link
Critical Features:

Auto-account creation (no OTP if PM already logged into Autorentic)

Pros: Zero friction, max adoption, seamless UX
Cons: Security risk if session compromised, must notify user
Recommendation: Auto-create with notification + optional password setup later


Pre-filled modal:

Read-only: address, unit number, base rental price (from Autorentic DB)
Editable: photos, description, promotional price, availability


No redirect:

Modal embedded in Autorentic UI (iframe or micro-frontend)
Feels like "editing property" not "using new system"


Post-publish:

Unit marked "Published on Marketplace" in Autorentic
Ongoing sync: occupied → auto-unpublish




11. Technical Implementation Feasibility
Given: Messy Autorentic DB + Legacy Architecture
Complexity Assessment:
ComponentDifficulty (1-5)NotesUser ID mapping2-3Basic but requires DB cleanupEmbedded modal (micro-frontend)4Hard if AR front-end not modularPre-fill API3Medium; depends on data accessAuto-account creation3-4Error handling criticalReal-time sync4-5Risky with messy DBBatch sync (hourly)2Easier, safer for MVP
MVP Recommendation (Phase 1):
mermaidgraph TD
    A[PM clicks Publish in Autorentic] --> B{Has Marketplace account?}
    B -->|No| C[Redirect to Marketplace modal/form]
    B -->|Yes| D[Open embedded modal in AR]
    
    C --> E[Inline signup with pre-filled data]
    E --> F[Return to Autorentic context]
    F --> D
    
    D --> G[Pre-fill basic fields via API]
    G --> H[PM edits photos/description]
    H --> I[Publish via API call]
    I --> J[Listing live in Marketplace]
    J --> K[Batch sync: occupancy check every 1-2 hours]
Phase 2 (After DB Cleanup):

Fully embedded modal (no redirect)
Real-time occupancy sync via webhooks
Auto-account creation without explicit signup

Risk Mitigation:

Start with redirect + pre-fill (90% of UX benefit, 50% complexity)
Clean critical DB tables (user emails, property addresses)
Implement robust error handling and rollback logic


12. Branding & Positioning (Placeholder)
Deliverables Needed:

Brand Name: Rental-focused, trustworthy, Malaysian-relevant
Tagline: e.g., "Fill vacancies faster" / "Trusted rentals, verified listings"
Color Palette: Tech-savvy + approachable (e.g., #0F4C5C, #2BC0E4)
Logo Concept: Modern, clean, property-related
Positioning: "The anti-ghost-listing marketplace" / "Verified rentals by real PMs"
Key Messaging:

Faster vacancy filling for PMs
No ghost listings (Autorentic-verified)
Trusted leads for tenants



(Detailed branding brief to be developed separately)

13. Complete A-Z User Flows
Tenant Flow
mermaidgraph TD
    A[Land on Marketplace homepage] --> B[Browse listings without login]
    B --> C[Use filters: location, price, amenities]
    C --> D[View property details]
    D --> E{Interested?}
    E -->|Yes| F[Contact PM via WhatsApp/form]
    E -->|Save for later| G[Prompt signup]
    G --> H[Quick signup: email/social login]
    H --> I[Save favorites + set alerts]
    I --> F
    F --> J[PM responds via WhatsApp/email]
    J --> K[Schedule viewing]
    K --> L[Tenant rents → PM marks occupied in AR]
    L --> M[Listing auto-unpublished]
Public PM Flow (Marketplace Only)
mermaidgraph TD
    A[Visit Marketplace] --> B[Click "List Your Property"]
    B --> C[Signup: email/phone + OTP]
    C --> D[Create listing form]
    D --> E[Fill: address, price, photos, description]
    E --> F[Submit for review]
    F --> G[Manual review by team]
    G -->|Approved| H[Listing published]
    G -->|Rejected| I[Feedback sent to PM]
    H --> J[Receive lead inquiries]
    J --> K[Respond to tenants]
    K --> L[Manual update: mark occupied/available]
Autorentic PM Flow (Integrated)
mermaidgraph TD
    A[PM logs into Autorentic] --> B[View vacant units dashboard]
    B --> C[Click 'Publish to Marketplace' on vacant unit]
    C --> D{Has Marketplace account?}
    D -->|No| E[In-line signup modal]
    E --> F[Auto-create account + link]
    D -->|Yes| G[Open embedded publish modal]
    F --> G
    G --> H[Pre-filled: address, unit, base price]
    H --> I[PM adds: photos, description, promo]
    I --> J[Click 'Publish']
    J --> K[Listing live in Marketplace]
    K --> L[Autorentic shows 'Published' badge]
    L --> M[Ongoing sync: tenant moves in]
    M --> N[Auto-unpublish in Marketplace]
    N --> O[PM sees 'Occupied' status in AR]

14. Security & Privacy Rules Applied
Authentication Safety:

User mapping prevents injection attacks via proper API validation
No credentials stored in Marketplace DB (only hashed tokens)
SSO tokens expire after session timeout

Anti-Scam Measures:

Manual review for first 3 public listings
Duplicate detection prevents spam
Autorentic-verified badge increases trust
Report/flag mechanisms for users

Data Protection:

PM contact info only shared after tenant inquiry
No sensitive financial data in Marketplace DB
GDPR-compliant data retention policies


15. Key Decisions & Open Questions
✅ Decisions Made:

Rental-only positioning (valid strategy)
Two separate systems + shared authentication
Hybrid management (Autorentic = source of truth)
Event-driven sync (batch for MVP, real-time later)
Embedded "Publish to Marketplace" flow (single-system illusion)
Auto-account creation without OTP (for adoption)
Trust mechanisms via verification + badges
Marketplace can survive standalone

⚠️ Clarifications Needed:

Branding package: Name, logo, color palette
Complete UX prototype: Wireframes, visual design system, sample data
Detailed A-Z flows: Clickable prototype-ready format
Additional niche targeting: Confirm rental-only or expand filters


16. Next Steps
Immediate Actions:

Finalize branding (name, tagline, visual identity)
Create detailed UX/UI prototype with sample Malaysian properties
Clean critical Autorentic DB tables (users, properties)
Build MVP authentication flow (token-based SSO)
Develop embedded publish modal (redirect + pre-fill first)
Implement batch sync (hourly occupancy updates)
Set up manual review queue for public PM listings

Phase 2 (Post-MVP):

Real-time sync via webhooks
Fully embedded modal (no redirect)
Advanced trust features (ratings, reviews)
Scale to SEA markets


17. Critical Success Metrics
Adoption KPIs:

% of Autorentic PMs who publish to Marketplace
Time to first listing published (target: <5 min)
Public PM → Autorentic conversion rate

Trust KPIs:

Ghost listing rate (target: <5%)
Tenant inquiry response rate
Listing verification turnaround time

Engagement KPIs:

Listings published vs. unpublished ratio
Lead generation per listing
Tenant-to-viewing conversion


UI Guide
Never use emoji instead use Lucide icon only - not multiple icon pack
Creat/utilize reusable components, removing duplicated code, and optimizing structure. 
Keep the code neat, modular, and easy to maintain, while not altering any styles, classNames, layout, or rendering
Use global color
Maintain dark/light mode UI


Document Status

Version: 1.0
Last Updated: 2025-01-28
Next Review: After branding + UX prototype completion