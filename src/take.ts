import { Observable, Subscriber } from 'rxjs';

/**
 * Custom implementation of RxJS take() operator.
 * Built from scratch to understand how RxJS manages subscribers internally.
 *
 * Key concepts demonstrated:
 * - How pipeable operators wrap Observables
 * - How Subscriber.unsubscribe() closes the upstream
 * - How subscriber.closed short-circuits further emissions
 * - How finalization logic is returned from the Observable constructor
 */
export function take<T>(count: number) {
  return (source: Observable<T>) =>
    new Observable<T>((destination) => {
      let seen = 0;

      const subscriber = new Subscriber<T>({
        next(value) {
          if (++seen < count) {
            destination.next(value);
          } else {
            // We've seen enough - close upstream and complete downstream
            subscriber.unsubscribe();
            destination.next(value);
            destination.complete();
          }
        },
        error(err) {
          destination.error(err);
        },
        complete() {
          destination.complete();
        },
      });

      source.subscribe(subscriber);

      // Finalization logic - runs on error, complete, or unsubscribe
      return () => subscriber.unsubscribe();
    });
}

/**
 * Creates an Observable from an array-like structure.
 * Checks subscriber.closed on each iteration to respect early unsubscription.
 */
export function fromArrayLike<T>(array: ArrayLike<T>) {
  return new Observable<T>((subscriber: Subscriber<T>) => {
    for (let i = 0; i < array.length; i++) {
      if (subscriber.closed) return; // respect unsubscription
      subscriber.next(array[i]!);
    }
    subscriber.complete();
  });
}

// --- Usage example ---
const source$ = fromArrayLike([1, 2, 3, 4, 5]);

source$.pipe(take(3)).subscribe({
  next(x) { console.log('Value:', x); },
  error(err) { console.error('Error:', err); },
  complete() { console.log('Complete'); },
});
