
// ---------------------- //
// White-box unit tests of the Priorityqueue data structure (Priorityqueue.js).
//
// The method under test is enqueue():
//   - Adds item to the priorityqueue.
//   - Throws an error if the priorityqueue is full (maxNumItems items).
// ---------------------- //

import { describe, test, assertEquals, assertTrue, assertThrows } from './testUtils.js';
import { Priorityqueue } from '../src/PriorityQueue.js';

export function runPriorityQueueTests() {
    describe("Priorityqueue");

    // ---- Tests for enqueue() ---- //

    test("enqueue makes an empty priorityqueue non-empty", () => {
        const q = new Priorityqueue(3);
        q.enqueue("A",1);
        assertTrue(!q.isEmpty());
    });

    test("enqueue followed by dequeue makes the priorityqueue empty", () => {
        const q = new Priorityqueue(3);
        q.enqueue("A",1);
        q.dequeue();
        assertTrue(q.isEmpty());
    });

    test("enqueue followed by dequeue returns the same item", () => {
        const q = new Priorityqueue(3);
        q.enqueue("A",1);
        assertEquals(q.dequeue(), "A");
    });

    test("items leave the priorityqueue in the same order they were added (FIFO)", () => {
        const q = new Priorityqueue(5);
        q.enqueue("A",1);
        q.enqueue("B",5); 
        q.enqueue("C",4);
        q.enqueue("D",9);
        assertEquals(q.dequeue(), "A");
        assertEquals(q.dequeue(), "C");
        assertEquals(q.dequeue(), "B");
        assertEquals(q.dequeue(), "D");
    });

    test("a priorityqueue can be filled up to its maximum size without error", () => {
        const q = new Priorityqueue(2);
        q.enqueue("a",4);
        q.enqueue("b",2);
        assertEquals(q.dequeue(), "b");
        assertEquals(q.dequeue(), "a");
    });

    test("enqueue on a full priorityqueue throws an error", () => {
        const q = new Priorityqueue(2);
        q.enqueue("a",2);
        q.enqueue("b",1);
        assertThrows(() => q.enqueue("c",1.4));
    });

    test("the circular buffer wraps around without losing items", () => {
        const q = new Priorityqueue(3);
        q.enqueue("a",1);
        q.enqueue("b",2);
        q.enqueue("c",5);
        q.dequeue();                    // removes "a"
        q.dequeue();                    // removes "b"
        q.enqueue("d",3);
        q.enqueue("e",4);                 // the priorityqueue is full again
        assertEquals(q.dequeue(), "d");
        assertEquals(q.dequeue(), "e");
        assertEquals(q.dequeue(), "c");
    });

    test("enqueue works with different types (numbers, strings, arrays)", () => {
        const q = new Priorityqueue(3);
        q.enqueue(42);                  // number
        q.enqueue("text");              // string
        q.enqueue([2, 3]);              // node [row, col]
        assertEquals(q.dequeue(), 42);
        assertEquals(q.dequeue(), "text");
        assertEquals(q.dequeue(), [2, 3]);
    });

    test("peek shows the front item after enqueue", () => {
        const q = new Priorityqueue(3);
        q.enqueue("x");
        q.enqueue("y");
        assertEquals(q.peek(), "x");
    });

    test("a priorityqueue of size one can be filled and emptied", () => {
        const q = new Priorityqueue(1);
        q.enqueue("only");
        assertThrows(() => q.enqueue("too many"));
        assertEquals(q.dequeue(), "only");
        assertTrue(q.isEmpty());
    });
}
