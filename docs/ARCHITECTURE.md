# TRINETRA Architecture

## Design principles

1. **Point-of-contact intelligence** — decide before money moves.  
2. **Explainability** — every score exposes signals / features (court-admissible narrative).  
3. **Multi-tenant surfaces** — citizen UX ≠ LEA ops UX, same core engines.  
4. **Offline-demo reliability** — engines run without cloud keys; LLM optional later.  
5. **Audit trail** — alert drafts & packages are exportable text artifacts.

## Logical layers

```
Presentation   → Next.js App Router (landing + 6 modules)
Application    → Client-side orchestration, demo state
Intelligence   → Pure TS engines (scam, currency, shield, graph, geo)
Data           → Synthetic incidents / clusters / hotspots / samples
Integration*   → NCRB, 1930, bank FRA, telecom (roadmap adapters)
```

\* Integrations are designed as adapter interfaces; Phase II ships with simulated feeds.

## Module contracts

### Scam detector
- **In:** free text (SMS, chat, call script)  
- **Out:** `riskScore`, `riskLevel`, `category`, `signals[]`, `mhaAlertDraft?`  
- **Method:** weighted multi-regex / linguistic pattern fusion + safe-marker discount  

### Currency agent
- **In:** structured note scan features (proxy for CV pipeline)  
- **Out:** `authenticity`, `confidence`, per-feature pass/fail, field SOP  
- **Method:** multi-feature scoring (microprint, thread, UV, noise, sharpness…)  
- **Production path:** mobile CV → same feature schema → same scorer  

### Fraud graph
- **In:** nodes/edges (accounts, devices, numbers, victims, compounds)  
- **Out:** interactive graph + cluster intelligence packages  
- **Method:** deterministic force layout; cluster metadata for legal package  

### Geospatial
- **In:** city-level hotspots with intensity / trend / crime type  
- **Out:** ranked patrol priorities + inter-district share hints  

### Citizen Shield
- **In:** conversational turns  
- **Out:** risk-aware guidance wrapping scam engine + reporting SOP  

## Scalability

| Tier | Capacity approach |
|------|-------------------|
| Citizen chat | Stateless scoring; horizontal web workers / edge |
| Bank POS | On-device feature extract + light server score |
| LEA graph | Batch graph DB (Neo4j/TigerGraph) + streaming links |
| National geo | Tile service + state partitions |

## Security & privacy (production)

- PII minimisation on citizen channel; evidence vault with RBAC for LEA  
- Immutable hash of intelligence packages for chain-of-custody  
- No raw OTP/PIN storage; redaction in logs  

## Future AI upgrades

- SpaceXAI `grok-4.5` for multilingual Shield & script paraphrases  
- Multimodal note OCR / UV image classification  
- Voice deepfake / spoof detection on call audio  
- GNN-based mule discovery on live payment graphs  
