# CineCircle - AI Development Guide

## Project Overview

CineCircle is a movie recommendation platform focused on **personal trust networks** rather than algorithmic feeds. The core concept is enabling direct movie recommendations between friends and curated "Cineboards" (multi-movie themed collections) that auto-populate user watchlists.

## Key Domain Concepts

- **Trust Graph**: Personal connections between users for recommendations (friends/followers system)
- **Cineboards**: Multi-movie themed collections with personal context/message - can be public or private
- **Personal Recommendations**: Single movie recommendations with "why should your friend watch this?" context
- **Watchlist Auto-Population**: Recommended movies automatically appear in recipient's watchlist
- **Recommendation Groups**: WhatsApp-style groups for collective movie discussions and sharing
- **Taste Identity**: Genre-based profiles showing "Top 4 Movies per Genre" and favorites

## Architecture Principles

When building this platform, prioritize:

- **User-centric data model**: Center around user relationships and recommendation flows
- **Recommendation traceability**: Always preserve who recommended what and why
- **Privacy by design**: Trust networks should respect user privacy boundaries
- **Mobile-first experience**: Target "movie-curious casual viewers" who use mobile devices

## Development Approach

This is an **early-stage project** currently in the concept phase. When implementing:

### Technology Stack

- **Frontend**: Next.js deployed on Vercel
- **Backend**: Nest.js monolith with REST APIs
- **Databases**: PostgreSQL (relational data) + DynamoDB/Cassandra (recommendation graph/analytics)
- **Cloud**: AWS services (backend infrastructure)
- **CI/CD**: GitHub Actions for deployment pipelines
- **External APIs**: TMDB for movie metadata
- **Mobile-responsive design** is essential for target users

### Data Model Priorities

- **PostgreSQL**: User profiles, friendship/trust connections, Cineboard collections, watchlists
- **DynamoDB/Cassandra**: Recommendation graph, engagement analytics, activity feeds
- **TMDB Integration**: Movie metadata cached locally with API sync strategies
- **REST API Design**: RESTful endpoints following Nest.js conventions with proper DTOs and validation

### Development Phases & Feature Priorities

**Phase 1 (MVP - Core Foundation)**
Focus: Prove that recommending movies between friends creates value

1. User authentication (email/password + OAuth options)
2. Friend requests & followers system (basic social graph)
3. Send single movie recommendations with personal context ("Why should your friend watch this?")
4. Cineboards: Multi-movie collections (public/private) with themes
5. Profile sections: "Cineboards You Created" vs "Cineboards Shared With You"
6. Personal watchlist with auto-population from recommendations

**Phase 2 (Enhancement & Depth)**
Focus: Build strong profiles and identities, making CineCircle sticky 7. Top Genres & Top 4 Movies per Genre (structured taste profiles) 8. Favorite Movies section (Top 10 all-time favorites) 9. Recommendation Groups (WhatsApp-style movie discussion groups) 10. Movie availability info (streaming platforms via JustWatch API) 11. Ratings aggregation (IMDb, Rotten Tomatoes, Metacritic + CineCircle ratings) 12. Diary feature (Letterboxd-style viewing logs with timeline, ratings, notes) 13. Personal movie quote in bio (personality/icebreaker element)

**Phase 3 (Community & Gamification)**
Focus: Drive engagement, retention, and social fun 14. Badges & gamification (milestones for movies logged, reviews, Cineboards created) 15. Chat feature + status updates (notification when friends watch your recs, post-completion chat prompts) 16. Advanced notifications (likes, group additions, comments, viewing status)

## Target Users Context

When making UX decisions, remember the three user types:

- **Movie-curious casual viewers**: Need simple, low-friction experience
- **Enthusiast sharers/curators**: Need powerful tools for creating Cineboards and recommendations
- **Small friend circles**: Need group coordination features for "what to watch tonight"

## Integration Points

Plan for integration with:

- **TMDB API**: Primary movie metadata source - implement caching and rate limiting
- **JustWatch API**: Streaming platform availability (Phase 2 feature)
- **Ratings APIs**: IMDb, Rotten Tomatoes, Metacritic aggregation (Phase 2)
- **AWS Services**: Lambda functions, SQS for async processing, S3 for assets, CloudWatch for monitoring
- **Vercel**: Frontend deployment with API routes for Next.js-specific features
- **GitHub Actions**: CI/CD pipelines for both frontend (Vercel) and backend (AWS) deployments
- **Social auth providers**: AWS Cognito or third-party OAuth
- **Real-time features**: WebSocket/Server-Sent Events for notifications and chat (Phase 3)
- **Mobile notifications**: AWS SNS/SES for email, push notification services

## Development Status

⚠️ **Project is in early conceptual stage** - no existing codebase patterns to follow yet. Focus on establishing solid architectural foundations that align with the personal recommendation trust graph concept.
