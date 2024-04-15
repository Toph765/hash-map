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
        const loc = bucket[hashCode];
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
        const loc = bucket[hashCode];
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
        const loc = bucket[hashCode];

        if (loc.value === null) return false;
        if (Object.keys(loc.value)[0] !== key && loc.next === null) return false;

        while (Object.keys(loc.value)[0] !== key) {
            loc = loc.next;
        }

        return true;
    }

    function remove(key) {
        const hashCode = hash(key);
        const loc = bucket[hashCode];

        if (loc.value === null) return false;
        if (Object.keys(loc.value)[0] !== key && loc.next === null) return false;
        if (Object.keys(loc.value)[0] === key && loc.next === null) {
            loc.value = null;
            return true;
        }

        while (Object.keys(loc.next.value)[0] !== key) {
            loc = loc.next;
        }

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


console.log(hashMap.set("banana", "john smith")); //1
console.log(hashMap.set("banana", "jane doe"));

console.log(hashMap.set("e", 1)); //2
console.log(hashMap.set("u", 2)); //3
console.log(hashMap.set("e", 3));
hashMap.set("banan", 4); //4
hashMap.set("bana", 5); //5
hashMap.set("ban", 6); //6
hashMap.set("ba", 7); //7
hashMap.set("b", 8); //8
hashMap.set("orange", 9); //9
hashMap.set("orang", 10); //10
hashMap.set("oran", 11); //11
console.log(hashMap.set("ora", 12)); //12
console.log(hashMap.length());
console.log(hashMap.entries());
console.log(hashMap.set("or", 13)); //13
console.log(hashMap.length());
console.log(hashMap.entries());
hashMap.set("o", 14); //14
console.log(hashMap.set("apple", 15)); //15
console.log(hashMap.length());
console.log(hashMap.entries());
console.log(hashMap.set("o", 16)); //15
console.log(hashMap.length());
console.log(hashMap.entries());


