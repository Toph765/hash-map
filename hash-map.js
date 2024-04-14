const node = (value = null, next = null) => {
    return {
        value,
        next
    };
}

const hashMap = (() => {
    let bucket = bucketGenerator(16);

    function bucketGenerator(n) {
        let bucket = [];
        for (let i = 1; i <= n; i++) {
            bucket.push(node());
        }

        return bucket;
    }

    function hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucket.length;
        }
        return hashCode;
    }

    function rehash() {
        let currentCapacity = length();
        capacity = bucket.length;
        let loadFactor = 0.75;
        let threshold = capacity * loadFactor;

        if (currentCapacity > threshold) {
            let temp = bucket.slice();
            let newBucket = bucketGenerator(bucket.length);
            temp = temp.concat(newBucket);
            return bucket = temp;
        }
    }

    function set(key, value) {
        let hashCode = hash(key);
        let loc = bucket[hashCode];
        let keyValue = {};
        keyValue[key] = value;

        if (loc.value === null) {
            loc.value = keyValue;
            return bucket;
        };
        if (loc.value && Object.keys(loc.value)[0] === key) {
            loc.value[key] = value;
            return bucket;
        };

        while (loc.next !== null) {
            loc = loc.next;
            if (loc.value && Object.keys(loc.value)[0] === key) {
                loc.value[key] = value;
                return bucket;
            };
        }

        let temp = node();
        temp.value = keyValue;
        loc.next = temp;

        rehash();
        return bucket;
    }
    
    function get(key) {
        let hashCode = hash(key);
        let loc = bucket[hashCode];
        let value;

        if (loc.value === null) return null;
        if (Object.keys(loc.value)[0] !== key && loc.next === null) return null;

        while (Object.keys(loc.value)[0] !== key) {
            loc = loc.next;
        }

        value = loc.value[key];

        return value;
    }

    function has(key) {
        let hashCode = hash(key);
        let loc = bucket[hashCode];

        if (loc.value === null) return false;
        if (Object.keys(loc.value)[0] !== key && loc.next === null) return false;

        while (Object.keys(loc.value)[0] !== key) {
            loc = loc.next;
        }

        return true;
    }

    function remove(key) {
        let hashCode = hash(key);
        let loc = bucket[hashCode];

        if (loc.value === null) return false;
        if (Object.keys(loc.value)[0] !== key && loc.next === null) return false;
        if (Object.keys(loc.value)[0] === key && loc.next === null) {
            loc.value = null;
            return true;
        }

        while (Object.keys(loc.next.value)[0] !== key) {
            loc = loc.next;
        }

        let temp = loc.next.next;
        loc.next = temp;

        return true;
    }

    function length() {
        let count = 0;

        for (let i = 0; i < bucket.length; i++) {
            let loc = bucket[i];

            if (loc.value) {
                count += 1;
            }
            
            while (loc.next !== null) {
                count += 1;
                loc = loc.next;
            }
        }

        return count;
    }

    function clear() {
        bucket = bucketGenerator(16);

        return bucket;
    }

    function keys() {
        let keyArray = [];

        for (let i = 0; i < bucket.length; i++) {
            let loc = bucket[i];

            if (loc.value) {
                keyArray.push(Object.keys(loc.value)[0]);
            }
            
            while (loc.next !== null) {
                loc = loc.next;
                keyArray.push(Object.keys(loc.value)[0]);
            }
        }

        console.log(bucket)
        return keyArray;
    }

    function values() {
        let valuesArray = [];

        for (let i = 0; i < bucket.length; i++) {
            let loc = bucket[i];

            if (loc.value) {
                let value = loc.value[Object.keys(loc.value)[0]];
                valuesArray.push(value);
            }
            
            while (loc.next !== null) {
                loc = loc.next;
                let value = loc.value[Object.keys(loc.value)[0]];
                valuesArray.push(value);
            }
        }

        return valuesArray;
    }

    function entries() {
        let entriesArray = [];

        for (let i = 0; i < bucket.length; i++) {
            let loc = bucket[i];

            if (loc.value) {
                let value = loc.value[Object.keys(loc.value)[0]];
                let key = Object.keys(loc.value)[0];
                let entries = [key, value];
                entriesArray.push(entries);
            }
            
            while (loc.next !== null) {
                loc = loc.next;
                let value = loc.value[Object.keys(loc.value)[0]];
                let key = Object.keys(loc.value)[0];
                let entries = [key, value];
                entriesArray.push(entries);
            }
        }

        return entriesArray;
    }

    return {
        bucketGenerator,
        hash,
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries,
    }
})();


console.log(hashMap.set("banana", "john smith"));
console.log(hashMap.set("banana", "jane doe"));

console.log(hashMap.set('e', 'a'));
console.log(hashMap.set('e', 'b'));
console.log(hashMap.set('u', 'c'));
console.log(hashMap.set('e', 'hello'));
console.log(hashMap.set("banana", "jack"));
console.log(hashMap.get("e")); 
console.log(hashMap.entries())
