const node = (value = null, next = null) => {
    return {
        value,
        next
    };
}

const hashSet = (() => {
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

    /* function rehash() {
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
    } */

    function set(key) {
        const hashCode = hash(key);
        let loc = bucket[hashCode];

        if (loc.value === null) {
            loc.value = key;
        } else {
            while (loc.value !== key) {
                if (loc.value !== key && loc.next === null) {
                    const temp = node();
                    temp.value = key;
                    loc.next = temp;
                    
                } else loc = loc.next;
            };
        }
        loc.value = key;

        //rehash();
        return bucket;
    }

    function get(key) {
        const hashCode = hash(key);
        let loc = bucket[hashCode];
        let value;

        if (loc.value === null) return null;
        if (loc.value !== key && loc.next === null) return null;

        while (loc.value !== key) {
            loc = loc.next;
        }

        value = loc.value;

        return value;
    }

    return {
        set,
        get,
    }
})();

console.log(hashSet.set("banana"));
console.log(hashSet.set("e"));
console.log(hashSet.set("u"));

console.log(hashSet.get("banana"));
console.log(hashSet.get("e"));
console.log(hashSet.get("u"));

