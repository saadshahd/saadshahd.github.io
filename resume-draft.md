# Saad Shahd

**Principal Software Engineer**

📧 dev.saad.shahd@gmail.com | 🐙 github.com/saadshahd | 💼 linkedin.com/in/saadshahd | 📍 London, United Kingdom | 📞 +447428240774

---

## Summary

Principal Software Engineer building realtime distributed systems that scale. I make architectural decisions that unlock velocity while maintaining correctness—through event-driven patterns, immutable data flows, and infrastructure designed to fail gracefully. 12+ years taking platforms from prototype to production at companies like Wise and Statsbomb, handling millions of events per second.

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

---

## Experience

### Senior Software Engineer

**Wise** | London | 03/2022 - Present

Building infrastructure for the world's most international account—helping 16M+ customers move money across borders.

- **Increased conversion 19% through hypothesis-driven experimentation.** Isolated pricing friction points through rapid A/B testing. Short iterations revealed psychological barriers traditional analytics missed—validating hunches with data, not opinions.

- **Improved team velocity 4x by eliminating accidental complexity.** Refactored tangled service dependencies into composable modules with clear boundaries. Each team could now deploy independently. Reduced coordination overhead from "everyone talks to everyone" to "services talk through contracts."

- **Increased user satisfaction 26% by consolidating fragmented product components.** Migrated six inconsistent UIs into a unified design system backed by shared state management. Users no longer learned different interactions for similar actions—cognitive load dropped, satisfaction rose.

---

### Principal Software Engineer

**Statsbomb** | Bath, UK | 03/2018 - 03/2022

Led core data infrastructure for football's most trusted analytics platform—serving Premier League clubs, international federations, and media companies.

- **Architected realtime data streaming platform from scratch, handling 10K+ events/second.** Chose event sourcing with Kafka for immutable audit trails—critical when clubs make million-pound decisions on our data. Event-driven design let us replay history, debug production issues in development, and maintain consistency across services without distributed transactions.

- **Increased data collection speed 6x through parallel processing architecture.** Previous sequential pipeline became the bottleneck—one slow collector blocked everyone. Redesigned as independent stream processors with coordinated checkpoints. Tradeoff: More complex failure handling, but throughput scaled linearly with workers.

- **Improved data quality 8x by making validation impossible to skip.** Moved from "trust but verify" post-processing to typed schemas with compile-time guarantees. Invalid data couldn't enter the system—structural correctness over runtime checks. Quality issues dropped from daily firefighting to rare edge cases.

- **These platform improvements drove 3x increase in client satisfaction.** Faster turnaround meant clubs received insights before match deadlines. Better quality meant fewer "wait, this can't be right" conversations. Technical decisions directly impacted renewal rates—architecture has business consequences.

---

### Senior Software Engineer

**Eventtus** | Cairo, Egypt | 03/2017 - 03/2018

Built engagement platform for events—the leading event app provider across Middle East and North Africa.

- **Architected entire platform as decoupled microservices using DDD, CQRS, and gRPC.** Decomposed monolithic Rails app into bounded contexts—attendees, sessions, networking, analytics. Each context owned its data, exposed typed interfaces, communicated through events. Teams could evolve services independently without coordination tax. Pattern: Eventual consistency over distributed transactions—accept temporary staleness for operational simplicity.

---

### Senior Frontend Engineer

**Instabug** | Cairo, Egypt | 11/2015 - 08/2016

Core team member building tools for mobile developers to ship better apps—crash reporting, user feedback, and performance monitoring.

- **Built realtime crash reporting dashboard processing 100K+ events daily.** Designed client SDK for minimal performance overhead while capturing rich debugging context. Challenge: Collect enough data to reproduce bugs without impacting app performance—solved through smart sampling, local aggregation, and batched uploads.

---

## Skills

### Architecture & Systems

**Expert**: Distributed Systems, Event-Driven Architecture, Microservices, DDD, CQRS
**Proficient**: System Design, Platform Engineering, Real Time Processing, Stream Processing

### Backend & Data

**Expert**: Node.js, Kafka, Redis, SQL, REST, GraphQL, gRPC
**Proficient**: Python, Rust, Clojure, Scala, RocksDB, MongoDB, Neo4j, Druid

### DevOps & Infrastructure

**Expert**: Kubernetes, Docker, AWS, Prometheus, Grafana
**Proficient**: Helm, JenkinsX, GCP, Nginx, HAProxy

### Frontend

**Expert**: TypeScript, React, HTML/CSS
**Proficient**: Vue, Angular, Redux, xstate, RxJS, D3, Electron

---

## Find Me Online

**GitHub**: https://github.com/saadshahd
**LinkedIn**: https://linkedin.com/in/saadshahd
