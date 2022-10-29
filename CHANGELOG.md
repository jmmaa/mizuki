# CHANGELOG.md

## 1.0.6 (unreleased)

Improvements:

- code refactor
- added tests

Breaking changes:

- reduced call chain, you can now just call default export `mizuki()` to create the get and set functions.
- options `min` and `max` removed, replaced with `bounds: { min: number, max: number }`.

## 1.0.5 (28/10/2022)

Fix:

- fixed timeout not clearing properly
- fixed throttle still firing when bumped on max/min index
