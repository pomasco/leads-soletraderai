# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Contact page features
  - Public contact form with reCAPTCHA integration
  - Dashboard contact form for authenticated users
  - Contact information display
  - Email integration
- Dashboard improvements
  - Enhanced navigation with side menu
  - Stats visualization
  - Recent searches table
  - Agent management interface

### Changed
- Agent template structure
  - Updated hero section with "Add to team" functionality
  - Improved process visualization
  - Enhanced service cards layout
- Navigation system
  - Separate navigation for public and dashboard areas
  - Improved responsive design

### Fixed
- Supabase connection handling
  - Added environment variable validation
  - Improved error messaging for missing configuration
- Agent data fetching
  - Fixed categories filtering
  - Improved type safety for agent data

### Security
- Added reCAPTCHA verification for public contact form
- Enhanced authentication flow for agent employment
- Improved session management

### Added
- Role-based access control system
  - Core role types and business role definitions
  - Role capability management
  - Role inheritance system
- Organization management system
  - Company and Agency organization types
  - Team member management
  - Organization verification workflow
- Backend API infrastructure
  - Express.js server with TypeScript
  - Route handlers for organizations, roles, and verification
  - Error handling middleware
  - Rate limiting and security features
- Database schema improvements
  - Role and permission tables
  - Organization and member tables
  - Verification request tracking
- Type definitions and utilities
  - Database type definitions
  - Custom hooks for roles and organizations
  - Error handling utilities

### Changed
- Project structure reorganized into monorepo
  - Separated frontend and backend packages
  - Shared type definitions
  - Centralized configuration
- Frontend build system updates
  - Path aliases configuration
  - Module resolution improvements
  - TypeScript configuration enhancements

### Security
- Added role-based security policies
- Implemented organization access controls
- Enhanced API security with rate limiting and CORS
- Added verification workflow for organizations

## [1.4.0] - 2025-01-01
### Added
- Agent process visualization system
  - Interactive step-by-step process display
  - Custom icons for each process step
  - Responsive grid layout with connecting lines
- Enhanced agent data structure
  - Process steps with icons and descriptions
  - Categories and tags support
  - Developer and avatar fields
- Improved agent template system
  - Standardized layout components
  - Reusable UI patterns
  - Documentation templates

### Changed
- Updated agent interface to support new fields
- Improved error handling in agent components
- Enhanced type definitions for better TypeScript support
- Optimized database queries for agent retrieval

### Fixed
- Process step display in AgentTemplate component
- Icon mapping for process steps
- Type definitions for optional process fields
- Database schema for process data storage

## [1.3.0] - 2024-03-15
### Added
- Webhook integration for lead generation results
- Improved location selection with Google Places API
- Enhanced form validation and error handling
- Real-time form feedback and status indicators

### Changed
- Updated ScrapingForm UI for better user experience
- Improved keyword input with Enter/Tab support
- Enhanced location selection with confirmation step

### Fixed
- Location selection validation
- Form submission error handling
- Supabase authentication error messages

[Previous versions...]

[Unreleased]: https://github.com/yourusername/project/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/yourusername/project/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/yourusername/project/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/yourusername/project/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/yourusername/project/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/yourusername/project/releases/tag/v1.0.0