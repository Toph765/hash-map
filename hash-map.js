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
        const capacity = bucket.length;
        const loadFactor = 0.75;
        const threshold = Math.floor(capacity * loadFactor);
        const load = length();
        const pairArray = entries();

        if (load > threshold) {
            bucket = bucketGenerator(bucket.length * 2);
            for (let i = 0; i < pairArray.length; i++) {
                set(pairArray[i][0], pairArray[i][1]);
            }
        }

        return bucket;
    }

    function set(key, value) {
        const hashCode = hash(key);
        let loc = bucket[hashCode];
        const keyValue = {};
        keyValue[key] = value;

        if (loc.value === null) {
            loc.value = keyValue;
        } else {
            while (Object.keys(loc.value)[0] !== key) {
                if (Object.keys(loc.value)[0] !== key && loc.next === null) {
                    const temp = node();
                    temp.value = keyValue;
                    loc.next = temp;
                    
                } else loc = loc.next;
            };
        }

        loc.value[key] = value;

        rehash();
        return bucket;
    }
    
    function get(key) {
        const hashCode = hash(key);
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
        const hashCode = hash(key);
        let loc = bucket[hashCode];

        if (loc.value === null) return false;
        if (Object.keys(loc.value)[0] !== key && loc.next === null) return false;

        while (Object.keys(loc.value)[0] !== key) {
            loc = loc.next;
        }

        return true;
    }

    function remove(key) {
        const hashCode = hash(key);
        let loc = bucket[hashCode];

        if (loc.value === null) return false;
        if (Object.keys(loc.value)[0] === key) {
            loc.value = null;
            return true;
        } else {
            while (Object.keys(loc.next.value)[0] !== key) {
                if (Object.keys(loc.next.value)[0] !== key && loc.next.next === null) return false;
                loc = loc.next;
        }}

        const temp = loc.next.next;
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

// CODE TEST //

// set(key, value) //
console.log(hashMap.set("banana", "john smith")); 
console.log(hashMap.set("banana", "jane doe"));
console.log(hashMap.set("e", 1));
console.log(hashMap.set("u", 2));
console.log(hashMap.set("e", 3));

// get(key) //
console.log(hashMap.get("banana")); // -> jane doe;
console.log(hashMap.get("e")); // -> 3;
console.log(hashMap.get("u")); // -> 2;

// has(key) //
console.log(hashMap.has("banana")); // -> true;
console.log(hashMap.has("e")); // -> true;
console.log(hashMap.has("u")); // -> true;

console.log(hashMap.has("orange")); // -> false;
console.log(hashMap.has("a")); // -> false;

// remove(key) //
console.log(hashMap.remove("u")); // -> true;
console.log(hashMap.remove("u")); // -> false;

// length() //
console.log(hashMap.length()); // -> 2;

// clear() //
//console.log(hashMap.clear()); // -> [node(), node(),...,node()];

// keys() //
console.log(hashMap.keys()); // -> ['banana' , 'e'];

// values() //
console.log(hashMap.values()); // -> ['jane doe', '3'];

// entries() //
console.log(hashMap.entries()); // -> [['banana', 'jane doe'], ['e', '3']];

//  TESTING BUCKET SIZE GROWTH//
hashMap.set("banan", 4); 
hashMap.set("bana", 5); 
hashMap.set("ban", 6); 
hashMap.set("ba", 7); 
hashMap.set("b", 8); 
hashMap.set("orange", 9); 
hashMap.set("orang", 10); 
hashMap.set("oran", 11); 
console.log(hashMap.set("ora", 12));
console.log(hashMap.length());
console.log(hashMap.entries());
console.log(hashMap.set("or", 13)); 
console.log(hashMap.length());
console.log(hashMap.entries());
hashMap.set("o", 14);
console.log(hashMap.set("apple", 15));
console.log(hashMap.length());
console.log(hashMap.entries());
console.log(hashMap.set("o", 16));
console.log(hashMap.length());
console.log(hashMap.entries());


