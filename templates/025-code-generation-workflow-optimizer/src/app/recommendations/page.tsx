"use client";
import Nav from "@/components/Nav";
import { useState } from "react";

const categories = ["All", "Django", "Flask", "Testing", "API", "Database"];

const templates = [
  {
    id: 1,
    title: "Django Model with Validation",
    category: "Django",
    impact: "high",
    timeSaved: "4.2 min",
    successRate: 94,
    before: `Create a Django model for users`,
    after: `Create a Django model 'UserProfile' with fields:
- bio (TextField, max 500 chars, optional)
- avatar_url (URLField, optional)
- date_of_birth (DateField, optional)
- created_at (auto, DateTimeField)
Include: Meta ordering by -created_at,
__str__ returning username, clean()
validation for date_of_birth in past.
Use type hints on all methods.`,
  },
  {
    id: 2,
    title: "Flask REST Endpoint",
    category: "Flask",
    impact: "high",
    timeSaved: "3.8 min",
    successRate: 91,
    before: `Write a Flask API endpoint for products`,
    after: `Create a Flask Blueprint 'products' with GET
/api/products endpoint that:
- Accepts query params: page (int, default=1),
  per_page (int, default=20), category (str, optional)
- Returns JSON with 'items' array and 'pagination' object
- Handles 404 for invalid page numbers
- Include request validation with marshmallow
- Add rate limiting decorator (100/hour)
- Return proper HTTP status codes`,
  },
  {
    id: 3,
    title: "Pytest Unit Tests",
    category: "Testing",
    impact: "medium",
    timeSaved: "5.1 min",
    successRate: 88,
    before: `Write tests for the user service`,
    after: `Write pytest tests for UserService class covering:
- test_create_user_with_valid_data (happy path)
- test_create_user_duplicate_email (raises ValueError)
- test_get_user_by_id_exists (returns User)
- test_get_user_by_id_not_found (returns None)
Use @pytest.fixture for test user data and
mock the database session with unittest.mock.
Follow AAA pattern (Arrange, Act, Assert).
Include docstrings explaining each test case.`,
  },
  {
    id: 4,
    title: "SQLAlchemy Query Optimization",
    category: "Database",
    impact: "high",
    timeSaved: "3.5 min",
    successRate: 87,
    before: `Optimize the database queries`,
    after: `Optimize SQLAlchemy queries for Order model:
- Replace N+1 query on Order.items with
  joinedload() eager loading
- Add .only() to select specific columns:
  id, status, total, created_at
- Use subquery for aggregation of order totals
  by customer instead of Python-side grouping
- Add index hint for date_range filter
Return the optimized query with explain comment.`,
  },
  {
    id: 5,
    title: "Django REST Serializer",
    category: "Django",
    impact: "medium",
    timeSaved: "2.9 min",
    successRate: 92,
    before: `Make a serializer for the product model`,
    after: `Create a DRF ModelSerializer for Product with:
- Fields: id, name, slug, price, description,
  category (nested CategorySerializer), images
- Validation: price > 0, name unique per category
- Read-only: id, slug (auto-generated from name)
- Write: create() with nested category lookup
- Custom to_representation for price formatting
- Include SerializerMethodField for 'in_stock'
  checking inventory_count > 0`,
  },
  {
    id: 6,
    title: "Flask Authentication Middleware",
    category: "Flask",
    impact: "medium",
    timeSaved: "4.5 min",
    successRate: 85,
    before: `Add JWT auth to Flask app`,
    after: `Create Flask middleware for JWT authentication:
- Decorator @require_auth for protected routes
- Extract Bearer token from Authorization header
- Validate JWT with PyJWT, check exp and iss claims
- Attach decoded user to flask.g.current_user
- Return 401 with JSON error for: missing token,
  expired token, invalid signature
- Add @require_role('admin') decorator for RBAC
- Skip auth for OPTIONS requests (CORS preflight)`,
  },
  {
    id: 7,
    title: "API Error Handling",
    category: "API",
    impact: "low",
    timeSaved: "2.1 min",
    successRate: 93,
    before: `Add error handling to the API`,
    after: `Create a centralized error handler for Flask API:
- Custom APIError exception class with status_code,
  message, and error_code fields
- Register @app.errorhandler for 400, 401, 403, 404, 500
- Return consistent JSON: {"error": {"code": str,
  "message": str, "details": optional}}
- Log 500 errors with traceback to structured logger
- In development: include traceback in response
- Add request_id to all error responses for tracing`,
  },
  {
    id: 8,
    title: "Database Migration Script",
    category: "Database",
    impact: "low",
    timeSaved: "2.8 min",
    successRate: 90,
    before: `Create a migration for adding new fields`,
    after: `Create an Alembic migration that:
- Adds 'phone' (String(20), nullable) to users table
- Adds 'verified_at' (DateTime, nullable) to users
- Creates index on 'phone' column (unique)
- Include downgrade: drop index, then drop columns
- Use batch_alter_table for SQLite compatibility
- Add data migration: set verified_at = created_at
  for users where is_active = True`,
  },
];

const recommendations = [
  {
    title: "Add context about project structure to all prompts",
    impact: "Reduces iterations by 35%",
    effort: "Low",
    description: "Include file paths, related models, and import context when generating new code. Your team averages 2.3 extra iterations due to missing context.",
  },
  {
    title: "Use structured output format specifications",
    impact: "Improves success rate by 28%",
    effort: "Low",
    description: "Specify the exact output format (function signature, return type, docstring style) instead of relying on the model to infer it.",
  },
  {
    title: "Create shared prompt prefix for Django projects",
    impact: "Saves 12 min/dev/day",
    effort: "Medium",
    description: "Standardize a team-wide Django prompt prefix that includes your model conventions, naming patterns, and test requirements.",
  },
  {
    title: "Break complex generation tasks into sequential steps",
    impact: "Reduces errors by 41%",
    effort: "Medium",
    description: "Instead of generating entire features in one prompt, chain: model → serializer → view → test. Each step builds on verified output.",
  },
];

function ImpactBadge({ impact }: { impact: string }) {
  const styles = {
    high: "bg-green/10 text-green",
    medium: "bg-yellow/10 text-yellow",
    low: "bg-muted/10 text-muted",
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles[impact as keyof typeof styles]}`}>
      {impact}
    </span>
  );
}

export default function Recommendations() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedTemplate, setExpandedTemplate] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? templates : templates.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Recommendations</h1>
          <p className="text-sm text-muted mt-1">Optimized prompts and workflow suggestions for your team</p>
        </div>

        {/* Workflow Recommendations */}
        <div className="mb-10">
          <h2 className="font-semibold text-lg mb-4">Workflow Optimizations</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {recommendations.map((r) => (
              <div key={r.title} className="bg-card border border-card-border rounded-xl p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium text-sm">{r.title}</h3>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full whitespace-nowrap">{r.effort} effort</span>
                </div>
                <p className="text-xs text-muted mb-3">{r.description}</p>
                <div className="text-xs font-medium text-green">{r.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Template Library */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Optimized Prompt Templates</h2>

          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === c ? "bg-accent text-white" : "bg-card border border-card-border text-muted hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Templates */}
          <div className="space-y-4">
            {filtered.map((t) => (
              <div key={t.id} className="bg-card border border-card-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedTemplate(expandedTemplate === t.id ? null : t.id)}
                  className="w-full text-left p-5 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm">{t.title}</h3>
                      <ImpactBadge impact={t.impact} />
                    </div>
                    <div className="flex gap-4 text-xs text-muted">
                      <span>{t.category}</span>
                      <span>Saves {t.timeSaved}/use</span>
                      <span>{t.successRate}% success rate</span>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-muted transition-transform shrink-0 ${expandedTemplate === t.id ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedTemplate === t.id && (
                  <div className="px-5 pb-5 border-t border-card-border pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-red" />
                          <span className="text-xs font-medium text-red">Before (Inefficient)</span>
                        </div>
                        <pre className="bg-background rounded-lg p-3 text-xs font-mono text-muted whitespace-pre-wrap">{t.before}</pre>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-green" />
                          <span className="text-xs font-medium text-green">After (Optimized)</span>
                        </div>
                        <pre className="bg-background rounded-lg p-3 text-xs font-mono text-foreground whitespace-pre-wrap">{t.after}</pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
