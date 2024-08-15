export class Stack {
  constructor() {
    this.stack = [];
    this.top = -1;
  }

  push(value) {
    this.stack[++this.top] = value;
  }

  pop() {
    if (this.isEmpty()) return "Empty...!";

    const peekVal = this.stack.pop();
    this.top--;

    return peekVal;
  }

  peek() {
    if (this.isEmpty()) return "Empty...!";

    return this.stack[this.top];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.stack.length;
  }
}
