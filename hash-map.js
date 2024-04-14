const node = (value = null, next = null) => {
    return {
        value,
        next
    };
}

const hashMap = (() => {
    let bucket = [];

    function bucketGenerator(n) {
        for (let i = 1; i <= n; i++) {
            bucket.push(node());
        }

        return hashMap;
    }

    function hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucket.length;
        }
        return hashCode;
    }

    function set(key, value) {
        let hashCode = hash(key);
        let loc = bucket[hashCode];
        let keyValue = {};
        keyValue[key] = value;

        while (loc.next !== null) {
            loc = loc.next;
        }

        if (loc.value && loc.key !== null) {
            let temp = node();
            temp.value = keyValue;
            loc.next = temp;
        } else {
            loc.value = keyValue;
        }

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
        bucket = [];
        bucketGenerator(16);

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

hashMap.bucketGenerator(16);
console.log(hashMap.set("banana", "john smith"));
console.log(hashMap.get("banana"));
console.log(hashMap.get("banan"));
console.log(hashMap.has("banana"));
console.log(hashMap.has("banan"));
console.log(hashMap.set("e", "luffy"));
console.log(hashMap.set("u", "zoro"));
console.log(hashMap.get("e"));
//console.log(hashMap.remove('e'));
//console.log(hashMap.remove('e'));
console.log(hashMap.set("banan", "laios"));
//console.log(hashMap.remove('banan'));
//console.log(hashMap.remove('banan'));
console.log(hashMap.length());
//console.log(hashMap.clear());
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());

