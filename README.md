# RxJS Deep Dive

A collection of custom RxJS implementations built to understand how RxJS works under the hood — not just how to use it, but how it's actually built.

## Why this repo?

Using RxJS operators is one thing. Understanding what happens inside them — how subscribers are created, closed, and cleaned up — is another level entirely. These examples are built from scratch to explore those internals.

## Examples

### `take` — Custom implementation
A from-scratch reimplementation of RxJS's `take()` operator, exploring:
- How `Subscriber` and `Observable` work internally
- How closing a subscriber stops upstream emission
- How finalization/unsubscription logic is wired up
- How `subscriber.closed` is used to short-circuit array iteration

## Stack
- TypeScript
- RxJS
