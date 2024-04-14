const node = (key = null, value = null, next = null) => {
    return {
        key,
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

        while (loc.next !== null) {
            loc = loc.next;
        }

        if (loc.key !== key && loc.key !== null) {
            let temp = node();
            temp.key = key;
            temp.value = value;
            loc.next = temp;
        } else {
            loc.key = key;
            loc.value = value;
        }

        return bucket;
    }
    
    function get(key) {
        let hashCode = hash(key);
        let loc = bucket[hashCode];
        let value;

        while (loc.next !== null) {
            loc = loc.next;
        }

        if (loc.key !== key && loc.next === null) return null;

        value = loc.value;

        return value;
    }

    return {
        bucketGenerator,
        hash,
        set,
        get,
    }
})();

hashMap.bucketGenerator(16);
console.log(hashMap.set("banana", "john smith"));
console.log(hashMap.get("banana"));
console.log(hashMap.get("banan"));


