# Saad Shahd

**Principal Software Engineer**

📧 dev.saad.shahd@gmail.com | 🐙 github.com/saadshahd | 💼 linkedin.com/in/saadshahd | 📍 London, United Kingdom

---

## Summary

Building realtime distributed systems that scale through architectural separation—DSLs for domain experts, state machines for correctness, event-driven patterns for operational simplicity. Making illegal states unrepresentable through type systems and formal validation. 12+ years architecting platforms that handle millions of events while maintaining both velocity and correctness guarantees.

---

## Key Expertise

**Distributed Systems & High-Scalability Infrastructure Design**
Architecting systems that handle millions of events while maintaining correctness guarantees and operational simplicity.

**Real Time Data Stream Processing (Kafka)**
Building event-driven architectures with immutable streams, exactly-once semantics, and graceful degradation.

**Microservice Architecture (DDD, CQRS, gRPC)**
Decomposing monoliths into bounded contexts with clear interfaces, reducing coupling while maintaining consistency.

**Platform Engineering & Infrastructure Evolution**
Designing infrastructure that lets teams deploy confidently—through observability, automated testing, and progressive delivery.

**Domain-Specific Language Design & State Machine Modeling**
Designing DSLs that let domain experts express complex rules without code—using formal grammars (ANTLR), state machines (XState), and topological compilation. Making illegal states unrepresentable through type systems and finite state machines.

---

## Experience

### Senior Software Engineer

**Wise** | London | 03/2022 - Present

Building infrastructure for the world's most international account—helping 16M+ customers move money across borders.

- **Increased conversion 19% through hypothesis-driven experimentation.** Isolated pricing friction points through rapid A/B testing. Short iterations revealed psychological barriers traditional analytics missed—validating hunches with data, not opinions.

- **Improved team velocity 4x by decomposing tangled service dependencies into bounded contexts with explicit contracts (DDD principles).** Previous architecture forced coordination across 8 teams for every change. Refactored to message-driven boundaries where services communicate through immutable events. Each team could deploy independently. Tradeoff: Added complexity in event schema evolution, but eliminated coordination tax and reduced deployment risk.

- **Increased user satisfaction 26% by consolidating fragmented product components.** Migrated six inconsistent UIs into a unified design system backed by shared state management. Users no longer learned different interactions for similar actions—cognitive load dropped, satisfaction rose.

---

### Principal Software Engineer

**Statsbomb** | Bath, UK | 03/2018 - 03/2022

Led core data infrastructure for football analytics platform—serving Premier League clubs, international federations, and media companies.

- **Designed domain-specific language (ANTLR grammar) enabling product managers to define sports rules as configuration.** Topological dependency resolution compiled declarative sequences ("pass then reception") into validation logic. Expanded from soccer to American football with zero code changes. Pattern: Separation of rules from execution unlocked non-linear scaling (100 → 1000+ collectors without proportional engineering).

- **Built collaborative collection system (Electron + XState + Apollo GraphQL) replacing 16-hour sequential workflows with 4-hour concurrent collection.** XState state machines prevented illegal states by design—collectors couldn't submit without required fields, couldn't enter freeze frames without active events. 30+ contextual keyboard shortcuts (Mousetrap with module scoping) built muscle memory—same key, different action per context.

- **Architected claims-based metadata graph for automatic entity resolution across crowd-sourced data.** 5-person team resolved conflicts once—golden entities cascaded to dependent systems automatically. 99% error prevention through structural correctness (typed schemas, compile-time guarantees) vs runtime validation.

- **Event sourcing with Kafka provided immutable audit trails—critical when clubs make million-pound decisions.** Architecture enabled replay for debugging, consistency without distributed transactions, and linear throughput scaling. Reduced match collection from 16 sequential hours to 4 concurrent hours with near real-time (~20s latency).

- **Scaled from 2-person partnership to distributed subsystem ownership across Cairo team.** Engineers took foundational concepts (DSLs, state machines, event sourcing) and evolved them to contexts we hadn't explored—claims-based metadata resolution, concurrent collection workflows, desktop app state management. Pattern: Use production libraries (Apollo, Kafka, ANTLR) for infrastructure; focus engineering on domain problems. Lesson learned: Team building is the multiplier for ambitious architecture. Waiting until year 3 meant racing geo-political constraints before shipping customer-facing DSL.

---

### Senior Software Engineer

**Eventtus** | Cairo, Egypt | 03/2017 - 03/2018

Built engagement platform for events—the leading event app provider across Middle East and North Africa.

- **Architected entire platform as decoupled microservices using DDD, CQRS, and gRPC.** Decomposed monolithic Rails app into bounded contexts—attendees, sessions, networking, analytics. Each context owned its data, exposed typed interfaces, communicated through events. Teams could evolve services independently without coordination tax. Pattern: Eventual consistency over distributed transactions—accept temporary staleness for operational simplicity.

---

### Senior Frontend Engineer

**Instabug** | Cairo, Egypt | 11/2015 - 08/2016

Core team member building tools for mobile developers to ship better apps—crash reporting, user feedback, and performance monitoring.

---

## Skills

### Architecture & Systems

**Expert**: Distributed Systems, Event-Driven Architecture, Microservices, DDD, CQRS, DSL Design, State Machine Modeling
**Proficient**: System Design, Platform Engineering, Real Time Processing, Stream Processing

### Backend & Data

**Expert**: Node.js, Kafka, Redis, SQL, REST, GraphQL, gRPC, ANTLR
**Proficient**: Python, Rust, Clojure, Scala, RocksDB, MongoDB, Neo4j, Druid

### DevOps & Infrastructure

**Expert**: Kubernetes, Docker, AWS, Prometheus, Grafana
**Proficient**: Helm, JenkinsX, GCP, Nginx, HAProxy

### Frontend

**Expert**: TypeScript, React, XState, HTML/CSS, Electron
**Proficient**: Vue, Angular, Redux, RxJS, D3

---
