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
    // const idx = this.hashMod(key);
    // let currentPair = this.data[idx];

    // while (currentPair && currentPair.key !== key) {
    //   currentPair = currentPair.next
    // }
    // if (currentPair) {
    //   currentPair.value = value;
    //   return this;
    // }
    // const newPair = new KeyValuePair(key, value)
    // if (this.data[idx]) newPair.next = this.data[idx]
    // this.data[idx] = newPair
    // this.count++

    if (this.count / this.capacity > 0.7) this.resize();

    // Find the bucket index
    const index = this.hashMod(key);

    let currentPair = this.data[index];

    while (currentPair && currentPair.key !== key) {
      currentPair = currentPair.next;
    }

    if (currentPair) {
      currentPair.value = value;
    } else {
      const newPair = new KeyValuePair(key, value);
      newPair.next = this.data[index];
      this.data[index] = newPair;
      this.count++;
    }
    
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


  //iterate over old data
  //at each, set bucket to oldData[index]//
  //traverse the linked list
  //each node, we fill in values
  resize() {
    // let oldData = this.data
    // this.capacity *= 2
    // this.data = new Array(this.capacity).fill(null)
    // this.count = 0
    // let linkedList = null
    // for (let i = 0; i < oldData.length; i++){
    //   linkedList = oldData[i]
    //   while (linkedList) {
    //     this.insert(linkedList.key, linkedList.value)
    //     linkedList = linkedList.next
    //   }
    // }

    const oldData = this.data;

    this.capacity = 2 * this.capacity;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;

    let currentPair = null;

    for (let i = 0; i < oldData.length; i++) {
      currentPair = oldData[i];

      while (currentPair) {
        this.insert(currentPair.key, currentPair.value);

        currentPair = currentPair.next;
      }
    }
  }


  delete(key) {
    for (let i = 0; i < this.data.length; i++) { // iterate over all bucket in hasharray
      let linkedList = this.data[i]       // treat each bucket as a linkedlist
      let current = linkedList            
      while (current) {                   // traverse linkedlist
        if (current.next.key === key) {         // if key matches key
          current.next = current.next.next
          return              
        }
        current = current.next          // if not found, move on to the next linked list
      }
    }
    return "Key not found"                  
  }
}


module.exports = HashTable;
