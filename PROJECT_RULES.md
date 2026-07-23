# Project-Level Agent Instructions

These instructions apply to the entire repository.

## 1. Scope and Priority

- The agent must treat this repository as a writing-first blog project.
- The agent must follow this file for all repository work unless the current user request explicitly overrides a specific point.
- The agent must interpret this file as project-level constraints, not as optional style suggestions.

## 2. Article Structure

- Every blog article must use the frontmatter `title` field as the navigation title.
- The visible article heading in the Markdown body must start at `##`.
- Chapter-level headings must use `###`.
- Section-level headings must use `####`.
- Finer internal breakdowns may use `#####` only when the structure would otherwise become unclear.
- The agent must not skip heading levels without a clear structural reason.

## 3. Mathematical Formatting

- Block formulas must use `$$ ... $$`.
- Inline mathematical expressions must use `$...$`.
- The agent must not use fenced math blocks such as ```` ```math ```` or `\[\]`.
- Mathematical notation within the same note must remain consistent.
- If a symbol changes meaning across contexts, the agent must state that change explicitly.

## 4. Writing Constraints

- The agent must write in clear, serious Chinese suitable for technical notes.
- The agent must define important concepts before using them heavily.
- The agent must explain major concepts in a complete chain:
  - what the concept is
  - why it is introduced
  - what problem it solves
  - how it is computed, derived, or applied
  - what assumptions, limitations, and usage boundaries it has
  - how it connects to nearby concepts
- The agent must prefer precise formulas over vague prose whenever a formula is the clearest statement.
- The agent must use formulas generously when they materially improve rigor or understanding.
- The agent must use simple ASCII diagrams, sketches, or structural illustrations when they help explain geometry, spectra, signal flow, boundaries, transforms, or other abstract relations.
- The agent must not leave major conceptual jumps unexplained.
- The agent must add transition paragraphs so a note reads as a continuous argument rather than a list of disconnected facts.
- When a concept is abstract, the agent should add a concrete example, intuitive analogy, or small derivation near the formal definition.

## 5. Methodology Requirements for All Notes

- The requirements in this section apply to all notes in the repository, not only signal processing or mathematics notes.
- The agent must not stop at naming a method, theorem, model, framework, or tool.
- For any important method or analytical tool, the agent must explain:
  - underlying mechanism
  - assumptions
  - strengths
  - limitations
  - failure modes or misuse risks
  - usage boundaries
- When a note contains estimation, approximation, modeling, abstraction, classification, optimization, or inference, the agent must distinguish clearly between:
  - theoretical definition
  - practical approximation
  - finite-data or finite-context estimate
  - tradeoff being made
- The agent must build a visible logic chain from premise to result. Readers should be able to see not just the conclusion, but how the conclusion is reached.
- The agent must maintain contextual coherence by explicitly connecting related concepts, earlier sections, parallel ideas, and downstream applications.
- The agent should draw relevant cross-references when they improve understanding, connecting a concept to related methods, neighboring topics, or broader theory. Such references must clarify structure and meaning, not pad the text.
- The agent must write in a way that helps readers integrate ideas across chapters and notes, rather than memorize isolated local facts.

## 6. Rigor and Explanatory Depth

- For technical notes, the agent must include the key formulas, derivations, or structural relations that support the main claims.
- The agent must explain the origin of important formulas when the origin is not obvious from context.
- The agent must identify what each important formula is used for.
- The agent must not present advanced results as if they were self-evident.
- If a result depends on a hidden condition, the agent must surface that condition.
- If a method has a standard tradeoff, the agent must state the tradeoff explicitly.

## 7. Coherence Across Notes

- When content is split into a dedicated note, the agent must leave a short bridge section in the original note explaining:
  - why the topic matters
  - what later chapters depend on it
  - where the detailed note now lives
- The agent must prefer improving an existing note in place rather than scattering related material across multiple files without references.
- When discussing related books, chapters, theories, or notes, the agent must make the relationship explicit so the study path remains legible.
- Before creating or substantially editing a note, the agent must actively scan the repository for strongly related existing notes. When a strong conceptual, methodological, prerequisite, or downstream relationship exists, the agent must add appropriate `[[wikilinks]]` in the most relevant locations, both from the edited note to related notes and, when useful, from related notes back to the edited note.
- Outgoing links must be curated, not exhaustive. The agent must add `[[wikilinks]]` where they help explain a prerequisite, contrast a neighboring concept, support a downstream application, or connect to a strongly related note. If several related notes are useful, the agent should add a `### 关联笔记` section near the end of the article and briefly state the relationship for each link.
- The agent must not manually maintain a generic “backlinks” or “被引用于” section unless the user explicitly asks for it. Inbound relationships should normally be provided by Obsidian backlinks or graph view; manual reciprocal links should be added only when they clarify an important study path.
- External sources, videos, datasheets, standards, papers, and webpages must be listed in a dedicated `### 参考链接` section, not in YAML frontmatter. Internal notes use Obsidian `[[wikilinks]]`; external sources use normal Markdown links with clear descriptive names.
- The `### 关联笔记` section and the `### 参考链接` section must remain separate: the former is for internal knowledge-graph navigation, and the latter is for external source attribution. The agent must not mix source URLs into internal-link sections or place internal wikilinks in the reference-source list unless the user explicitly requests a combined bibliography.

## 8. Language and Tone

- The agent must avoid exaggerated, promotional, overly casual, or empty motivational wording.
- The agent must avoid obvious AI-style filler, repetitive rhetorical framing, and low-information transitions.
- The agent must keep the prose natural and readable without sacrificing precision.
- If a humanizing or style-polishing capability is available, the agent may use it to smooth the wording.
- If such a capability is unavailable, the agent must still satisfy the tone and clarity requirements in this file without blocking on that capability.

## 9. Disallowed Patterns

- The agent must not reduce important sections to outline-like placeholder prose when the topic requires explanation.
- The agent must not replace explanation with terminology dumping.
- The agent must not present formulas without enough surrounding interpretation to make them usable.
- The agent must not create fragmented notes in which sections fail to connect logically.
- The agent must not treat limitations, assumptions, and method boundaries as optional details when they materially affect understanding.
