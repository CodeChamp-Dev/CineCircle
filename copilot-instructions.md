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

## Repository Structure

```
apps/
├── api/          # Nest.js backend (Fastify) exposing REST under /api
│   ├── src/
│   │   ├── health/     # Health check module (example of modular structure)
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
└── web/          # Next.js App Router frontend
    ├── app/          # Next.js 13+ app directory
    ├── components/   # React components
    └── package.json

packages/
├── config/       # Tailwind preset & design tokens
├── types/        # Domain interfaces (Recommendation, Cineboard, UserProfile)
│   └── src/
│       ├── recommendation.ts
│       ├── cineboard.ts
│       └── user.ts
└── ui/           # Shared React components
```

## Domain Models (Current State)

### Recommendation

```typescript
interface Recommendation {
  id: string; // Temporary client-generated id until backend
  movieId: string; // TMDB movie identifier
  fromUserId: string; // Who recommended
  toUserId: string; // Who received the recommendation
  note: string; // "Why should your friend watch this?"
  createdAt: string; // ISO timestamp
}
```

### Cineboard

```typescript
interface Cineboard {
  id: string;
  ownerUserId: string;
  title: string;
  description?: string;
  movieIds: string[]; // Ordered list of TMDB IDs
  isPublic: boolean;
  createdAt: string;
}
```

### UserProfile

```typescript
interface UserProfile {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt: string;
}
```

## Technology Stack

### Frontend

- **Next.js (App Router)**: React framework with app directory structure
- **Tailwind CSS**: Utility-first styling with shared preset
- **Dark mode**: Via class toggle, configured in layout
- **TypeScript**: Strict mode enforced

### Backend

- **Nest.js**: Node.js framework with decorators and dependency injection
- **Fastify**: Performance-focused HTTP server (instead of Express)
- **Modular architecture**: Domain modules pattern (AuthModule, UsersModule, etc.)
- **TypeScript**: Strict typing throughout

### Development Tools

- **pnpm**: Package manager with workspace support
- **Jest**: Testing framework with ts-jest transformer
- **ESLint + Prettier**: Code quality and formatting (no warnings allowed)
- **Husky**: Git hooks for pre-commit validation
- **Conventional Commits**: Format enforced via commitlint

### Planned Data Stores

- **PostgreSQL**: Relational data (users, friendships, Cineboards, watchlists)
- **DynamoDB/Cassandra**: Graph data and analytics (recommendation graph, activity feeds)
- **TMDB API**: Movie metadata with local caching

## Development Workflow

### Getting Started

```bash
# Enable pnpm (Node 18+)
corepack enable

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Start development servers
pnpm dev  # Runs both api and web concurrently

# Access points
# Web: http://localhost:3000
# API: http://localhost:4000/api/health
```

### Key Scripts

```bash
pnpm dev         # Run web + api in development
pnpm lint        # ESLint (no warnings allowed)
pnpm typecheck   # TypeScript compilation check
pnpm build       # Build all workspaces
pnpm test        # Run Jest tests
pnpm format      # Format code with Prettier
```

### Adding New Packages

1. Create folder under `packages/`
2. Add `package.json` with name `@cinecircle/<pkg>`
3. Export from `index.ts`
4. Reference via path alias in `tsconfig.base.json` if needed
5. Run `pnpm install` to refresh lock graph

## Coding Conventions

### TypeScript

- **Strict mode enforced** across all packages
- Use **path aliases** for internal boundaries
- No `any` types - prefer proper typing
- Interface over type for object shapes

### Styling

- **Tailwind utilities only** - avoid ad-hoc CSS
- Use **design tokens** from `@cinecircle/config`
- Dark mode support via `dark:` classes

### Imports

```typescript
// Internal packages
import { Recommendation } from "@cinecircle/types";
import { Container } from "@cinecircle/ui";

// Relative imports for same package
import { HealthService } from "./health.service";
```

### Commit Messages

Format: `type(scope): description`

```
feat(api): add recommendation POST endpoint
fix(web): resolve dark mode toggle issue
chore(deps): update Next.js to latest
docs(readme): update installation steps
```

## API Design Patterns

### Nest.js Module Structure

```typescript
// Module organization
@Module({
  controllers: [RecommendationController],
  providers: [RecommendationService],
  imports: [TypeOrmModule.forFeature([Recommendation])],
})
export class RecommendationModule {}

// Controller with DTOs
@Controller("recommendations")
export class RecommendationController {
  @Post()
  async create(@Body() dto: CreateRecommendationDto) {
    return this.service.create(dto);
  }
}

// Service with business logic
@Injectable()
export class RecommendationService {
  async create(dto: CreateRecommendationDto): Promise<Recommendation> {
    // Business logic here
  }
}
```

### REST API Conventions

- All API routes prefixed with `/api`
- Use proper HTTP methods and status codes
- DTOs for request/response validation
- Error handling with proper HTTP status codes

## Development Phases & Priorities

### Phase 1 (MVP - Core Foundation)

Focus: Prove that recommending movies between friends creates value

1. User authentication (email/password + OAuth options)
2. Friend requests & followers system (basic social graph)
3. Send single movie recommendations with personal context
4. Cineboards: Multi-movie collections (public/private) with themes
5. Personal watchlist with auto-population from recommendations

### Phase 2 (Enhancement & Depth)

Focus: Build strong profiles and identities 6. Top Genres & Top 4 Movies per Genre (structured taste profiles) 7. Favorite Movies section (Top 10 all-time favorites) 8. Recommendation Groups (WhatsApp-style movie discussion groups) 9. Movie availability info (streaming platforms via JustWatch API) 10. Ratings aggregation (IMDb, Rotten Tomatoes, Metacritic + CineCircle ratings)

### Phase 3 (Community & Gamification)

Focus: Drive engagement, retention, and social fun 11. Badges & gamification (milestones for movies logged, reviews, Cineboards created) 12. Chat feature + status updates 13. Advanced notifications and real-time features

## Target User Context

When making UX decisions, remember the three user types:

- **Movie-curious casual viewers**: Need simple, low-friction experience
- **Enthusiast sharers/curators**: Need powerful tools for creating Cineboards and recommendations
- **Small friend circles**: Need group coordination features for "what to watch tonight"

## Common AI Prompts & Examples

### Creating a New API Endpoint

```
Create a new REST endpoint for creating movie recommendations:
- POST /api/recommendations
- Accept: fromUserId, toUserId, movieId, note
- Validate required fields
- Return created recommendation with ID
- Follow existing HealthController pattern
```

### Adding a New React Component

```
Create a MovieCard component in packages/ui:
- Display movie title, poster, and year
- Support dark/light mode with Tailwind
- Include hover effects
- Export from packages/ui/src/index.ts
- Add basic test coverage
```

### Database Schema Design

```
Design PostgreSQL schema for user friendships:
- Support bidirectional relationships
- Track request status (pending, accepted, rejected)
- Include timestamps for audit trail
- Consider indexes for performance
```

### TMDB Integration

```
Create service for TMDB movie data:
- Fetch movie details by ID
- Cache responses to avoid rate limits
- Map TMDB fields to internal Movie interface
- Handle API errors gracefully
```

## Integration Points

### External APIs

- **TMDB API**: Primary movie metadata source - implement caching and rate limiting
- **JustWatch API**: Streaming platform availability (Phase 2 feature)
- **Ratings APIs**: IMDb, Rotten Tomatoes, Metacritic aggregation (Phase 2)

### AWS Services (Planned)

- **Lambda functions**: Serverless processing
- **SQS**: Async message processing
- **S3**: Asset storage
- **CloudWatch**: Monitoring and logging
- **Cognito**: User authentication

## Best Practices

### Security

- Input validation via class-validator DTOs
- Rate limiting at Fastify layer
- Sanitize user inputs
- Never commit secrets (use .env.example for documentation)

### Performance

- Implement caching for TMDB responses
- Use database indexes for frequent queries
- Optimize watchlist hydration for large datasets
- Consider pagination for list endpoints

### Testing

- Jest + Testing Library for React components
- Unit tests for services and controllers
- Integration tests for API endpoints
- Test files should be alongside implementation

### Error Handling

- Proper HTTP status codes
- Structured error responses
- Logging with request IDs for traceability
- User-friendly error messages

## Gotchas & Common Issues

### Development Setup

- Missing deps? Run `pnpm install` first - scaffolds add references before packages exist
- Jest failures on first run? Ensure Node version matches `.nvmrc`
- TypeScript JSX errors? Check tsconfig.json includes proper JSX settings

### Path Aliases

- Use `@cinecircle/*` for package imports
- Update `tsconfig.base.json` when adding new path aliases
- Restart TypeScript server after config changes

### Styling

- Only use Tailwind utilities - avoid ad-hoc CSS
- Use design tokens from `@cinecircle/config`
- Test dark mode variants for all components

## Future Architecture Considerations

### Data Architecture Evolution

- Start with PostgreSQL for relational data
- Add DynamoDB/Cassandra for recommendation graph and analytics
- Implement CQRS pattern for read/write separation as needed

### Scalability

- Module boundaries designed for future service extraction
- Clear separation between business logic and data access
- API versioning strategy for backward compatibility

### Real-time Features

- WebSocket/Server-Sent Events for notifications
- Real-time chat and activity feeds
- Push notifications for mobile apps

## Documentation References

- `LEARN.md`: Quick developer onboarding
- `CONTRIBUTING.md`: Workflow and conventions
- `docs/architecture.md`: High-level design decisions
- `docs/adr/`: Architectural decision records

## Development Status

⚠️ **Project is in early development stage** - focus on establishing solid architectural foundations that align with the personal recommendation trust graph concept. Some configuration issues exist but don't block core development.
