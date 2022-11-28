class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets
    this.count = 0
    this.data = new Array(this.capacity).fill(null)

  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    const idx = this.hashMod(key);
    let currentPair = this.data[idx];

    while (currentPair && currentPair.key !== key) {
      currentPair = currentPair.next
    }
    if (currentPair) {
      currentPair.value = value;
      return this;
    }
    const newPair = new KeyValuePair(key, value)
    if (this.data[idx]) newPair.next = this.data[idx]
    this.data[idx] = newPair
    this.count++



  }


  read(key) {
    for (let i = 0; i < this.data.length; i++) { // iterate over all bucket in hasharray
      let linkedList = this.data[i]       // treat each bucket is a linkedlist
      let current = linkedList            //
      while (current) {                   // traverse linkedlist
        if (current.key === key) {         // if key matches key
          return current.value              // return that value
        }
        current = current.next          // if not found, move on to the next linked list
      }
    }
    return undefined                  // if not found, return undefined
  }


  resize() {
    // Your code here
  }


  delete(key) {
    // Your code here
  }
}


module.exports = HashTable;
