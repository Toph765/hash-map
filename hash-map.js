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

        return loc;
    }
    
    function get(key) {
        let hashCode = hash(key);
        let loc = bucket[hashCode];
        let value;

        if (loc.value === null) return null
        if (Object.keys(loc.value)[0] !== key && loc.next === null) return null

        while (Object.keys(loc.value)[0] !== key) {
            loc = loc.next;
        }

        value = loc.value[key];

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


