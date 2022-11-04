# CHANGELOG.md

# 1.1.6 (unreleased)

Improvements:

- updated examples
- updated tests

New:

- mizuki API and handlers, for flexible configurations/custom paginated component engines.

# 1.0.6 (31/10/2022)

Improvements:

- code refactor
- added tests

Breaking changes:

- added call chain, this is to separate the config contexts so you can set different behavior in setting the same index.
- options `min` and `max` removed, replaced with `bounds: { min: number, max: number }`.

## 1.0.5 (28/10/2022)

Fix:

- fixed timeout not clearing properly
- fixed throttle still firing when bumped on max/min index
